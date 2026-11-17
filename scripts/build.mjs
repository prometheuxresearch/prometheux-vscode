// Builds the extension into dist/:
//   extension.js         extension host (Node, CommonJS)
//   server.js            language server (compiled by tsc first: it relies on
//                        decorator metadata, which esbuild does not emit)
//   webview/results.js   Results panel script (browser)
//   webview/accountForm.js  Add / Edit Account form script (browser)
//   notebookRenderer.js  notebook output renderer (browser, ESM)
// Usage: node scripts/build.mjs [--production] [--watch]
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import * as esbuild from "esbuild";

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

rmSync("dist", { recursive: true, force: true });
execFileSync("npx", ["tsc", "-p", "server"], { stdio: "inherit" });

const common = { bundle: true, minify: production, sourcemap: !production, logLevel: "info" };
const builds = [
  {
    ...common,
    entryPoints: ["src/extension.ts"],
    outfile: "dist/extension.js",
    platform: "node",
    format: "cjs",
    target: "node22",
    external: ["vscode"],
  },
  {
    ...common,
    entryPoints: ["out/tsc/server/src/server.js"],
    outfile: "dist/server.js",
    platform: "node",
    format: "cjs",
    target: "node22",
  },
  {
    ...common,
    entryPoints: ["src/webview/results.ts"],
    outfile: "dist/webview/results.js",
    platform: "browser",
    format: "iife",
    target: "es2022",
  },
  {
    ...common,
    entryPoints: ["src/webview/accountForm.ts"],
    outfile: "dist/webview/accountForm.js",
    platform: "browser",
    format: "iife",
    target: "es2022",
  },
  {
    ...common,
    entryPoints: ["src/webview/notebookRenderer.ts"],
    outfile: "dist/notebookRenderer.js",
    platform: "browser",
    format: "esm",
    target: "es2022",
  },
];

if (watch) {
  for (const options of builds) await (await esbuild.context(options)).watch();
  console.log("Watching src/ (rerun the build after changing server/ or parser/).");
} else {
  await Promise.all(builds.map((options) => esbuild.build(options)));
}
