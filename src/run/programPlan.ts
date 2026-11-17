// Same planning as the runProgramsPX Foundry function (typescript-functions/src/functions/
// programPlan.ts in the Foundry functions repository), so a folder run here and a runProgramsPX
// call order, link and report programs the same way. Keep the two in step.

/** A problem with the programs themselves, found before anything runs. */
export class PlanError extends Error {}

// Runs a set of Vadalog programs as modules: each program is evaluated by its own engine call,
// a program that reads another program's @output runs after it and reads its Iceberg table, and
// programs that do not depend on each other run at the same time. The engine evaluates one
// program per call and evaluates concurrent calls independently, so this is where the modules
// are ordered and linked.

export interface Bind {
  predicate: string;
  datasourceType: string;
  path: string;
  table: string;
}

/** What the gateway's analyze function (analyzePX) says a program reads and writes. */
export interface ProgramAnalysis {
  program: string;
  // The @output predicates: what the program delivers to other programs and to the caller.
  outputs: string[];
  // Predicates the rules read but never derive: facts, binds, or other programs' outputs.
  inputs: string[];
  inputBinds: Bind[];
  outputBinds: Bind[];
}

export interface PlannedProgram {
  // The program's first @output predicate; other programs are named by it in messages.
  name: string;
  // Position of the program in the caller's list.
  index: number;
  // Names of the programs this one reads from; it runs after all of them.
  dependsOn: string[];
  // Predicates read from upstream programs whose @bind (and @model) were added to this program.
  readsFromUpstream: string[];
  // The program as sent to the engine, with the upstream binds at the top.
  program: string;
}

export const UPSTREAM_HEADER = "% ========== READ FROM UPSTREAM PROGRAMS (added by Prometheux) ==========";

