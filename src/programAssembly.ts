// Rebuilds the program for a concept downloaded with `px pull`, from its body
// file and the other concepts of its ontology. Mirrors jarvispy's
// VadalogConceptExecutor.execute_step_by_step (@param, upstream binds, own
// input binds, the definition, @model / @post / @mapping, @output), with one
// difference: the local files take priority. An upstream concept that has a
// local Vadalog body is inlined (recursively) instead of read from its stored
// platform results; only upstream concepts without a local Vadalog body (SQL,
// Python, ...) are read from the platform.
// The concept's own output bind is never included: evaluating a local copy
// must not overwrite the results stored on the platform.
// No `vscode` imports: unit-testable and pure.

/** The parts of a concept's `.meta.yaml` the assembly needs. */
export interface ConceptMeta {
  outputPredicate: string;
  conceptType?: string;
  annotations?: {
    bind_annotations?: { input?: unknown[]; output?: unknown };
    param_annotations?: unknown;
    model_annotation?: unknown;
    post_annotations?: unknown;
    mapping_annotations?: unknown;
  };
}

/** A concept of the ontology: its meta, and its body when it is a local Vadalog file. */
export interface LocalConcept {
  meta: ConceptMeta;
  body?: string;
}

export interface AssembledProgram {
  program: string;
  /** Upstream concepts inlined from their local files. */
  local: string[];
  /** Upstream concepts read from their stored platform results. */
  upstream: string[];
  /** Upstream concepts with neither a local Vadalog body nor a stored output bind. */
  unresolved: string[];
  /** Helper predicates renamed to avoid clashes between inlined concepts. */
  renamed: string[];
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function withDot(line: string): string {
  const trimmed = line.trim();
  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
}

function bindPredicate(annotation: string): string | undefined {
  return /@q?bind\(\s*"([^"]+)"/.exec(annotation)?.[1];
}

function lines(value: unknown): string[] {
  return text(value)
    .split("\n")
    .filter((line) => line.trim())
    .map(withDot);
}

