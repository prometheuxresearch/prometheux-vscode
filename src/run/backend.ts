// What running local Vadalog files needs from a platform. The active account picks the
// implementation: Prometheux (through the SDK) or Palantir Foundry (through the gateway's
// compute-module functions). No `vscode` import: the unit tests bundle this file.
import type { Compute, Prometheux } from "prometheux-chain";
import type { Platform } from "../accounts/model";
import { type Evaluation, FoundryClient, type FoundrySettings } from "../foundry/client";
import type { ProgramAnalysis } from "./programPlan";

export type { Evaluation };

export interface Backend {
  platform: Platform;
  // Shown in results, e.g. "on Palantir Foundry".
  label: string;
  // How many programs may run at once by default.
  maxParallel: number;
  analyze(program: string, signal?: AbortSignal): Promise<ProgramAnalysis>;
  run(program: string, options?: { id?: string; signal?: AbortSignal }): Promise<Evaluation>;
  // Undefined when the program parses, the engine's message otherwise.
  validate(program: string, signal?: AbortSignal): Promise<string | undefined>;
  stop?(id: string): Promise<void>;
}

/** Removes `%` comments, leaving strings alone. */
function stripComments(program: string): string {
  return program.replace(/("(?:[^"\\]|\\.)*")|%[^\n]*/g, (match, string: string | undefined) => string ?? "");
}

const STRING = String.raw`"((?:[^"\\]|\\.)*)"`;

/** The @output predicates and @bind annotations a program declares. */
export function annotations(program: string): Pick<ProgramAnalysis, "outputs" | "inputBinds" | "outputBinds"> {
  const text = stripComments(program);
  const outputs = [...text.matchAll(new RegExp(String.raw`@output\(\s*${STRING}\s*\)`, "g"))].map((m) => m[1] ?? "");
  const binds = [
    ...text.matchAll(new RegExp(String.raw`@bind\(\s*${STRING}\s*,\s*${STRING}\s*,\s*${STRING}\s*,\s*${STRING}\s*\)`, "g")),
  ].map((m) => ({ predicate: m[1] ?? "", datasourceType: m[2] ?? "", path: m[3] ?? "", table: m[4] ?? "" }));
  return {
    outputs,
    inputBinds: binds.filter((bind) => !outputs.includes(bind.predicate)),
    outputBinds: binds.filter((bind) => outputs.includes(bind.predicate)),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export class FoundryBackend implements Backend {
  readonly platform = "foundry" as const;
  readonly label = "Palantir Foundry";
  readonly maxParallel = 4;
  private readonly client: FoundryClient;

  constructor(settings: FoundrySettings, fetchImpl?: typeof fetch) {
    this.client = new FoundryClient(settings, fetchImpl);
  }

  analyze(program: string, signal?: AbortSignal) {
    return this.client.analyze(program, signal);
  }
  run(program: string, options: { id?: string; signal?: AbortSignal } = {}) {
    return this.client.run(program, options.id, options.signal);
  }
  validate(program: string, signal?: AbortSignal) {
    return this.client.validate(program, signal);
  }
  stop(id: string) {
    return this.client.stop(id);
  }
}

/**
 * Prometheux through the SDK. The engine answers ENGINE_BUSY to concurrent runs, so programs run
 * one at a time.
 */
export class PrometheuxBackend implements Backend {
  readonly platform = "prometheux" as const;
  readonly label = "Prometheux";
  readonly maxParallel = 1;

  constructor(
    private readonly client: Prometheux,
    private readonly compute: () => Compute | undefined = () => undefined,
  ) {}

  async analyze(program: string, signal?: AbortSignal): Promise<ProgramAnalysis> {
    const analysis = await this.client.vadalog.analyze(program, undefined, { signal });
    return { program, inputs: analysis.inputPredicates, ...annotations(program) };
  }

  async run(program: string, options: { signal?: AbortSignal } = {}): Promise<Evaluation> {
    const result = await this.client.vadalog.evaluate(program, { compute: this.compute() }, { signal: options.signal });
    const source = isRecord(result) && isRecord(result.evaluation_results) ? result.evaluation_results : result;
    return (isRecord(source) ? source : {}) as Evaluation;
  }

  async validate(program: string, signal?: AbortSignal): Promise<string | undefined> {
    const result = await this.client.vadalog.validate(program, { conceptType: "logic" }, { signal });
    return result.valid ? undefined : (result.error ?? "The program is not valid.");
  }
}