function quoted(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function bindAnnotation({ predicate, datasourceType, path, table }: Bind): string {
  return `@bind(${[predicate, datasourceType, path, table].map(quoted).join(", ")}).`;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The @model annotation a program declares for a predicate, as written, if it has one. */
export function modelAnnotation(program: string, predicate: string): string | undefined {
  const stringLiteral = String.raw`"(?:[^"\\]|\\.)*"`;
  const pattern = new RegExp(String.raw`@model\(\s*"${escapeRegExp(predicate)}"\s*(?:,\s*${stringLiteral}\s*)+\)\s*\.`);
  return pattern.exec(program)?.[0];
}

function nameOf(analysis: ProgramAnalysis, index: number): string {
  const name = analysis.outputs[0];
  if (name === undefined) {
    throw new PlanError(
      `Program ${index + 1} has no @output. Every program must declare what it delivers with @output("...")`,
    );
  }
  return name;
}

/** Which program delivers each @output predicate. Two programs cannot deliver the same one. */
function producers(analyses: ProgramAnalysis[], names: string[]): Map<string, number> {
  const producerOf = new Map<string, number>();
  analyses.forEach((analysis, index) => {
    for (const predicate of analysis.outputs) {
      const other = producerOf.get(predicate);
      if (other !== undefined && other !== index) {
        throw new PlanError(
          `"${predicate}" is an @output of both ${names[other]} and ${names[index]}; ` +
            "give each output predicate to one program only",
        );
      }
      producerOf.set(predicate, index);
    }
  });
  return producerOf;
}

/** Orders the programs so each comes after the ones it reads from; rejects cycles. */
function topologicalOrder(dependsOn: number[][], names: string[]): number[] {
  const remaining = new Map(dependsOn.map((deps, index) => [index, new Set(deps)]));
  const order: number[] = [];
  while (remaining.size > 0) {
    const ready = [...remaining].filter(([, deps]) => deps.size === 0).map(([index]) => index);
    if (ready.length === 0) {
      const cycle = [...remaining.keys()].map((index) => names[index]).join(", ");
      throw new PlanError(`These programs read from each other in a cycle, so none can run first: ${cycle}`);
    }
    for (const index of ready) {
      order.push(index);
      remaining.delete(index);
    }
    for (const deps of remaining.values()) ready.forEach((index) => deps.delete(index));
  }
  return order;
}

/**
 * Plans the run: names each program, finds which programs it reads from, adds the upstream
 * @bind and @model for each predicate it reads from another program, and orders the programs.
 * Everything is checked before anything runs.
 */
export function planPrograms(analyses: ProgramAnalysis[]): PlannedProgram[] {
  if (analyses.length === 0) throw new PlanError("Give at least one program");
  const names = analyses.map(nameOf);
  const producerOf = producers(analyses, names);

  const planned = analyses.map((analysis, index): PlannedProgram & { dependencies: number[] } => {
    const upstream = analysis.inputs
      .map((predicate) => ({ predicate, producer: producerOf.get(predicate) }))
      .filter(
        (read): read is { predicate: string; producer: number } =>
          read.producer !== undefined && read.producer !== index,
      );
    const boundHere = new Set(analysis.inputBinds.map((bind) => bind.predicate));
    const added = upstream.filter(({ predicate }) => !boundHere.has(predicate));

    const header = added.flatMap(({ predicate, producer }) => {
      const source = analyses[producer];
      const bind = source?.outputBinds.find((b) => b.predicate === predicate);
      if (source === undefined || bind === undefined) {
        throw new PlanError(
          `${names[index]} reads "${predicate}" from ${names[producer]}, but ${names[producer]} ` +
            `does not write it anywhere. Add @bind("${predicate}", "iceberg", ...) to ` +
            `${names[producer]} so ${names[index]} has a table to read`,
        );
      }
      const model = modelAnnotation(source.program, predicate);
      return [bindAnnotation(bind), ...(model === undefined ? [] : [model])];
    });

    const dependencies = [...new Set(upstream.map(({ producer }) => producer))];
    return {
      name: names[index] ?? "",
      index,
      dependencies,
      dependsOn: dependencies.map((producer) => names[producer] ?? ""),
      readsFromUpstream: added.map(({ predicate }) => predicate),
      program: header.length === 0 ? analysis.program : [UPSTREAM_HEADER, ...header, "", analysis.program].join("\n"),
    };
  });

  const order = topologicalOrder(
    planned.map((p) => p.dependencies),
    names,
  );
  return order.flatMap((index) => {
    const step = planned[index];
    if (step === undefined) return [];
    const { dependencies: _dependencies, ...rest } = step;
    return [rest];
  });
}

export type RunStatus = "succeeded" | "failed" | "skipped";

export interface ProgramRun<T> {
  step: PlannedProgram;
  status: RunStatus;
  result?: T;
  // Why the program failed, or which upstream program failed when it was skipped.
  message?: string;
  // When the engine call started, counted from the start of the whole run, and how long it took.
  startedAfterMs: number;
  elapsedMs: number;
}

/** Lets at most `limit` engine calls run at once; the others wait their turn. */
function limiter(limit: number): <T>(task: () => Promise<T>) => Promise<T> {
  let running = 0;
  const waiting: (() => void)[] = [];
  return async <T>(task: () => Promise<T>): Promise<T> => {
    if (running >= limit) await new Promise<void>((resolve) => waiting.push(resolve));
    running++;
    try {
      return await task();
    } finally {
      running--;
      waiting.shift()?.();
    }
  };
}

export const DEFAULT_MAX_PARALLEL = 4;

/**
 * Runs the planned programs: each starts as soon as the programs it reads from have succeeded,
 * with at most `maxParallel` engine calls at once (null or missing: DEFAULT_MAX_PARALLEL). A failed program does not stop the others;
 * the programs that read from it are skipped. Results come back in plan order.
 */
export async function runPlan<T>(
  plan: PlannedProgram[],
  run: (program: string) => Promise<T>,
  maxParallel?: number | null,
  now: () => number = Date.now,
): Promise<ProgramRun<T>[]> {
  // Live preview and other callers send null for an empty optional input.
  const limit = maxParallel ?? DEFAULT_MAX_PARALLEL;
  if (!Number.isInteger(limit) || limit < 1) {
    throw new PlanError("maxParallel must be a whole number of at least 1");
  }
  const start = now();
  const slot = limiter(limit);
  const runs = new Map<string, Promise<ProgramRun<T>>>();

  const runStep = async (step: PlannedProgram): Promise<ProgramRun<T>> => {
    const upstream = await Promise.all(step.dependsOn.map((name) => runs.get(name)));
    const failed = upstream.filter((r) => r === undefined || r.status !== "succeeded");
    if (failed.length > 0) {
      const names = failed.map((r) => r?.step.name ?? "an unknown program").join(", ");
      return {
        step,
        status: "skipped",
        message: `Not run: ${names} did not succeed`,
        startedAfterMs: now() - start,
        elapsedMs: 0,
      };
    }
    return slot(async () => {
      const startedAt = now();
      const outcome = await run(step.program).then(
        (result) => ({ status: "succeeded" as const, result }),
        (error: unknown) => ({
          status: "failed" as const,
          message: error instanceof Error ? error.message : String(error),
        }),
      );
      return { step, ...outcome, startedAfterMs: startedAt - start, elapsedMs: now() - startedAt };
    });
  };

  for (const step of plan) runs.set(step.name, runStep(step));
  return Promise.all(plan.map((step) => runs.get(step.name) ?? runStep(step)));
}
