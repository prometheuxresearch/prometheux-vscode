import * as vscode from "vscode";
import type { LanguageClient } from "vscode-languageclient/node";
import { AccountEditor } from "./accounts/accountEditor";
import { AccountItem, AccountsView } from "./accounts/accountsView";
import { AccountManager } from "./accounts/manager";
import { describeAccount, PLATFORM_LABELS } from "./accounts/model";
import { testAccount } from "./accounts/testAccount";
import { ComputeManager } from "./compute";
import { ConceptFileSystem } from "./conceptFileSystem";
import { ConceptStore, conceptUri, parseUri, SCHEME } from "./concepts";
import { ConnectionManager } from "./connection";
import { ConceptItem, OntologyExplorer, OntologyItem } from "./explorer";
import { localCommands } from "./localCommands";
import { adoptVadalogDocuments, checkFileAssociations, migrateFileAssociations } from "./fileAssociations";
import { isVadalogFile, LocalExplorer, type LocalOntologyItem } from "./localExplorer";
import { prepareProgram } from "./localProgram";
import { LocalSync } from "./localSync";
import { ResultsView } from "./resultsView";
import { Runner } from "./runner";
import { type Backend, type Evaluation, FoundryBackend, PrometheuxBackend } from "./run/backend";
import { FilesRunner } from "./run/filesRunner";
import { PlatformValidator } from "./validation";
import { FragmentSelector, startLanguageClient } from "./vadacode/languageClient";
import { NOTEBOOK_TYPE, VadacodeNotebookKernel } from "./vadacode/notebook/vadacode-notebook-kernel";
import { VadacodeNotebookSerializer } from "./vadacode/notebook/vadacode-notebook-serializer";
import { makeVadacodeNotebookTemplate } from "./vadacode/notebook/vadacode-notebook-template";
import { registerBindingCommands } from "./vadacode/schema-inference/binding-commands";

let languageClient: LanguageClient | undefined;

const CONCEPT_NAME = /^[a-z][A-Za-z0-9_]*$/;

const TEMPLATES: Record<string, (name: string) => string> = {
  logic: (name) => `% ${name}: describe what this concept means.\n${name}("example").\n\n@output("${name}").\n`,
  sql: () => "SELECT 1 AS example\n",
};

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Wraps a command so failures (e.g. not signed in) surface as one error message. */
function command(id: string, handler: (...args: never[]) => unknown): vscode.Disposable {
  return vscode.commands.registerCommand(id, async (...args: never[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      const message = errorMessage(error);
      if (message.startsWith("Not connected")) {
        const choice = await vscode.window.showErrorMessage(message, "Add Account", "Switch Account");
        if (choice === "Add Account") await vscode.commands.executeCommand("prometheux.addAccount");
        if (choice === "Switch Account") await vscode.commands.executeCommand("prometheux.switchAccount");
      } else {
        vscode.window.showErrorMessage(`Prometheux: ${message}`);
      }
    }
  });
}

/** Returned by `activate`; only the integration tests use it. */
export interface ExtensionApi {
  results: ResultsView;
  accounts: AccountManager;
  accountEditor: AccountEditor;
  /** The extension's storage, so tests can seed what an older version left behind. */
  storage: { secrets: vscode.SecretStorage; globalState: vscode.Memento };
  computes: ComputeManager;
  local: LocalExplorer;
  sync: LocalSync;
}

