// Unit tests for src/programAssembly.ts (bundled to out/unit by `npm run test:unit`).
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const { arities, assembleConceptProgram, predicates, renamePredicates, statements } = createRequire(import.meta.url)(
  "../../out/unit/programAssembly.cjs",
);

const meta = (outputPredicate, annotations = {}) => ({ outputPredicate, conceptType: "logic", annotations });
const ICEBERG = (p) => `@bind("${p}","iceberg","warehouse.acme.lakehouse.o1","${p}").`;

test("splits statements, ignoring comments, decimals and dots in strings", () => {
  const source = '% a comment. with dots\na(1.5, "x. y").\nb(X) :- a(X, _).\n';
  assert.deepEqual(statements(source), ['a(1.5, "x. y")', "b(X) :- a(X, _)"]);
});

test("finds heads and body predicates, including SQL tables", () => {
  const { heads, body } = predicates(
    "h(X) :- r(X), s(X, Y), Y = mcount(1).\nq() <- SELECT a FROM t JOIN u ON t.k = u.k.\n",
  );
  assert.deepEqual([...heads].sort(), ["h", "q"]);
  assert.deepEqual([...body].sort(), ["mcount", "r", "s", "t", "u"]);
});

test("reads upstream concepts from their stored output and adds @output", () => {
  const body =
    "num_nodes(Num) :- company(X), Num = mcount(1).\n" +
    "node_degree(N, D) :- edge_undirected(T, S, N), D = mcount().\n" +
    "degree_centrality(N, DC) :- node_degree(N, D), num_nodes(Num), DC = D / Num.\n";
  const own = meta("degree_centrality", {
    bind_annotations: { input: [], output: ICEBERG("degree_centrality") },
    post_annotations: '@post("degree_centrality","orderby(-2)").',
  });
  // No local bodies (e.g. SQL / Python concepts): read from the platform.
  const concepts = new Map([
    ["degree_centrality", { meta: own }],
    ["company", { meta: meta("company", { bind_annotations: { input: [], output: ICEBERG("company") } }) }],
    ["edge_undirected", { meta: meta("edge_undirected", { bind_annotations: { input: [], output: ICEBERG("edge_undirected") } }) }],
    ["unrelated", { meta: meta("unrelated", { bind_annotations: { input: [], output: ICEBERG("unrelated") } }) }],
  ]);
  const { program, upstream, unresolved } = assembleConceptProgram(body, own, concepts);
  assert.deepEqual(upstream, ["company", "edge_undirected"]);
  assert.deepEqual(unresolved, []);
  assert.equal(
    program,
    `${ICEBERG("company")}\n${ICEBERG("edge_undirected")}\n\n${body.trim()}\n\n` +
      '@post("degree_centrality","orderby(-2)").\n\n@output("degree_centrality").\n',
  );
  assert.ok(!program.includes(ICEBERG("degree_centrality")), "never writes the concept's own output");
});

test("keeps own input binds, skips binds for predicates the body defines", () => {
  const own = meta("company", {
    bind_annotations: {
      input: ['@bind("companies_pg","postgresql host=x","db","public.companies").', '@bind("company","csv","d","f.csv").'],
      output: ICEBERG("company"),
    },
  });
  const { program } = assembleConceptProgram("company(X) :- companies_pg(X).", own, new Map([["company", { meta: own }]]));
  assert.ok(program.startsWith('@bind("companies_pg","postgresql host=x","db","public.companies").'));
  assert.ok(!program.includes('"csv"'));
});

test("merges params of the concept and its upstream, and reports upstream without output", () => {
  const own = meta("b", { param_annotations: '@param("from","2024-01-01")' });
  const concepts = new Map([
    ["b", { meta: own }],
    ["a", { meta: meta("a", { param_annotations: '@param("to","2024-12-31").', bind_annotations: { output: ICEBERG("a") } }) }],
    ["c", { meta: meta("c") }],
  ]);
  const { program, unresolved } = assembleConceptProgram("b(X) :- a(X), c(X).\n@output(\"b\").", own, concepts);
  assert.deepEqual(unresolved, ["c"]);
  assert.ok(program.startsWith('@param("from","2024-01-01").\n@param("to","2024-12-31").'));
  assert.equal(program.match(/@output/g).length, 1, "an existing @output is not duplicated");
});

const PG = '@bind("companies_pg","postgresql host=db","prometheux","public.companies").';