/** Splits a program into statements, ignoring `%` comments and dots inside strings or numbers. */
export function statements(source: string): string[] {
  const out: string[] = [];
  let current = "";
  let inString = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (inString) {
      current += char;
      if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      current += char;
    } else if (char === "%") {
      while (i < source.length && source[i] !== "\n") i++;
      current += "\n";
    } else if (char === "." && !/[0-9]/.test(source[i + 1] ?? "") && (/\s/.test(source[i + 1] ?? " ") || i === source.length - 1)) {
      if (current.trim()) out.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

const ATOM = /(?<![A-Za-z0-9_#@$])([a-z][A-Za-z0-9_]*)\s*\(/g;
const SQL_TABLE = /\b(?:from|join)\s+([a-z][A-Za-z0-9_]*)/gi;

/** Predicates a program defines (rule heads and facts) and the ones its rule bodies read. */
export function predicates(source: string): { heads: Set<string>; body: Set<string> } {
  const heads = new Set<string>();
  const body = new Set<string>();
  for (const statement of statements(source)) {
    if (statement.startsWith("@")) continue;
    const arrow = /:-|<-/.exec(statement);
    const head = arrow ? statement.slice(0, arrow.index) : statement;
    for (const match of head.matchAll(ATOM)) heads.add(match[1]);
    if (!arrow) continue;
    const rest = statement.slice(arrow.index + 2);
    for (const match of rest.matchAll(ATOM)) body.add(match[1]);
    if (arrow[0] === "<-") for (const match of rest.matchAll(SQL_TABLE)) body.add(match[1]);
  }
  return { heads, body };
}

/**
 * Renames predicates in a program, outside strings and comments: atoms
 * (`name(`), and table names after FROM / JOIN in SQL rule bodies.
 */
export function renamePredicates(source: string, renames: Map<string, string>): string {
  if (!renames.size) return source;
  let out = "";
  let i = 0;
  while (i < source.length) {
    const char = source[i];
    if (char === '"') {
      const end = source.indexOf('"', i + 1);
      const stop = end < 0 ? source.length : end + 1;
      out += source.slice(i, stop);
      i = stop;
    } else if (char === "%") {
      const end = source.indexOf("\n", i);
      const stop = end < 0 ? source.length : end;
      out += source.slice(i, stop);
      i = stop;
    } else if (/[a-z]/.test(char) && !/[A-Za-z0-9_#@$]/.test(source[i - 1] ?? "")) {
      const name = /^[a-z][A-Za-z0-9_]*/.exec(source.slice(i))![0];
      const after = source.slice(i + name.length);
      const before = out.slice(-16).toLowerCase();
      const isAtom = /^\s*\(/.test(after);
      const isTable = /(?:from|join)\s+$/.test(before);
      out += renames.has(name) && (isAtom || isTable) ? renames.get(name)! : name;
      i += name.length;
    } else {
      out += char;
      i++;
    }
  }
  return out;
}

/** Index just past the `)` closing the `(` at `open`, skipping strings and nested brackets. */
function closing(source: string, open: number): { end: number; arity: number } {
  let depth = 0;
  let commas = 0;
  let empty = true;
  for (let i = open; i < source.length; i++) {
    const char = source[i];
    if (char === '"') {
      const end = source.indexOf('"', i + 1);
      i = end < 0 ? source.length : end;
      empty = false;
      continue;
    }
    if (char === "(" || char === "[" || char === "{") depth++;
    else if (char === ")" || char === "]" || char === "}") {
      depth--;
      if (depth === 0) return { end: i + 1, arity: empty ? 0 : commas + 1 };
    } else if (char === "," && depth === 1) commas++;
    else if (depth === 1 && !/\s/.test(char)) empty = false;
  }
  return { end: source.length, arity: empty ? 0 : commas + 1 };
}

/**
 * Rewrites atom names outside strings and comments. `rename(name, arity)`
 * returns the new name, or undefined to keep it.
 */
export function rewriteAtoms(source: string, rename: (name: string, arity: number) => string | undefined): string {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const char = source[i];
    if (char === '"' || char === "%") {
      const end = char === '"' ? source.indexOf('"', i + 1) : source.indexOf("\n", i);
      const stop = end < 0 ? source.length : char === '"' ? end + 1 : end;
      out += source.slice(i, stop);
      i = stop;
      continue;
    }
    const match = /^[a-z][A-Za-z0-9_]*/.exec(source.slice(i));
    if (match && !/[A-Za-z0-9_#@$]/.test(source[i - 1] ?? "")) {
      const name = match[0];
      const open = source.slice(i + name.length).search(/\S/) + i + name.length;
      if (source[open] === "(") {
        out += rename(name, closing(source, open).arity) ?? name;
      } else {
        out += name;
      }
      i += name.length;
      continue;
    }
    out += char;
    i++;
  }
  return out;
}

/** Arities of each predicate used as an atom in a program. */
export function arities(source: string): Map<string, Set<number>> {
  const found = new Map<string, Set<number>>();
  rewriteAtoms(source, (name, arity) => {
    if (!found.has(name)) found.set(name, new Set());
    found.get(name)!.add(arity);
    return undefined;
  });
  return found;
}

interface Part {
  name: string;
  meta: ConceptMeta;
  body: string;
  heads: Set<string>;
  read: Set<string>;
}

/**
 * The program to evaluate for a downloaded concept. `concepts` maps every
 * concept of the ontology (by output predicate) to its meta and, when it is a
 * local Vadalog file, its body.
 */
export function assembleConceptProgram(
  body: string,
  meta: ConceptMeta,
  concepts: Map<string, LocalConcept>,
): AssembledProgram {
  const target = meta.outputPredicate;
  const parts: Part[] = [];
  const upstream: string[] = [];
  const unresolved: string[] = [];
  const upstreamBinds: string[] = [];
  const visited = new Set<string>();

  // Depth-first, so an inlined concept's dependencies come before it.
  const visit = (name: string, conceptMeta: ConceptMeta, conceptBody: string) => {
    visited.add(name);
    const { heads, body: read } = predicates(conceptBody);
    for (const dependency of [...read].sort()) {
      if (dependency === name || heads.has(dependency) || visited.has(dependency)) continue;
      const found = concepts.get(dependency);
      if (!found) continue;
      if (found.body !== undefined) {
        visit(dependency, found.meta, found.body);
        continue;
      }
      visited.add(dependency);
      const output = text(found.meta.annotations?.bind_annotations?.output);
      if (output) {
        upstream.push(dependency);
        upstreamBinds.push(withDot(output));
      } else {
        unresolved.push(dependency);
      }
    }
    parts.push({ name, meta: conceptMeta, body: conceptBody, heads, read });
  };
  visit(target, meta, body);

  // Helpers (non-output heads) defined by more than one inlined concept, or
  // named like another concept, are renamed in the upstream concepts.
  const owners = new Map<string, number>();
  for (const part of parts) for (const head of part.heads) owners.set(head, (owners.get(head) ?? 0) + 1);
  const renamed: string[] = [];
  for (const part of parts) {
    if (part.name === target) continue;
    const renames = new Map<string, string>();
    for (const head of part.heads) {
      if (head === part.name) continue;
      if ((owners.get(head) ?? 0) > 1 || concepts.has(head)) {
        renames.set(head, `${part.name}__${head}`);
        renamed.push(`${head} (in ${part.name})`);
      }
    }
    part.body = renamePredicates(part.body, renames);
  }

  // A stored table can be read through its first columns only
  // (`transaction(Id, Src, Dst)` of an 11-column concept); once inlined as
  // rules that is a different predicate. Readers using fewer arguments get an
  // adapter that projects the leading columns.
  const adapters: string[] = [];
  for (const upstreamPart of parts.slice(0, -1)) {
    const own = [...(arities(upstreamPart.body).get(upstreamPart.name) ?? [])];
    if (own.length !== 1) continue;
    const width = own[0];
    for (const reader of parts) {
      if (reader === upstreamPart) continue;
      const narrower = [...(arities(reader.body).get(upstreamPart.name) ?? [])].filter((arity) => arity < width);
      if (!narrower.length) continue;
      reader.body = rewriteAtoms(reader.body, (name, arity) =>
        name === upstreamPart.name && arity < width ? `${name}__${arity}` : undefined,
      );
      for (const arity of narrower) {
        const vars = Array.from({ length: arity }, (_, index) => `A${index + 1}`);
        const rest = Array.from({ length: width - arity }, () => "_");
        const adapter = `${upstreamPart.name}__${arity}(${vars.join(", ")}) :- ${upstreamPart.name}(${[...vars, ...rest].join(", ")}).`;
        if (!adapters.includes(adapter)) adapters.push(adapter);
      }
    }
  }

  // Input binds of every inlined concept, deduplicated; binds for predicates a
  // part defines, or for concepts that are inlined, are dropped.
  const inlined = new Set(parts.map((part) => part.name));
  const inputBinds: string[] = [];
  const bound = new Set<string>();
  for (const part of parts) {
    for (const line of lines((part.meta.annotations?.bind_annotations?.input ?? []).map(text).join("\n"))) {
      const predicate = bindPredicate(line) ?? "";
      if (part.heads.has(predicate) || inlined.has(predicate) || inputBinds.includes(line)) continue;
      if (bound.has(predicate)) continue;
      bound.add(predicate);
      inputBinds.push(line);
    }
  }

  const params = new Set<string>();
  const annotationsOf = (key: "model_annotation" | "mapping_annotations") =>
    parts.flatMap((part) => lines(part.meta.annotations?.[key]));
  for (const part of parts) for (const line of lines(part.meta.annotations?.param_annotations)) params.add(line);
  for (const name of upstream) for (const line of lines(concepts.get(name)?.meta.annotations?.param_annotations)) params.add(line);

  const targetBody = parts.at(-1)!.body;
  const trailing = [
    ...annotationsOf("model_annotation"),
    // @post shapes the materialized output, so only the target's applies.
    ...lines(meta.annotations?.post_annotations),
    ...annotationsOf("mapping_annotations"),
  ];
  const hasOutput = /@output\(\s*"/.test(targetBody);

  const sections = [
    [...params].join("\n"),
    upstreamBinds.join("\n"),
    inputBinds.join("\n"),
    ...parts.slice(0, -1).map((part) => `% ${part.name} (local)\n${part.body.trim()}`),
    adapters.length ? `% leading columns of local concepts\n${adapters.join("\n")}` : "",
    targetBody.trim(),
    [...new Set(trailing)].join("\n"),
    hasOutput ? "" : `@output("${target}").`,
  ].filter(Boolean);

  return {
    program: `${sections.join("\n\n")}\n`,
    local: parts.slice(0, -1).map((part) => part.name),
    upstream,
    unresolved,
    renamed,
  };
}
