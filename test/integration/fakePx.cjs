#!/usr/bin/env node
// Stand-in for the px CLI in the integration tests. `px pull <id> --out <dir>
// --slug <slug>` writes the same layout as the real command and records its
// arguments and connection in <dir>/.fake-px.json.
const fs = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);
const option = (name) => args[args.indexOf(name) + 1];
const record = (out) =>
  fs.appendFileSync(
    path.join(out, ".fake-px.log"),
    `${JSON.stringify({ args, url: process.env.JARVISPY_URL, hasToken: !!process.env.PMTX_TOKEN })}\n`,
  );

if (args[0] === "plan" || args[0] === "apply") {
  // `px plan|apply [--yes] <root> --ontology <id>`
  const root = args.find((arg, index) => index > 0 && !arg.startsWith("-") && args[index - 1] !== "--ontology");
  record(root);
  const concept = path.join(root, "ontologies", "smoke-download", "concepts", "smoke.vadalog");
  const changed = fs.readFileSync(concept, "utf8") !== "smoke(1).\n";
  console.log('Plan against ontology "Smoke Download"');
  if (changed) {
    console.log("  ~ concept smoke  update in-place (definition changed)\n");
    console.log("  Plan: 0 to create, 1 to update, 0 downstream re-run(s), 0 to destroy (withheld).\n");
    console.log(args[0] === "apply" ? "Applied." : "Run `px apply` to proceed. Nothing is deleted without --prune.");
  } else {
    console.log("  = 1 concept(s) unchanged\n");
    console.log("  Plan: 0 to create, 0 to update, 0 downstream re-run(s), 0 to destroy (withheld).\n");
    console.log("No changes. Local files match server state.");
  }
  process.exit(0);
}
if (args[0] !== "pull") {
  console.error(`fake px: unsupported command ${args[0]}`);
  process.exit(2);
}
const out = option("--out");
const slug = option("--slug");
const dir = path.join(out, "ontologies", slug);
fs.mkdirSync(path.join(dir, "concepts"), { recursive: true });
fs.writeFileSync(
  path.join(dir, "prometheux.yaml"),
  `schemaVersion: 1\nontology:\n  id: ${args[1]}\n  name: Smoke Download\nconcepts: ./concepts\n`,
);
fs.writeFileSync(path.join(dir, "concepts", "smoke.vadalog"), 'smoke(1).\n');
fs.writeFileSync(path.join(dir, "concepts", "smoke.meta.yaml"), "conceptType: logic\noutputPredicate: smoke\n");
fs.writeFileSync(
  path.join(out, ".fake-px.json"),
  JSON.stringify({ args, url: process.env.JARVISPY_URL, hasToken: !!process.env.PMTX_TOKEN }),
);
console.log(`Pulled 'Smoke Download' (${args[1]}) to ${dir}`);
