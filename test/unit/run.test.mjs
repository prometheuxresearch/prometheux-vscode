// Unit tests for src/run/ and src/foundry/ (bundled to out/unit by `npm run test:unit`): running
// local Vadalog files as modules. They double as the usage guide, on the wash-sale example.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const { FoundryClient, FoundryBackend, annotations, planPrograms, runPlan, runFiles, resultsMessage, modelAnnotation, UPSTREAM_HEADER } =
  createRequire(import.meta.url)("../../out/unit/run.cjs");

const ICE = "foundry.`globex-4f2a91`.prometheux.ice";
const iceberg = (predicate, table) => ({ predicate, datasourceType: "iceberg", path: ICE, table });

// Program 1 writes the wash-sale matches to Iceberg; program 2 explains them and only uses
// washMatch: the run adds program 1's @bind and @model so it reads that table.
const WASH = [
  `@bind("trade", "iceberg", "${ICE}", "trades").`,
  "washMatch(S, B, D) <- trade(S, B, D).",
  `@model("washMatch", "['SellId:string','ReplacementBuy:string','LossDisallowed:int']").`,
  `@bind("washMatch", "iceberg", "${ICE}", "wash_sale_matches").`,
  '@output("washMatch").',
].join("\n");
const EXPLAIN = 'explanation(S, E) <- washMatch(S, B, D), E = concat(S, " -> ", B).\n@output("explanation").';
const CONTROLS = 'own("c1", "c2", 0.6).\ncontrols(X, Y) <- own(X, Y, S), S > 0.5.\n@output("controls").';

const ANALYSES = {
  [WASH]: { outputs: ["washMatch"], inputs: ["trade"], inputBinds: [iceberg("trade", "trades")], outputBinds: [iceberg("washMatch", "wash_sale_matches")] },
  [EXPLAIN]: { outputs: ["explanation"], inputs: ["washMatch"], inputBinds: [], outputBinds: [] },
  [CONTROLS]: { outputs: ["controls"], inputs: ["own"], inputBinds: [], outputBinds: [] },
};
const analysis = (program) => ({ program, ...ANALYSES[program] });

// ── Planning ────────────────────────────────────────────────────────────────

test("a file that uses another file's @output runs after it, whatever the order given", () => {
  const plan = planPrograms([analysis(EXPLAIN), analysis(WASH)]);
  assert.deepEqual(plan.map((s) => s.name), ["washMatch", "explanation"]);
  assert.deepEqual(plan[1].dependsOn, ["washMatch"]);
});

test("the upstream @bind and @model are added to the reading program", () => {
  const step = planPrograms([analysis(WASH), analysis(EXPLAIN)]).find((s) => s.name === "explanation");
  assert.deepEqual(step.readsFromUpstream, ["washMatch"]);
  assert.deepEqual(step.program.split("\n").slice(0, 3), [
    UPSTREAM_HEADER,
    `@bind("washMatch", "iceberg", "${ICE}", "wash_sale_matches").`,
    `@model("washMatch", "['SellId:string','ReplacementBuy:string','LossDisallowed:int']").`,
  ]);
  assert.ok(step.program.endsWith(EXPLAIN));
});

test("a file that binds the upstream predicate itself keeps its own bind", () => {
  const own = `@bind("washMatch", "iceberg", "${ICE}", "wash_sale_matches").\n${EXPLAIN}`;
  const step = planPrograms([analysis(WASH), { ...analysis(EXPLAIN), program: own, inputBinds: [iceberg("washMatch", "wash_sale_matches")] }])
    .find((s) => s.name === "explanation");
  assert.equal(step.program, own);
  assert.deepEqual(step.dependsOn, ["washMatch"]);
});

test("mistakes are reported before anything runs", () => {
  assert.throws(() => planPrograms([{ ...analysis(WASH), outputBinds: [] }, analysis(EXPLAIN)]),
    /explanation reads "washMatch" from washMatch, but washMatch does not write it anywhere/);
  assert.throws(() => planPrograms([analysis(WASH), { ...analysis(CONTROLS), outputs: ["controls", "washMatch"] }]),
    /"washMatch" is an @output of both washMatch and controls/);
  const a = { ...analysis(CONTROLS), outputs: ["a"], inputs: ["b"], outputBinds: [iceberg("a", "a")] };
  const b = { ...analysis(CONTROLS), outputs: ["b"], inputs: ["a"], outputBinds: [iceberg("b", "b")] };
  assert.throws(() => planPrograms([a, b]), /in a cycle, so none can run first: a, b/);
});

