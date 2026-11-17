// Accounts: the platforms the extension can talk to, one of them active. No `vscode` import:
// the unit tests bundle this file.

export type Platform = "prometheux" | "foundry";

/** What is stored for an account (never its token, which lives in VS Code's secret storage). */
export interface Account {
  id: string;
  name: string;
  platform: Platform;
  // Prometheux: the API URL (the SDKs' JARVISPY_URL). Foundry: the Foundry URL.
  url: string;
  // Foundry only: the ontology the Prometheux functions are registered in (RID or API name).
  ontology?: string;
  // Foundry only: suffix of the functions' API names (runPX, analyzePX, ...).
  functionSuffix?: string;
}

/** Where an account came from: added in VS Code, or found in the environment / px login. */
export type AccountSource = "stored" | "environment" | "px-cli";

export interface AccountEntry extends Account {
  source: AccountSource;
  // Detected accounts carry their token with them; stored ones read it from secret storage.
  token?: string;
}

export const PLATFORM_LABELS: Record<Platform, string> = { prometheux: "Prometheux", foundry: "Palantir Foundry" };
export const CLOUD_API = "https://api.prometheux.ai/jarvispy";
export const LOCAL_URL = "http://localhost:8000";

export function normalizeUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/** Organization and username claims of a Prometheux Cloud API key, when it is a JWT that has them. */
export function tokenClaims(token: string): { organization: string; username: string } | undefined {
  const payload = token.split(".")[1];
  if (!payload) return undefined;
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof claims.organization === "string" && typeof claims.username === "string") {
      return { organization: claims.organization, username: claims.username };
    }
  } catch {
    // Not a JWT.
  }
  return undefined;
}

/** The Prometheux Cloud URL an API key belongs to, if the key says. */
export function cloudUrlFromToken(token: string): string | undefined {
  const claims = tokenClaims(token.trim());
  return claims ? `${CLOUD_API}/${claims.organization}/${claims.username}` : undefined;
}

/** The account form's fields, as the user typed them. */
export interface AccountForm {
  id?: string;
  name: string;
  platform: Platform;
  url: string;
  ontology?: string;
  functionSuffix?: string;
  // Empty when editing means "keep the saved token".
  token: string;
}

/**
 * Checks a form and turns it into an account. `previous` is the saved account when editing:
 * its token may be kept only while the URL stays the same, so a token never reaches another
 * server. Returns the problem to show instead when the form is not complete.
 */
export function accountFromForm(
  form: AccountForm,
  previous: Account | undefined,
  newId: () => string,
): { account: Account; keepToken: boolean } | { problem: string } {
  const name = form.name.trim();
  if (!name) return { problem: "Give the account a name, e.g. staging or Globex." };
  const token = form.token.trim();
  let url = normalizeUrl(form.url);
  if (!url && form.platform === "prometheux" && token) url = cloudUrlFromToken(token) ?? "";
  if (!url) {
    return {
      problem:
        form.platform === "foundry"
          ? "Enter the Foundry URL, e.g. https://acme.palantirfoundry.com"
          : "Enter the API URL, e.g. https://api.prometheux.ai/jarvispy/<organization>/<username>",
    };
  }
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return { problem: "The URL must start with https://" };
    const local = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    if (form.platform === "foundry" && parsed.protocol !== "https:" && !local) {
      return { problem: "The Foundry URL must start with https://" };
    }
  } catch {
    return { problem: `"${url}" is not a URL.` };
  }
  const ontology = form.ontology?.trim() ?? "";
  if (form.platform === "foundry" && !ontology) {
    return { problem: "Enter the ontology the Prometheux functions are registered in (its RID or API name)." };
  }
  const sameServer = previous !== undefined && previous.platform === form.platform && previous.url === url;
  if (!token && !sameServer) {
    return {
      problem: previous
        ? "The URL changed: enter the token again (a token is only sent to the server it was given for)."
        : "Enter the token.",
    };
  }
  const account: Account = {
    id: previous?.id ?? form.id ?? newId(),
    name,
    platform: form.platform,
    url,
    ...(form.platform === "foundry" ? { ontology, functionSuffix: form.functionSuffix?.trim() || "PX" } : {}),
  };
  return { account, keepToken: !token };
}

