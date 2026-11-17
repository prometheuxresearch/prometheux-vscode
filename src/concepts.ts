import type { Concept, ConceptType, Ontology } from "prometheux-chain";
import * as vscode from "vscode";
import { kindForSuffix, splitConceptFile, suffixFor } from "./conceptFormats";
import type { ConnectionManager } from "./connection";

/** URI scheme of concepts opened from the platform: `prometheux:/<ontologyId>/<concept>.<ext>`. */
export const SCHEME = "prometheux";

/** The file suffix of a concept type: vada, sql, cypher, py, llm.md, context.yaml. */
export function extensionFor(type: ConceptType): string {
  return suffixFor(type);
}

export function typeForExtension(ext: string): ConceptType {
  return kindForSuffix(ext);
}

export function conceptUri(ontologyId: string, conceptName: string, type: ConceptType): vscode.Uri {
  return vscode.Uri.from({ scheme: SCHEME, path: `/${ontologyId}/${conceptName}.${extensionFor(type)}` });
}

export interface ConceptRef {
  ontologyId: string;
  conceptName: string;
  ext: string;
}

/** Splits a `prometheux:` URI into its parts. `conceptName` is absent for an ontology folder. */
export function parseUri(uri: vscode.Uri): { ontologyId?: string; concept?: ConceptRef } {
  const [ontologyId, file, ...rest] = uri.path.split("/").filter(Boolean);
  if (!ontologyId || rest.length) return {};
  if (!file) return { ontologyId };
  const split = splitConceptFile(file);
  if (!split) return { ontologyId };
  return { ontologyId, concept: { ontologyId, conceptName: split.name, ext: split.suffix } };
}

const CACHE_TTL_MS = 5_000;

/**
 * Short-lived cache of ontology and concept listings, shared by the explorer
 * and the file system provider so that opening a concept does not refetch
 * the whole list for every stat / read.
 */
export class ConceptStore implements vscode.Disposable {
  private ontologies: { at: number; value: Promise<Ontology[]> } | undefined;
  private readonly concepts = new Map<string, { at: number; value: Promise<Concept[]> }>();
  private readonly changed = new vscode.EventEmitter<string | undefined>();
  /** Fires with an ontology id when its concepts changed, or `undefined` for everything. */
  readonly onDidChange = this.changed.event;

  constructor(private readonly connections: ConnectionManager) {}

  listOntologies(): Promise<Ontology[]> {
    if (!this.ontologies || Date.now() - this.ontologies.at > CACHE_TTL_MS) {
      const value = this.connections.requireClient().ontologies.list();
      this.ontologies = { at: Date.now(), value };
      value.catch(() => {
        this.ontologies = undefined;
      });
    }
    return this.ontologies.value;
  }

  listConcepts(ontologyId: string): Promise<Concept[]> {
    const cached = this.concepts.get(ontologyId);
    if (cached && Date.now() - cached.at <= CACHE_TTL_MS) return cached.value;
    const value = this.connections
      .requireClient()
      .concepts.list(ontologyId)
      .then((concepts) => [...concepts].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)));
    this.concepts.set(ontologyId, { at: Date.now(), value });
    value.catch(() => this.concepts.delete(ontologyId));
    return value;
  }

  async findConcept(ontologyId: string, conceptName: string): Promise<Concept | undefined> {
    return (await this.listConcepts(ontologyId)).find((concept) => concept.predicate_name === conceptName);
  }

  async ontologyName(ontologyId: string): Promise<string> {
    const ontology = (await this.listOntologies()).find((candidate) => candidate.id === ontologyId);
    return ontology?.name ?? ontologyId;
  }

  /** Drops cached listings and notifies listeners. */
  invalidate(ontologyId?: string): void {
    if (ontologyId) {
      this.concepts.delete(ontologyId);
    } else {
      this.ontologies = undefined;
      this.concepts.clear();
    }
    this.changed.fire(ontologyId);
  }

  dispose(): void {
    this.changed.dispose();
  }
}
