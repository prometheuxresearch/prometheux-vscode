import * as vscode from "vscode";
import type { AccountManager } from "./manager";
import { type Account, type AccountEntry, type AccountForm, accountFromForm } from "./model";
import { testAccount } from "./testAccount";

/** Messages between the account form (src/webview/accountForm.ts) and the extension. */
export type FormRequest =
  | { type: "ready" }
  | { type: "test"; form: AccountForm }
  | { type: "save"; form: AccountForm; use: boolean }
  | { type: "cancel" };

export type FormMessage =
  | { type: "init"; form: AccountForm; editing: boolean; tokenSaved: boolean }
  | { type: "result"; ok: boolean; message: string };

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** The "Add Account" / "Edit Account" form, in an editor tab. */
export class AccountEditor {
  private static panels = new Map<string, vscode.WebviewPanel>();

  constructor(
    private readonly accounts: AccountManager,
    private readonly extensionUri: vscode.Uri,
  ) {}

  /** Opens the form for a new account, or for editing a saved one. */
  open(existing?: AccountEntry, platform: Account["platform"] = "prometheux"): void {
    const key = existing?.id ?? "new";
    const open = AccountEditor.panels.get(key);
    if (open) {
      open.reveal();
      return;
    }
    const scriptRoot = vscode.Uri.joinPath(this.extensionUri, "dist", "webview");
    const panel = vscode.window.createWebviewPanel(
      "prometheux.accountEditor",
      existing ? `Account: ${existing.name}` : "Add Account",
      vscode.ViewColumn.Active,
      { enableScripts: true, localResourceRoots: [scriptRoot] },
    );
    AccountEditor.panels.set(key, panel);
    panel.onDidDispose(() => AccountEditor.panels.delete(key));
    panel.webview.html = this.html(panel.webview, vscode.Uri.joinPath(scriptRoot, "accountForm.js"));

    const post = (message: FormMessage) => void panel.webview.postMessage(message);
    panel.webview.onDidReceiveMessage(async (request: FormRequest) => {
      if (request.type === "cancel") panel.dispose();
      if (request.type === "ready") {
        post({
          type: "init",
          editing: !!existing,
          tokenSaved: !!existing,
          form: {
            name: existing?.name ?? "",
            platform: existing?.platform ?? platform,
            url: existing?.url ?? "",
            ontology: existing?.ontology ?? "",
            functionSuffix: existing?.functionSuffix ?? "PX",
            token: "",
          },
        });
      }
      if (request.type === "test" || request.type === "save") {
        const result = await this.handle(request, existing);
        if (result.ok && request.type === "save") panel.dispose();
        else post({ type: "result", ...result });
      }
    });
  }

  /** Tests or saves a form. Exposed for the integration tests. */
  async handle(
    request: Extract<FormRequest, { type: "test" | "save" }>,
    existing?: Account,
  ): Promise<{ ok: boolean; message: string }> {
    const parsed = accountFromForm(request.form, existing, () => this.accounts.newId());
    if ("problem" in parsed) return { ok: false, message: parsed.problem };
    const { account, keepToken } = parsed;
    const token = keepToken && existing ? await this.accounts.token({ ...existing, source: "stored" }) : request.form.token.trim();
    if (!token) return { ok: false, message: "Enter the token." };
    if (request.type === "test") {
      try {
        return { ok: true, message: await testAccount(account, token) };
      } catch (error) {
        return { ok: false, message: `Could not connect: ${errorMessage(error)}` };
      }
    }
    await this.accounts.save(account, keepToken ? undefined : token);
    if (request.use || this.accounts.all.filter((a) => a.source === "stored").length === 1) await this.accounts.use(account.id);
    vscode.window.showInformationMessage(`Saved account '${account.name}'.`);
    return { ok: true, message: "Saved." };
  }

