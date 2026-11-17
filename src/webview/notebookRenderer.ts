// Notebook output renderer for Vadalog cells run on Prometheux.
import type { ActivationFunction } from "vscode-notebook-renderer";
import type { ResultTable } from "../results/model";
import { renderMessage, STYLES } from "../results/render";

export const activate: ActivationFunction = () => {
  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.append(style);
  return {
    renderOutputItem(item, element) {
      const data = item.json() as { title?: string; tables: ResultTable[] };
      renderMessage(element, { type: "tables", title: data.title ?? "Results", tables: data.tables }, { maxRows: 1000 });
    },
  };
};
