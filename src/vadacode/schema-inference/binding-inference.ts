// SPDX-License-Identifier: SSPL-1.0
// Copyright (c) 2023-present Banca d'Italia
// Modified for Prometheux: programs run on the Prometheux platform through an
// injected evaluator; the local CSV/Parquet snippet generators were removed.

/*  _   __        __                 __
 * | | / /__ ____/ /__ ________  ___/ /__
 * | |/ / _ `/ _  / _ `/ __/ _ \/ _  / -_)
 * |___/\_,_/\_,_/\_,_/\__/\___/\_,_/\__/
 *
 * @file Binding inference: runs small programs to test bindings and infer
 *       their schema.
 */

// WARNING: This interface is duplicated in the server/src/datalogpm/common.ts file.
export interface DatalogpmBinding {
  input: boolean;
  inputToken: { line: number };
  token: unknown;
  atomName: string;
  dataSource: string;
  outermostContainer: string;
  innermostContainer: string;
}

/** Raw engine output: predicate name to rows / column names / column types. */
export interface EvaluationResult {
  resultSet: Record<string, unknown[][]>;
  columnNames?: Record<string, string[]>;
  types?: Record<string, string[]>;
}

export type ProgramEvaluator = (program: string) => Promise<EvaluationResult>;

/**
 * Binding inference result.
 */
export interface BindingInferenceResult {
  resultSet: unknown[][];
  columnNames: string[];
  types: string[];
}

/**
 * Binding inference class. Runs Vadalog programs to infer bindings.
 */
export class BindingInference {
  constructor(private readonly evaluate: ProgramEvaluator) {}

  async infer(binding: DatalogpmBinding, fieldsToInfer: number, limit = 1): Promise<BindingInferenceResult> {
    // Generate the predicate terms string according to the fieldsToInfer number
    // (e.g. fieldsToInfer = 3 generates "Term1, Term2, Term3").
    const terms = Array.from({ length: fieldsToInfer }, (_, i) => `Term${i + 1}`).join(", ");

    const outputAtomName = `o${binding.atomName}`;
    const program = `
@input("${binding.atomName}").
@bind("${binding.atomName}", "${binding.dataSource}", "${binding.outermostContainer}", "${binding.innermostContainer}").
o${binding.atomName}(${terms}) :- ${binding.atomName}(${terms}).
@output("o${binding.atomName}").
@post("o${binding.atomName}", "limit(${limit})").
`;

    const results = await this.evaluate(program);
    const rows = results.resultSet[outputAtomName] ?? [];
    return {
      resultSet: rows,
      columnNames: results.columnNames?.[outputAtomName] ?? terms.split(", "),
      types: results.types?.[outputAtomName] ?? [],
    };
  }

  /**
   * Test a binding by evaluating a mocked program that includes the binding.
   * @param binding The binding to test.
   * @returns A promise that rejects if the evaluation fails.
   */
  async test(binding: DatalogpmBinding): Promise<EvaluationResult> {
    const program = `
@input("${binding.atomName}").
@bind("${binding.atomName}", "${binding.dataSource}", "${binding.outermostContainer}", "${binding.innermostContainer}").
o${binding.atomName} :- ${binding.atomName}.
@output("o${binding.atomName}").
`;
    return this.evaluate(program);
  }
}
