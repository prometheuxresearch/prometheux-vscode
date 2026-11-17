import * as path from "node:path";
import * as vscode from "vscode";
import { isVadalogFile } from "../localExplorer";
import { maskSecrets } from "../localProgram";
import type { ResultsView } from "../resultsView";
import { rangeFromMessage } from "../validation";
import type { Backend } from "./backend";
import { PlanError } from "./programPlan";
import { type ProgramFile, resultsMessage, runFiles } from "./runFiles";

const EXCLUDE = "**/{node_modules,.git,.px,.vscode-test,out,dist}/**";

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** The Vadalog files under the given files and folders, deduplicated and sorted by path. */
async function collectFiles(targets: vscode.Uri[]): Promise<vscode.Uri[]> {
  const found = new Map<string, vscode.Uri>();
  for (const target of targets) {
    const stat = await vscode.workspace.fs.stat(target);
    if (stat.type & vscode.FileType.Directory) {
      const files = await vscode.workspace.findFiles(new vscode.RelativePattern(target, "**/*.{vada,vadalog}"), EXCLUDE);
      for (const file of files) found.set(file.toString(), file);
    } else if (isVadalogFile(target)) {
      found.set(target.toString(), target);
    }
  }
  return [...found.values()].sort((a, b) => a.path.localeCompare(b.path));
}

async function readProgram(uri: vscode.Uri): Promise<string> {
  const open = vscode.workspace.textDocuments.find((document) => document.uri.toString() === uri.toString());
  if (open?.isDirty) await open.save();
  return open ? open.getText() : new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
}

function titleFor(targets: vscode.Uri[], files: vscode.Uri[]): string {
  const [first] = files;
  if (files.length === 1 && first) return vscode.workspace.asRelativePath(first);
  const [folder] = targets;
  if (targets.length === 1 && folder && !isVadalogFile(folder)) {
    return `${vscode.workspace.asRelativePath(folder)}/ (${files.length} programs)`;
  }
  return `${files.length} programs`;
}

/**
 * Runs local Vadalog files on the active account's platform and shows the outcome in the Results
 * panel. Several files run as modules: each in its own engine call, a file that uses another's
 * @output after it (reading the table it writes), independent ones together.
 */
export class FilesRunner implements vscode.Disposable {
  private readonly diagnostics = vscode.languages.createDiagnosticCollection("prometheux-files");
  private readonly subscriptions: vscode.Disposable[];

  constructor(
    /** The active account's backend; throws when there is no active account. */
    private readonly backend: () => Backend,
    /** Called before a run on a backend that needs compute ready; false cancels the run. */
    private readonly ready: (backend: Backend) => Promise<boolean>,
    private readonly results: ResultsView,
    private readonly output: vscode.OutputChannel,
  ) {
    this.subscriptions = [this.diagnostics, vscode.workspace.onDidCloseTextDocument((document) => this.diagnostics.delete(document.uri))];
  }

  async run(targets: vscode.Uri[]): Promise<void> {
    const backend = this.backend();
    const uris = await collectFiles(targets);
    if (uris.length === 0) {
      vscode.window.showInformationMessage("No .vada or .vadalog files to run.");
      return;
    }
    if (!(await this.ready(backend))) return;
    const files: ProgramFile[] = await Promise.all(
      uris.map(async (uri) => ({ label: vscode.workspace.asRelativePath(uri), program: await readProgram(uri) })),
    );
    const title = titleFor(targets, uris);
    const configured = vscode.workspace.getConfiguration("prometheux").get<number>("run.maxParallel");
    const maxParallel = backend.platform === "foundry" && configured ? configured : backend.maxParallel;
    await this.results.show({ type: "loading", title });
    this.output.appendLine(`▶ Running ${title} on ${backend.label}`);

    const started = Date.now();
    try {
      const runs = await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: `Running ${title} on ${backend.label}`, cancellable: true },
        (progress, token) => {
          const abort = new AbortController();
          token.onCancellationRequested(() => abort.abort());
          return runFiles(backend, files, {
            maxParallel,
            signal: abort.signal,
            log: (line) => {
              this.output.appendLine(line);
              progress.report({ message: line.trim() });
            },
          });
        },
      );
      for (const run of runs.filter((r) => r.readsFromUpstream.length > 0)) {
        this.output.appendLine(`--- ${run.name} as sent to the engine ---\n${maskSecrets(run.program)}`);
      }
      await this.results.show(resultsMessage(title, runs, (Date.now() - started) / 1000, backend.label));
      const failed = runs.filter((run) => run.status === "failed");
      if (failed.length > 0) {
        const choice = await vscode.window.showErrorMessage(
          `${backend.label}: ${failed.map((run) => `${run.name} failed: ${run.message}`).join("; ")}`,
          "Show Log",
        );
        if (choice) this.output.show(true);
      }
    } catch (error) {
      const text = errorMessage(error);
      this.output.appendLine(`✖ ${text}`);
      await this.results.show({ type: "error", title, message: error instanceof PlanError ? text : `${backend.label}: ${text}` });
    }
  }

  /** Checks a file with the platform's parser and shows problems as diagnostics. */
  async validate(document: vscode.TextDocument, notify = false): Promise<void> {
    const backend = this.backend();
    const problem = await backend.validate(document.getText());
    if (!problem) {
      this.diagnostics.delete(document.uri);
      if (notify) vscode.window.showInformationMessage(`${backend.label}: ${path.basename(document.uri.path)} has no problems.`);
      return;
    }
    const diagnostic = new vscode.Diagnostic(rangeFromMessage(problem, document), problem, vscode.DiagnosticSeverity.Error);
    diagnostic.source = backend.label;
    this.diagnostics.set(document.uri, [diagnostic]);
  }

  dispose(): void {
    for (const subscription of this.subscriptions) subscription.dispose();
  }
}
