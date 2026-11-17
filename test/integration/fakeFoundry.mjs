// A stand-in for Palantir Foundry's execute-query API serving the Prometheux functions
// (analyzePX, runPX, validatePX, stopEvaluationPX), for the Foundry integration suite.
// Its "engine" is deliberately small: it reads @output and @bind, keeps the tables programs
// write, and fails a run that reads a table nobody has written yet, so the suite can check that
// files run in dependency order and read each other's tables.
import http from "node:http";

export const FAKE_TOKEN = "foundry-test-token";
export const FAKE_ONTOLOGY = "ri.ontology.main.ontology.test";

const STATEMENT = /[^.]+(?:\.(?=\d)[^.]*)*\./g;

function analyze(program) {
  const text = program.replace(/%[^\n]*/g, "");
  const outputs = [...text.matchAll(/@output\(\s*"([^"]+)"\s*\)/g)].map((m) => m[1]);
  const binds = [...text.matchAll(/@bind\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*\)/g)].map((m) => ({
    predicate: m[1],
    datasource_type: m[2],
    path: m[3],
    table: m[4],
  }));
  const heads = new Set();
  const bodies = new Set();
  for (const statement of text.match(STATEMENT) ?? []) {
    if (statement.trim().startsWith("@")) continue;
    const [head, body] = statement.split(/<-|:-/);
    const name = /^\s*([a-z][A-Za-z0-9_]*)\s*\(/.exec(head ?? "");
    if (name) heads.add(name[1]);
    for (const m of (body ?? "").matchAll(/\b([a-z][A-Za-z0-9_]*)\s*\(/g)) {
      if (!["concat", "as_date", "as_string"].includes(m[1])) bodies.add(m[1]);
    }
  }
  if (outputs.length === 0 && !text.includes("@output")) {
    return { ok: false, message: "No output atom specified. Please add an @output annotation.", error_code: "INVALID_PROGRAM" };
  }
  return {
    ok: true,
    message: "Analysis complete",
    input_predicates: [...bodies].filter((p) => !heads.has(p)).sort(),
    head_predicates: [...heads],
    output_predicates: outputs.sort(),
    input_binds: binds.filter((b) => !outputs.includes(b.predicate)),
    output_binds: binds.filter((b) => outputs.includes(b.predicate)),
    head_terms: [],
  };
}

export async function startFakeFoundry() {
  const tables = new Set();
  const requests = [];
  const run = (program) => {
    const a = analyze(program);
    if (!a.ok) return JSON.stringify({ error: a.message, error_code: a.error_code });
    for (const bind of a.input_binds) {
      const name = `${bind.path}.${bind.table}`;
      if (!tables.has(name)) {
        return JSON.stringify({ error: `Table ${name} does not exist yet`, error_code: "ENGINE_ERROR" });
      }
    }
    const resultSet = {};
    const columnNames = {};
    for (const output of a.output_predicates) {
      const bind = a.output_binds.find((b) => b.predicate === output);
      if (bind) {
        tables.add(`${bind.path}.${bind.table}`);
        continue;
      }
      resultSet[output] = [["row-of", output]];
      columnNames[output] = ["What", "Predicate"];
    }
    return JSON.stringify({ data: { resultSet, columnNames, types: {} }, message: "ok" });
  };

  const server = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const send = (status, body) => {
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify(body));
    };
    if (req.url === "/__test/requests") return send(200, requests);
    const match = /^\/api\/v2\/ontologies\/([^/]+)\/queries\/([^/]+)\/execute$/.exec(req.url ?? "");
    if (req.method !== "POST" || !match) return send(404, { errorName: "NotFound" });
    if (req.headers.authorization !== `Bearer ${FAKE_TOKEN}`) return send(401, { errorName: "Unauthorized" });
    const [, ontology, query] = match.map(decodeURIComponent);
    if (ontology !== FAKE_ONTOLOGY) return send(404, { errorName: "OntologyNotFound", parameters: { ontology } });
    const { parameters } = JSON.parse(Buffer.concat(chunks).toString() || "{}");
    requests.push({ query, parameters });
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (query === "analyzePX") return send(200, { value: analyze(parameters.program) });
    if (query === "validatePX") {
      // A statement whose dot is missing runs into the next line's predicate.
      const missingDot = /\)\s*\n\s*[a-z]/.exec(parameters.program.replace(/%[^\n]*/g, ""));
      return send(200, { value: { valid: !missingDot, message: missingDot ? "line 2:0 Parsing exception: missing '.'" : "" } });
    }
    if (query === "runPX") return send(200, { value: run(parameters.program) });
    if (query === "stopEvaluationPX") return send(200, { value: JSON.stringify({ stopped: true }) });
    return send(404, { errorName: "QueryNotFound", parameters: { query } });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}
