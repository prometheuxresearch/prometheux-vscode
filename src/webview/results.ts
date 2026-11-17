// Script of the "Prometheux: Results" panel webview.
import type { ResultsMessage, ResultsRequest } from "../results/model";
import { renderMessage, STYLES } from "../results/render";

declare function acquireVsCodeApi(): { postMessage(message: ResultsRequest): void };

const vscode = acquireVsCodeApi();
const root = document.getElementById("root")!;
const style = document.createElement("style");
style.textContent = STYLES;
document.head.append(style);

const maxRows = Number(root.dataset.maxRows) || 1000;

window.addEventListener("message", (event: MessageEvent<ResultsMessage>) => {
  renderMessage(root, event.data, {
    maxRows,
    onPage: (page) => vscode.postMessage({ type: "page", page }),
  });
});
