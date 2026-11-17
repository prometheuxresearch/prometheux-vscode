// Prometheux constructs the analyser does not model yet (SQL rule bodies)
// must degrade to syntax-only checks without breaking the other providers.

import "reflect-metadata";

import * as assert from "assert";
import Container from "typedi";
import { TextDocument } from "vscode-languageserver-textdocument";
import { CodeActionsProviderService } from "../code-actions-provider.service";
import { DatalogpmDocument } from "../datalogpm/datalogpm-document";
import { DocumentManagerService } from "../document-manager.service";
import { InlayHintsService } from "../inlay-hints.service";

const URI = "prometheux:/ontology/cache.vada";
// Shape of real concepts that broke the analyser: an SQL rule with aggregates.
const SQL_RULE = `summary_agg() <- SELECT c.Library_name, COUNT(DISTINCT c.Molecule_id), MAX(c.Weight) FROM compounds c GROUP BY c.Library_name.

summary(Library, Molecules, Weight) :- summary_agg(Library, Molecules, Weight).
`;
const FULL_RANGE = { start: { line: 0, character: 0 }, end: { line: 10, character: 0 } };

suite("Unsupported dialect", () => {
  test("keeps every provider working when analysis fails", async () => {
    const document = new DatalogpmDocument(TextDocument.create(URI, "vadalog", 0, SQL_RULE));
    assert.ok(Array.isArray(document.allTokens));
    assert.ok(document.diagnostics.some((d) => /Semantic checks skipped/.test(d.message)));

    const manager = Container.get(DocumentManagerService);
    manager.setContents(URI, TextDocument.create(URI, "vadalog", 0, SQL_RULE));
    assert.doesNotThrow(() => manager.provideDocumentSemanticTokens(URI));

    const hints = await Container.get(InlayHintsService).provideInlayHints(document, FULL_RANGE);
    assert.deepStrictEqual(hints, []);
    await Container.get(CodeActionsProviderService).provideCodeActions(
      document,
      { diagnostics: document.diagnostics },
      FULL_RANGE
    );
  });

  test("does not keep stale analysis after an edit breaks it", () => {
    const document = new DatalogpmDocument(TextDocument.create(URI, "vadalog", 0, 'a(1).\n@output("a").\n'));
    assert.ok(document.allTokens.length > 0);
    document.document = TextDocument.create(URI, "vadalog", 1, SQL_RULE);
    assert.deepStrictEqual(document.allTokens, []);
    assert.deepStrictEqual(document.bindings, {});
  });
});
