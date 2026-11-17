import { Prometheux } from "prometheux-chain";
import * as vscode from "vscode";
import type { AccountManager } from "./accounts/manager";
import type { AccountSource } from "./accounts/model";

/** The Prometheux platform connection of the active account. */
export interface Connection {
  url: string;
  token: string;
  /** Where the account came from; its URL and token always come from the same place. */
  source: AccountSource;
  accountName: string;
}

export class NotConnectedError extends Error {
  constructor() {
    super("Not connected to Prometheux. Add a Prometheux account (Prometheux: Add Account) or switch to one.");
  }
}

export { normalizeUrl } from "./accounts/model";

/**
 * Hands out Prometheux SDK clients for the active account, when it is a Prometheux account. The
 * accounts themselves (and their tokens) are kept by the AccountManager.
 */
export class ConnectionManager implements vscode.Disposable {
  private readonly changed = new vscode.EventEmitter<Connection | undefined>();
  readonly onDidChange = this.changed.event;

  private current: Connection | undefined;
  private client: Prometheux | undefined;
  private readonly disposables: vscode.Disposable[] = [];

  constructor(private readonly accounts: AccountManager) {
    this.disposables.push(this.changed, accounts.onDidChange(() => void this.reload()));
  }

  get connection(): Connection | undefined {
    return this.current;
  }

  async reload(): Promise<Connection | undefined> {
    const active = this.accounts.active;
    const next =
      active?.account.platform === "prometheux"
        ? { url: active.account.url, token: active.token, source: active.account.source, accountName: active.account.name }
        : undefined;
    const same = next?.url === this.current?.url && next?.token === this.current?.token;
    this.current = next;
    if (!same) this.client = undefined;
    await vscode.commands.executeCommand("setContext", "prometheux.connected", !!this.current);
    this.changed.fire(this.current);
    return this.current;
  }

  /** The SDK client for the active account. Throws when it is not a Prometheux account. */
  requireClient(): Prometheux {
    if (!this.current) throw new NotConnectedError();
    this.client ??= new Prometheux({ token: this.current.token, baseUrl: this.current.url });
    return this.client;
  }

  describe(): string {
    return this.current ? `${this.current.accountName}: ${this.current.url}` : "Not connected";
  }

  dispose(): void {
    for (const disposable of this.disposables) disposable.dispose();
  }
}
