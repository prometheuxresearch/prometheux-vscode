// SPDX-License-Identifier: SSPL-1.0
// Copyright (c) 2023-present Banca d'Italia
// Modified for Prometheux: bindings are tested on the Prometheux platform.

/*  _   __        __                 __
 * | | / /__ ____/ /__ ________  ___/ /__
 * | |/ / _ `/ _  / _ `/ __/ _ \/ _  / -_)
 * |___/\_,_/\_,_/\_,_/\__/\___/\_,_/\__/
 *
 * @file Implements binding commands for the extension.
 * The commands are exposed as inline buttons in the editor.
 */

import { commands, ExtensionContext, Position, Selection, window } from 'vscode';
import { BindingInference, DatalogpmBinding, ProgramEvaluator } from './binding-inference';

import { inferArrayType } from './type-inference';

/**
 * Transpose a matrix (array of equal‑length arrays).
 * Example:
 *   [[1, 2, 3],
 *    [4, 5, 6],
 *    [7, 8, 9]]
 * becomes
 *   [[1, 4, 7],
 *    [2, 5, 8],
 *    [3, 6, 9]]
 */
function transpose<T>(matrix: T[][]): T[][] {
  if (matrix.length === 0) return [];

  // matrix[0].map is called once per column
  return matrix[0].map((_, colIndex) =>
    matrix.map(row => row[colIndex])
  );
}

/**
 * Insert a snippet into the currently open file at the specified line number.
 * @param snippet Snippet to insert.
 * @param lineNumber Line number where to insert the snippet.
 */
async function insertSnippetInOpenFile(snippet: string, lineNumber: number) {
  const editor = window.activeTextEditor;
  if (!editor) return;
  const position = new Position(lineNumber, 0); // colonna 0 di quella riga

  const endPosition = position.translate(0, snippet.length);
  await editor.edit(editBuilder => {
    editBuilder.insert(position, snippet);
    // Move the cursor to the end of the inserted snippet
    editor.selection = new Selection(endPosition.line, endPosition.character, endPosition.line, endPosition.character);

  });          
}  

/**
 * Register binding-related commands.
 * @param context 
 * @param sendNotification 
 */
export function registerBindingCommands(
  context: ExtensionContext,
  evaluate: ProgramEvaluator,
  sendNotification?: (method: string, params: unknown) => Promise<void> | undefined
) {
	context.subscriptions.push(
		commands.registerCommand(
			"prometheux.testBinding",
			async (binding: DatalogpmBinding) => {
				const inference = new BindingInference(evaluate);

				let success = "";
				try {
					await inference.test(binding);
					window.showInformationMessage("Binding test succeeded.");
					success = 'success';
				} catch (error) {
					const message = error instanceof Error ? error.message : String(error);
					window.showErrorMessage(`Binding test failed: ${message}`);
					success = 'failure';
				}

				// Notify the LSP server
				if (sendNotification) {
					sendNotification(
						"workspace/bindingTested", { 
							document: window.activeTextEditor?.document,
							binding,
							result: success
						}
					);
				}

			}
		),
		commands.registerCommand(
			"prometheux.inferBindingSchema",
			async (binding: DatalogpmBinding) => {
				const inference = new BindingInference(evaluate);

				// Ask user for number of fields to infer
				const fieldsToInfer = await window.showInputBox({
					prompt: "Enter the number of fields to infer",
					value: "1",
					placeHolder: "e.g. 3",
					validateInput: (value) => {
						const num = parseInt(value, 10);
						if (isNaN(num) || num <= 0) {
							return "Please enter a valid positive integer."; 
						}
						return null; // No error
					},
				});
				if (!fieldsToInfer) return;

				const linesToRead = await window.showInputBox({
					prompt: "Enter the number of lines to sample from file",
					value: "100",
					placeHolder: "e.g. 100",
					validateInput: (value) => {
						const num = parseInt(value, 10);
						if (isNaN(num) || num <= 0) {
							return "Please enter a valid positive integer."; 
						}
						return null; // No error
					},
				});

				if (!fieldsToInfer || !linesToRead) {
					return;
				}

				try {
					const bindingInferenceResult = await inference.infer(binding, +fieldsToInfer, +linesToRead);            
					const resultSet = transpose<string>(bindingInferenceResult.resultSet.map((row) => row.map(String)));

					// Prepare vadoc snipped
					let vadocSnippet = `\n%% Description.\n%% The types below are inferred from {Prometheux/local sample}.\n`;
					for (const [index, columnName] of bindingInferenceResult.columnNames.entries()) {
						const type = bindingInferenceResult.types[index];

						const resultSetColumn = resultSet[index];
						const resultSetType = inferArrayType(resultSetColumn, { skipEmpty: true });

						vadocSnippet += `%% @term {${type}/${resultSetType}} ${columnName} <Description of ${columnName}>.\n`;
					}
					await insertSnippetInOpenFile(vadocSnippet, binding.inputToken.line);

					let mappingSnippet = "";
					for (const [index, columnName] of bindingInferenceResult.columnNames.entries()) {
						const type = bindingInferenceResult.types[index];
						const sample = bindingInferenceResult.resultSet[0][index];

						const resultSetColumn = resultSet[index];
						const resultSetType = inferArrayType(resultSetColumn, { skipEmpty: true });

						mappingSnippet += `@mapping("${binding.atomName}",${index},"${columnName}","${resultSetType}").\n`;              
					}

					await insertSnippetInOpenFile(mappingSnippet, binding.inputToken.line + vadocSnippet.split("\n").length + 1);

				} catch (error) {
					const message = error instanceof Error ? error.message : String(error);
					window.showErrorMessage(`Inference failed: ${message}`);
				}
			}
		)
	);
}

