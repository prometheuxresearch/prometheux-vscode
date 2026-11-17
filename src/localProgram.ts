import * as path from "node:path";
import * as vscode from "vscode";
import { parse as parseYaml } from "yaml";
import { isInside, type LocalExplorer } from "./localExplorer";
import { assembleConceptProgram, type ConceptMeta, type LocalConcept } from "./programAssembly";

/** Hides credential values in bind options (password, secret / access keys, tokens). */
export function maskSecrets(program: string): string {
  return program.replace(/\b([A-Za-z0-9]*(?:password|secret|key|token)[A-Za-z0-9]*\s*=\s*)'[^']*'/gi, "$1'***'");
}

export interface PreparedProgram {
  program: string;
  /** Shown next to the results, e.g. which upstream data was read. */
  note?: string;
}

/** A file's text, from its open editor when there is one (unsaved edits count). */
async function readText(uri: vscode.Uri): Promise<string | undefined> {
  const open = vscode.workspace.textDocuments.find((document) => document.uri.toString() === uri.toString());
  if (open) return open.getText();
  try {
    return new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
  } catch {
    return undefined;
  }
}

async function readMeta(uri: vscode.Uri): Promise<ConceptMeta | undefined> {
  try {
    const meta = parseYaml(new TextDecoder().decode(await vscode.workspace.fs.readFile(uri)));
    return typeof meta?.outputPredicate === "string" ? meta : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The program to evaluate for a file. A concept of a downloaded ontology gets
 * its binds and annotations back from the `.meta.yaml` files (see
 * programAssembly.ts); any other file is evaluated as written.
 */
export async function prepareProgram(
  uri: vscode.Uri,
  text: string,
  local: LocalExplorer,
  output: vscode.OutputChannel,
): Promise<PreparedProgram> {
  if (uri.scheme !== "file") return { program: text };
  const { ontologies } = await local.contents();
  const ontology = ontologies.find((candidate) => isInside(uri, candidate.conceptsDir));
  if (!ontology) return { program: text };

  const base = path.posix.basename(uri.path);
  const name = base.slice(0, base.indexOf(".") < 0 ? undefined : base.indexOf("."));
  const own = await readMeta(vscode.Uri.joinPath(ontology.conceptsDir, `${name}.meta.yaml`));
  if (!own) return { program: text };

  // Every concept of the ontology; Vadalog ones with their local body, which
  // takes priority over the results stored on the platform.
  const files = new Set((await vscode.workspace.fs.readDirectory(ontology.conceptsDir)).map(([file]) => file));
  const concepts = new Map<string, LocalConcept>();
  for (const file of files) {
    if (!file.endsWith(".meta.yaml")) continue;
    const meta = await readMeta(vscode.Uri.joinPath(ontology.conceptsDir, file));
    if (!meta) continue;
    const bodyFile = [`${meta.outputPredicate}.vadalog`, `${meta.outputPredicate}.vada`].find((candidate) => files.has(candidate));
    const isVadalog = !meta.conceptType || meta.conceptType === "logic";
    const body = bodyFile && isVadalog ? await readText(vscode.Uri.joinPath(ontology.conceptsDir, bodyFile)) : undefined;
    concepts.set(meta.outputPredicate, { meta, body });
  }

  const assembled = assembleConceptProgram(text, own, concepts);
  output.appendLine(`Assembled ${own.outputPredicate} from ${vscode.workspace.asRelativePath(ontology.dir)}:`);
  output.appendLine(maskSecrets(assembled.program));

  const notes: string[] = [];
  if (assembled.local.length) notes.push(`uses local ${assembled.local.join(", ")}`);
  if (assembled.upstream.length) notes.push(`reads ${assembled.upstream.join(", ")} from their platform results`);
  if (assembled.renamed.length) output.appendLine(`Renamed clashing helper predicates: ${assembled.renamed.join(", ")}`);
  if (assembled.unresolved.length) {
    notes.push(`no stored output for ${assembled.unresolved.join(", ")}: run them on the platform first`);
  }
  return { program: assembled.program, note: notes.join(" · ") || undefined };
}
