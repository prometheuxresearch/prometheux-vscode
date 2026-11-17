import * as vscode from "vscode";
import type { ConceptStore } from "./concepts";
import type { ConnectionManager } from "./connection";
import { isInside, type LocalExplorer, type LocalOntology } from "./localExplorer";
import { runPx } from "./px";

export interface Plan {
  /** True when the local files match the platform. */
  inSync: boolean;
  /** The `Plan: N to create, N to update, …` line. */
  summary: string;
  /** The per-concept part of px's output. */
  details: string;
}

/** Reads `px plan` output. */
export function parsePlan(output: string): Plan {
  const summary = /^\s*Plan:.*$/m.exec(output)?.[0].trim() ?? "";
  const start = output.search(/^Plan against/m);
  const end = output.search(/^\s*Plan:/m);
  const details = start >= 0 && end > start ? output.slice(start, end).trim() : output.trim();
  return { inSync: /^No changes\./m.test(output), summary, details };
}

/**
 * Pushes a downloaded ontology's local changes to the platform with
 * `px plan` / `px apply`, scoped to that ontology.
 */
export class LocalSync implements vscode.Disposable {
  private readonly nudged = new Set<string>();
  private readonly subscription: vscode.Disposable;

  constructor(
    private readonly connections: ConnectionManager,
    private readonly store: ConceptStore,
    private readonly local: LocalExplorer,
    private readonly output: vscode.OutputChannel,
  ) {
    this.subscription = vscode.workspace.onDidSaveTextDocument((document) => void this.nudge(document));
  }

  /** The px workspace a downloaded ontology lives in (`<root>/ontologies/<slug>`). */
  private root(ontology: LocalOntology): string {
    return vscode.Uri.joinPath(ontology.dir, "..", "..").fsPath;
  }

  private run(args: string[], ontology: LocalOntology): Promise<string> {
    const connection = this.connections.connection;
    if (!connection) throw new Error("Not connected to Prometheux. Run 'Prometheux: Sign In' first.");
    const root = this.root(ontology);
    return runPx([...args, root, "--ontology", ontology.id], { cwd: root, connection, output: this.output });
  }

  async plan(ontology: LocalOntology): Promise<Plan> {
    return parsePlan(
      await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: `Comparing '${ontology.name}' with the platform…` },
        () => this.run(["plan"], ontology),
      ),
    );
  }

  /** `px apply -y`: px snapshots the ontology first, and never deletes without --prune. */
  async apply(ontology: LocalOntology): Promise<void> {
    await vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: `Applying '${ontology.name}' to the platform…` },
      () => this.run(["apply", "--yes"], ontology),
    );
    this.store.invalidate();
    this.local.refresh();
  }

  /** Shows the plan; returns it. */
  async showChanges(ontology: LocalOntology): Promise<Plan> {
    const plan = await this.plan(ontology);
    if (plan.inSync) {
      vscode.window.showInformationMessage(`'${ontology.name}' matches the platform.`);
    } else {
      this.output.show(true);
      vscode.window.showInformationMessage(`${ontology.name}: ${plan.summary}`);
    }
    return plan;
  }

  /** Plan, confirm with the diff, apply. */
  async applyWithConfirmation(ontology: LocalOntology): Promise<boolean> {
    const plan = await this.plan(ontology);
    if (plan.inSync) {
      vscode.window.showInformationMessage(`'${ontology.name}' already matches the platform.`);
      return false;
    }
    const detail = plan.details.split("\n").slice(1, 25).join("\n");
    const choice = await vscode.window.showWarningMessage(
      `Apply your local changes to '${ontology.name}' on the platform?`,
      {
        modal: true,
        detail: `${detail}\n\n${plan.summary}\n\nA snapshot is taken first. Concepts deleted locally are not deleted on the platform.`,
      },
      "Apply",
    );
    if (choice !== "Apply") return false;
    await this.apply(ontology);
    vscode.window.showInformationMessage(`Applied to '${ontology.name}': ${plan.summary.replace(/^Plan:\s*/, "")}`);
    return true;
  }

  /** Once per ontology and session: saving a downloaded concept does not change the platform. */
  private async nudge(document: vscode.TextDocument): Promise<void> {
    if (document.uri.scheme !== "file") return;
    const { ontologies } = await this.local.contents();
    const ontology = ontologies.find((candidate) => isInside(document.uri, candidate.dir));
    if (!ontology || this.nudged.has(ontology.id)) return;
    this.nudged.add(ontology.id);
    const choice = await vscode.window.showInformationMessage(
      `Saved locally. '${ontology.name}' on the platform changes when you apply.`,
      "Apply to Platform",
      "Show Changes",
    );
    if (choice === "Apply to Platform") await this.applyWithConfirmation(ontology);
    if (choice === "Show Changes") await this.showChanges(ontology);
  }

  dispose(): void {
    this.subscription.dispose();
  }
}
