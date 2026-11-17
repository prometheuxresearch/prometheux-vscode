import * as vscode from "vscode";
import { parseUri, SCHEME, typeForExtension } from "./concepts";
import type { ConceptStore } from "./concepts";
import type { ConnectionManager } from "./connection";

const LANGUAGE_ID = "vadalog";

/** Best-effort position from engine messages such as "line 3:14 ..." or "at line 3, column 14". */
export function rangeFromMessage(message: string, document: vscode.TextDocument): vscode.Range {
  const match = /line[\s:]*(\d+)(?:[\s:,]*(?:col(?:umn)?)?[\s:]*(\d+))?/i.exec(message);
  if (!match) return new vscode.Range(0, 0, 0, Math.max(0, document.lineAt(0).text.length));
  const line = Math.min(Math.max(Number(match[1]) - 1, 0), document.lineCount - 1);
  const text = document.lineAt(line).text;
  return new vscode.Range(line, text.length - text.trimStart().length, line, text.length);
}

/**
 * Validates Vadalog with the platform (the authority on the Prometheux
 * dialect) and reports problems as "Prometheux" diagnostics.
 */
export class PlatformValidator implements vscode.Disposable {
  private readonly diagnostics = vscode.languages.createDiagnosticCollection("prometheux");
  private readonly subscriptions: vscode.Disposable[];

  constructor(
    private readonly connections: ConnectionManager,
    private readonly store: ConceptStore,
  ) {
    this.subscriptions = [
      this.diagnostics,
      vscode.workspace.onDidSaveTextDocument((document) => {
        const enabled = vscode.workspace.getConfiguration("prometheux").get<boolean>("validateOnSave", true);
        if (enabled && this.connections.connection) void this.validate(document, false);
      }),
      vscode.workspace.onDidCloseTextDocument((document) => this.diagnostics.delete(document.uri)),
    ];
  }

  async validate(document: vscode.TextDocument, notify = true): Promise<void> {
    const concept = document.uri.scheme === SCHEME ? parseUri(document.uri).concept : undefined;
    if (!concept && document.languageId !== LANGUAGE_ID) return;
    const existing = concept ? await this.store.findConcept(concept.ontologyId, concept.conceptName) : undefined;
    const conceptType = existing?.concept_type ?? (concept ? typeForExtension(concept.ext) : "logic");
    // A prompt (llm) or a note selection (context) is not a program: nothing to validate.
    if (conceptType === "llm" || conceptType === "context") {
      this.diagnostics.delete(document.uri);
      return;
    }

    const result = await this.connections.requireClient().vadalog.validate(document.getText(), {
      conceptType,
      conceptName: concept?.conceptName,
      ontologyId: concept?.ontologyId,
    });
    if (result.valid) {
      this.diagnostics.delete(document.uri);
      if (notify) vscode.window.showInformationMessage("Prometheux: no problems found.");
      return;
    }
    const message = result.error ?? "The program is not valid.";
    const diagnostic = new vscode.Diagnostic(
      rangeFromMessage(message, document),
      message,
      vscode.DiagnosticSeverity.Error,
    );
    diagnostic.source = "Prometheux";
    this.diagnostics.set(document.uri, [diagnostic]);
  }

  dispose(): void {
    for (const subscription of this.subscriptions) subscription.dispose();
  }
}
