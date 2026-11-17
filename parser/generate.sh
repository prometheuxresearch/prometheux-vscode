#!/bin/bash
# Regenerates the TypeScript parser from grammar/Datalogpm.g4 (needs Java).
# The generated files are committed, so a normal build does not need this.
set -e
cd "$(dirname "$0")"
./bin/get-antlr.sh
./antlr4-generate.sh
for f in Lexer Listener Parser Visitor; do ./prepend.sh '//@ts-nocheck' "src/grammar/Datalogpm$f.ts"; done
rm -f src/grammar/*.interp src/grammar/*.tokens