test("modelAnnotation does not mistake a predicate whose name starts the same", () => {
  const program = `@model("washMatchTrace", "['A']").\n@model("washMatch", "['B']").`;
  assert.equal(modelAnnotation(program, "washMatch"), `@model("washMatch", "['B']").`);
});

// ── Running ─────────────────────────────────────────────────────────────────

test("independent programs run together, at most maxParallel at once; null means the default", async () => {
  let running = 0;
  let peak = 0;
  const plan = planPrograms(["p1", "p2", "p3", "p4", "p5"].map((n) => ({ ...analysis(CONTROLS), program: n, outputs: [n] })));
  const slow = async () => {
    running++;
    peak = Math.max(peak, running);
    await new Promise((resolve) => setTimeout(resolve, 5));
    running--;
    return "rows";
  };
  await runPlan(plan, slow, 2);
  assert.equal(peak, 2);
  assert.equal((await runPlan(plan, slow, null)).length, 5);
});

test("a failed program skips the ones that read from it; the others still run", async () => {
  const runs = await runPlan(planPrograms([analysis(WASH), analysis(EXPLAIN), analysis(CONTROLS)]), async (program) => {
    if (program === WASH) throw new Error("engine rejected washMatch");
    return "rows";
  });
  const status = Object.fromEntries(runs.map((r) => [r.step.name, r.status]));
  assert.deepEqual(status, { washMatch: "failed", controls: "succeeded", explanation: "skipped" });
});

// ── The Foundry client ──────────────────────────────────────────────────────

function fakeFoundry(handlers) {
  const calls = [];
  const fetch = async (url, init) => {
    const name = decodeURIComponent(url.split("/queries/")[1].split("/")[0]);
    const body = JSON.parse(init.body);
    calls.push({ url, name, parameters: body.parameters, auth: init.headers.Authorization });
    const handler = handlers[name];
    if (!handler) return new Response(JSON.stringify({ errorName: "QueryNotFound", parameters: { name } }), { status: 404 });
    const value = await handler(body.parameters);
    return new Response(JSON.stringify({ value }), { status: 200 });
  };
  const settings = { url: "https://acme.palantirfoundry.com/", token: "t0k", ontology: "ri.ontology.main.ontology.1" };
  return { client: new FoundryClient(settings, fetch), backend: new FoundryBackend(settings, fetch), calls };
}

const analyzeHandler = ({ program }) => {
  const a = ANALYSES[program];
  if (!a) return { ok: false, message: "Parsing exception: missing dot", error_code: "INVALID_PROGRAM" };
  const wire = (b) => ({ predicate: b.predicate, datasource_type: b.datasourceType, path: b.path, table: b.table });
  return { ok: true, message: "", input_predicates: a.inputs, head_predicates: a.outputs, output_predicates: a.outputs,
    input_binds: a.inputBinds.map(wire), output_binds: a.outputBinds.map(wire), head_terms: [] };
};
const runHandler = ({ program }) => {
  if (program.includes("controls")) {
    return JSON.stringify({ data: { resultSet: { controls: [["c1", "c2"]] }, columnNames: { controls: ["X", "Y"] } } });
  }
  if (program.endsWith(EXPLAIN)) {
    return JSON.stringify({ data: { resultSet: { explanation: [["S1", "S1 -> B2"]] }, columnNames: { explanation: ["S", "E"] } } });
  }
  return JSON.stringify({ data: { resultSet: {}, columnNames: {} } });
};

test("calls Foundry's execute-query API with the token and the function's parameters", async () => {
  const { client, calls } = fakeFoundry({ validatePX: () => ({ valid: true, message: "" }) });
  assert.equal(await client.validate("a(1)."), undefined);
  assert.equal(calls[0].url, "https://acme.palantirfoundry.com/api/v2/ontologies/ri.ontology.main.ontology.1/queries/validatePX/execute");
  assert.equal(calls[0].auth, "Bearer t0k");
  assert.deepEqual(calls[0].parameters, { program: "a(1)." });
});

test("reads runPX's JSON string, and turns an engine error into a message", async () => {
  const { client } = fakeFoundry({
    runPX: ({ program }) => (program === "bad" ? JSON.stringify({ error: "No output atom", error_code: "INVALID_PROGRAM" }) : runHandler({ program })),
  });
  assert.deepEqual((await client.run(CONTROLS, "id-1")).resultSet, { controls: [["c1", "c2"]] });
  await assert.rejects(client.run("bad"), /The engine rejected the program \(INVALID_PROGRAM\): No output atom/);
});

