import * as path from "node:path";
import * as vscode from "vscode";
import { parse as parseYaml } from "yaml";
import { excludeMatcher } from "./fileExclude";

const EXCLUDE = "**/{node_modules,.git,.px,.vscode-test,out,dist}/**";
const VADALOG_EXTENSIONS = new Set(["vada", "vadalog"]);
const CONCEPT_ICONS: Record<string, string> = {
  vada: "symbol-function",
  vadalog: "symbol-function",
  sql: "database",
  py: "symbol-method",
  cypher: "type-hierarchy",
};

/** An ontology on disk, as `px pull` writes it: `<dir>/prometheux.yaml` + concept files. */
export interface LocalOntology {
  id: string;
  name: string;
  /** The ontology directory (`…/ontologies/<slug>`). */
  dir: vscode.Uri;
  manifest: vscode.Uri;
  conceptsDir: vscode.Uri;
}

function extensionOf(uri: vscode.Uri): string {
  const base = path.posix.basename(uri.path);
  const dot = base.indexOf(".");
  return dot < 0 ? "" : base.slice(dot + 1);
}

export function isVadalogFile(uri: vscode.Uri): boolean {
  return VADALOG_EXTENSIONS.has(extensionOf(uri));
}

export function isInside(child: vscode.Uri, parent: vscode.Uri): boolean {
  const prefix = parent.path.endsWith("/") ? parent.path : `${parent.path}/`;
  return child.path.startsWith(prefix);
}

class GroupItem extends vscode.TreeItem {
  constructor(
    readonly group: "ontologies" | "files",
    label: string,
    description: string | undefined,
  ) {
    super(label, vscode.TreeItemCollapsibleState.Expanded);
    this.id = `local-group:${group}`;
    this.description = description;
    this.contextValue = `localGroup.${group}`;
  }
}

/** A folder of the workspace, in the Files tree. */
export class LocalFolderItem extends vscode.TreeItem {
  constructor(
    readonly uri: vscode.Uri,
    label: string,
  ) {
    super(label, vscode.TreeItemCollapsibleState.Collapsed);
    this.id = `local-folder:${uri.toString()}`;
    this.resourceUri = uri;
    this.iconPath = vscode.ThemeIcon.Folder;
    this.contextValue = "localFolder";
  }
}


export class LocalOntologyItem extends vscode.TreeItem {
  constructor(readonly ontology: LocalOntology) {
    super(ontology.name, vscode.TreeItemCollapsibleState.Collapsed);
    this.id = `local-ontology:${ontology.dir.toString()}`;
    this.contextValue = "localOntology";
    this.iconPath = new vscode.ThemeIcon("type-hierarchy-sub");
    this.description = vscode.workspace.asRelativePath(ontology.dir);
    this.resourceUri = ontology.dir;
    this.tooltip = new vscode.MarkdownString(
      `**${ontology.name}**\n\nDownloaded from the platform ontology \`${ontology.id}\`.\n\n` +
        "Edit the files here; `px plan` / `px apply` push them back.",
    );
  }
}

export class LocalFileItem extends vscode.TreeItem {
  constructor(
    readonly uri: vscode.Uri,
    label: string,
    description: string | undefined,
    /** In the Files tree: the file icon theme's icon, as in Explorer. */
    themeIcon = false,
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    const ext = extensionOf(uri);
    this.id = `local-file:${themeIcon ? "tree:" : ""}${uri.toString()}`;
    this.resourceUri = uri;
    this.description = description;
    this.contextValue = isVadalogFile(uri) ? "localFile.vadalog" : "localFile";
    this.iconPath = themeIcon ? vscode.ThemeIcon.File : new vscode.ThemeIcon(CONCEPT_ICONS[ext] ?? "file");
    this.command = { command: "vscode.open", title: "Open", arguments: [uri] };
  }
}

type Node = GroupItem | LocalOntologyItem | LocalFileItem | LocalFolderItem;

/**
 * The "Local" view: ontologies downloaded with `px pull` (Prometheux accounts only) and the
 * workspace's files, as in Explorer, with run actions on Vadalog files and folders.
 */
export class LocalExplorer implements vscode.TreeDataProvider<Node>, vscode.Disposable {
  private readonly changed = new vscode.EventEmitter<Node | undefined>();
  readonly onDidChangeTreeData = this.changed.event;
  private readonly subscriptions: vscode.Disposable[];
  private pending: ReturnType<typeof setTimeout> | undefined;
  private scan: Promise<{ ontologies: LocalOntology[] }> | undefined;

  /** Whether to list downloaded ontologies: true on Prometheux accounts. Set by the extension. */
  showOntologies: () => boolean = () => true;