export async function activate(context: vscode.ExtensionContext): Promise<ExtensionApi> {
  const output = vscode.window.createOutputChannel("Prometheux");
  const accounts = new AccountManager(context.secrets, context.globalState, context.workspaceState);
  const accountEditor = new AccountEditor(accounts, context.extensionUri);
  const connections = new ConnectionManager(accounts);
  const store = new ConceptStore(connections);
  const explorer = new OntologyExplorer(connections, store);
  const local = new LocalExplorer();
  const results = new ResultsView(context.extensionUri);
  const computes = new ComputeManager(connections, context.globalState, output);
  const runner = new Runner(connections, store, results, output, computes);
  runner.prepareProgram = (uri, text) => prepareProgram(uri, text, local, output);
  const sync = new LocalSync(connections, store, local, output);
  const validator = new PlatformValidator(connections, store);
  const accountsView = new AccountsView(accounts);
  const onFoundry = () => accounts.active?.account.platform === "foundry";
  // Downloaded ontologies are a Prometheux thing: the Local view lists them on Prometheux accounts.
  local.showOntologies = () => !onFoundry();

  /** The active account's platform, for running local files. */
  const backend = (): Backend => {
    const active = accounts.active;
    if (active?.account.platform === "foundry") {
      const { url, ontology, functionSuffix } = active.account;
      return new FoundryBackend({ url, token: active.token, ontology: ontology ?? "", functionSuffix });
    }
    if (active?.account.platform === "prometheux") {
      return new PrometheuxBackend(connections.requireClient(), () => computes.compute());
    }
    throw new Error("Not connected: add an account (Prometheux: Add Account) or switch to one.");
  };
  const files = new FilesRunner(
    backend,
    async (b) => (b.platform === "prometheux" ? computes.ensureReady() : true),
    results,
    output,
  );
  // Local files run where the active account is; on Prometheux a single file keeps the runner's
  // own path (a downloaded concept gets its binds and upstream concepts).
  runner.route = async (uri) => {
    if (!onFoundry() || uri.scheme !== "file" || !isVadalogFile(uri)) return false;
    await files.run([uri]);
    return true;
  };
  /** Program evaluator for notebooks and binding code lenses, on the active account's platform. */
  const evaluate = async (program: string, signal?: AbortSignal) => {
    if (!onFoundry()) return runner.evaluator(program, signal);
    const result: Evaluation = await backend().run(program, { signal });
    return { resultSet: (result.resultSet ?? {}) as Record<string, unknown[][]>, columnNames: result.columnNames, types: result.types };
  };

  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 50);
  status.command = "prometheux.switchAccount";
  const updateStatus = () => {
    const active = accounts.active?.account;
    status.text = active
      ? `$(${active.platform === "foundry" ? "cloud" : "account"}) ${active.name} · ${active.platform === "foundry" ? "Foundry" : "Prometheux"}`
      : "$(account) Prometheux: Add Account";
    status.tooltip = active ? `${active.name}: ${describeAccount(active)}\nClick to switch account.` : "No account yet. Click to add one.";
    status.show();
  };

  context.subscriptions.push(
    output,
    accounts,
    accountsView,
    connections,
    files,
    accounts.onDidChange(() => {
      updateStatus();
      local.refresh();
    }),
    vscode.window.createTreeView("prometheux.accounts", { treeDataProvider: accountsView }),
    vscode.workspace.onDidSaveTextDocument((document) => {
      const enabled = vscode.workspace.getConfiguration("prometheux").get<boolean>("validateOnSave", true);
      if (enabled && onFoundry() && isVadalogFile(document.uri)) void files.validate(document).catch(() => undefined);
    }),
    computes,
    store,
    explorer,
    validator,
    status,
    connections.onDidChange(() => {
      store.invalidate();
      updateStatus();
    }),
    vscode.workspace.registerFileSystemProvider(SCHEME, new ConceptFileSystem(connections, store, computes), {
      isCaseSensitive: true,
    }),
    local,
    sync,
    vscode.window.createTreeView("prometheux.ontologies", { treeDataProvider: explorer, showCollapseAll: true }),
    vscode.window.createTreeView("prometheux.local", { treeDataProvider: local, showCollapseAll: true, canSelectMany: true }),
    vscode.window.registerWebviewViewProvider(ResultsView.viewType, results, {
      webviewOptions: { retainContextWhenHidden: true },
    }),
    vscode.workspace.registerNotebookSerializer(NOTEBOOK_TYPE, new VadacodeNotebookSerializer()),
    new VadacodeNotebookKernel(evaluate),

    command("prometheux.addAccount", (platform?: "prometheux" | "foundry") => accountEditor.open(undefined, platform)),
    command("prometheux.signIn", () => accountEditor.open()),
    command("prometheux.editAccount", async (item?: AccountItem) => {
      const account = item?.account ?? (await pickAccount(accounts, "Edit which account?", true));
      if (account) accountEditor.open(account);
    }),
    command("prometheux.useAccount", async (item?: AccountItem) => {
      const account = item?.account ?? (await pickAccount(accounts, "Use which account?"));
      if (account) await accounts.use(account.id);
    }),
    command("prometheux.deleteAccount", async (item?: AccountItem) => {
      const account = item?.account ?? (await pickAccount(accounts, "Delete which account?", true));
      if (!account) return;
      const confirm = await vscode.window.showWarningMessage(
        `Delete the account '${account.name}'?`,
        { modal: true, detail: `${describeAccount(account)}. Its token is removed from VS Code's secret storage. Nothing changes on the platform.` },
        "Delete",
      );
      if (confirm === "Delete") await accounts.remove(account.id);
    }),
    command("prometheux.testAccount", async (item?: AccountItem) => {
      const account = item?.account ?? accounts.active?.account;
      if (!account) return;
      const token = await accounts.token(account);
      if (!token) throw new Error(`'${account.name}' has no saved token: edit it and enter the token again.`);
      const message = await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: `Testing '${account.name}'…` },
        () => testAccount(account, token),
      );
      vscode.window.showInformationMessage(`${account.name}: ${message}`);
    }),
    command("prometheux.switchAccount", async () => {
      const activeId = accounts.active?.account.id;
      const items: (vscode.QuickPickItem & { id: string })[] = [
        ...accounts.all.map((account) => ({
          label: `${account.id === activeId ? "$(pass-filled)" : account.platform === "foundry" ? "$(cloud)" : "$(account)"} ${account.name}`,
          description: describeAccount(account),
          detail: account.source === "stored" ? undefined : account.source === "px-cli" ? "from px login" : "from environment variables",
          id: account.id,
        })),
        { label: "", kind: vscode.QuickPickItemKind.Separator, id: "" },
        { label: "$(add) Add Account…", id: "add" },
        { label: "$(list-unordered) Manage Accounts", id: "manage" },
      ];
      const picked = await vscode.window.showQuickPick(items, { title: "Switch account", placeHolder: "The whole extension follows the active account" });
      if (!picked) return;
      if (picked.id === "add") accountEditor.open();
      else if (picked.id === "manage") await vscode.commands.executeCommand("prometheux.accounts.focus");
      else await accounts.use(picked.id);
    }),
    command("prometheux.refresh", () => explorer.refresh()),
    command("prometheux.selectCompute", () => computes.pick()),

    command("prometheux.newOntology", async () => {
      const client = connections.requireClient();
      const name = await vscode.window.showInputBox({ title: "New ontology", prompt: "Name" });
      if (!name) return;
      const description = await vscode.window.showInputBox({ title: "New ontology", prompt: "Description (optional)" });
      if (description === undefined) return;
      await client.ontologies.save({ name, description });
      explorer.refresh();
    }),

    command("prometheux.newConcept", async (item?: OntologyItem) => {
      const ontologyId = item?.ontology.id ?? (await pickOntology(store));
      if (!ontologyId) return;
      const name = await vscode.window.showInputBox({
        title: "New concept",
        prompt: "Concept (predicate) name",
        validateInput: (value) =>
          CONCEPT_NAME.test(value) ? undefined : "Start with a lowercase letter; use letters, digits and _.",
      });
      if (!name) return;
      if (await store.findConcept(ontologyId, name)) {
        throw new Error(`Concept '${name}' already exists in this ontology.`);
      }
      const type = await vscode.window.showQuickPick(
        [
          { label: "Vadalog", id: "logic" },
          { label: "SQL", id: "sql" },
        ],
        { title: "Concept language" },
      );
      if (!type) return;
      const uri = conceptUri(ontologyId, name, type.id);
      await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(TEMPLATES[type.id](name)));
      await vscode.window.showTextDocument(uri);
    }),

    command("prometheux.openConcept", async () => {
      const ontologyId = await pickOntology(store);
      if (!ontologyId) return;
      const concepts = await store.listConcepts(ontologyId);
      const picked = await vscode.window.showQuickPick(
        concepts.map((concept) => ({
          label: concept.predicate_name,
          description: concept.concept_type,
          detail: concept.description ?? undefined,
          concept,
        })),
        { title: "Open concept", matchOnDetail: true },
      );
      if (picked) {
        await vscode.window.showTextDocument(
          conceptUri(ontologyId, picked.concept.predicate_name, picked.concept.concept_type),
        );
      }
    }),

    command("prometheux.runConcept", async (target?: ConceptItem | vscode.Uri) => {
      const uri = target instanceof ConceptItem ? target.uri : (target ?? vscode.window.activeTextEditor?.document.uri);
      const concept = uri?.scheme === SCHEME ? parseUri(uri).concept : undefined;
      if (!concept) {
        vscode.window.showInformationMessage("Select a concept to run.");
        return;
      }
      const open = vscode.workspace.textDocuments.find((document) => document.uri.toString() === uri?.toString());
      if (open?.isDirty && !(await open.save())) return;
      await runner.runConcept(concept);
    }),
    command("prometheux.run", () => runner.runActiveEditor()),
    command("prometheux.showResults", async (item?: ConceptItem) => {
      if (!item) return;
      const title = `${item.concept.predicate_name} · ${await store.ontologyName(item.ontologyId)}`;
      const concept = parseUri(item.uri).concept;
      if (concept) await runner.showConceptPage(concept, title, 1);
    }),
    command("prometheux.validate", async () => {
      const document = vscode.window.activeTextEditor?.document;
      if (!document) return;
      if (onFoundry() && isVadalogFile(document.uri)) await files.validate(document, true);
      else await validator.validate(document);
    }),
    // From the Local view (one item, or the whole selection) or the command palette (the editor).
    command("prometheux.runFiles", async (target?: Runnable, selected?: Runnable[]) => {
      const targets = (selected?.length ? selected : target ? [target] : [])
        .map(runnableUri)
        .filter((uri): uri is vscode.Uri => uri !== undefined);
      const active = vscode.window.activeTextEditor?.document;
      if (targets.length === 0 && active?.uri.scheme === "file") targets.push(active.uri);
      if (targets.length === 0) {
        vscode.window.showInformationMessage("Choose Vadalog files or a folder to run.");
        return;
      }
      const [only] = targets;
      if (targets.length === 1 && only && isVadalogFile(only)) {
        await runner.evaluateDocument(await vscode.workspace.openTextDocument(only));
      } else {
        await files.run(targets);
      }
    }),
    command("prometheux.deleteConcept", async (item?: ConceptItem) => {
      if (!item) return;
      const confirm = await vscode.window.showWarningMessage(
        `Delete concept '${item.concept.predicate_name}' from the platform?`,
        { modal: true, detail: "Concepts that depend on it may stop working." },
        "Delete",
      );
      if (confirm === "Delete") await vscode.workspace.fs.delete(item.uri);
    }),
    command("prometheux.openOntologyAsFolder", async (item?: OntologyItem) => {
      const ontologyId = item?.ontology.id ?? (await pickOntology(store));
      if (!ontologyId) return;
      const uri = vscode.Uri.from({ scheme: SCHEME, path: `/${ontologyId}` });
      const name = `${await store.ontologyName(ontologyId)} (Prometheux)`;
      const index = vscode.workspace.workspaceFolders?.length ?? 0;
      vscode.workspace.updateWorkspaceFolders(index, 0, { uri, name });
    }),
    command("prometheux.createNotebook", async () => {
      const document = await vscode.workspace.openNotebookDocument(NOTEBOOK_TYPE, makeVadacodeNotebookTemplate());
      await vscode.window.showNotebookDocument(document);
    }),
    command("prometheux.showOutput", () => output.show()),
    command("prometheux.fixFileAssociations", async () => {
      const changed = await migrateFileAssociations();
      vscode.window.showInformationMessage(
        changed.length
          ? `${changed.join(", ")} now open as Vadalog.`
          : "No settings map Vadalog files to another language.",
      );
    }),
    ...localCommands({ connections, store, local, runner, output }).map(([id, handler]) => command(id, handler)),
    command("prometheux.applyToPlatform", (item?: LocalOntologyItem) => item && sync.applyWithConfirmation(item.ontology)),
    command("prometheux.showLocalChanges", (item?: LocalOntologyItem) => item && sync.showChanges(item.ontology)),
  );

  registerBindingCommands(context, evaluate, (method, params) =>
    languageClient?.sendNotification(method, params),
  );

  await accounts.reload();
  await connections.reload();
  updateStatus();
  context.subscriptions.push(adoptVadalogDocuments());
  void checkFileAssociations(context.globalState);

  try {
    languageClient = await startLanguageClient(context);
    context.subscriptions.push(new FragmentSelector(context, languageClient));
  } catch (error) {
    output.appendLine(`Language server failed to start: ${errorMessage(error)}`);
  }
  return {
    results,
    computes,
    local,
    sync,
    accounts,
    accountEditor,
    storage: { secrets: context.secrets, globalState: context.globalState },
  };
}

/** What Run Vadalog can be given: a URI, or a Local view item. */
type Runnable = vscode.Uri | { uri?: vscode.Uri; resourceUri?: vscode.Uri };

function runnableUri(target: Runnable): vscode.Uri | undefined {
  return target instanceof vscode.Uri ? target : (target.uri ?? target.resourceUri);
}

async function pickAccount(accounts: AccountManager, title: string, storedOnly = false) {
  const choices = accounts.all.filter((account) => !storedOnly || account.source === "stored");
  const picked = await vscode.window.showQuickPick(
    choices.map((account) => ({ label: account.name, description: `${PLATFORM_LABELS[account.platform]} · ${account.url}`, account })),
    { title },
  );
  return picked?.account;
}

async function pickOntology(store: ConceptStore): Promise<string | undefined> {
  const ontologies = await store.listOntologies();
  const picked = await vscode.window.showQuickPick(
    ontologies.map((ontology) => ({ label: ontology.name, description: ontology.id, detail: ontology.description, ontology })),
    { title: "Choose an ontology", matchOnDescription: true },
  );
  return picked?.ontology.id;
}

export function deactivate(): Thenable<void> | undefined {
  return languageClient?.stop();
}
