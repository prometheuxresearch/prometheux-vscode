# Notices

This extension is based on **Vadacode** (https://github.com/bancaditalia/vadacode),
Copyright (c) 2023-present Banca d'Italia, licensed under the Server Side Public License,
version 1 (SSPL-1.0). The full license text is in [LICENSE](LICENSE). Vadacode's authors are
listed in [resources/VADACODE_AUTHORS.md](resources/VADACODE_AUTHORS.md).

## What comes from Vadacode

| Here | Vadacode source | Changes by Prometheux Limited (2026) |
| --- | --- | --- |
| `parser/` | `datalogpm-parser/` | Grammar: `${param}` terms, n-ary `concat`, `<-` implication. Single regenerate script. |
| `server/` | `server/` | Language id `vadalog`; command, notification and settings ids renamed to `prometheux`; analysis failures keep syntax diagnostics instead of crashing; import paths. |
| `syntaxes/` | `syntaxes/` | Scopes renamed to `source.vadalog`; `${param}` and `<-` highlighting. |
| `language-configuration.json` | `datalogpm-language-configuration.json` | Renamed. |
| `src/vadacode/` | `client/src/` | Language client for one bundled server and `prometheux:` documents, diagnostics gated by a setting; notebook kernel and binding checks run on the Prometheux platform; local CSV/Parquet binding generators removed. |
| `samples/` | `samples/` | Unchanged. |

Every modified source file carries a "Modified by Prometheux Limited" line under its original
copyright header.

Not carried over: the Angular results webview, the Shoelace notebook renderer (replaced by
`src/results/`), the Copilot chat participant and instructions, the log file watcher, and the CSV /
Parquet "Add to @input" commands.

## Everything else

The code under `src/` outside `src/vadacode/`, `scripts/`, `test/` and `resources/walkthrough/`
was written for this extension by Prometheux Limited.
