// Renders result tables with DOM APIs (values are never parsed as HTML).
// Runs inside webviews: the results panel and the notebook output renderer.
import type { ResultTable, ResultsMessage } from "./model";

export const STYLES = `
.px-results { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); }
.px-header { display: flex; align-items: baseline; gap: 12px; margin: 4px 0 8px; }
.px-title { font-weight: 600; }
.px-subtitle, .px-note { color: var(--vscode-descriptionForeground); }
.px-table-name { font-weight: 600; margin: 12px 0 4px; }
.px-scroll { overflow: auto; max-height: 60vh; border: 1px solid var(--vscode-panel-border, transparent); }
.px-results table { border-collapse: collapse; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); }
.px-results th, .px-results td { padding: 2px 10px; text-align: left; white-space: pre; border-bottom: 1px solid var(--vscode-panel-border, rgba(128,128,128,.25)); }
.px-results th { position: sticky; top: 0; background: var(--vscode-editor-background); }
.px-results th small { display: block; font-weight: normal; color: var(--vscode-descriptionForeground); }
.px-error { white-space: pre-wrap; color: var(--vscode-errorForeground); font-family: var(--vscode-editor-font-family); }
.px-pager { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.px-pager button { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border: none; padding: 2px 10px; cursor: pointer; }
.px-pager button:disabled { opacity: .5; cursor: default; }
`;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

export function renderTable(table: ResultTable, maxRows: number): HTMLElement {
  const wrapper = el("div");
  const shown = table.rows.slice(0, maxRows);
  const count = table.rows.length > maxRows ? `${maxRows} of ${table.rows.length} rows` : `${table.rows.length} rows`;
  const name = el("div", "px-table-name", `${table.name} `);
  name.append(el("span", "px-note", `(${count})`));
  wrapper.append(name);

  const scroll = el("div", "px-scroll");
  const grid = el("table");
  const head = el("tr");
  table.columns.forEach((column, index) => {
    const th = el("th", undefined, column);
    const type = table.types?.[index];
    if (type) th.append(el("small", undefined, type));
    head.append(th);
  });
  const thead = el("thead");
  thead.append(head);
  grid.append(thead);
  const body = el("tbody");
  for (const row of shown) {
    const tr = el("tr");
    for (const cell of row) tr.append(el("td", undefined, formatCell(cell)));
    body.append(tr);
  }
  grid.append(body);
  scroll.append(grid);
  wrapper.append(scroll);
  return wrapper;
}

export function renderMessage(
  root: HTMLElement,
  message: ResultsMessage,
  options: { maxRows: number; onPage?: (page: number) => void },
): void {
  root.replaceChildren();
  root.className = "px-results";
  const header = el("div", "px-header");
  header.append(el("span", "px-title", message.title));
  root.append(header);

  if (message.type === "loading") {
    header.append(el("span", "px-subtitle", "Running…"));
    return;
  }
  if (message.type === "error") {
    root.append(el("div", "px-error", message.message));
    return;
  }
  if (message.subtitle) header.append(el("span", "px-subtitle", message.subtitle));
  if (!message.tables.length) root.append(el("div", "px-note", "No output predicates returned rows."));
  for (const table of message.tables) root.append(renderTable(table, options.maxRows));

  const paging = message.paging;
  if (paging && paging.pageCount > 1 && options.onPage) {
    const onPage = options.onPage;
    const pager = el("div", "px-pager");
    const prev = el("button", undefined, "‹ Previous");
    const next = el("button", undefined, "Next ›");
    prev.disabled = paging.page <= 1;
    next.disabled = paging.page >= paging.pageCount;
    prev.addEventListener("click", () => onPage(paging.page - 1));
    next.addEventListener("click", () => onPage(paging.page + 1));
    pager.append(prev, el("span", "px-note", `Page ${paging.page} of ${paging.pageCount} · ${paging.total.toLocaleString()} rows`), next);
    root.append(pager);
  }
}
