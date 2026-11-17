import * as vscode from "vscode";
import type { AccountManager } from "./manager";
import { type AccountEntry, describeAccount, PLATFORM_LABELS } from "./model";

const SOURCE_NOTES: Record<AccountEntry["source"], string> = {
  stored: "",
  environment: "from environment variables",
  "px-cli": "from px login (~/.prometheux/config.json)",
};

export class AccountItem extends vscode.TreeItem {
  constructor(
    readonly account: AccountEntry,
    active: boolean,
  ) {
    super(account.name, vscode.TreeItemCollapsibleState.None);
    this.description = `${active ? "active · " : ""}${describeAccount(account)}`;
    this.iconPath = new vscode.ThemeIcon(
      active ? "pass-filled" : account.platform === "foundry" ? "cloud" : "account",
      active ? new vscode.ThemeColor("testing.iconPassed") : undefined,
    );
    const note = SOURCE_NOTES[account.source];
    this.tooltip = new vscode.MarkdownString(
      [`**${account.name}**`, `${PLATFORM_LABELS[account.platform]}: \`${account.url}\``, account.ontology ? `Ontology: \`${account.ontology}\`` : "", note]
        .filter(Boolean)
        .join("\n\n"),
    );
    // account.<stored|detected>.<active|inactive>: menus offer Use / Edit / Delete accordingly.
    this.contextValue = `account.${account.source === "stored" ? "stored" : "detected"}.${active ? "active" : "inactive"}`;
    if (!active) this.command = { command: "prometheux.useAccount", title: "Use This Account", arguments: [this] };
  }
}

/** The "Accounts" view: every account, the active one marked. */
export class AccountsView implements vscode.TreeDataProvider<AccountItem>, vscode.Disposable {
  private readonly changed = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this.changed.event;
  private readonly subscription: vscode.Disposable;

  constructor(private readonly accounts: AccountManager) {
    this.subscription = accounts.onDidChange(() => this.changed.fire());
  }

  getTreeItem(item: AccountItem): AccountItem {
    return item;
  }

  getChildren(): AccountItem[] {
    const activeId = this.accounts.active?.account.id;
    return this.accounts.all.map((account) => new AccountItem(account, account.id === activeId));
  }

  dispose(): void {
    this.subscription.dispose();
    this.changed.dispose();
  }
}
