// Runs local Vadalog files as modules on the active account's platform: one engine call per file,
// ordered by the @output predicates they read from each other. No `vscode` import: the unit tests
// bundle it.
import { randomUUID } from "node:crypto";
import { type ResultsMessage, type ResultTable, tablesFromEvaluation } from "../results/model";
import type { Backend, Evaluation } from "./backend";
import { PlanError, planPrograms, type ProgramRun, runPlan } from "./programPlan";

export interface ProgramFile {
  // How the file is shown: its workspace-relative path.
  label: string;
  program: string;
}

export interface FileRun {
  // The program's first @output predicate.
  name: string;
  label: string;
  status: ProgramRun<Evaluation>["status"];
  dependsOn: string[];
  readsFromUpstream: string[];
  // Tables the program writes its outputs to (its output @binds).
  writes: string[];
  // The program as sent to the engine, with the upstream binds added.
  program: string;
  evaluation?: Evaluation;
  message?: string;
  startedAfterMs: number;
  elapsedMs: number;
}

export interface RunOptions {
  maxParallel?: number;
  signal?: AbortSignal;
  log?: (line: string) => void;
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Analyzes every file, plans the order (a file that reads another's @output runs after it and
 * reads its table), then runs each file in its own engine call, independent ones at the same time.
 * Problems with the files themselves throw a PlanError before anything runs.
 */
export async function runFiles(
  backend: Backend,
  files: ProgramFile[],
  options: RunOptions = {},
): Promise<FileRun[]> {
  const log = options.log ?? (() => undefined);
  const { signal } = options;
  if (files.length === 0) throw new PlanError("No Vadalog files to run.");

  const analyses = await Promise.all(
    files.map(async (file) => {
      const analysis = await backend.analyze(file.program, signal).catch((error: unknown) => {
        throw new PlanError(`${file.label}: ${message(error)}`);
      });
      if (analysis.outputs.length === 0) {
        throw new PlanError(
          `${file.label} has no @output. Every program must declare what it delivers with @output("...").`,
        );
      }
      return analysis;
    }),
  );
  const plan = planPrograms(analyses);
  const labelOf = (index: number) => files[index]?.label ?? `program ${index + 1}`;
  log(`  plan: ${plan.map((step) => `${step.name} (${labelOf(step.index)})`).join(" → ")}`);
  for (const step of plan) {
    if (step.dependsOn.length > 0) log(`  ${step.name} runs after ${step.dependsOn.join(", ")}`);
    if (step.readsFromUpstream.length > 0) {
      log(`  ${step.name} reads ${step.readsFromUpstream.join(", ")} from the upstream tables (binds added)`);
    }
  }

  const running = new Set<string>();
  signal?.addEventListener("abort", () => {
    for (const id of running) void backend.stop?.(id).catch(() => undefined);
  });

  const runs = await runPlan(
    plan,
    async (program) => {
      if (signal?.aborted) throw new Error("Run cancelled.");
      const id = randomUUID();
      running.add(id);
      const step = plan.find((s) => s.program === program);
      log(`  ▶ ${step?.name ?? "program"} started`);
      try {
        return await backend.run(program, { id, signal });
      } finally {
        running.delete(id);
      }
    },
    options.maxParallel ?? backend.maxParallel,
  );

  return runs.map((run) => {
    const analysis = analyses[run.step.index];
    const result: FileRun = {
      name: run.step.name,
      label: labelOf(run.step.index),
      status: run.status,
      dependsOn: run.step.dependsOn,
      readsFromUpstream: run.step.readsFromUpstream,
      writes: (analysis?.outputBinds ?? []).map((bind) => `${bind.path}.${bind.table}`),
      program: run.step.program,
      evaluation: run.result,
      message: run.message,
      startedAfterMs: run.startedAfterMs,
      elapsedMs: run.elapsedMs,
    };
    const seconds = (result.elapsedMs / 1000).toFixed(1);
    log(
      `  ${result.status === "succeeded" ? "✔" : result.status === "failed" ? "✖" : "–"} ${result.name}: ${result.status}` +
        (result.status === "skipped" ? "" : ` in ${seconds}s`) +
        (result.message ? ` (${result.message})` : ""),
    );
    return result;
  });
}

function rowCount(evaluation: Evaluation | undefined): number {
  return Object.values(evaluation?.resultSet ?? {}).reduce(
    (sum, rows) => sum + (Array.isArray(rows) ? rows.length : 0),
    0,
  );
}

/**
 * The Results panel content: a "Programs" table with each file's status, order and timing, then
 * the rows of every @output that came back. Outputs written to a table come back empty: their
 * rows are in the table named in "writes to".
 */
export function resultsMessage(title: string, runs: FileRun[], seconds: number, platform = "Palantir Foundry"): ResultsMessage {
  const count = (status: FileRun["status"]) => runs.filter((run) => run.status === status).length;
  const summary: ResultTable = {
    name: "Programs",
    columns: [
      "program",
      "file",
      "status",
      "runs after",
      "reads from upstream",
      "writes to",
      "rows returned",
      "seconds",
      "message",
    ],
    rows: runs.map((run) => [
      run.name,
      run.label,
      run.status,
      run.dependsOn.join(", "),
      run.readsFromUpstream.join(", "),
      run.writes.join(", "),
      run.status === "succeeded" ? rowCount(run.evaluation) : "",
      run.status === "skipped" ? "" : (run.elapsedMs / 1000).toFixed(1),
      run.message ?? "",
    ]),
  };
  const outputs = runs.flatMap((run) => (run.evaluation ? tablesFromEvaluation(run.evaluation) : []));
  const counts = [
    `${count("succeeded")} succeeded`,
    count("failed") ? `${count("failed")} failed` : "",
    count("skipped") ? `${count("skipped")} skipped` : "",
  ];
  return {
    type: "tables",
    title,
    subtitle: [`on ${platform} in ${seconds.toFixed(1)}s`, counts.filter(Boolean).join(", ")].join(" · "),
    tables:
      runs.length === 1 && outputs.length > 0 && runs[0]?.status === "succeeded" ? outputs : [summary, ...outputs],
  };
}