  constructor() {
    const watchers = ["**/*"].map((glob) => vscode.workspace.createFileSystemWatcher(glob, false, true, false));
    this.subscriptions = [
      this.changed,
      ...watchers,
      ...watchers.flatMap((watcher) => [
        watcher.onDidCreate(() => this.refreshSoon()),
        watcher.onDidDelete(() => this.refreshSoon()),
      ]),
      vscode.workspace.onDidChangeWorkspaceFolders(() => this.refresh()),
      vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("files.exclude")) this.refresh();
      }),
    ];
  }

  refresh(): void {
    this.scan = undefined;
    this.changed.fire(undefined);
  }

  private refreshSoon(): void {
    clearTimeout(this.pending);
    this.pending = setTimeout(() => this.refresh(), 300);
  }

  /** Ontologies downloaded into the workspace, scanned once per refresh. */
  contents(): Promise<{ ontologies: LocalOntology[] }> {
    this.scan ??= this.doScan();
    return this.scan;
  }

  private async doScan(): Promise<{ ontologies: LocalOntology[] }> {
    const manifests = await vscode.workspace.findFiles("**/prometheux.yaml", EXCLUDE);
    const ontologies: LocalOntology[] = [];
    for (const manifest of manifests) {
      try {
        const data = parseYaml(new TextDecoder().decode(await vscode.workspace.fs.readFile(manifest)));
        const ontology = data?.ontology;
        if (!ontology?.id) continue;
        const dir = vscode.Uri.joinPath(manifest, "..");
        ontologies.push({
          id: String(ontology.id),
          name: String(ontology.name ?? ontology.id),
          dir,
          manifest,
          conceptsDir: vscode.Uri.joinPath(dir, typeof data.concepts === "string" ? data.concepts : "concepts"),
        });
      } catch {
        // Not a px manifest we can read: ignore it.
      }
    }
    ontologies.sort((a, b) => a.name.localeCompare(b.name));
    return { ontologies };
  }

  getTreeItem(node: Node): vscode.TreeItem {
    return node;
  }

  /** A folder's entries as in Explorer: `files.exclude` applied, folders first, then by name. */
  private async folderChildren(folder: vscode.Uri): Promise<Node[]> {
    let entries: [string, vscode.FileType][] = [];
    try {
      entries = await vscode.workspace.fs.readDirectory(folder);
    } catch {
      return [];
    }
    const root = vscode.workspace.getWorkspaceFolder(folder);
    const excluded = excludeMatcher(vscode.workspace.getConfiguration("files", root).get<Record<string, unknown>>("exclude") ?? {});
    const relative = (name: string) =>
      root ? path.posix.relative(root.uri.path, vscode.Uri.joinPath(folder, name).path) : name;
    return entries
      .filter(([name]) => !excluded(relative(name)))
      .sort(([a, typeA], [b, typeB]) => {
        const folderA = (typeA & vscode.FileType.Directory) !== 0;
        const folderB = (typeB & vscode.FileType.Directory) !== 0;
        return folderA === folderB ? a.localeCompare(b, undefined, { sensitivity: "base" }) : folderA ? -1 : 1;
      })
      .map(([name, type]) => {
        const uri = vscode.Uri.joinPath(folder, name);
        return type & vscode.FileType.Directory ? new LocalFolderItem(uri, name) : new LocalFileItem(uri, name, undefined, true);
      });
  }

  async getChildren(node?: Node): Promise<Node[]> {
    const folders = vscode.workspace.workspaceFolders ?? [];
    if (!node) {
      if (folders.length === 0) return [];
      const groups: Node[] = [];
      if (this.showOntologies()) {
        const { ontologies } = await this.contents();
        groups.push(new GroupItem("ontologies", "Ontologies", String(ontologies.length)));
      }
      groups.push(new GroupItem("files", "Files", folders.length === 1 ? folders[0]?.name : undefined));
      return groups;
    }
    if (node instanceof GroupItem) {
      if (node.group === "ontologies") return (await this.contents()).ontologies.map((ontology) => new LocalOntologyItem(ontology));
      const [only] = folders;
      if (folders.length === 1 && only) return this.folderChildren(only.uri);
      return folders.map((folder) => new LocalFolderItem(folder.uri, folder.name));
    }
    if (node instanceof LocalFolderItem) return this.folderChildren(node.uri);
    if (node instanceof LocalOntologyItem) {
      let entries: [string, vscode.FileType][] = [];
      try {
        entries = await vscode.workspace.fs.readDirectory(node.ontology.conceptsDir);
      } catch {
        return [];
      }
      return entries
        .filter(([name, type]) => type === vscode.FileType.File && !name.endsWith(".meta.yaml"))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name]) => {
          const uri = vscode.Uri.joinPath(node.ontology.conceptsDir, name);
          const dot = name.indexOf(".");
          const ext = dot < 0 ? "" : name.slice(dot + 1);
          return new LocalFileItem(uri, dot < 0 ? name : name.slice(0, dot), VADALOG_EXTENSIONS.has(ext) ? undefined : ext);
        });
    }
    return [];
  }

  dispose(): void {
    clearTimeout(this.pending);
    for (const subscription of this.subscriptions) subscription.dispose();
  }
}
