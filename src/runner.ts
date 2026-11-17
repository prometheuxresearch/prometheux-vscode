import type { RunMode } from "prometheux-chain";
import * as vscode from "vscode";
import { type ConceptRef, parseUri, SCHEME } from "./concepts";
import type { ComputeManager } from "./compute";
import type { ConceptStore } from "./concepts";
import type { ConnectionManager } from "./connection";
import { tablesFromEvaluation } from "./results/model";
import type { ResultsView } from "./resultsView";

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Runs concepts and Vadalog programs on the platform and shows the results. */
export class Runner {
  constructor(
    private readonly connections: ConnectionManager,
    private readonly store: ConceptStore,
    private readonly results: ResultsView,
    private readonly output: vscode.OutputChannel,
    private readonly computes: ComputeManager,
  ) {}

  /**
   * Turns a file into the program to evaluate (a downloaded concept gets its
   * binds back from its meta). Set by the extension; identity by default.
   */
  prepareProgram: (uri: vscode.Uri, text: string) => Promise<{ program: string; note?: string }> = async (
    _uri,
    program,
  ) => ({ program });

  /**
   * Sends a file somewhere other than the Prometheux platform (Palantir Foundry, when the active
   * account is a Foundry account); true when it did. Set by the extension.
   */
  route: (uri: vscode.Uri) => Promise<boolean> = async () => false;

  /** Evaluates a file: a loose program as written, a downloaded concept with its binds. */
  async evaluateDocument(document: vscode.TextDocument): Promise<void> {
    if (await this.route(document.uri)) return;
    const { program, note } = await this.prepareProgram(document.uri, document.getText());
    await this.evaluate(program, vscode.workspace.asRelativePath(document.uri), note);
  }

  /** Runs whatever the editor shows: the concept for `prometheux:` files, the program otherwise. */
  async runActiveEditor(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage("Open a concept or a Vadalog file to run it.");
      return;
    }
    const concept = editor.document.uri.scheme === SCHEME ? parseUri(editor.document.uri).concept : undefined;
    if (concept) {
      if (editor.document.isDirty && !(await editor.document.save())) return;
      await this.runConcept(concept);
    } else {
      await this.evaluateDocument(editor.document);
    }
  }

  /** Runs a saved concept with live status, then shows its first page of results. */
  async runConcept(concept: ConceptRef): Promise<void> {
    const client = this.connections.requireClient();
    if (!(await this.computes.ensureReady())) return;
    const { ontologyId, conceptName } = concept;
    const runMode = vscode.workspace.getConfiguration("prometheux").get<RunMode>("run.mode", "auto");
    const title = `${conceptName} · ${await this.store.ontologyName(ontologyId)}`;
    await this.results.show({ type: "loading", title });
    this.output.appendLine(`▶ Running ${conceptName} (ontology ${ontologyId}, mode ${runMode})`);

    const failure = await vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: `Running ${conceptName}`, cancellable: true },
      async (progress, token) => {
        const abort = new AbortController();
        token.onCancellationRequested(() => abort.abort());
        try {
          for await (const event of client.concepts.runStream(
            ontologyId,
            conceptName,
            { runMode, compute: this.computes.compute() },
            { signal: abort.signal },
          )) {
            if (event.event === "concept_status") {
              const status = event.data;
              if ("type" in status) {
                this.output.appendLine(`  plan: ${status.order.join(" → ")}`);
              } else {
                const detail = status.status === "error" ? `: ${status.error}` : "";
                this.output.appendLine(`  ${status.concept}: ${status.status}${detail}`);
                progress.report({ message: `${status.concept}: ${status.status}` });
              }
            } else if (event.event === "complete") {
              if (event.data.status === "error") {
                const data = event.data.data as { errorMessage?: string } | undefined;
                return data?.errorMessage ?? event.data.message ?? "The run failed.";
              }
            } else {
              return event.data.message;
            }
          }
          return undefined;
        } catch (error) {
          return token.isCancellationRequested ? "Run cancelled." : errorMessage(error);
        }
      },
    );

    if (failure) {
      this.output.appendLine(`✖ ${conceptName}: ${failure}`);
      await this.results.show({ type: "error", title, message: failure });
      return;
    }
    this.output.appendLine(`✔ ${conceptName} finished`);
    this.store.invalidate(ontologyId);
    await this.showConceptPage(concept, title, 1);
  }

  /** Shows one page of a concept's stored results. */
  async showConceptPage(concept: ConceptRef, title: string, page: number): Promise<void> {
    const pageSize = vscode.workspace.getConfiguration("prometheux").get<number>("results.pageSize", 100);
    try {
      const response = await this.connections
        .requireClient()
        .concepts.fetchResults(concept.ontologyId, concept.conceptName, {
          page,
          pageSize,
          compute: this.computes.compute(),
        });
      await this.results.show(
        {
          type: "tables",
          title,
          tables: [{ name: concept.conceptName, columns: response.results.columnNames, rows: response.results.facts }],
          paging: {
            page: response.pagination.page,
            pageCount: response.pagination.total_pages,
            total: response.pagination.total_count,
          },
        },
        (next) => void this.showConceptPage(concept, title, next),
      );
    } catch (error) {
      await this.results.show({ type: "error", title, message: errorMessage(error) });
    }
  }

  /** Evaluates a Vadalog program without saving it as a concept. */
  async evaluate(program: string, title: string, note?: string): Promise<void> {
    const client = this.connections.requireClient();
    if (!(await this.computes.ensureReady())) return;
    await this.results.show({ type: "loading", title });
    const started = Date.now();
    try {
      const result = await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: `Evaluating ${title}`, cancellable: true },
        (_progress, token) => {
          const abort = new AbortController();
          token.onCancellationRequested(() => abort.abort());
          return client.vadalog.evaluate(program, { compute: this.computes.compute() }, { signal: abort.signal });
        },
      );
      const seconds = ((Date.now() - started) / 1000).toFixed(1);
      await this.results.show({
        type: "tables",
        title,
        subtitle: [`evaluated in ${seconds}s`, note].filter(Boolean).join(" · "),
        tables: tablesFromEvaluation(result),
      });
    } catch (error) {
      await this.results.show({ type: "error", title, message: errorMessage(error) });
    }
  }

  /** Program evaluator for the binding code lenses and the notebook kernel. */
  evaluator = async (program: string, signal?: AbortSignal) => {
    const result = await this.connections
      .requireClient()
      .vadalog.evaluate(program, { compute: this.computes.compute() }, { signal });
    return result as { resultSet: Record<string, unknown[][]>; columnNames?: Record<string, string[]>; types?: Record<string, string[]> };
  };
}
