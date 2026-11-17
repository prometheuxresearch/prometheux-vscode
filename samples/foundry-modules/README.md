# Test folder: running several Vadalog files on Palantir Foundry

With a Palantir Foundry account active, open the Prometheux view → Local → Files, right-click this folder → **Run Vadalog**. All 7 files run, each in its own engine call.

| File | Kind | Output | Expected rows |
|---|---|---|---|
| `01_org_chart.vada` | independent (recursion) | `manages` | 13 pairs, e.g. `ceo → eva`, `carla → ana` |
| `02_route_reachability.vada` | independent (recursion + `mmin`) | `fewest_legs` | 13 rows, e.g. `lisbon → warsaw` in 4 legs |
| `03_credit_limits.vada` | independent (arithmetic) | `over_limit` | `c1 Acme 2000`, `c3 Initech 100` |
| `10_positions.vada` | chain step 1, **writes Iceberg** `px_test_positions` | `position` | none returned (the rows go to the table) |
| `11_exposure.vada` | reads `position` (10), **writes Iceberg** `px_test_exposure` | `exposure` | none returned (the rows go to the table) |
| `12_alerts.vada` | reads `exposure` (11) | `alert` | `acc1 31900 above threshold` |
| `13_account_summary.vada` | reads `position` (10) **and** `exposure` (11) | `account_summary` | `acc1 2 31900`, `acc2 2 10700` |

What to look for in the **Programs** table:

- 01, 02, 03 and 10 start together (nothing to wait for).
- 11 runs after 10; 12 after 11; 13 after both 10 and 11 ("runs after").
- 11, 12 and 13 never bind `position` / `exposure` themselves: "reads from upstream" shows the
  extension added the upstream file's `@bind` + `@model` (the Prometheux log shows the programs as sent).

Try breaking it:

- Remove the `@bind` line from `10_positions.vada` → the run stops before starting:
  *exposure reads "position" from position, but position does not write it anywhere*.
- Remove `@output` from any file → the run stops and names the file.
- Make 11 fail (e.g. `price(S, P)` → `prices(S, P)`) → 12 and 13 are **skipped**, 01/02/03 still run.

10 and 11 create two tables in `globex > prometheux > ice` (`px_test_positions`,
`px_test_exposure`), overwritten on every run. Delete them when you're done.

Engine syntax notes (checked on the engine, the docs differ): aggregates take their contributor
keys in angle brackets, `msum(V, <S>)`; for "count distinct S" use `msum(1, <S>)`
(`mcount(<S>)` and `msum(V, [S])` don't parse).
