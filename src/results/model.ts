// Shared by the extension host and the webview / notebook renderer bundles:
// no `vscode` or Node imports here.

export interface ResultTable {
  name: string;
  columns: string[];
  types?: string[];
  rows: unknown[][];
}

export interface Paging {
  page: number;
  pageCount: number;
  total: number;
}

export type ResultsMessage =
  | { type: "loading"; title: string }
  | { type: "tables"; title: string; subtitle?: string; tables: ResultTable[]; paging?: Paging }
  | { type: "error"; title: string; message: string };

/** Messages the results webview sends back. */
export type ResultsRequest = { type: "page"; page: number };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Turns raw engine output (`{ resultSet, columnNames, types }`, as returned by
 * `vadalog.evaluate` and inside `concepts.run`) into tables.
 */
export function tablesFromEvaluation(result: unknown): ResultTable[] {
  const source = isRecord(result) && isRecord(result.evaluation_results) ? result.evaluation_results : result;
  if (!isRecord(source) || !isRecord(source.resultSet)) return [];
  const columnNames = isRecord(source.columnNames) ? source.columnNames : {};
  const types = isRecord(source.types) ? source.types : {};
  return Object.entries(source.resultSet).map(([name, value]) => {
    const rows = Array.isArray(value) ? value.map((row) => (Array.isArray(row) ? row : [row])) : [];
    const width = rows[0]?.length ?? 0;
    const declared = columnNames[name];
    const columns = Array.isArray(declared)
      ? declared.map(String)
      : Array.from({ length: width }, (_, index) => `#${index + 1}`);
    const declaredTypes = types[name];
    return { name, columns, types: Array.isArray(declaredTypes) ? declaredTypes.map(String) : undefined, rows };
  });
}