test("local Vadalog upstream concepts are inlined, recursively, with their input binds", () => {
  const concepts = new Map([
    ["company", { meta: meta("company", { bind_annotations: { input: [PG], output: ICEBERG("company") } }), body: "company(X) :- companies_pg(X).\n" }],
    ["transaction", { meta: meta("transaction", { bind_annotations: { output: ICEBERG("transaction") } }) }],
    ["edge", { meta: meta("edge", { bind_annotations: { output: ICEBERG("edge") }, post_annotations: '@post("edge","limit(1)").' }), body: "edge(A, B) :- transaction(A, B).\n" }],
  ]);
  const own = meta("score", { bind_annotations: { input: [], output: ICEBERG("score") } });
  const result = assembleConceptProgram("score(X) :- company(X), edge(X, _).\n", own, concepts);
  assert.deepEqual(result.local, ["company", "edge"]);
  assert.deepEqual(result.upstream, ["transaction"]);
  assert.equal(
    result.program,
    `${ICEBERG("transaction")}\n\n${PG}\n\n% company (local)\ncompany(X) :- companies_pg(X).\n\n` +
      "% edge (local)\nedge(A, B) :- transaction(A, B).\n\nscore(X) :- company(X), edge(X, _).\n\n" +
      '@output("score").\n',
  );
  assert.ok(!result.program.includes("limit(1)"), "an upstream @post shapes only its own stored output");
});

test("a pinned input bind on an upstream concept gives way to its local body", () => {
  const pinned = '@bind("company","parquet","disk/results/o1","company").';
  const concepts = new Map([["company", { meta: meta("company"), body: "company(1).\n" }]]);
  const own = meta("score", { bind_annotations: { input: [pinned] } });
  const { program, local } = assembleConceptProgram("score(X) :- company(X).\n", own, concepts);
  assert.deepEqual(local, ["company"]);
  assert.ok(!program.includes(pinned));
});

test("helper predicates that clash between inlined concepts are renamed in the upstream", () => {
  const concepts = new Map([
    ["up", { meta: meta("up"), body: 'tmp(X) :- src(X).\nup(X) :- tmp(X), X != "tmp(1)".\n' }],
  ]);
  const own = meta("down");
  const result = assembleConceptProgram("tmp(X) :- up(X).\ndown(X) :- tmp(X).\n", own, concepts);
  assert.deepEqual(result.renamed, ["tmp (in up)"]);
  assert.match(result.program, /up__tmp\(X\) :- src\(X\)\.\nup\(X\) :- up__tmp\(X\), X != "tmp\(1\)"\./);
  assert.match(result.program, /\ntmp\(X\) :- up\(X\)\.\ndown\(X\) :- tmp\(X\)\./);
});

test("renames atoms and SQL tables, not strings, comments or variables", () => {
  const renames = new Map([["t", "u__t"]]);
  assert.equal(
    renamePredicates('% t(1) here\nq() <- SELECT a FROM t JOIN t ON x.\nr(T) :- t(T), T = "t(2)".', renames),
    '% t(1) here\nq() <- SELECT a FROM u__t JOIN u__t ON x.\nr(T) :- u__t(T), T = "t(2)".',
  );
});

test("a dependency cycle does not loop", () => {
  const concepts = new Map([
    ["a", { meta: meta("a"), body: "a(X) :- b(X).\n" }],
    ["b", { meta: meta("b"), body: "b(X) :- a(X).\n" }],
  ]);
  const { local } = assembleConceptProgram("c(X) :- a(X).\n", meta("c"), concepts);
  assert.deepEqual(local, ["b", "a"]);
});

test("counts atom arities, ignoring commas inside strings, lists and nested calls", () => {
  const found = arities('p(X, "a,b", [1, 2], f(Y, Z)).\nq() :- p(A, B, C, D), r(A).\n');
  assert.deepEqual([...found.get("p")], [4]);
  assert.deepEqual([...found.get("q")], [0]);
  assert.deepEqual([...found.get("f")], [2]);
});

test("readers of fewer columns than a local upstream defines get an adapter", () => {
  // Like edge_undirected(Id, Src, Dst) :- transaction(Id, Src, Dst) over an
  // 11-column concept: the platform reads the stored table's leading columns.
  const concepts = new Map([["wide", { meta: meta("wide"), body: "wide(1, 2, 3).\n" }]]);
  const { program } = assembleConceptProgram("narrow(A) :- wide(A).\nboth(A, B, C) :- wide(A, B, C).\n", meta("narrow"), concepts);
  assert.match(program, /wide__1\(A1\) :- wide\(A1, _, _\)\./);
  assert.match(program, /narrow\(A\) :- wide__1\(A\)\./);
  assert.match(program, /both\(A, B, C\) :- wide\(A, B, C\)\./, "full-width reads are untouched");
});