test("Foundry errors become readable messages", async () => {
  const unauthorized = new FoundryClient({ url: "https://x", token: "old", ontology: "o" },
    async () => new Response("{}", { status: 401 }));
  await assert.rejects(unauthorized.validate("a(1)."), /Foundry rejected the token \(401\)/);
  const { client } = fakeFoundry({});
  await assert.rejects(client.validate("a(1)."), /Foundry QueryNotFound \(404\): \{"name":"validatePX"\}/);
});

// ── Running files end to end (fake Foundry) ─────────────────────────────────

test("runs a folder of files as modules and shows a Programs table plus each output", async () => {
  const { backend, calls } = fakeFoundry({ analyzePX: analyzeHandler, runPX: runHandler });
  const files = [
    { label: "wash/provenance.vada", program: EXPLAIN },
    { label: "ownership/controls.vada", program: CONTROLS },
    { label: "wash/wash_sales.vada", program: WASH },
  ];
  const lines = [];
  const runs = await runFiles(backend, files, { log: (line) => lines.push(line) });
  // washMatch and controls are independent (either order); explanation reads washMatch, so it is last.
  assert.deepEqual(runs.slice(0, 2).map((r) => [r.name, r.label, r.status]).sort(), [
    ["controls", "ownership/controls.vada", "succeeded"],
    ["washMatch", "wash/wash_sales.vada", "succeeded"],
  ]);
  assert.deepEqual([runs[2].name, runs[2].label, runs[2].status], ["explanation", "wash/provenance.vada", "succeeded"]);
  // explanation was sent with washMatch's bind added, after washMatch had run.
  const runCalls = calls.filter((c) => c.name === "runPX");
  assert.ok(runCalls.at(-1).parameters.program.startsWith(UPSTREAM_HEADER));
  assert.ok(runCalls.every((c) => typeof c.parameters.id === "string"));
  assert.ok(lines.some((line) => line.includes("explanation reads washMatch from the upstream tables")));

  const message = resultsMessage("wash/ (3 programs)", runs, 12.3);
  assert.equal(message.type, "tables");
  assert.match(message.subtitle, /on Palantir Foundry in 12\.3s · 3 succeeded/);
  assert.deepEqual(message.tables.map((t) => t.name).sort(), ["Programs", "controls", "explanation"]);
  assert.equal(message.tables[0].name, "Programs");
  assert.deepEqual(message.tables[0].rows.find((row) => row[0] === "washMatch").slice(0, 6),
    ["washMatch", "wash/wash_sales.vada", "succeeded", "", "", `${ICE}.wash_sale_matches`]);
});

test("a single file shows just its outputs", async () => {
  const { backend } = fakeFoundry({ analyzePX: analyzeHandler, runPX: runHandler });
  const runs = await runFiles(backend, [{ label: "controls.vada", program: CONTROLS }]);
  assert.deepEqual(resultsMessage("controls.vada", runs, 1).tables.map((t) => t.name), ["controls"]);
});

test("a file that does not parse or has no @output is named in the error", async () => {
  const { backend } = fakeFoundry({ analyzePX: analyzeHandler, runPX: runHandler });
  await assert.rejects(runFiles(backend, [{ label: "broken.vada", program: "a(1)" }]), /broken\.vada: Parsing exception: missing dot/);
  ANALYSES["noout"] = { outputs: [], inputs: [], inputBinds: [], outputBinds: [] };
  await assert.rejects(runFiles(backend, [{ label: "noout.vada", program: "noout" }]), /noout\.vada has no @output/);
});

// ── Reading @output and @bind (Prometheux accounts read them from the program) ─

test("annotations: outputs, and binds split into what a program reads and writes", () => {
  const found = annotations(`% @output("commented").\n${WASH}`);
  assert.deepEqual(found.outputs, ["washMatch"]);
  assert.deepEqual(found.inputBinds, [iceberg("trade", "trades")]);
  assert.deepEqual(found.outputBinds, [iceberg("washMatch", "wash_sale_matches")]);
});

test("annotations: a % inside a string is not a comment", () => {
  const found = annotations('@bind("p", "csv", "disk/a%b", "t.csv").\nq(X) <- p(X).\n@output("q").');
  assert.deepEqual(found.inputBinds, [{ predicate: "p", datasourceType: "csv", path: "disk/a%b", table: "t.csv" }]);
});
