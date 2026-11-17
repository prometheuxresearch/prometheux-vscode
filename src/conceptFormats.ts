// How each concept type looks as a file, in the same formats `px pull` writes, so a concept
// opened from the Platform view and a downloaded one read the same. No `vscode` import: the
// unit tests bundle this file.
//
//   logic   <name>.vada          the rules
//   sql     <name>.sql           the query
//   cypher  <name>.cypher        the query
//   python  <name>.py            the script (defines main(params))
//   llm     <name>.llm.md        YAML front matter (llmConfig: output_columns, provider, model, …)
//                                then the prompt template, with {{concept}} placeholders
//   context <name>.context.yaml  contextMode static (noteIds) or dynamic (query, top_k, kinds)
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

export type ConceptKind = "logic" | "sql" | "cypher" | "python" | "llm" | "context";

export const CONCEPT_KINDS: { kind: ConceptKind; label: string; suffix: string; detail: string }[] = [
  { kind: "logic", label: "Logic", suffix: "vada", detail: "Vadalog rules" },
  { kind: "sql", label: "SQL", suffix: "sql", detail: "A SQL query" },
  { kind: "cypher", label: "Cypher", suffix: "cypher", detail: "A Cypher query" },
  { kind: "python", label: "Python", suffix: "py", detail: "A script whose main(params) returns the rows" },
  { kind: "context", label: "Context", suffix: "context.yaml", detail: "Context notes, pinned or found by a query" },
  { kind: "llm", label: "LLM", suffix: "llm.md", detail: "A prompt over other concepts, answered by a model" },
];

/** The file suffix of a concept type ("txt" for a type this version does not know). */
export function suffixFor(type: string): string {
  return CONCEPT_KINDS.find((entry) => entry.kind === type)?.suffix ?? "txt";
}

/** The concept type of a file suffix; "logic" when unknown. */
export function kindForSuffix(suffix: string): ConceptKind {
  return CONCEPT_KINDS.find((entry) => entry.suffix === suffix)?.kind ?? "logic";
}

/** Splits `name.llm.md` / `name.vada` into the concept name and its suffix (longest suffix wins). */
export function splitConceptFile(file: string): { name: string; suffix: string } | undefined {
  const known = CONCEPT_KINDS.map((entry) => entry.suffix).sort((a, b) => b.length - a.length);
  const suffix = known.find((candidate) => file.endsWith(`.${candidate}`) && file.length > candidate.length + 1);
  if (suffix) return { name: file.slice(0, -(suffix.length + 1)), suffix };
  const dot = file.lastIndexOf(".");
  return dot > 0 ? { name: file.slice(0, dot), suffix: file.slice(dot + 1) } : undefined;
}

type Json = Record<string, unknown>;

function isRecord(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Drops null / undefined values, so files only show what is set. */
function compact(value: Json): Json {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== null && v !== undefined));
}

/** What a concept from the platform needs to become a file. */
export interface StoredConcept {
  concept_type: string;
  // The editable body as the platform returns it (`parsed.code`): Vadalog without binds, the
  // SQL / Cypher query, the Python script, the LLM prompt; empty for context concepts.
  code?: string;
  concept_config?: Json | null;
}

/** The file text of a stored concept. */
export function conceptToFile(concept: StoredConcept): string {
  const config = isRecord(concept.concept_config) ? concept.concept_config : {};
  if (concept.concept_type === "llm") {
    const front = Object.keys(compact(config)).length ? stringifyYaml({ llmConfig: compact(config) }).trimEnd() : "llmConfig: {}";
    return `---\n${front}\n---\n${concept.code ?? ""}`;
  }
  if (concept.concept_type === "context") {
    const dynamic = String(config.mode ?? "static") === "dynamic";
    const data = dynamic
      ? compact({ contextMode: "dynamic", query: config.query ?? "", top_k: config.top_k, kinds: config.kinds })
      : { contextMode: "static", noteIds: Array.isArray(config.note_ids) ? config.note_ids : [] };
    return stringifyYaml(data);
  }
  return concept.code ?? "";
}

