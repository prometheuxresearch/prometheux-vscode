// Integration suite, runs inside the VS Code extension host.
const assert = require("node:assert");
const vscode = require("vscode");
const Mocha = require("mocha");
const { Prometheux } = require("prometheux-chain");

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(check, what, timeout = 30_000) {
  const until = Date.now() + timeout;
  for (;;) {
    const value = await check();
    if (value) return value;
    if (Date.now() > until) throw new Error(`Timed out waiting for ${what}`);
    await sleep(250);
  }
}

function tests() {
  const px = new Prometheux({ baseUrl: process.env.JARVISPY_URL, token: process.env.PMTX_TOKEN });
  let api;
  let ontologyId;
  const dir = () => vscode.Uri.from({ scheme: "prometheux", path: `/${ontologyId}` });
  const file = (name, ext = "vada") => vscode.Uri.from({ scheme: "prometheux", path: `/${ontologyId}/${name}.${ext}` });

  suiteSetup(async () => {
    const extension = vscode.extensions.getExtension("prometheux.prometheux");
    api = await extension.activate();
    ontologyId = await px.ontologies.save({ name: `vscode-smoke-${Date.now()}`, description: "temporary" });
  });

  suiteTeardown(async () => {
    if (ontologyId) await px.ontologies.delete(ontologyId);
  });

  test("lists ontologies as folders", async () => {
    const entries = await vscode.workspace.fs.readDirectory(vscode.Uri.parse("prometheux:/"));
    assert.ok(entries.some(([name, type]) => name === ontologyId && type === vscode.FileType.Directory));
  });

  test("creates, reads and lists a concept", async () => {
    const text = 'smoke_a(1).\nsmoke_a(2).\n@output("smoke_a").\n';
    await vscode.workspace.fs.writeFile(file("smoke_a"), encoder.encode(text));
    // The platform stores the body without binds / @output, like the product editor shows it.
    const stored = decoder.decode(await vscode.workspace.fs.readFile(file("smoke_a")));
    assert.match(stored, /smoke_a\(1\)\.\s*smoke_a\(2\)\./);
    assert.doesNotMatch(stored, /@output/);
    const entries = await vscode.workspace.fs.readDirectory(dir());
    assert.deepStrictEqual(entries.map(([name]) => name), ["smoke_a.vada"]);
    const concepts = await px.concepts.list(ontologyId);
    assert.strictEqual(concepts[0].predicate_name, "smoke_a");
  });

  test("language server works on concept documents", async () => {
    const document = await vscode.workspace.openTextDocument(file("smoke_a"));
    assert.strictEqual(document.languageId, "vadalog");
    const symbols = await waitFor(
      () => vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", document.uri).then((s) => s?.length && s),
      "document symbols",
    );
    assert.ok(symbols.some((symbol) => symbol.name === "smoke_a"));
  });

  test("editing and saving a concept saves it on the platform", async () => {
    const editor = await vscode.window.showTextDocument(file("smoke_a"));
    await editor.edit((edit) => edit.insert(new vscode.Position(0, 0), "smoke_a(3).\n"));
    assert.ok(await editor.document.save());
    const concepts = await px.concepts.list(ontologyId);
    assert.match(concepts[0].parsed.code, /smoke_a\(3\)\./);
  });

  test("runs a concept and shows its results", async () => {
    await vscode.commands.executeCommand("prometheux.runConcept", file("smoke_a"));
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.strictEqual(shown.tables[0].name, "smoke_a");
    assert.ok(shown.tables[0].rows.length > 0);
  });

  test("evaluates a local program", async () => {
    const document = await vscode.workspace.openTextDocument({
      language: "vadalog",
      content: 'p(1).\nq(X) :- p(X).\n@output("q").\n',
    });
    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand("prometheux.run");
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.ok(shown.tables.some((table) => table.name === "q"));
  });

  test("creates a SQL concept", async () => {
    await vscode.workspace.fs.writeFile(file("smoke_sql", "sql"), encoder.encode("SELECT 1 AS example\n"));
    const concept = (await px.concepts.list(ontologyId)).find((c) => c.predicate_name === "smoke_sql");
    assert.strictEqual(concept?.concept_type, "sql");
    assert.match(decoder.decode(await vscode.workspace.fs.readFile(file("smoke_sql", "sql"))), /SELECT 1/i);
    await vscode.workspace.fs.delete(file("smoke_sql", "sql"));
  });

  test("creates Cypher, Python, LLM and context concepts as files, settings included", async () => {
    const cases = [
      { name: "smoke_cypher", ext: "cypher", type: "cypher", text: "MATCH (n) RETURN n LIMIT 10\n" },
      { name: "smoke_python", ext: "py", type: "python", text: "def main(params):\n    return [{\"a\": 1}]\n" },
      {
        name: "smoke_llm",
        ext: "llm.md",
        type: "llm",
        text: "---\nllmConfig:\n  output_columns:\n    - { name: answer, type: string }\n---\nSay hello.\n",
      },
      { name: "smoke_context", ext: "context.yaml", type: "context", text: "contextMode: dynamic\nquery: refund policy\ntop_k: 3\n" },
    ];
    for (const c of cases) await vscode.workspace.fs.writeFile(file(c.name, c.ext), encoder.encode(c.text));
    const stored = await px.concepts.list(ontologyId);
    for (const c of cases) {
      const concept = stored.find((x) => x.predicate_name === c.name);
      assert.strictEqual(concept?.concept_type, c.type, `${c.name}: ${JSON.stringify(concept)}`);
    }
    const llm = stored.find((x) => x.predicate_name === "smoke_llm");
    assert.deepStrictEqual(llm.concept_config.output_columns, [{ name: "answer", type: "string" }]);
    const context = stored.find((x) => x.predicate_name === "smoke_context");
    assert.strictEqual(context.concept_config.mode, "dynamic");
    assert.strictEqual(context.concept_config.query, "refund policy");
    // Read back as the same files.
    assert.match(decoder.decode(await vscode.workspace.fs.readFile(file("smoke_python", "py"))), /def main\(params\)/);
    const llmFile = decoder.decode(await vscode.workspace.fs.readFile(file("smoke_llm", "llm.md")));
    assert.match(llmFile, /^---\nllmConfig:[\s\S]*name: answer[\s\S]*---\nSay hello\.\n?$/);
    assert.strictEqual(decoder.decode(await vscode.workspace.fs.readFile(file("smoke_context", "context.yaml"))),
      "contextMode: dynamic\nquery: refund policy\ntop_k: 3\n");
    const listed = (await vscode.workspace.fs.readDirectory(dir())).map(([name]) => name);
    for (const c of cases) assert.ok(listed.includes(`${c.name}.${c.ext}`), JSON.stringify(listed));
    for (const c of cases) await vscode.workspace.fs.delete(file(c.name, c.ext));
  });

  test("compute: auto-selects the running machine and sends it with runs", async () => {
    const machines = await api.computes.refresh();
    assert.deepStrictEqual(machines.map((m) => [m.name, m.state]), [["PX_4_16_GP", "started"], ["PX_8_32_GP", "stopped"]]);
    assert.deepStrictEqual(api.computes.selection, { machineId: "cat-running", name: "PX_4_16_GP" });

    await vscode.commands.executeCommand("prometheux.runConcept", file("smoke_a"));
    assert.strictEqual(api.results.current?.type, "tables", JSON.stringify(api.results.current));
    const requests = await (await fetch(`${process.env.JARVISPY_URL}/__test/requests`)).json();
    const fetches = requests.filter((r) => r.path.includes("/fetch"));
    assert.ok(fetches.length > 0);
    assert.deepStrictEqual(fetches.at(-1).compute, { machine_configs: { id: "cat-running" } });
  });

  test("compute: starts a stopped machine and waits until it is up", async () => {
    const stopped = (await api.computes.refresh()).find((m) => m.name === "PX_8_32_GP");
    assert.strictEqual(await api.computes.start(stopped), true);
    assert.strictEqual(stopped.state, "started");
    const requests = await (await fetch(`${process.env.JARVISPY_URL}/__test/requests`)).json();
    assert.deepStrictEqual(requests.find((r) => r.toggle).toggle, { user_machine_id: "um-stopped", is_active: true });
  });

  const workspaceRoot = () => vscode.workspace.workspaceFolders[0].uri;
  const children = async (node) => api.local.getChildren(node);

  test("local view lists downloaded ontologies and the workspace's files", async () => {
    api.local.refresh();
    const groups = await children();
    assert.deepStrictEqual(groups.map((g) => g.label), ["Ontologies", "Files"]);
    const top = await children(groups[1]);
    const names = top.map((item) => item.label);
    assert.ok(names.includes("modules") && names.includes("scratch"), JSON.stringify(names));
    const scratch = await children(top.find((item) => item.label === "scratch"));
    assert.deepStrictEqual(scratch.map((f) => [f.label, f.contextValue]), [["hello.vada", "localFile.vadalog"]]);
  });

  test("evaluates a local file that belongs to no ontology", async () => {
    await vscode.commands.executeCommand("prometheux.evaluateFile", vscode.Uri.joinPath(workspaceRoot(), "scratch", "hello.vada"));
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.deepStrictEqual(shown.tables.map((t) => t.name), ["hi"]);
  });

  test("the environment's Prometheux account is the active account", () => {
    assert.strictEqual(api.accounts.active?.account.platform, "prometheux");
    assert.strictEqual(api.accounts.active.account.url, process.env.JARVISPY_URL);
  });

  test("runs a folder of local files as modules on Prometheux, one at a time", async () => {
    await vscode.commands.executeCommand("prometheux.runFiles", vscode.Uri.joinPath(workspaceRoot(), "modules"));
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.match(shown.subtitle, /on Prometheux .* 2 succeeded/);
    assert.deepStrictEqual(shown.tables.map((t) => t.name), ["Programs", "first", "second"]);
    assert.deepStrictEqual(shown.tables[1].rows.map(String).sort(), ["1", "2"]);
  });

  test("downloads a platform ontology into the workspace", async () => {
    await vscode.commands.executeCommand("prometheux.downloadOntology", {
      ontology: { id: ontologyId, name: "Smoke Download" },
    });
    const dir = vscode.Uri.joinPath(workspaceRoot(), "ontologies", "smoke-download");
    const manifest = decoder.decode(await vscode.workspace.fs.readFile(vscode.Uri.joinPath(dir, "prometheux.yaml")));
    assert.match(manifest, new RegExp(`id: ${ontologyId}`));
    if (!process.env.PX_REAL_TEST) {
      const call = JSON.parse(decoder.decode(await vscode.workspace.fs.readFile(vscode.Uri.joinPath(workspaceRoot(), ".fake-px.json"))));
      assert.deepStrictEqual(call.args, ["pull", ontologyId, "--out", workspaceRoot().fsPath, "--slug", "smoke-download"]);
      assert.strictEqual(call.url, process.env.JARVISPY_URL);
      assert.ok(call.hasToken);
    }
    api.local.refresh();
    const [ontologies, files] = await children();
    const [local] = await children(ontologies);
    assert.strictEqual(local.ontology.id, ontologyId);
    const concepts = (await children(local)).map((c) => c.label);
    assert.ok(concepts.includes(process.env.PX_REAL_TEST ? "smoke_a" : "smoke"), JSON.stringify(concepts));
    // Files is the whole workspace tree, the downloaded ontology's folder included.
    assert.ok((await children(files)).some((item) => item.label === "ontologies"));
  });

  test("applies local changes of a downloaded ontology to the platform", async () => {
    api.local.refresh();
    const [ontologies] = await children();
    const local = (await children(ontologies)).find((item) => item.ontology.id === ontologyId);
    const conceptName = process.env.PX_REAL_TEST ? "smoke_a" : "smoke";
    const file = vscode.Uri.joinPath(local.ontology.dir, "concepts", `${conceptName}.vadalog`);

    assert.strictEqual((await api.sync.plan(local.ontology)).inSync, true);
    const edited = `${decoder.decode(await vscode.workspace.fs.readFile(file)).trimEnd()}\n${conceptName}(42).\n`;
    await vscode.workspace.fs.writeFile(file, encoder.encode(edited));

    const plan = await api.sync.plan(local.ontology);
    assert.strictEqual(plan.inSync, false);
    assert.match(plan.summary, /1 to update/);
    await api.sync.apply(local.ontology);

    if (process.env.PX_REAL_TEST) {
      const concept = (await px.concepts.list(ontologyId)).find((c) => c.predicate_name === conceptName);
      assert.match(concept.parsed.code, /\(42\)/);
      assert.strictEqual((await api.sync.plan(local.ontology)).inSync, true);
    } else {
      const calls = decoder
        .decode(await vscode.workspace.fs.readFile(vscode.Uri.joinPath(workspaceRoot(), ".fake-px.log")))
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));
      assert.deepStrictEqual(calls.at(-1).args, ["apply", "--yes", workspaceRoot().fsPath, "--ontology", ontologyId]);
      assert.strictEqual(calls.at(-1).url, process.env.JARVISPY_URL);
    }
  });

  test("evaluates a downloaded concept with its local upstream concepts", async () => {
    const concepts = vscode.Uri.joinPath(workspaceRoot(), "ontologies", "graph", "concepts");
    const write = (name, content) => vscode.workspace.fs.writeFile(vscode.Uri.joinPath(concepts, name), encoder.encode(content));
    const upBind = `@bind("up","parquet","disk/results/${ontologyId}","up").`;
    await vscode.workspace.fs.writeFile(
      vscode.Uri.joinPath(workspaceRoot(), "ontologies", "graph", "prometheux.yaml"),
      encoder.encode("ontology:\n  id: graph-1\n  name: Graph\nconcepts: ./concepts\n"),
    );
    await write("up.vadalog", "up(1).\n");
    await write("up.meta.yaml", `conceptType: logic\noutputPredicate: up\nannotations:\n  bind_annotations:\n    input: []\n    output: '${upBind}'\n`);
    await write("down.vadalog", "down(X) :- up(X).\n");
    await write(
      "down.meta.yaml",
      "conceptType: logic\noutputPredicate: down\nannotations:\n  bind_annotations:\n    input: []\n    output: '@bind(\"down\",\"parquet\",\"disk/results/x\",\"down\").'\n",
    );
    api.local.refresh();

    await vscode.commands.executeCommand("prometheux.evaluateFile", vscode.Uri.joinPath(concepts, "down.vadalog"));
    const requests = await (await fetch(`${process.env.JARVISPY_URL}/__test/requests`)).json();
    const program = requests.filter((r) => r.path.endsWith("/vadalog/evaluate")).at(-1).program;
    // up is a local Vadalog file, so it is inlined instead of read from the platform.
    assert.strictEqual(program, `% up (local)\nup(1).\n\ndown(X) :- up(X).\n\n@output("down").\n`);
    assert.ok(!program.includes(upBind));
    assert.strictEqual(api.results.current?.type, "tables", JSON.stringify(api.results.current));
    assert.match(api.results.current.subtitle, /uses local up/);
  });

  test("opens .vadalog files as Vadalog despite a leftover Vadacode association", async () => {
    const file = vscode.Uri.joinPath(workspaceRoot(), "scratch", "before-fix.vadalog");
    await vscode.workspace.fs.writeFile(file, encoder.encode("a(1).\n"));
    const document = await vscode.workspace.openTextDocument(file);
    await waitFor(() => document.languageId === "vadalog" || undefined, "the document to switch to Vadalog", 5_000);
  });

  test("migrates Vadacode file associations to Vadalog", async () => {
    await vscode.commands.executeCommand("prometheux.fixFileAssociations");
    const value = vscode.workspace.getConfiguration().inspect("files.associations").workspaceValue;
    assert.deepStrictEqual(value, { "*.vadalog": "vadalog", "*.foo": "plaintext" });
    const file = vscode.Uri.joinPath(workspaceRoot(), "scratch", "check.vadalog");
    await vscode.workspace.fs.writeFile(file, encoder.encode("a(1).\n"));
    const document = await vscode.workspace.openTextDocument(file);
    assert.strictEqual(document.languageId, "vadalog");
  });

  test("renames and deletes a concept", async () => {
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");
    await vscode.workspace.fs.rename(file("smoke_a"), file("smoke_b"));
    let names = (await px.concepts.list(ontologyId)).map((concept) => concept.predicate_name);
    assert.deepStrictEqual(names, ["smoke_b"]);
    await vscode.workspace.fs.delete(file("smoke_b"));
    names = (await px.concepts.list(ontologyId)).map((concept) => concept.predicate_name);
    assert.deepStrictEqual(names, []);
  });
}

exports.run = () => {
  const mocha = new Mocha({ ui: "tdd", timeout: 60_000, color: true });
  mocha.suite.emit("pre-require", global, "suite", mocha);
  suite("Prometheux extension", tests);
  return new Promise((resolve, reject) => {
    mocha.run((failures) => (failures ? reject(new Error(`${failures} test(s) failed`)) : resolve()));
  });
};
