// Runs the Palantir Foundry and accounts suite in a real VS Code. By default against fakeFoundry.mjs; set
// FOUNDRY_URL + FOUNDRY_TOKEN + FOUNDRY_ONTOLOGY to run it against a real Foundry (or anything
// serving its execute-query API with the Prometheux functions) instead. FOUNDRY_TEST_BIND sets
// the datasource the test programs hand data over with ("<type>|<path>", default the fake's
// "iceberg|foundry.test.ice"; e.g. "parquet|disk/vscode-foundry-test" for a local engine).
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { runTests } from "@vscode/test-electron";
import { FAKE_ONTOLOGY, FAKE_TOKEN, startFakeFoundry } from "./fakeFoundry.mjs";

const root = resolve(import.meta.dirname, "../..");
const real = !!process.env.FOUNDRY_URL;
const fake = real ? undefined : await startFakeFoundry();
if (fake) {
  process.env.FOUNDRY_URL = fake.url;
  process.env.FOUNDRY_TOKEN = FAKE_TOKEN;
  process.env.FOUNDRY_ONTOLOGY = FAKE_ONTOLOGY;
}
process.env.FOUNDRY_TEST_REAL = real ? "1" : "";
// Keep the developer's own Prometheux credentials out of the test run.
process.env.PROMETHEUX_HOME = mkdtempSync(join(tmpdir(), "px-home-"));
delete process.env.JARVISPY_URL;
delete process.env.PMTX_TOKEN;

const [bindType, bindPath] = (process.env.FOUNDRY_TEST_BIND ?? "iceberg|foundry.test.ice").split("|");
const table = `t${Date.now()}`;
const workspace = mkdtempSync(join(tmpdir(), "px-foundry-ws-"));
const write = (path, text) => {
  mkdirSync(join(workspace, path, ".."), { recursive: true });
  writeFileSync(join(workspace, path), text);
};
// Two linked programs (provenance uses washMatch, which wash_sales writes to a table) and an
// independent one.
write(
  "wash/wash_sales.vada",
  [
    'sale("S1", 2000).',
    'sale("S2", 1500).',
    'repl("S1", "B2").',
    'repl("S2", "B3").',
    "washMatch(S, B, D) <- sale(S, D), repl(S, B).",
    `@model("washMatch", "['SellId:string','ReplacementBuy:string','LossDisallowed:int']").`,
    `@bind("washMatch", "${bindType}", "${bindPath}", "${table}").`,
    '@output("washMatch").',
    "",
  ].join("\n"),
);
write(
  "wash/provenance.vada",
  'washMatchExplanation(S, E) <- washMatch(S, B, D), E = concat(S, " -> ", B).\n@output("washMatchExplanation").\n',
);
write("ownership/controls.vada", 'own("c1", "c2", 0.6).\nown("c2", "c3", 0.4).\ncontrols(X, Y) <- own(X, Y, S), S > 0.5.\n@output("controls").\n');
write("broken/no_output.vada", 'p(1).\nq(X) <- p(X).\n');
write("syntax/missing_dot.vada", 'p(1)\nq(X) <- p(X).\n@output("q").\n');

try {
  await runTests({
    extensionDevelopmentPath: root,
    extensionTestsPath: join(root, "test/integration/foundrySuite.cjs"),
    launchArgs: ["--disable-extensions", "--disable-workspace-trust", workspace],
  });
} catch {
  console.error("FAIL: Foundry integration tests failed");
  process.exitCode = 1;
} finally {
  fake?.close();
}