/** What saving a file sends: the body, and for llm / context the concept_config. */
export interface ConceptSave {
  definition: string;
  conceptConfig?: Json;
}

/** Splits `---\n<yaml>\n---\n<body>`; text without front matter is all body. */
function frontMatter(text: string): { front: Json; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) return { front: {}, body: text };
  const parsed: unknown = parseYaml(match[1] ?? "");
  return { front: isRecord(parsed) ? parsed : {}, body: match[2] ?? "" };
}

/**
 * Turns a file's text back into what the platform saves. Throws an Error with a message for the
 * editor when the file cannot be saved as that type (an empty prompt, a dynamic context without
 * a query, YAML that does not parse).
 */
export function fileToConcept(kind: string, text: string): ConceptSave {
  if (kind === "llm") {
    const { front, body } = frontMatter(text);
    if (!body.trim()) throw new Error("An LLM concept needs a prompt below the front matter.");
    const llmConfig = isRecord(front.llmConfig) ? front.llmConfig : {};
    return { definition: body, conceptConfig: llmConfig };
  }
  if (kind === "context") {
    let parsed: unknown;
    try {
      parsed = parseYaml(text);
    } catch (error) {
      throw new Error(`The context file is not valid YAML: ${error instanceof Error ? error.message : String(error)}`);
    }
    const data = isRecord(parsed) ? parsed : {};
    const mode = String(data.contextMode ?? "static").trim().toLowerCase();
    if (mode === "dynamic") {
      const query = String(data.query ?? "").trim();
      if (!query) throw new Error("A dynamic context concept needs a query.");
      const config: Json = { mode: "dynamic", query };
      if (data.top_k !== undefined && data.top_k !== null) config.top_k = Number(data.top_k);
      if (Array.isArray(data.kinds) && data.kinds.length) config.kinds = data.kinds.map(String);
      return { definition: "", conceptConfig: config };
    }
    if (mode !== "static") throw new Error(`contextMode must be static or dynamic, not "${mode}".`);
    const ids = data.noteIds ?? data.note_ids ?? [];
    return { definition: "", conceptConfig: { mode: "static", note_ids: Array.isArray(ids) ? ids.map(String) : [] } };
  }
  return { definition: text };
}

/** The starting text of a new concept of each type. */
export function conceptTemplate(kind: ConceptKind, name: string): string {
  switch (kind) {
    case "logic":
      return `% ${name}: describe what this concept means.\n${name}("example").\n\n@output("${name}").\n`;
    case "sql":
      return "SELECT 1 AS example\n";
    case "cypher":
      return "MATCH (n) RETURN n LIMIT 10\n";
    case "python":
      return [
        "def main(params):",
        "    # Return the concept's rows as a list of dicts; the dict keys become the",
        "    # output columns. Declare dependencies in-code (each returns a DataFrame):",
        '    #   df = use_px_concept("other_concept")  # another concept\'s output',
        '    #   rows = use_px_data("my_datasource")   # a connected datasource',
        "    return []",
        "",
      ].join("\n");
    case "llm":
      return [
        "---",
        "llmConfig:",
        "  # Leave output_columns out for a single `response` column.",
        "  output_columns:",
        "    - { name: answer, type: string }",
        "  # provider: anthropic",
        "  # model: claude-sonnet-4-6",
        "---",
        "Answer in one sentence. Use {{other_concept}} to include another concept's rows.",
        "",
      ].join("\n");
    case "context":
      return [
        "# static: the notes listed in noteIds. dynamic: the notes a query finds, on every run.",
        "contextMode: dynamic",
        `query: ${name.replace(/_/g, " ")}`,
        "top_k: 5",
        "",
      ].join("\n");
  }
}
