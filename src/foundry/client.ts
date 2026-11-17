// Calls the Prometheux functions a Palantir Foundry compute module exposes (px-engine-gateway's
// compute-module mode), through Foundry's public "execute query" API. No `vscode` import: the
// unit tests bundle this file.
import type { Bind, ProgramAnalysis } from "../run/programPlan";

/**
 * API names of the gateway's functions as registered in Foundry. The suffix is the one the
 * functions were published with (an account's "Function suffix", PX by default).
 */
export function functionNames(suffix = "PX") {
  return {
    run: `run${suffix}`,
    analyze: `analyze${suffix}`,
    validate: `validate${suffix}`,
    stop: `stopEvaluation${suffix}`,
  };
}

export interface FoundrySettings {
  // The Foundry stack, e.g. https://acme.palantirfoundry.com
  url: string;
  token: string;
  // The ontology the functions are registered in: its RID or API name.
  ontology: string;
  functionSuffix?: string;
}

/** Rows of an evaluation, as the engine returns them (`data` of runPX). */
export interface Evaluation {
  resultSet?: Record<string, unknown[]>;
  columnNames?: Record<string, string[]>;
  types?: Record<string, string[]>;
}

export class FoundryError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly code?: string,
  ) {
    super(message);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function binds(value: unknown): Bind[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord).map((b) => ({
    predicate: String(b.predicate ?? ""),
    datasourceType: String(b.datasource_type ?? ""),
    path: String(b.path ?? ""),
    table: String(b.table ?? ""),
  }));
}

/** Foundry's error body is `{errorCode, errorName, parameters}`; make it one readable line. */
function foundryErrorMessage(status: number, body: string): string {
  if (status === 401) return "Foundry rejected the token (401). Sign in to Palantir Foundry again with a fresh token.";
  if (status === 403) return `Foundry denied access (403): ${body.slice(0, 300)}`;
  try {
    const parsed: unknown = JSON.parse(body);
    if (isRecord(parsed)) {
      const name = String(parsed.errorName ?? parsed.errorCode ?? "Error");
      const parameters = isRecord(parsed.parameters) ? JSON.stringify(parsed.parameters) : "";
      return `Foundry ${name} (${status})${parameters && parameters !== "{}" ? `: ${parameters.slice(0, 500)}` : ""}`;
    }
  } catch {
    // Not JSON: show the start of the text.
  }
  return `Foundry answered ${status}: ${body.slice(0, 300)}`;
}

export class FoundryClient {
  private readonly names: ReturnType<typeof functionNames>;

  constructor(
    private readonly settings: FoundrySettings,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {
    this.names = functionNames(settings.functionSuffix);
  }

  /** POST /api/v2/ontologies/{ontology}/queries/{apiName}/execute; returns `value`. */
  async execute(apiName: string, parameters: Record<string, unknown>, signal?: AbortSignal): Promise<unknown> {
    const base = this.settings.url.replace(/\/+$/, "");
    const url = `${base}/api/v2/ontologies/${encodeURIComponent(this.settings.ontology)}/queries/${encodeURIComponent(apiName)}/execute`;
    const response = await this.fetchImpl(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.settings.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ parameters }),
      signal,
    });
    const text = await response.text();
    if (!response.ok) throw new FoundryError(foundryErrorMessage(response.status, text), response.status);
    const parsed: unknown = JSON.parse(text);
    return isRecord(parsed) && "value" in parsed ? parsed.value : parsed;
  }

  /** What a program reads and writes (its predicates and binds), without running it. */
  async analyze(program: string, signal?: AbortSignal): Promise<ProgramAnalysis> {
    const result = await this.execute(this.names.analyze, { program }, signal);
    if (!isRecord(result)) throw new FoundryError("analyze returned an unreadable result");
    if (result.ok !== true)
      throw new FoundryError(
        String(result.message ?? "The program does not parse"),
        undefined,
        String(result.error_code ?? ""),
      );
    return {
      program,
      outputs: strings(result.output_predicates),
      inputs: strings(result.input_predicates),
      inputBinds: binds(result.input_binds),
      outputBinds: binds(result.output_binds),
    };
  }

  /** Checks that a program parses: undefined when it does, the engine's message otherwise. */
  async validate(program: string, signal?: AbortSignal): Promise<string | undefined> {
    const result = await this.execute(this.names.validate, { program }, signal);
    if (!isRecord(result)) throw new FoundryError("validate returned an unreadable result");
    return result.valid === true ? undefined : String(result.message ?? "The program is not valid.");
  }

  /** Evaluates a program; `id` lets `stop` end it. */
  async run(program: string, id?: string, signal?: AbortSignal): Promise<Evaluation> {
    const raw = await this.execute(
      this.names.run,
      { program, measureElapsedTime: "true", ...(id ? { id } : {}) },
      signal,
    );
    const parsed: unknown = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!isRecord(parsed)) throw new FoundryError("The engine returned an unreadable result");
    if (typeof parsed.error === "string") {
      throw new FoundryError(
        `The engine rejected the program (${String(parsed.error_code)}): ${parsed.error}`,
        undefined,
        String(parsed.error_code ?? ""),
      );
    }
    if (!isRecord(parsed.data)) throw new FoundryError("The engine returned no data");
    return parsed.data as Evaluation;
  }

  async stop(id: string): Promise<void> {
    await this.execute(this.names.stop, { id });
  }
}
