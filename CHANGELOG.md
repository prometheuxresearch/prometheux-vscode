# Changelog

## 0.1.0 (preview) — 2026-11-17

The first public preview of Prometheux for VS Code: write Vadalog with full language support and
run it on Prometheux or on the Prometheux engine inside Palantir Foundry.

### Accounts

- Add as many accounts as you work with, on **Prometheux** (Cloud, self-hosted / BYOC, local
  development) or **Palantir Foundry**, from a form with **Test connection**.
- Switch the active account from the status bar or the **Accounts** view; the whole extension
  follows it. The choice is remembered per workspace.
- Tokens are kept in VS Code's secret storage (your OS keychain) and only ever sent to the
  account they belong to.
- Picks up `px login`, `JARVISPY_URL` / `PMTX_TOKEN` and `FOUNDRY_URL` / `FOUNDRY_TOKEN` /
  `FOUNDRY_ONTOLOGY` as ready-made accounts.

### Run Vadalog files

- **Files** in the Prometheux view shows your workspace with a ▶ on every `.vada` / `.vadalog`
  file; `Cmd/Ctrl+Shift+Enter` runs the file open in the editor.
- Select several files and folders and **Run Vadalog** to run them together as modules: a file
  that uses another's `@output` runs after it and reads the table it writes; independent files
  run at the same time on Foundry, one after another on Prometheux.
- Results open in the **Results** panel: a **Programs** table (status, order, timing, tables
  written) and the rows of every `@output`.
- Problems are reported before anything runs: a file without `@output`, an output in two files, a
  cycle, or an output that is read but never written.

### Prometheux platform (Prometheux accounts)

- **Platform** view: browse ontologies and concepts, open them as files, edit and save, create,
  rename and delete concepts, run them with live status and paged results. All six concept types:
  Logic (`.vada`), SQL, Cypher, Python, LLM (`.llm.md`, settings as front matter) and Context
  (`.context.yaml`), in the same formats as `px pull`.
- **Local → Ontologies**: download an ontology into the workspace (`px pull`), edit it as files in
  git, review the changes (`px plan`) and apply them back (`px apply`, with a snapshot first).
  Running a downloaded concept uses your local copies of the concepts it depends on.
- **Compute** selector in the status bar: see your compute pool machines, start or stop them,
  choose the one runs use.

### Palantir Foundry (Foundry accounts)

- Runs files on the Prometheux engine deployed in your Foundry, through its `runPX` /
  `analyzePX` / `validatePX` / `stopEvaluationPX` functions.

### Language support

- Highlighting, hover, completion, signature help, go to definition, references, rename,
  outline and inlay hints for Vadalog, built on [Vadacode](https://github.com/bancaditalia/vadacode).
- Validation on save by the active account's own parser.
- Notebooks (`.pxnb`) with Vadalog cells and results as tables.

### Known limitations

- The local grammar does not cover the whole Prometheux dialect yet, so its diagnostics are off
  by default (`prometheux.languageServer.diagnostics`); highlighting, navigation and the
  platform's validator work regardless.
- On Foundry, each file must finish within Foundry's 5-minute function limit.
- Tested on macOS and Linux.
