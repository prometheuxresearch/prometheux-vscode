// Parses .vada files with the extension's language server and reports
// syntax errors (lexer/parser), so dialect gaps with the Prometheux engine
// show up. Usage: node scripts/parse-check.js <file-or-dir>...
require("reflect-metadata");
const fs = require("fs");
const path = require("path");
const { TextDocument } = require("vscode-languageserver-textdocument");
const { DatalogpmDocument } = require("../out/tsc/server/src/datalogpm/datalogpm-document");

function* walk(p) {
  const st = fs.statSync(p);
  if (st.isFile()) { if (p.endsWith(".vada")) yield p; return; }
  for (const e of fs.readdirSync(p)) {
    if (e === "node_modules" || e.startsWith(".")) continue;
    yield* walk(path.join(p, e));
  }
}

let files = 0, bad = 0;
const messages = new Map();
for (const arg of process.argv.slice(2)) {
  for (const file of walk(arg)) {
    files++;
    let doc;
    try {
      doc = new DatalogpmDocument(TextDocument.create("file://" + file, "vadalog", 0, fs.readFileSync(file, "utf8")));
    } catch (error) {
      bad++;
      const key = `CRASH ${String(error.message).slice(0, 80)}`;
      if (!messages.has(key)) messages.set(key, file);
      continue;
    }
    const errors = (doc.diagnostics || []).filter((d) => d.severity === 1 && /^(Missing|Unexpected|Parsing error|Mismatched|Extraneous|No viable)/i.test(d.message));
    if (errors.length) {
      bad++;
      for (const e of errors.slice(0, 3)) {
        const key = e.message.slice(0, 90);
        if (!messages.has(key)) messages.set(key, `${file}:${e.range.start.line + 1}`);
      }
    }
  }
}
for (const [m, where] of messages) console.log(`- ${m}\n    first at ${where}`);
console.log(`${bad ? "FAIL" : "PASS"}: ${files - bad}/${files} files parse cleanly`);
process.exit(bad ? 1 : 0);
