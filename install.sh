#!/usr/bin/env bash
# Builds the extension from this checkout and installs it into VS Code (or Cursor / VSCodium).
#
#   ./install.sh              install into the first editor found: code, cursor, codium
#   EDITOR_CLI=cursor ./install.sh   install into a specific one
#
# Needs Node.js 22+ and npm. Replaces an installed version of the extension; your accounts and
# tokens are kept (they live in the editor's storage, not in the extension).
set -euo pipefail

cd "$(dirname "$0")"

fail() {
  echo "✖ $*" >&2
  exit 1
}

command -v node >/dev/null || fail "Node.js is not installed. Install Node.js 22 or later: https://nodejs.org"
command -v npm >/dev/null || fail "npm is not installed (it comes with Node.js: https://nodejs.org)"
node_major="$(node -p 'process.versions.node.split(".")[0]')"
[ "$node_major" -ge 22 ] || fail "Node.js $(node -v) is too old: this needs Node.js 22 or later."

if [ -n "${EDITOR_CLI:-}" ]; then
  editor="$EDITOR_CLI"
  command -v "$editor" >/dev/null || fail "'$editor' (EDITOR_CLI) was not found on your PATH."
else
  editor=""
  for candidate in code cursor codium; do
    if command -v "$candidate" >/dev/null; then
      editor="$candidate"
      break
    fi
  done
  [ -n "$editor" ] || fail "No editor command line found (code, cursor or codium).
  In VS Code: Cmd/Ctrl+Shift+P → 'Shell Command: Install 'code' command in PATH', then open a new terminal."
fi

version="$(node -p 'require("./package.json").version')"
vsix="build/prometheux-${version}.vsix"

echo "▶ Installing dependencies (npm ci)…"
npm ci --no-audit --no-fund --loglevel=error

echo "▶ Building and packaging ${vsix}…"
npm run --silent package >/dev/null
[ -f "$vsix" ] || fail "Packaging did not produce ${vsix}."

echo "▶ Installing into ${editor}…"
"$editor" --install-extension "$vsix" --force

echo
echo "✔ Prometheux ${version} installed into ${editor}."
echo "  In the editor: Cmd/Ctrl+Shift+P → 'Developer: Reload Window' (or restart it),"
echo "  then open the Prometheux view in the activity bar and add an account."
