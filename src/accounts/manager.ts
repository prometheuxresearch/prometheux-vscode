import { randomUUID } from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as vscode from "vscode";
import {
  type Account,
  type AccountEntry,
  chooseActive,
  detectedAccounts,
  dropDuplicates,
  type LegacyConnections,
  migrateLegacy,
  normalizeUrl,
  sameAccount,
} from "./model";

const ACCOUNTS_KEY = "prometheux.accounts";
const ACTIVE_KEY = "prometheux.activeAccount";
const MIGRATED_KEY = "prometheux.accounts.migrated";
// Set once the duplicates an early migration could create have been removed.
const DEDUPED_KEY = "prometheux.accounts.deduped";
const SECRET_PREFIX = "prometheux.account.token:";
// Where the single-connection versions kept their tokens (read once, by the migration).
const LEGACY_PROMETHEUX_SECRET = "prometheux.token:";
const LEGACY_FOUNDRY_SECRET = "prometheux.foundry.token:";

/** Reads `~/.prometheux/config.json`, the credential file `px login` writes. */
function readPxCliConfig(): { url: string; token: string } | undefined {
  const home = process.env.PROMETHEUX_HOME || path.join(os.homedir(), ".prometheux");
  try {
    const config = JSON.parse(fs.readFileSync(path.join(home, "config.json"), "utf8"));
    if (typeof config?.token !== "string" || !config.token) return undefined;
    const url = typeof config.url === "string" && config.url ? config.url : "http://localhost:8000";
    return { url: normalizeUrl(url), token: config.token };
  } catch {
    return undefined;
  }
}

/** The active account with its token: what the connections hand to the clients. */
export interface ActiveAccount {
  account: AccountEntry;
  token: string;
}

/**
 * The accounts: added ones (kept in the extension's global storage, tokens in VS Code's secret
 * storage) plus detected ones (JARVISPY_URL / PMTX_TOKEN, FOUNDRY_URL / FOUNDRY_TOKEN /
 * FOUNDRY_ONTOLOGY, px login). One is active: chosen per workspace, falling back to the last
 * choice anywhere.
 */
export class AccountManager implements vscode.Disposable {
  private readonly changed = new vscode.EventEmitter<ActiveAccount | undefined>();
  readonly onDidChange = this.changed.event;
  private entries: AccountEntry[] = [];
  private current: ActiveAccount | undefined;
  private readonly disposables: vscode.Disposable[] = [];
  // Reloads run one after another: overlapping ones (a token saved while reloading) must not
  // migrate twice.
  private reloading: Promise<unknown> = Promise.resolve();
  private migration: Promise<void> | undefined;

  constructor(
    private readonly secrets: vscode.SecretStorage,
    private readonly globalState: vscode.Memento,
    private readonly workspaceState: vscode.Memento,
  ) {
    this.disposables.push(
      this.changed,
      secrets.onDidChange((event) => {
        if (event.key.startsWith(SECRET_PREFIX)) void this.reload();
      }),
    );
  }

  /** Every account, added ones first. */
  get all(): AccountEntry[] {
    return this.entries;
  }

  /** The active account and its token; undefined when there is none or its token is missing. */
  get active(): ActiveAccount | undefined {
    return this.current;
  }

  private stored(): Account[] {
    return this.globalState.get<Account[]>(ACCOUNTS_KEY, []);
  }

  reload(): Promise<ActiveAccount | undefined> {
    const next = this.reloading.then(() => this.load(), () => this.load());
    this.reloading = next;
    return next;
  }

  private async load(): Promise<ActiveAccount | undefined> {
    this.migration ??= this.migrate();
    await this.migration;
    this.entries = [
      ...this.stored().map((account): AccountEntry => ({ ...account, source: "stored" })),
      ...detectedAccounts(process.env, readPxCliConfig()),
    ];
    const chosen = chooseActive(
      this.entries,
      this.workspaceState.get<string>(ACTIVE_KEY),
      this.globalState.get<string>(ACTIVE_KEY),
    );
    const token = chosen ? await this.token(chosen) : undefined;
    this.current = chosen && token ? { account: chosen, token } : undefined;
    await vscode.commands.executeCommand("setContext", "prometheux.platform", this.current?.account.platform ?? "none");
    this.changed.fire(this.current);
    return this.current;
  }

  async token(account: AccountEntry): Promise<string | undefined> {
    return account.source === "stored" ? this.secrets.get(SECRET_PREFIX + account.id) : account.token;
  }

