import { spawn } from "node:child_process";
import * as vscode from "vscode";
import type { Connection } from "./connection";

export class PxNotFoundError extends Error {
  constructor(command: string) {
    super(
      `The px CLI was not found ('${command}'). Install it with 'pipx install prometheux' ` +
        "(see github.com/prometheuxresearch/prometheux-cli) or set prometheux.pxPath.",
    );
  }
}

/** Same rule as `px pull`: the directory name for an ontology. */
export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Runs the px CLI with the extension's connection (px reads JARVISPY_URL /
 * PMTX_TOKEN before its own credential file), streaming its output to the
 * Prometheux output channel. Resolves with the whole output.
 */
export function runPx(
  args: string[],
  options: { cwd: string; connection: Connection; output: vscode.OutputChannel },
): Promise<string> {
  const command = vscode.workspace.getConfiguration("prometheux").get<string>("pxPath", "px") || "px";
  options.output.appendLine(`$ px ${args.join(" ")}`);
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, JARVISPY_URL: options.connection.url, PMTX_TOKEN: options.connection.token },
    });
    const tail: string[] = [];
    let all = "";
    const collect = (chunk: Buffer) => {
      const text = chunk.toString();
      all += text;
      options.output.append(text);
      tail.push(...text.split("\n").filter(Boolean));
      tail.splice(0, Math.max(0, tail.length - 5));
    };
    child.stdout.on("data", collect);
    child.stderr.on("data", collect);
    child.on("error", (error: NodeJS.ErrnoException) =>
      reject(error.code === "ENOENT" ? new PxNotFoundError(command) : error),
    );
    child.on("close", (code) => {
      if (code === 0) resolve(all);
      else reject(new Error(tail.join("\n") || `px exited with code ${code}`));
    });
  });
}