/** Accounts found outside VS Code: environment variables and `px login`. */
export function detectedAccounts(
  env: Record<string, string | undefined>,
  pxLogin: { url: string; token: string } | undefined,
): AccountEntry[] {
  const found: AccountEntry[] = [];
  if (env.JARVISPY_URL && env.PMTX_TOKEN) {
    found.push({
      id: "env:prometheux",
      name: "JARVISPY_URL (environment)",
      platform: "prometheux",
      url: normalizeUrl(env.JARVISPY_URL),
      token: env.PMTX_TOKEN,
      source: "environment",
    });
  }
  if (pxLogin) {
    found.push({ id: "px-cli", name: "px login", platform: "prometheux", url: normalizeUrl(pxLogin.url), token: pxLogin.token, source: "px-cli" });
  }
  if (env.FOUNDRY_URL && env.FOUNDRY_TOKEN && env.FOUNDRY_ONTOLOGY) {
    found.push({
      id: "env:foundry",
      name: "FOUNDRY_URL (environment)",
      platform: "foundry",
      url: normalizeUrl(env.FOUNDRY_URL),
      ontology: env.FOUNDRY_ONTOLOGY,
      functionSuffix: env.FOUNDRY_FUNCTION_SUFFIX || "PX",
      token: env.FOUNDRY_TOKEN,
      source: "environment",
    });
  }
  return found;
}

/**
 * The active account: this workspace's choice, else the last one chosen anywhere, else the first
 * added account, else the first detected one.
 */
export function chooseActive(
  accounts: AccountEntry[],
  workspaceChoice: string | undefined,
  globalChoice: string | undefined,
): AccountEntry | undefined {
  const byId = (id: string | undefined) => (id ? accounts.find((account) => account.id === id) : undefined);
  return (
    byId(workspaceChoice) ??
    byId(globalChoice) ??
    accounts.find((account) => account.source === "stored") ??
    accounts[0]
  );
}

/** Settings and secrets of the single-connection versions, turned into accounts once. */
export interface LegacyConnections {
  prometheux?: { url: string; token: string };
  foundry?: { url: string; ontology: string; token: string; functionSuffix?: string };
  runTarget?: string;
}

export function migrateLegacy(
  legacy: LegacyConnections,
  newId: () => string,
): { accounts: Account[]; tokens: Record<string, string>; active?: string } {
  const accounts: Account[] = [];
  const tokens: Record<string, string> = {};
  let prometheuxId: string | undefined;
  let foundryId: string | undefined;
  if (legacy.prometheux) {
    prometheuxId = newId();
    const url = normalizeUrl(legacy.prometheux.url);
    const name = url.startsWith(CLOUD_API) ? "Prometheux Cloud" : url === LOCAL_URL ? "Local development" : new URL(url).host;
    accounts.push({ id: prometheuxId, name, platform: "prometheux", url });
    tokens[prometheuxId] = legacy.prometheux.token;
  }
  if (legacy.foundry) {
    foundryId = newId();
    const url = normalizeUrl(legacy.foundry.url);
    accounts.push({
      id: foundryId,
      name: new URL(url).host.split(".")[0] || "Palantir Foundry",
      platform: "foundry",
      url,
      ontology: legacy.foundry.ontology,
      functionSuffix: legacy.foundry.functionSuffix || "PX",
    });
    tokens[foundryId] = legacy.foundry.token;
  }
  const active = legacy.runTarget === "foundry" && foundryId ? foundryId : (prometheuxId ?? foundryId);
  return { accounts, tokens, active };
}

/** Two accounts are the same when they reach the same place: platform, URL and ontology. */
export function sameAccount(a: Account, b: Account): boolean {
  return a.platform === b.platform && a.url === b.url && (a.ontology ?? "") === (b.ontology ?? "");
}

/**
 * Removes accounts that are copies of an earlier one with the same name (an early version of the
 * migration could add the old sign-ins more than once). Returns the accounts to keep and the ids
 * dropped, whose tokens should be deleted.
 */
export function dropDuplicates(accounts: Account[]): { keep: Account[]; dropped: string[] } {
  const keep: Account[] = [];
  const dropped: string[] = [];
  for (const account of accounts) {
    if (keep.some((kept) => sameAccount(kept, account) && kept.name === account.name)) dropped.push(account.id);
    else keep.push(account);
  }
  return { keep, dropped };
}

/** "staging · Prometheux · api.prometheux.ai" */
export function describeAccount(account: Account): string {
  let host = account.url;
  try {
    host = new URL(account.url).host;
  } catch {
    // Keep the raw URL.
  }
  return `${PLATFORM_LABELS[account.platform]} · ${host}`;
}
