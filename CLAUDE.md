# prometheux-vscode

VS Code extension for Prometheux. Based on Vadacode (Banca d'Italia, SSPL-1.0); see NOTICE.md.

## Rules

- Files that came from Vadacode keep their SSPL header. When you change one, add or extend the
  `// Modified by Prometheux Limited, <year>: <what>.` line under the copyright, and update the
  table in NOTICE.md. New files outside `src/vadacode/`, `server/`, `parser/` have no SSPL header.
- Talk to the platform only through the `prometheux-chain` SDK (vendored in `vendor/`). If the SDK
  lacks an endpoint, add it to `../prometheux-chain-ts` and run `npm run sdk:update`. The one
  exception is Palantir Foundry (`src/foundry/client.ts`), which is not our platform: it calls
  Foundry's execute-query API for the gateway's compute-module functions.
- `src/run/programPlan.ts` is the same planning as the `runProgramsPX` Foundry function
  (`typescript-functions/src/functions/programPlan.ts` in the Foundry functions repository).
  Change both together.
- Concept text: read `parsed.code`; save with the existing `parsed.binds`, `outputPredicate`,
  `existingName` and `forceOverwrite` (the px CLI's write contract, see `src/conceptFileSystem.ts`).
  The `concept` field of a listed concept is its name, not its body.
- Accounts (`src/accounts/`) own every URL + token: tokens only in SecretStorage, keyed by account
  id; a token is only sent to its own account's URL (editing the URL requires the token again);
  detected accounts (env, px login) carry their own pair. Code that talks to a platform gets its
  client from the active account (`ConnectionManager` for Prometheux, the backend for Foundry).
- `src/results/` is bundled into webviews: no `vscode` or Node imports there. Render values with
  `textContent`, never `innerHTML`.
- The server is compiled with `tsc` before esbuild because typedi needs decorator metadata.
- `src/programAssembly.ts` mirrors jarvispy's `VadalogConceptExecutor.execute_step_by_step`
  (app/executors/vadalog_executor.py), except that local Vadalog files take priority over stored
  platform results: upstream concepts are inlined (with helper renaming and leading-column arity
  adapters). If the platform changes how it builds a run, update the module and
  `test/unit/programAssembly.test.mjs`. Never include the concept's own output bind: a local
  evaluation must not write platform results. Never print credentials: use `maskSecrets`.

## Checks before committing

```bash
npm run typecheck && npm test && npm run build
npm run test:integration   # needs a backend: JARVISPY_URL / PMTX_TOKEN, default local devtoken
npm run test:foundry       # after src/accounts, src/run or src/foundry changes; fake Foundry by default
npm run check:dialect      # after grammar changes; the pass count must not drop
```
