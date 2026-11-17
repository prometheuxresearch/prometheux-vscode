// Unit tests for src/fileExclude.ts (bundled to out/unit/run.cjs by `npm run test:unit`): the
// Local view's Files tree hides what Explorer hides.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const { excludeMatcher } = createRequire(import.meta.url)("../../out/unit/run.cjs");

test("files.exclude: ** patterns hide at any depth, others from the root, false ones are ignored", () => {
  const excluded = excludeMatcher({
    "**/.git": true,
    "**/.DS_Store": true,
    "**/*.{pyc,class}": true,
    out: true,
    "**/node_modules": false,
    "**/*.tmp": { when: "$(basename).ts" },
  });
  for (const path of [".git", "a/b/.git", ".DS_Store", "x/.DS_Store", "m.pyc", "deep/A.class", "out"]) {
    assert.ok(excluded(path), `${path} should be hidden`);
  }
  for (const path of ["git", "a/.gitignore", "node_modules", "src/out", "outer", "notes.tmp", "wash/provenance.vada"]) {
    assert.ok(!excluded(path), `${path} should show`);
  }
});
