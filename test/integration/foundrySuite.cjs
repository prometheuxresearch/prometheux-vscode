// Accounts and Palantir Foundry integration suite, runs inside the VS Code extension host (see
// runFoundryTest.mjs). The environment provides a Foundry account (FOUNDRY_URL / FOUNDRY_TOKEN /
// FOUNDRY_ONTOLOGY), which starts as the active account.
const assert = require("node:assert");
const vscode = require("vscode");
const Mocha = require("mocha");

const real = process.env.FOUNDRY_TEST_REAL === "1";
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
  let api;
  const root = () => vscode.workspace.workspaceFolders[0].uri;
  const uri = (path) => vscode.Uri.joinPath(root(), ...path.split("/"));
  const table = (shown, name) => shown.tables.find((t) => t.name === name);
  const requests = async () => (await fetch(`${process.env.FOUNDRY_URL}/__test/requests`)).json();
  const foundryForm = (name, token = process.env.FOUNDRY_TOKEN) => ({
    name,
    platform: "foundry",
    url: process.env.FOUNDRY_URL,
    ontology: process.env.FOUNDRY_ONTOLOGY,
    functionSuffix: "PX",
    token,
  });

  suiteSetup(async () => {
    api = await vscode.extensions.getExtension("prometheux.prometheux").activate();
    await waitFor(() => api.accounts.active, "the active account");
  });

  // ── Accounts ──────────────────────────────────────────────────────────────

  test("the environment's Foundry account is detected and active", () => {
    assert.strictEqual(api.accounts.active.account.id, "env:foundry");
    assert.strictEqual(api.accounts.active.account.platform, "foundry");
    assert.ok(api.accounts.all.every((account) => account.source !== "stored"), "no stored accounts yet");
  });

  test("the form tests and saves a Foundry account, which becomes active; its token is in secret storage", async () => {
    const tested = await api.accountEditor.handle({ type: "test", form: foundryForm("Globex (test)") });
    assert.ok(tested.ok, tested.message);
    assert.match(tested.message, /Connected/);
    const saved = await api.accountEditor.handle({ type: "save", form: foundryForm("Globex (test)"), use: true });
    assert.ok(saved.ok, saved.message);
    const active = api.accounts.active.account;
    assert.strictEqual(active.name, "Globex (test)");
    assert.strictEqual(active.source, "stored");
    assert.strictEqual(await api.accounts.token(active), process.env.FOUNDRY_TOKEN);
  });

  test("a wrong token fails the connection test with a readable message", async () => {
    if (real) return;
    const tested = await api.accountEditor.handle({ type: "test", form: foundryForm("bad", "wrong-token") });
    assert.strictEqual(tested.ok, false);
    assert.match(tested.message, /Foundry rejected the token \(401\)/);
  });

  test("editing an account to another URL asks for the token again", async () => {
    const saved = api.accounts.active.account;
    const moved = await api.accountEditor.handle({ type: "save", form: { ...foundryForm(saved.name, ""), url: "https://elsewhere.example" }, use: false }, saved);
    assert.strictEqual(moved.ok, false);
    assert.match(moved.message, /enter the token again/);
  });

  test("the old single sign-ins become accounts once, even when reloads overlap", async () => {
    const { secrets, globalState } = api.storage;
    // What the single-connection version left: prometheux.apiUrl + its token, prometheux.foundry.*
    // (settings it no longer declares, so written to the settings file, as on a user's machine).
    const settingsFile = uri(".vscode/settings.json");
    await vscode.workspace.fs.writeFile(settingsFile, new TextEncoder().encode(JSON.stringify({
      "prometheux.apiUrl": "https://legacy.example/api",
      "prometheux.foundry.url": process.env.FOUNDRY_URL,
      "prometheux.foundry.ontology": process.env.FOUNDRY_ONTOLOGY,
    })));
    await waitFor(() => vscode.workspace.getConfiguration("prometheux").get("apiUrl"), "the old settings to load");
    await secrets.store("prometheux.token:https://legacy.example/api", "legacy-token");
    await secrets.store(`prometheux.foundry.token:${process.env.FOUNDRY_URL}`, process.env.FOUNDRY_TOKEN);
    await globalState.update("prometheux.accounts.migrated", false);
    const restarted = new (api.accounts.constructor)(secrets, globalState, { get: () => undefined, update: async () => undefined });
    await Promise.all([restarted.reload(), restarted.reload(), restarted.reload()]);
    const legacy = restarted.all.filter((account) => account.url === "https://legacy.example/api");
    assert.strictEqual(legacy.length, 1, JSON.stringify(restarted.all.map((a) => [a.name, a.url])));
    assert.strictEqual(await restarted.token(legacy[0]), "legacy-token");
    // The Foundry sign-in matches the Globex (test) account added above: not added again.
    assert.strictEqual(restarted.all.filter((a) => a.source === "stored" && a.platform === "foundry").length, 1);
    await restarted.remove(legacy[0].id);
    restarted.dispose();
    await vscode.workspace.fs.delete(settingsFile);
    await api.accounts.reload();
  });

  // ── Running files on the active (Foundry) account ─────────────────────────

  test("runs a folder as modules: the file that uses another's output runs after it and reads its table", async () => {
    await vscode.commands.executeCommand("prometheux.runFiles", uri("wash"));
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.match(shown.title, /wash\/ \(2 programs\)/);
    assert.match(shown.subtitle, /on Palantir Foundry .* 2 succeeded/);
    assert.deepStrictEqual(
      table(shown, "Programs").rows.map((row) => [row[0], row[1], row[2], row[3], row[4]]),
      [
        ["washMatch", "wash/wash_sales.vada", "succeeded", "", ""],
        ["washMatchExplanation", "wash/provenance.vada", "succeeded", "washMatch", "washMatch"],
      ],
    );
    const explanation = table(shown, "washMatchExplanation");
    assert.ok(explanation, JSON.stringify(shown.tables.map((t) => t.name)));
    if (real) {
      assert.deepStrictEqual(explanation.rows.map(String).sort(), ["S1,S1 -> B2", "S2,S2 -> B3"]);
    } else {
      const sent = (await requests()).filter((r) => r.query === "runPX").map((r) => r.parameters.program);
      assert.ok(sent.at(-1).includes('@bind("washMatch"'), "provenance was sent with washMatch's bind");
    }
  });

  test("runs several selected files and folders together", async () => {
    await vscode.commands.executeCommand("prometheux.runFiles", uri("wash"), [uri("wash"), uri("ownership/controls.vada")]);
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.match(shown.title, /3 programs/);
    assert.deepStrictEqual(table(shown, "Programs").rows.map((row) => row[2]), ["succeeded", "succeeded", "succeeded"]);
    assert.ok(table(shown, "controls"));
  });

  test("Run (Cmd/Ctrl+Shift+Enter) sends the open file to the active Foundry account", async () => {
    const document = await vscode.workspace.openTextDocument(uri("ownership/controls.vada"));
    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand("prometheux.run");
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.strictEqual(shown.title, "ownership/controls.vada");
    assert.deepStrictEqual(shown.tables.map((t) => t.name), ["controls"]);
    if (real) assert.deepStrictEqual(shown.tables[0].rows, [["c1", "c2"]]);
  });

  test("a file without @output is reported by name, before anything runs", async () => {
    await vscode.commands.executeCommand("prometheux.runFiles", uri("broken"));
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "error", JSON.stringify(shown));
    assert.match(shown.message, /broken\/no_output\.vada/);
  });

  test("Validate checks the file with Foundry's parser and shows the problem in the editor", async () => {
    const document = await vscode.workspace.openTextDocument(uri("syntax/missing_dot.vada"));
    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand("prometheux.validate");
    const diagnostics = await waitFor(() => {
      const found = vscode.languages.getDiagnostics(document.uri).filter((d) => d.source === "Palantir Foundry");
      return found.length > 0 ? found : undefined;
    }, "a Foundry diagnostic");
    assert.ok(diagnostics[0].message.length > 0);
  });

  // ── The Local view ────────────────────────────────────────────────────────

  test("on a Foundry account the Local view shows only Files: the workspace tree, as in Explorer", async () => {
    api.local.refresh();
    const groups = await api.local.getChildren();
    assert.deepStrictEqual(groups.map((g) => g.label), ["Files"]);
    const top = await api.local.getChildren(groups[0]);
    const names = top.map((item) => item.label);
    for (const folder of ["broken", "ownership", "syntax", "wash"]) assert.ok(names.includes(folder), JSON.stringify(names));
    assert.ok(top.filter((i) => i.contextValue === "localFolder").every((i, n, all) => n === 0 || all[n - 1].label.localeCompare(i.label) <= 0));
    const wash = top.find((item) => item.label === "wash");
    const files = await api.local.getChildren(wash);
    assert.deepStrictEqual(files.map((f) => [f.label, f.contextValue]), [
      ["provenance.vada", "localFile.vadalog"],
      ["wash_sales.vada", "localFile.vadalog"],
    ]);
  });

  test("several items selected in the Local view run together", async () => {
    const [files] = await api.local.getChildren();
    const top = await api.local.getChildren(files);
    const wash = top.find((item) => item.label === "wash");
    const controls = (await api.local.getChildren(top.find((item) => item.label === "ownership")))[0];
    await vscode.commands.executeCommand("prometheux.runFiles", controls, [wash, controls]);
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "tables", JSON.stringify(shown));
    assert.match(shown.title, /3 programs/);
    assert.deepStrictEqual(table(shown, "Programs").rows.map((row) => row[2]), ["succeeded", "succeeded", "succeeded"]);
  });

  test("Run Vadalog is no longer in VS Code's own Explorer menu", () => {
    const menus = vscode.extensions.getExtension("prometheux.prometheux").packageJSON.contributes.menus;
    assert.strictEqual(menus["explorer/context"], undefined);
  });

  // ── Switching to a Prometheux account ─────────────────────────────────────

  test("switching to a Prometheux account sends the same Run there instead", async () => {
    const saved = await api.accountEditor.handle({
      type: "save",
      form: { name: "nowhere", platform: "prometheux", url: "http://127.0.0.1:9", token: "devtoken" },
      use: true,
    });
    assert.ok(saved.ok, saved.message);
    assert.strictEqual(api.accounts.active.account.platform, "prometheux");
    const before = (await requests()).length;
    await vscode.commands.executeCommand("prometheux.runFiles", uri("wash"));
    const shown = api.results.current;
    assert.strictEqual(shown?.type, "error", JSON.stringify(shown));
    if (!real) assert.strictEqual((await requests()).length, before, "nothing went to Foundry");
  });

  test("on a Prometheux account the Local view lists downloaded ontologies too", async () => {
    api.local.refresh();
    assert.deepStrictEqual((await api.local.getChildren()).map((g) => g.label), ["Ontologies", "Files"]);
  });

  test("deleting an account removes it; the active account falls back to another", async () => {
    const nowhere = api.accounts.all.find((account) => account.name === "nowhere");
    await api.accounts.remove(nowhere.id);
    assert.ok(!api.accounts.all.some((account) => account.name === "nowhere"));
    assert.strictEqual(api.accounts.active.account.platform, "foundry");
  });
}

exports.run = () => {
  const mocha = new Mocha({ ui: "tdd", timeout: 300_000, color: true });
  mocha.suite.emit("pre-require", global, "suite", mocha);
  suite("Accounts and Palantir Foundry", tests);
  return new Promise((resolve, reject) => {
    mocha.run((failures) => (failures ? reject(new Error(`${failures} test(s) failed`)) : resolve()));
  });
};