  private html(webview: vscode.Webview, script: vscode.Uri): string {
    const nonce = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<style>
  body { font-family: var(--vscode-font-family); color: var(--vscode-foreground); padding: 16px 24px; max-width: 640px; }
  h1 { font-size: 1.4em; font-weight: 600; margin: 0 0 16px; }
  fieldset { border: none; padding: 0; margin: 0 0 16px; }
  legend, label.field { display: block; font-weight: 600; margin: 12px 0 4px; }
  .choices { display: flex; gap: 8px; }
  .choices label { flex: 1; border: 1px solid var(--vscode-input-border, var(--vscode-widget-border)); border-radius: 4px; padding: 10px; cursor: pointer; }
  .choices input { margin-right: 6px; }
  .choices small { display: block; opacity: 0.75; margin-top: 4px; }
  input[type=text], input[type=password], select { width: 100%; box-sizing: border-box; padding: 6px 8px;
    background: var(--vscode-input-background); color: var(--vscode-input-foreground);
    border: 1px solid var(--vscode-input-border, transparent); border-radius: 2px; }
  .hint { opacity: 0.75; font-size: 0.9em; margin-top: 4px; }
  .row { display: flex; gap: 8px; align-items: center; margin-top: 20px; }
  button { padding: 6px 14px; border: none; border-radius: 2px; cursor: pointer;
    background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); }
  button.primary { background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
  #status { margin-top: 16px; padding: 8px 10px; border-radius: 4px; display: none; white-space: pre-wrap; }
  #status.ok { display: block; background: var(--vscode-inputValidation-infoBackground); border: 1px solid var(--vscode-inputValidation-infoBorder); }
  #status.error { display: block; background: var(--vscode-inputValidation-errorBackground); border: 1px solid var(--vscode-inputValidation-errorBorder); }
  [hidden] { display: none !important; }
</style>
</head>
<body>
<h1 id="title">Add Account</h1>
<form id="form" autocomplete="off">
  <fieldset>
    <legend>Platform</legend>
    <div class="choices">
      <label><input type="radio" name="platform" value="prometheux">Prometheux<small>Ontologies and concepts on the platform; run local files on its engine.</small></label>
      <label><input type="radio" name="platform" value="foundry">Palantir Foundry<small>Run local files on the Prometheux engine inside Foundry.</small></label>
    </div>
  </fieldset>
  <label class="field" for="name">Name</label>
  <input type="text" id="name" placeholder="e.g. staging, personal, Globex">

  <div data-platform="prometheux">
    <label class="field" for="where">Where it runs</label>
    <select id="where">
      <option value="cloud">Prometheux Cloud</option>
      <option value="custom">Self-hosted / BYOC</option>
      <option value="local">Local development</option>
    </select>
  </div>
  <label class="field" for="url" id="urlLabel">API URL</label>
  <input type="text" id="url">
  <div class="hint" id="urlHint"></div>

  <div data-platform="foundry">
    <label class="field" for="ontology">Ontology</label>
    <input type="text" id="ontology" placeholder="ri.ontology.main.ontology.…">
    <div class="hint">The ontology the Prometheux functions (runPX, analyzePX, …) are registered in: its RID or API name.</div>
    <label class="field" for="functionSuffix">Function suffix</label>
    <input type="text" id="functionSuffix" placeholder="PX">
    <div class="hint">PX means the functions are called runPX, analyzePX, validatePX and stopEvaluationPX.</div>
  </div>

  <label class="field" for="token" id="tokenLabel">API key</label>
  <input type="password" id="token">
  <div class="hint" id="tokenHint"></div>

  <label class="row"><input type="checkbox" id="use" checked> Use this account now</label>
  <div class="row">
    <button type="submit" class="primary" id="save">Save</button>
    <button type="button" id="test">Test connection</button>
    <button type="button" id="cancel">Cancel</button>
  </div>
  <div id="status"></div>
</form>
<script nonce="${nonce}" src="${webview.asWebviewUri(script)}"></script>
</body>
</html>`;
  }
}
