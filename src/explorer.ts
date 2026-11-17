import type { Concept, Ontology } from "prometheux-chain";
import * as vscode from "vscode";
import { type ConceptStore, conceptUri } from "./concepts";
import type { ConnectionManager } from "./connection";

const CONCEPT_ICONS: Record<string, string> = {
  logic: "symbol-function",
  sql: "database",
  python: "symbol-method",
  cypher: "type-hierarchy",
  context: "note",
  llm: "sparkle",
};

export class OntologyItem extends vscode.TreeItem {
  constructor(readonly ontology: Ontology) {
    super(ontology.name || ontology.id, vscode.TreeItemCollapsibleState.Collapsed);
    this.id = `ontology:${ontology.id}`;
    this.contextValue = "ontology";
    this.iconPath = new vscode.ThemeIcon("type-hierarchy-sub");
    this.tooltip = new vscode.MarkdownString(
      `**${ontology.name}**\n\n${ontology.description || "_No description_"}\n\n\`${ontology.id}\``,
    );
  }
}

export class ConceptItem extends vscode.TreeItem {
  readonly uri: vscode.Uri;

  constructor(
    readonly ontologyId: string,
    readonly concept: Concept,
  ) {
    super(concept.predicate_name, vscode.TreeItemCollapsibleState.None);
    this.uri = conceptUri(ontologyId, concept.predicate_name, concept.concept_type);
    this.id = `concept:${ontologyId}:${concept.predicate_name}`;
    this.resourceUri = this.uri;
    this.contextValue = concept.read_only ? "concept.readonly" : "concept";
    this.iconPath = new vscode.ThemeIcon(CONCEPT_ICONS[concept.concept_type] ?? "symbol-constant");
    const rows = concept.row_count ? `${concept.row_count.toLocaleString()} rows` : "";
    this.description = [concept.concept_type !== "logic" ? concept.concept_type : "", rows]
      .filter(Boolean)
      .join(" · ");
    const fields = Object.entries(concept.fields ?? {})
      .map(([name, type]) => `- \`${name}\`: ${type}`)
      .join("\n");
    const inputs = (concept.parsed?.binds.input ?? []).map((bind) => `- \`${bind.annotation}\``).join("\n");
    this.tooltip = new vscode.MarkdownString(
      [
        `**${concept.predicate_name}** (${concept.concept_type})`,
        concept.description ?? "",
        fields,
        inputs ? `Input bindings:\n${inputs}` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    );
    this.command = { command: "vscode.open", title: "Open Concept", arguments: [this.uri] };
  }
}

class MessageItem extends vscode.TreeItem {
  constructor(message: string, icon = "warning") {
    super(message, vscode.TreeItemCollapsibleState.None);
    this.iconPath = new vscode.ThemeIcon(icon);
  }
}

type Node = OntologyItem | ConceptItem | MessageItem;

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Tree of ontologies and their concepts for the active connection. */
export class OntologyExplorer implements vscode.TreeDataProvider<Node>, vscode.Disposable {
  private readonly changed = new vscode.EventEmitter<Node | undefined>();
  readonly onDidChangeTreeData = this.changed.event;
  private readonly subscriptions: vscode.Disposable[];

  constructor(
    private readonly connections: ConnectionManager,
    private readonly store: ConceptStore,
  ) {
    this.subscriptions = [
      connections.onDidChange(() => this.changed.fire(undefined)),
      // Concept changes re-render the whole tree: item ids keep expansion state.
      store.onDidChange(() => this.changed.fire(undefined)),
    ];
  }

  refresh(): void {
    this.store.invalidate();
  }

  getTreeItem(node: Node): vscode.TreeItem {
    return node;
  }

  async getChildren(node?: Node): Promise<Node[]> {
    if (!this.connections.connection) return [];
    try {
      if (!node) {
        const ontologies = await this.store.listOntologies();
        return [...ontologies]
          .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
          .map((ontology) => new OntologyItem(ontology));
      }
      if (node instanceof OntologyItem) {
        const concepts = await this.store.listConcepts(node.ontology.id);
        if (!concepts.length) return [new MessageItem("No concepts yet", "info")];
        return concepts.map((concept) => new ConceptItem(node.ontology.id, concept));
      }
      return [];
    } catch (error) {
      return [new MessageItem(`Could not load: ${errorMessage(error)}`, "error")];
    }
  }

  dispose(): void {
    for (const subscription of this.subscriptions) subscription.dispose();
    this.changed.dispose();
  }
}
