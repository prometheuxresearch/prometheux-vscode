import * as vscode from "vscode";
import type { ResultsMessage, ResultsRequest } from "./results/model";

/** The "Results" webview in the bottom panel. */
export class ResultsView implements vscode.WebviewViewProvider {
  static readonly viewType = "prometheux.results";

  private view: vscode.WebviewView | undefined;
  private last: ResultsMessage | undefined;

  /** The message currently shown (used by the integration tests). */
  get current(): ResultsMessage | undefined {
    return this.last;
  }
  private pageHandler: ((page: number) => void) | undefined;

  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(view: vscode.WebviewView): void {
    this.view = view;
    const scriptRoot = vscode.Uri.joinPath(this.extensionUri, "dist", "webview");
    view.webview.options = { enableScripts: true, localResourceRoots: [scriptRoot] };
    const script = view.webview.asWebviewUri(vscode.Uri.joinPath(scriptRoot, "results.js"));
    const maxRows = vscode.workspace.getConfiguration("prometheux").get<number>("results.maxRows", 1000);
    const nonce = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    view.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
</head>
<body>
<div id="root" data-max-rows="${maxRows}"><p>Run a concept or a Vadalog file to see its results here.</p></div>
<script nonce="${nonce}" src="${script}"></script>
</body>
</html>`;
    view.webview.onDidReceiveMessage((message: ResultsRequest) => {
      if (message.type === "page") this.pageHandler?.(message.page);
    });
    view.onDidChangeVisibility(() => {
      if (view.visible && this.last) void view.webview.postMessage(this.last);
    });
    if (this.last) void view.webview.postMessage(this.last);
  }

  /**
   * Shows a message. `onPage` is called when the user asks for another page
   * of the results currently shown.
   */
  async show(message: ResultsMessage, onPage?: (page: number) => void): Promise<void> {
    this.last = message;
    if (onPage !== undefined || message.type !== "tables") this.pageHandler = onPage;
    if (!this.view && vscode.workspace.getConfiguration("prometheux").get<boolean>("results.reveal", true)) {
      await vscode.commands.executeCommand(`${ResultsView.viewType}.focus`, { preserveFocus: true });
    }
    if (this.view) {
      if (!this.view.visible) this.view.show(true);
      await this.view.webview.postMessage(message);
    }
  }
}
