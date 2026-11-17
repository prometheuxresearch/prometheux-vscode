import * as vscode from "vscode";

/** Vadacode's language id. Settings left over from Vadacode map Vadalog files to it. */
const LEGACY_LANGUAGE = "datalogpm";
const VADACODE_EXTENSION = "bancaditalia.vadacode";
const DISMISSED_KEY = "prometheux.fileAssociations.dismissed";

type Associations = Record<string, string>;

interface Scope {
  target: vscode.ConfigurationTarget;
  folder?: vscode.WorkspaceFolder;
  value: Associations;
}

function scopes(): Scope[] {
  const found: Scope[] = [];
  const add = (target: vscode.ConfigurationTarget, value: Associations | undefined, folder?: vscode.WorkspaceFolder) => {
    if (value && Object.values(value).includes(LEGACY_LANGUAGE)) found.push({ target, value, folder });
  };
  const inspected = vscode.workspace.getConfiguration().inspect<Associations>("files.associations");
  add(vscode.ConfigurationTarget.Global, inspected?.globalValue);
  add(vscode.ConfigurationTarget.Workspace, inspected?.workspaceValue);
  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    const value = vscode.workspace.getConfiguration(undefined, folder.uri).inspect<Associations>("files.associations");
    add(vscode.ConfigurationTarget.WorkspaceFolder, value?.workspaceFolderValue, folder);
  }
  return found;
}

/** Points every `files.associations` entry for Vadacode's language at Vadalog. Returns the patterns changed. */
export async function migrateFileAssociations(): Promise<string[]> {
  const changed: string[] = [];
  for (const scope of scopes()) {
    const updated: Associations = {};
    for (const [pattern, language] of Object.entries(scope.value)) {
      updated[pattern] = language === LEGACY_LANGUAGE ? "vadalog" : language;
      if (language === LEGACY_LANGUAGE) changed.push(pattern);
    }
    await vscode.workspace
      .getConfiguration(undefined, scope.folder?.uri)
      .update("files.associations", updated, scope.target);
  }
  return changed;
}

const VADALOG_FILE = /\.(vada|vadalog)$/i;

/**
 * A Vadalog file that a dead Vadacode association opened as another language
 * (VS Code falls back to plain text) is switched to Vadalog straight away.
 */
export function adoptVadalogDocuments(): vscode.Disposable {
  const adopt = (document: vscode.TextDocument) => {
    if (document.languageId === "vadalog" || !VADALOG_FILE.test(document.uri.path)) return;
    if (vscode.extensions.getExtension(VADACODE_EXTENSION) || !scopes().length) return;
    void vscode.languages.setTextDocumentLanguage(document, "vadalog");
  };
  vscode.workspace.textDocuments.forEach(adopt);
  return vscode.workspace.onDidOpenTextDocument(adopt);
}

/**
 * At activation: settings that still open Vadalog files as `datalogpm` win
 * over this extension's own file mapping, so those files get no highlighting
 * or language features. Offer to fix them, unless Vadacode itself is installed.
 */
export async function checkFileAssociations(state: vscode.Memento): Promise<void> {
  if (vscode.extensions.getExtension(VADACODE_EXTENSION) || state.get<boolean>(DISMISSED_KEY)) return;
  const patterns = scopes().flatMap((scope) =>
    Object.entries(scope.value)
      .filter(([, language]) => language === LEGACY_LANGUAGE)
      .map(([pattern]) => pattern),
  );
  if (!patterns.length) return;
  const choice = await vscode.window.showWarningMessage(
    `Your settings open ${[...new Set(patterns)].join(", ")} as '${LEGACY_LANGUAGE}' (Vadacode, not installed), so those files get no Vadalog highlighting.`,
    "Use Vadalog",
    "Don't Ask Again",
  );
  if (choice === "Use Vadalog") await migrateFileAssociations();
  if (choice === "Don't Ask Again") await state.update(DISMISSED_KEY, true);
}
