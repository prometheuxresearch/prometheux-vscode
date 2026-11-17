// Unit tests for src/accounts/model.ts (bundled to out/unit/run.cjs by `npm run test:unit`):
// what an account is, how the form is checked, which account is active, and the migration from
// the single-connection settings.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const { accountFromForm, chooseActive, cloudUrlFromToken, detectedAccounts, dropDuplicates, migrateLegacy } = createRequire(import.meta.url)(
  "../../out/unit/run.cjs",
);

const ids = () => {
  let n = 0;
  return () => `id-${++n}`;
};
const jwt = (claims) => `x.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.y`;
const GLOBEX = { name: "Globex", platform: "foundry", url: "https://globex.palantirfoundry.com/", ontology: "ri.ontology.main.ontology.1", functionSuffix: "", token: "t" };

// ── The form ────────────────────────────────────────────────────────────────

test("a Foundry account needs a name, an https URL, an ontology and a token; the suffix defaults to PX", () => {
  const ok = accountFromForm(GLOBEX, undefined, ids());
  assert.deepEqual(ok, {
    account: { id: "id-1", name: "Globex", platform: "foundry", url: "https://globex.palantirfoundry.com", ontology: "ri.ontology.main.ontology.1", functionSuffix: "PX" },
    keepToken: false,
  });
  assert.match(accountFromForm({ ...GLOBEX, name: " " }, undefined, ids()).problem, /name/);
  assert.match(accountFromForm({ ...GLOBEX, ontology: "" }, undefined, ids()).problem, /ontology/);
  assert.match(accountFromForm({ ...GLOBEX, url: "http://globex.example" }, undefined, ids()).problem, /https/);
  assert.match(accountFromForm({ ...GLOBEX, token: "" }, undefined, ids()).problem, /token/);
});

test("a Prometheux Cloud account can leave the URL empty: it comes from the API key", () => {
  const key = jwt({ organization: "acme", username: "ana" });
  const result = accountFromForm({ name: "personal", platform: "prometheux", url: "", token: key }, undefined, ids());
  assert.equal(result.account.url, "https://api.prometheux.ai/jarvispy/acme/ana");
  assert.equal(result.account.ontology, undefined);
  assert.equal(cloudUrlFromToken("not-a-jwt"), undefined);
});

test("editing keeps the saved token only while the URL stays the same", () => {
  const saved = { id: "a1", name: "staging", platform: "prometheux", url: "https://staging.example/api" };
  const same = accountFromForm({ name: "staging 2", platform: "prometheux", url: "https://staging.example/api/", token: "" }, saved, ids());
  assert.deepEqual(same, { account: { ...saved, name: "staging 2" }, keepToken: true });
  const moved = accountFromForm({ name: "staging", platform: "prometheux", url: "https://evil.example/api", token: "" }, saved, ids());
  assert.match(moved.problem, /The URL changed: enter the token again/);
});

// ── Which account is active ─────────────────────────────────────────────────

test("accounts are detected from the environment and px login", () => {
  const found = detectedAccounts(
    { JARVISPY_URL: "http://localhost:8000/", PMTX_TOKEN: "devtoken", FOUNDRY_URL: "https://f.example", FOUNDRY_TOKEN: "ft", FOUNDRY_ONTOLOGY: "o" },
    { url: "https://api.prometheux.ai/jarvispy/a/b", token: "px" },
  );
  assert.deepEqual(found.map((a) => [a.id, a.platform, a.url, a.source]), [
    ["env:prometheux", "prometheux", "http://localhost:8000", "environment"],
    ["px-cli", "prometheux", "https://api.prometheux.ai/jarvispy/a/b", "px-cli"],
    ["env:foundry", "foundry", "https://f.example", "environment"],
  ]);
  assert.deepEqual(detectedAccounts({ FOUNDRY_URL: "https://f.example", FOUNDRY_TOKEN: "ft" }, undefined), []);
});

test("the active account: this workspace's choice, else the last choice, else the first added, else a detected one", () => {
  const added = [{ id: "a", source: "stored" }, { id: "b", source: "stored" }];
  const detected = [{ id: "env:prometheux", source: "environment" }];
  const all = [...added, ...detected];
  assert.equal(chooseActive(all, "b", "a").id, "b");
  assert.equal(chooseActive(all, "deleted", "a").id, "a");
  assert.equal(chooseActive(all, undefined, undefined).id, "a");
  assert.equal(chooseActive(detected, undefined, undefined).id, "env:prometheux");
  assert.equal(chooseActive([], "a", "a"), undefined);
});

// ── Migration from the single-connection settings ───────────────────────────

test("the old Prometheux and Foundry connections become two accounts; runTarget picks the active one", () => {
  const migrated = migrateLegacy(
    {
      prometheux: { url: "https://api.prometheux.ai/jarvispy/acme/ana", token: "pt" },
      foundry: { url: "https://globex.palantirfoundry.com", ontology: "ri.o", token: "ft" },
      runTarget: "foundry",
    },
    ids(),
  );
  assert.deepEqual(migrated.accounts.map((a) => [a.id, a.name, a.platform]), [
    ["id-1", "Prometheux Cloud", "prometheux"],
    ["id-2", "globex", "foundry"],
  ]);
  assert.deepEqual(migrated.tokens, { "id-1": "pt", "id-2": "ft" });
  assert.equal(migrated.active, "id-2");
  assert.equal(migrateLegacy({ prometheux: { url: "http://localhost:8000", token: "devtoken" } }, ids()).accounts[0].name, "Local development");
  assert.deepEqual(migrateLegacy({}, ids()), { accounts: [], tokens: {}, active: undefined });
});

test("copies of an account (same platform, URL, ontology and name) are dropped; the first one stays", () => {
  const acme = { platform: "prometheux", url: "https://acme.example.com", name: "acme.example.com" };
  const globex = { platform: "foundry", url: "https://globex.example", ontology: "ri.o", name: "globex" };
  const accounts = [
    { id: "a1", ...acme }, { id: "s1", ...globex },
    { id: "a2", ...acme }, { id: "s2", ...globex },
    { id: "a3", ...acme }, { id: "s3", ...globex },
    { id: "a4", ...acme, name: "acme (admin)" },
  ];
  const { keep, dropped } = dropDuplicates(accounts);
  assert.deepEqual(keep.map((a) => a.id), ["a1", "s1", "a4"]);
  assert.deepEqual(dropped, ["a2", "s2", "a3", "s3"]);
});
