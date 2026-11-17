// Unit tests for src/conceptFormats.ts (bundled to out/unit/run.cjs by `npm run test:unit`): the
// six concept types as files, in the formats `px pull` writes.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const { conceptTemplate, conceptToFile, fileToConcept, kindForSuffix, splitConceptFile, suffixFor } = createRequire(
  import.meta.url,
)("../../out/unit/run.cjs");

test("each type has its file suffix; two-part suffixes are split before the last dot", () => {
  assert.deepEqual(["logic", "sql", "cypher", "python", "llm", "context"].map(suffixFor), [
    "vada", "sql", "cypher", "py", "llm.md", "context.yaml",
  ]);
  assert.deepEqual(splitConceptFile("summary.llm.md"), { name: "summary", suffix: "llm.md" });
  assert.deepEqual(splitConceptFile("policy_notes.context.yaml"), { name: "policy_notes", suffix: "context.yaml" });
  assert.deepEqual(splitConceptFile("orders.vada"), { name: "orders", suffix: "vada" });
  assert.deepEqual(splitConceptFile("v1.2.sql"), { name: "v1.2", suffix: "sql" });
  assert.equal(splitConceptFile("noext"), undefined);
  assert.equal(kindForSuffix("llm.md"), "llm");
  assert.equal(kindForSuffix("md"), "logic");
});

test("an LLM concept is front matter (its llmConfig) plus the prompt, and saves back the same", () => {
  const stored = {
    concept_type: "llm",
    code: "Summarise {{orders}} in one line.\n",
    concept_config: { output_columns: [{ name: "summary", type: "string" }], model: "claude-sonnet-4-6", provider: null },
  };
  const text = conceptToFile(stored);
  assert.match(text, /^---\nllmConfig:\n/);
  assert.ok(!text.includes("provider"), "null settings are left out");
  assert.ok(text.endsWith("---\nSummarise {{orders}} in one line.\n"));
  assert.deepEqual(fileToConcept("llm", text), {
    definition: "Summarise {{orders}} in one line.\n",
    conceptConfig: { output_columns: [{ name: "summary", type: "string" }], model: "claude-sonnet-4-6" },
  });
  assert.throws(() => fileToConcept("llm", "---\nllmConfig: {}\n---\n  \n"), /needs a prompt/);
  assert.deepEqual(fileToConcept("llm", "Just a prompt"), { definition: "Just a prompt", conceptConfig: {} });
});

test("a context concept is YAML: static note ids, or a dynamic query", () => {
  const dynamic = conceptToFile({ concept_type: "context", concept_config: { mode: "dynamic", query: "refund policy", top_k: 5, kinds: null } });
  assert.equal(dynamic, "contextMode: dynamic\nquery: refund policy\ntop_k: 5\n");
  assert.deepEqual(fileToConcept("context", dynamic), { definition: "", conceptConfig: { mode: "dynamic", query: "refund policy", top_k: 5 } });
  const pinned = conceptToFile({ concept_type: "context", concept_config: { mode: "static", note_ids: ["n1", "n2"] } });
  assert.deepEqual(fileToConcept("context", pinned), { definition: "", conceptConfig: { mode: "static", note_ids: ["n1", "n2"] } });
  assert.throws(() => fileToConcept("context", "contextMode: dynamic\n"), /needs a query/);
  assert.throws(() => fileToConcept("context", "contextMode: sometimes\n"), /static or dynamic/);
  assert.throws(() => fileToConcept("context", "query: [unclosed\n"), /not valid YAML/);
});

test("Vadalog-family and Python concepts are their text", () => {
  assert.equal(conceptToFile({ concept_type: "logic", code: "a(1).\n@output(\"a\")." }), "a(1).\n@output(\"a\").");
  assert.equal(conceptToFile({ concept_type: "python", code: "def main(params):\n    return []" }), "def main(params):\n    return []");
  assert.deepEqual(fileToConcept("sql", "SELECT 1"), { definition: "SELECT 1" });
});

test("every type's template saves without errors", () => {
  for (const kind of ["logic", "sql", "cypher", "python", "llm", "context"]) {
    const saved = fileToConcept(kind, conceptTemplate(kind, "my_concept"));
    assert.ok(typeof saved.definition === "string", kind);
  }
  assert.deepEqual(fileToConcept("context", conceptTemplate("context", "refund_policy")).conceptConfig,
    { mode: "dynamic", query: "refund policy", top_k: 5 });
  assert.deepEqual(fileToConcept("llm", conceptTemplate("llm", "x")).conceptConfig.output_columns, [{ name: "answer", type: "string" }]);
});
