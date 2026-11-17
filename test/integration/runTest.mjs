// Runs the integration suite in a real VS Code against a Prometheux backend.
// Defaults to a local development jarvispy: JARVISPY_URL=http://localhost:8000, PMTX_TOKEN=devtoken.
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { runTests } from "@vscode/test-electron";
import { startFakePlatform } from "./fakePlatform.mjs";

const root = resolve(import.meta.dirname, "../..");
const backend = process.env.JARVISPY_URL ?? "http://localhost:8000";
process.env.PMTX_TOKEN ??= "devtoken";
// Fakes the compute pool machines (starting real ones costs money) and
// forwards everything else to the backend.
const platform = await startFakePlatform(backend);
process.env.JARVISPY_URL = platform.url;
// Keep the developer's own `px login` credentials out of the test run.
process.env.PROMETHEUX_HOME = mkdtempSync(join(tmpdir(), "px-home-"));

// The workspace: one loose Vadalog file, and settings pointing at the fake px
// (PX_REAL=1 uses the real px CLI instead).
const workspace = mkdtempSync(join(tmpdir(), "px-ws-"));
mkdirSync(join(workspace, "scratch"));
writeFileSync(join(workspace, "scratch", "hello.vada"), 'hello("world").\nhi(X) :- hello(X).\n@output("hi").\n');
// Two independent programs, run together as a folder.
mkdirSync(join(workspace, "modules"));
writeFileSync(join(workspace, "modules", "first.vada"), 'a(1).\na(2).\nfirst(X) :- a(X).\n@output("first").\n');
writeFileSync(join(workspace, "modules", "second.vada"), 'b("x").\nsecond(X) :- b(X).\n@output("second").\n');
mkdirSync(join(workspace, ".vscode"));
writeFileSync(
  join(workspace, ".vscode", "settings.json"),
  JSON.stringify({
    "prometheux.pxPath": process.env.PX_REAL ? "px" : join(root, "test/integration/fakePx.cjs"),
    // Left over from Vadacode: must be migrated to "vadalog".
    "files.associations": { "*.vadalog": "datalogpm", "*.foo": "plaintext" },
  }),
);
process.env.PX_REAL_TEST = process.env.PX_REAL ? "1" : "";

try {
  await runTests({
    extensionDevelopmentPath: root,
    extensionTestsPath: join(root, "test/integration/suite.cjs"),
    launchArgs: ["--disable-extensions", "--disable-workspace-trust", workspace],
  });
} catch {
  console.error("FAIL: integration tests failed");
  process.exit(1);
} finally {
  platform.close();
}
