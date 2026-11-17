// SPDX-License-Identifier: SSPL-1.0
// Copyright (c) 2023-present Banca d'Italia
// Modified for Prometheux: cells are evaluated on the Prometheux platform.

/*  _   __        __                 __
 * | | / /__ ____/ /__ ________  ___/ /__
 * | |/ / _ `/ _  / _ `/ __/ _ \/ _  / -_)
 * |___/\_,_/\_,_/\_,_/\__/\___/\_,_/\__/
 *
 * @file Notebook kernel.
 */

import * as vscode from "vscode";
import { tablesFromEvaluation } from "../../results/model";
import { LANGUAGE_ID } from "../isomorphic";

export const NOTEBOOK_TYPE = "prometheux-notebook";
export const RESULTS_MIME = "x-application/prometheux-results";

type Evaluate = (program: string, signal?: AbortSignal) => Promise<unknown>;

/**
 * Notebook kernel: runs Vadalog cells strictly sequentially.
 */
export class VadacodeNotebookKernel implements vscode.Disposable {
  private executionOrder = 0;
  private readonly controller: vscode.NotebookController;
  private abort = new AbortController();

  constructor(private readonly evaluate: Evaluate) {
    this.controller = vscode.notebooks.createNotebookController("prometheux-kernel", NOTEBOOK_TYPE, "Prometheux");
    this.controller.supportedLanguages = [LANGUAGE_ID];
    this.controller.supportsExecutionOrder = true;
    this.controller.description = "Runs Vadalog on your Prometheux platform";
    this.controller.interruptHandler = () => this.abort.abort();
    this.controller.executeHandler = (cells) => this.executeAll(cells);
  }

  dispose(): void {
    this.controller.dispose();
  }

  private async executeAll(cells: vscode.NotebookCell[]): Promise<void> {
    this.abort = new AbortController();
    for (const cell of cells) {
      if (this.abort.signal.aborted) break;
      await this.execute(cell, this.abort.signal);
    }
  }

  private async execute(cell: vscode.NotebookCell, signal: AbortSignal): Promise<void> {
    const execution = this.controller.createNotebookCellExecution(cell);
    execution.executionOrder = ++this.executionOrder;
    execution.start(Date.now());
    try {
      const result = await this.evaluate(cell.document.getText(), signal);
      await execution.replaceOutput([
        new vscode.NotebookCellOutput([
          vscode.NotebookCellOutputItem.json({ tables: tablesFromEvaluation(result) }, RESULTS_MIME),
          vscode.NotebookCellOutputItem.json(result),
        ]),
      ]);
      execution.end(true, Date.now());
    } catch (error) {
      const failure = signal.aborted ? new Error("Execution interrupted.") : error instanceof Error ? error : new Error(String(error));
      await execution.replaceOutput([new vscode.NotebookCellOutput([vscode.NotebookCellOutputItem.error(failure)])]);
      execution.end(false, Date.now());
    }
  }
}
