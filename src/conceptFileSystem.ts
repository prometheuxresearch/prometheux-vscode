import { type Concept, type JsonObject, type JsonValue, NotFoundError } from "prometheux-chain";
import * as vscode from "vscode";
import { conceptToFile, fileToConcept } from "./conceptFormats";
import { type ConceptStore, conceptUri, parseUri, SCHEME, typeForExtension } from "./concepts";
import type { ComputeManager } from "./compute";
import type { ConnectionManager } from "./connection";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * The editable source of a concept: code without its binds (what the Prometheux editor shows),
 * and for LLM / context concepts their settings too, in the files `px pull` writes.
 */
export function conceptSource(concept: Concept): string {
  return conceptToFile({
    concept_type: concept.concept_type,
    code: concept.parsed?.code,
    concept_config: concept.concept_config,
  });
}

/**
 * A Vadalog concept needs an output atom: the platform only rebuilds `@output`
 * from binds, so append one when there is neither (same rule as `px apply`).
 */
function ensureOutputAtom(definition: string, predicate: string, hasOutputBind: boolean): string {
  if (hasOutputBind || definition.includes("@output") || definition.includes("@qbind")) return definition;
  const body = definition.trimEnd();
  return `${body}${body ? "\n" : ""}\n@output("${predicate}").\n`;
}

