import * as vscode from "vscode";
import type { ConceptStore } from "./concepts";
import type { ConnectionManager } from "./connection";
import type { OntologyItem } from "./explorer";
import { isVadalogFile, type LocalExplorer, type LocalOntologyItem } from "./localExplorer";
import { runPx, slugify } from "./px";
import type { Runner } from "./runner";

type Handler = (...args: never[]) => unknown;

interface Deps {
  connections: ConnectionManager;
  store: ConceptStore;
  local: LocalExplorer;
  runner: Runner;
  output: vscode.OutputChannel;
}

async function exists(uri: vscode.Uri): Promise<boolean> {
  try {
    await vscode.workspace.fs.stat(uri);
    return true;
  } catch {
    return false;
  }
}

/** Where to download: the only workspace folder, a picked one, or a folder chosen on disk. */
async function chooseRoot(): Promise<{ root: vscode.Uri; inWorkspace: boolean } | undefined> {
  const folders = vscode.workspace.workspaceFolders ?? [];
  if (folders.length === 1) return { root: folders[0].uri, inWorkspace: true };
  if (folders.length > 1) {
    const folder = await vscode.window.showWorkspaceFolderPick({ placeHolder: "Download into which folder?" });
    return folder && { root: folder.uri, inWorkspace: true };
  }
  const picked = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    openLabel: "Download Here",
    title: "Choose the folder to download the ontology into",
  });
  return picked?.[0] && { root: picked[0], inWorkspace: false };
}

/** Runs `px pull` for an ontology into `root/ontologies/<slug>`, confirming an overwrite. */
async function pull(deps: Deps, ontologyId: string, name: string, root: vscode.Uri, slug: string): Promise<boolean> {
  const connection = deps.connections.connection;
  if (!connection) throw new Error("Not connected to Prometheux. Run 'Prometheux: Sign In' first.");
  const target = vscode.Uri.joinPath(root, "ontologies", slug);
  if (await exists(target)) {
    const choice = await vscode.window.showWarningMessage(
      `Update '${name}' from the platform?`,
      { modal: true, detail: `${vscode.workspace.asRelativePath(target)} is overwritten with the platform's version. Local edits to those files are lost.` },
      "Update",
    );
    if (choice !== "Update") return false;
  }
  await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: `Downloading '${name}'…` },
    () => runPx(["pull", ontologyId, "--out", root.fsPath, "--slug", slug], { cwd: root.fsPath, connection, output: deps.output }),
  );
  deps.local.refresh();
  return true;
}

export function localCommands(deps: Deps): [string, Handler][] {
  return [
    [
      "prometheux.downloadOntology",
      async (item?: OntologyItem) => {
        const ontologies = item ? [item.ontology] : await deps.store.listOntologies();
        const ontology =
          item?.ontology ??
          (
            await vscode.window.showQuickPick(
              ontologies.map((candidate) => ({ label: candidate.name, description: candidate.id, ontology: candidate })),
              { title: "Download ontology" },
            )
          )?.ontology;
        if (!ontology) return;
        const destination = await chooseRoot();
        if (!destination) return;
        const slug = slugify(ontology.name) || ontology.id;
        if (!(await pull(deps, ontology.id, ontology.name, destination.root, slug))) return;

        const manifest = vscode.Uri.joinPath(destination.root, "ontologies", slug, "prometheux.yaml");
        if (destination.inWorkspace) {
          await vscode.commands.executeCommand("prometheux.local.focus");
          vscode.window.showInformationMessage(`Downloaded '${ontology.name}' to ${vscode.workspace.asRelativePath(manifest)}.`);
          return;
        }
        const choice = await vscode.window.showInformationMessage(
          `Downloaded '${ontology.name}' to ${destination.root.fsPath}.`,
          "Open Folder",
        );
        if (choice) await vscode.commands.executeCommand("vscode.openFolder", destination.root);
      },
    ],
    [
      "prometheux.updateFromPlatform",
      async (item?: LocalOntologyItem) => {
        if (!item) return;
        const { ontology } = item;
        // px pull writes to <out>/ontologies/<slug>: the out dir is two levels up.
        const root = vscode.Uri.joinPath(ontology.dir, "..", "..");
        const slug = ontology.dir.path.split("/").pop() ?? slugify(ontology.name);
        if (await pull(deps, ontology.id, ontology.name, root, slug)) {
          vscode.window.showInformationMessage(`Updated '${ontology.name}' from the platform.`);
        }
      },
    ],
    [
      "prometheux.evaluateFile",
      async (target?: vscode.Uri | { uri: vscode.Uri }) => {
        const uri = target instanceof vscode.Uri ? target : (target?.uri ?? vscode.window.activeTextEditor?.document.uri);
        if (!uri || !isVadalogFile(uri)) {
          vscode.window.showInformationMessage("Choose a .vada or .vadalog file to evaluate.");
          return;
        }
        const document = await vscode.workspace.openTextDocument(uri);
        if (document.isDirty) await document.save();
        await deps.runner.evaluateDocument(document);
      },
    ],
    [
      "prometheux.newVadalogFile",
      async () => {
        const document = await vscode.workspace.openTextDocument({
          language: "vadalog",
          content: '% Evaluated on Prometheux with Cmd/Ctrl+Shift+Enter; nothing is saved to an ontology.\nhello("world").\nhi(X) :- hello(X).\n\n@output("hi").\n',
        });
        await vscode.window.showTextDocument(document);
      },
    ],
    ["prometheux.refreshLocal", () => deps.local.refresh()],
  ];
}