  /** Adds or updates an account. Without a token the saved one is kept. */
  async save(account: Account, token: string | undefined): Promise<void> {
    if (token) await this.secrets.store(SECRET_PREFIX + account.id, token);
    const others = this.stored().filter((existing) => existing.id !== account.id);
    const index = this.stored().findIndex((existing) => existing.id === account.id);
    const next = [...others];
    next.splice(index < 0 ? next.length : index, 0, account);
    await this.globalState.update(ACCOUNTS_KEY, next);
    await this.reload();
  }

  async remove(id: string): Promise<void> {
    await this.globalState.update(ACCOUNTS_KEY, this.stored().filter((account) => account.id !== id));
    await this.secrets.delete(SECRET_PREFIX + id);
    if (this.globalState.get<string>(ACTIVE_KEY) === id) await this.globalState.update(ACTIVE_KEY, undefined);
    if (this.workspaceState.get<string>(ACTIVE_KEY) === id) await this.workspaceState.update(ACTIVE_KEY, undefined);
    await this.reload();
  }

  /** Makes an account active, in this workspace and as the default for new windows. */
  async use(id: string): Promise<void> {
    await this.globalState.update(ACTIVE_KEY, id);
    if (vscode.workspace.workspaceFolders?.length) await this.workspaceState.update(ACTIVE_KEY, id);
    await this.reload();
  }

  newId(): string {
    return randomUUID();
  }

  /**
   * The single-connection versions kept one Prometheux connection (`prometheux.apiUrl` + its
   * token) and one Foundry connection (`prometheux.foundry.*`). Turned into accounts once; the
   * old settings and secrets are left in place.
   */
  private async migrate(): Promise<void> {
    await this.removeDuplicates();
    if (this.globalState.get<boolean>(MIGRATED_KEY)) return;
    await this.globalState.update(MIGRATED_KEY, true);
    const config = vscode.workspace.getConfiguration("prometheux");
    const legacy: LegacyConnections = { runTarget: config.get<string>("runTarget") };
    const apiUrl = normalizeUrl(config.get<string>("apiUrl") ?? "");
    const apiToken = apiUrl ? await this.secrets.get(LEGACY_PROMETHEUX_SECRET + apiUrl) : undefined;
    if (apiUrl && apiToken) legacy.prometheux = { url: apiUrl, token: apiToken };
    const foundryUrl = normalizeUrl(config.get<string>("foundry.url") ?? "");
    const ontology = (config.get<string>("foundry.ontology") ?? "").trim();
    const foundryToken = foundryUrl ? await this.secrets.get(LEGACY_FOUNDRY_SECRET + foundryUrl) : undefined;
    if (foundryUrl && ontology && foundryToken) {
      legacy.foundry = { url: foundryUrl, ontology, token: foundryToken, functionSuffix: config.get<string>("foundry.functionSuffix") };
    }
    const migrated = migrateLegacy(legacy, () => this.newId());
    const existing = this.stored();
    const added = migrated.accounts.filter((account) => !existing.some((other) => sameAccount(other, account)));
    if (added.length === 0) return;
    await this.globalState.update(ACCOUNTS_KEY, [...existing, ...added]);
    for (const account of added) {
      const token = migrated.tokens[account.id];
      if (token) await this.secrets.store(SECRET_PREFIX + account.id, token);
    }
    if (migrated.active && added.some((account) => account.id === migrated.active)) {
      await this.globalState.update(ACTIVE_KEY, migrated.active);
    }
  }

  /** Drops copies of the same account an early version of the migration could add. Runs once. */
  private async removeDuplicates(): Promise<void> {
    if (this.globalState.get<boolean>(DEDUPED_KEY)) return;
    await this.globalState.update(DEDUPED_KEY, true);
    const before = this.stored();
    const { keep, dropped } = dropDuplicates(before);
    if (dropped.length === 0) return;
    await this.globalState.update(ACCOUNTS_KEY, keep);
    for (const id of dropped) await this.secrets.delete(SECRET_PREFIX + id);
    // A choice that pointed at a dropped copy moves to the account it copied.
    for (const state of [this.globalState, this.workspaceState]) {
      const copy = before.find((account) => account.id === state.get<string>(ACTIVE_KEY));
      if (!copy || !dropped.includes(copy.id)) continue;
      await state.update(ACTIVE_KEY, keep.find((account) => sameAccount(account, copy) && account.name === copy.name)?.id);
    }
  }

  dispose(): void {
    for (const disposable of this.disposables) disposable.dispose();
  }
}