function timestamp(value: string | null | undefined): number {
  const parsed = value ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Exposes ontologies as folders and concepts as files under `prometheux:/`,
 * so concepts open in regular editors (with the language server) and saving
 * a file saves the concept on the platform.
 */
export class ConceptFileSystem implements vscode.FileSystemProvider, vscode.Disposable {
  private readonly emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
  readonly onDidChangeFile = this.emitter.event;
  private readonly subscription: vscode.Disposable;

  constructor(
    private readonly connections: ConnectionManager,
    private readonly store: ConceptStore,
    private readonly computes: ComputeManager,
  ) {
    this.subscription = store.onDidChange((ontologyId) => {
      const uri = vscode.Uri.from({ scheme: SCHEME, path: ontologyId ? `/${ontologyId}` : "/" });
      this.emitter.fire([{ type: vscode.FileChangeType.Changed, uri }]);
    });
  }

  watch(): vscode.Disposable {
    return new vscode.Disposable(() => undefined);
  }

  async stat(uri: vscode.Uri): Promise<vscode.FileStat> {
    const { ontologyId, concept } = parseUri(uri);
    if (!ontologyId) {
      if (uri.path === "/" || uri.path === "") return { type: vscode.FileType.Directory, ctime: 0, mtime: 0, size: 0 };
      throw vscode.FileSystemError.FileNotFound(uri);
    }
    if (!concept) {
      const ontologies = await this.store.listOntologies();
      const ontology = ontologies.find((candidate) => candidate.id === ontologyId);
      if (!ontology) throw vscode.FileSystemError.FileNotFound(uri);
      return {
        type: vscode.FileType.Directory,
        ctime: timestamp(ontology.created_at),
        mtime: timestamp(ontology.updated_at),
        size: 0,
      };
    }
    const found = await this.store.findConcept(ontologyId, concept.conceptName);
    if (!found) throw vscode.FileSystemError.FileNotFound(uri);
    return {
      type: vscode.FileType.File,
      ctime: timestamp(found.timestamp),
      mtime: timestamp(found.timestamp),
      size: encoder.encode(conceptSource(found)).length,
      permissions: found.read_only ? vscode.FilePermission.Readonly : undefined,
    };
  }

  async readDirectory(uri: vscode.Uri): Promise<[string, vscode.FileType][]> {
    const { ontologyId, concept } = parseUri(uri);
    if (concept) throw vscode.FileSystemError.FileNotADirectory(uri);
    if (!ontologyId) {
      return (await this.store.listOntologies()).map((ontology) => [ontology.id, vscode.FileType.Directory]);
    }
    return (await this.store.listConcepts(ontologyId)).map((found) => [
      conceptUri(ontologyId, found.predicate_name, found.concept_type).path.split("/").pop()!,
      vscode.FileType.File,
    ]);
  }

  async readFile(uri: vscode.Uri): Promise<Uint8Array> {
    const { concept } = parseUri(uri);
    if (!concept) throw vscode.FileSystemError.FileIsADirectory(uri);
    const found = await this.store.findConcept(concept.ontologyId, concept.conceptName);
    if (!found) throw vscode.FileSystemError.FileNotFound(uri);
    return encoder.encode(conceptSource(found));
  }

  async writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { readonly create: boolean; readonly overwrite: boolean },
  ): Promise<void> {
    const { concept } = parseUri(uri);
    if (!concept) throw vscode.FileSystemError.NoPermissions("Only concepts can be saved.");
    const existing = await this.store.findConcept(concept.ontologyId, concept.conceptName);
    if (!existing && !options.create) throw vscode.FileSystemError.FileNotFound(uri);
    if (existing && !options.overwrite) throw vscode.FileSystemError.FileExists(uri);
    if (existing?.read_only) throw vscode.FileSystemError.NoPermissions("This concept is read-only.");

    // Same write contract as the product editor and `px apply`: the body goes
    // in `definition`, the concept's existing binds are sent back unchanged.
    const name = concept.conceptName;
    const conceptType = existing?.concept_type ?? typeForExtension(concept.ext);
    const binds = existing?.parsed?.binds;
    const hasBinds = !!binds && (binds.input.length > 0 || binds.output.length > 0);
    let parsed: ReturnType<typeof fileToConcept>;
    try {
      parsed = fileToConcept(conceptType, decoder.decode(content));
    } catch (error) {
      throw vscode.FileSystemError.NoPermissions(error instanceof Error ? error.message : String(error));
    }
    const { definition, conceptConfig } = parsed;
    await this.connections.requireClient().concepts.save(concept.ontologyId, {
      definition:
        conceptType === "logic" ? ensureOutputAtom(definition, name, !!binds?.output.length) : definition,
      conceptType,
      conceptConfig: conceptConfig as JsonObject | undefined,
      conceptName: name,
      outputPredicate: name,
      binds: hasBinds ? (binds as unknown as JsonValue) : undefined,
      description: existing?.description ?? undefined,
      group: existing?.group || undefined,
      position: existing?.position ?? undefined,
      existingName: existing ? name : undefined,
      forceOverwrite: !!existing,
      compute: this.computes.compute(),
    });
    this.store.invalidate(concept.ontologyId);
    this.emitter.fire([
      { type: existing ? vscode.FileChangeType.Changed : vscode.FileChangeType.Created, uri },
    ]);
  }

  async delete(uri: vscode.Uri): Promise<void> {
    const { concept } = parseUri(uri);
    if (!concept) throw vscode.FileSystemError.NoPermissions("Delete ontologies from the Prometheux app.");
    try {
      await this.connections.requireClient().concepts.delete(concept.ontologyId, [concept.conceptName]);
    } catch (error) {
      if (error instanceof NotFoundError) throw vscode.FileSystemError.FileNotFound(uri);
      throw error;
    }
    this.store.invalidate(concept.ontologyId);
    this.emitter.fire([{ type: vscode.FileChangeType.Deleted, uri }]);
  }

  async rename(oldUri: vscode.Uri, newUri: vscode.Uri): Promise<void> {
    const from = parseUri(oldUri).concept;
    const to = parseUri(newUri).concept;
    if (!from || !to || from.ontologyId !== to.ontologyId || from.ext !== to.ext) {
      throw vscode.FileSystemError.NoPermissions("Concepts can only be renamed inside their ontology.");
    }
    await this.connections.requireClient().concepts.rename(from.ontologyId, from.conceptName, to.conceptName);
    this.store.invalidate(from.ontologyId);
    this.emitter.fire([
      { type: vscode.FileChangeType.Deleted, uri: oldUri },
      { type: vscode.FileChangeType.Created, uri: newUri },
    ]);
  }

  createDirectory(): void {
    throw vscode.FileSystemError.NoPermissions("Create ontologies with 'Prometheux: New Ontology'.");
  }

  dispose(): void {
    this.subscription.dispose();
    this.emitter.dispose();
  }
}
