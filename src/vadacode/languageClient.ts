// SPDX-License-Identifier: SSPL-1.0
// Copyright (c) 2023-present Banca d'Italia
// Modified for Prometheux: one bundled server, `prometheux:` documents, and a
// setting that gates the local diagnostics.

/*  _   __        __                 __
 * | | / /__ ____/ /__ ________  ___/ /__
 * | |/ / _ `/ _  / _ `/ __/ _ \/ _  / -_)
 * |___/\_,_/\_,_/\_,_/\__/\___/\_,_/\__/
 *
 * @file Language server client and the Datalog± fragment selector.
 */

import * as vscode from "vscode";
import { LanguageClient, type LanguageClientOptions, type ServerOptions, TransportKind } from "vscode-languageclient/node";
import { DEFAULT_FRAGMENT, type Fragment, FRAGMENTS, LANGUAGE_ID, PRETTY_FRAGMENTS } from "./isomorphic";

function localDiagnosticsEnabled(): boolean {
  return vscode.workspace.getConfiguration("prometheux").get<boolean>("languageServer.diagnostics", false);
}

export async function startLanguageClient(context: vscode.ExtensionContext): Promise<LanguageClient> {
  const module = context.asAbsolutePath("dist/server.js");
  const serverOptions: ServerOptions = {
    run: { module, transport: TransportKind.ipc },
    debug: { module, transport: TransportKind.ipc },
  };
  const clientOptions: LanguageClientOptions = {
    documentSelector: ["file", "untitled", "prometheux", "vscode-notebook-cell", "vscode-chat-code-block", "chat-editing-text-model"].map(
      (scheme) => ({ scheme, language: LANGUAGE_ID }),
    ),
    middleware: {
      // The inherited grammar does not cover the whole Prometheux dialect yet,
      // so its diagnostics are opt-in. The platform validator runs on save.
      handleDiagnostics: (uri, diagnostics, next) => next(uri, localDiagnosticsEnabled() ? diagnostics : []),
    },
  };
  const client = new LanguageClient("prometheuxVadalog", "Prometheux Vadalog Language Server", serverOptions, clientOptions);
  await client.start();
  return client;
}

/** Status bar picker for the Datalog± fragment the local diagnostics check against. */
export class FragmentSelector implements vscode.Disposable {
  private readonly item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  private readonly subscriptions: vscode.Disposable[];
  private fragment: Fragment;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly client: LanguageClient,
  ) {
    this.item.command = "prometheux.selectFragment";
    this.item.tooltip = "Datalog± fragment used by the local diagnostics. Click to change.";
    this.fragment = context.globalState.get<Fragment>("fragment", DEFAULT_FRAGMENT);
    this.subscriptions = [
      this.item,
      vscode.commands.registerCommand("prometheux.selectFragment", () => this.pick()),
      vscode.commands.registerCommand("prometheux.autoDetectFragment", () =>
        client.sendNotification("workspace/autoDetectFragment", {
          uri: vscode.window.activeTextEditor?.document.uri.toString(),
        }),
      ),
      client.onNotification("workspace/didChangeFragment", (params: { fragment: Fragment }) =>
        this.set(params.fragment),
      ),
      vscode.window.onDidChangeActiveTextEditor(() => this.updateVisibility()),
      vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("prometheux.languageServer.diagnostics")) this.updateVisibility();
      }),
    ];
    this.set(this.fragment);
  }

  private set(fragment: Fragment): void {
    this.fragment = FRAGMENTS.includes(fragment) ? fragment : DEFAULT_FRAGMENT;
    void this.context.globalState.update("fragment", this.fragment);
    this.item.text = PRETTY_FRAGMENTS[FRAGMENTS.indexOf(this.fragment)];
    void this.client.sendNotification("workspace/didChangeFragment", { fragment: this.fragment });
    this.updateVisibility();
  }

  private updateVisibility(): void {
    const editor = vscode.window.activeTextEditor;
    if (localDiagnosticsEnabled() && editor?.document.languageId === LANGUAGE_ID) this.item.show();
    else this.item.hide();
  }

  private async pick(): Promise<void> {
    const autoDetect = "$(arrow-small-right) Auto-detect";
    const entries: string[] = [...PRETTY_FRAGMENTS];
    if (vscode.window.activeTextEditor) entries.push(autoDetect);
    const picked = await vscode.window.showQuickPick(entries, {
      title: "Choose fragment",
      placeHolder: `Current: ${this.fragment}`,
    });
    if (!picked) return;
    if (picked === autoDetect) {
      await vscode.commands.executeCommand("prometheux.autoDetectFragment");
      return;
    }
    this.set(FRAGMENTS[PRETTY_FRAGMENTS.indexOf(picked as (typeof PRETTY_FRAGMENTS)[number])]);
  }

  dispose(): void {
    for (const subscription of this.subscriptions) subscription.dispose();
  }
}
