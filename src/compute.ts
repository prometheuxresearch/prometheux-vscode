import type { Compute, Prometheux } from "prometheux-chain";
import * as vscode from "vscode";
import type { ConnectionManager } from "./connection";

export type MachineState = "started" | "starting" | "stopping" | "stopped" | "crashed" | "unknown";

export interface Machine {
  /** User machine id: what start / stop / status take. */
  userMachineId: string;
  /** Catalog machine id: what runs send as `compute.machine_configs.id`. */
  machineId: string;
  name: string;
  cores?: number;
  memoryGb?: number;
  state: MachineState;
}

interface Selection {
  machineId: string;
  name: string;
}

interface StatusData {
  machine_status?: string;
  is_active?: boolean;
}

const STATE_ICONS: Record<MachineState, string> = {
  started: "$(pass-filled)",
  starting: "$(loading~spin)",
  stopping: "$(loading~spin)",
  stopped: "$(circle-large-outline)",
  crashed: "$(error)",
  unknown: "$(question)",
};

const POLL_MS = 5_000;
const START_TIMEOUT_MS = 15 * 60_000;
const BACKGROUND_REFRESH_MS = 60_000;

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function unwrap<T>(response: unknown): T {
  const envelope = response as { status?: string; message?: string; data?: T };
  if (envelope?.status === "error") throw new Error(envelope.message ?? "The request failed.");
  return (envelope?.data ?? response) as T;
}

/**
 * Same reading as the web app: `is_active` is authoritative, so an active
 * machine whose pod is not up yet is "starting".
 */
export function machineState(status: StatusData): MachineState {
  const reported = status.machine_status;
  if (status.is_active && (!reported || reported === "stopped" || reported === "crashed")) return "starting";
  switch (reported) {
    case "started":
      return "started";
    case "pending":
    case "starting":
    case "restarting":
      return "starting";
    case "stopping":
    case "stopped":
    case "crashed":
      return reported;
    default:
      return "unknown";
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Compute pool machines: lists them, starts / stops them, and remembers which
 * one runs should use (per platform URL), like the compute dropdown of the
 * web app.
 */
export class ComputeManager implements vscode.Disposable {
  private machines: Machine[] = [];
  private available = false;
  private readonly status = vscode.window.createStatusBarItem("prometheux.compute", vscode.StatusBarAlignment.Left, 49);
  private readonly changed = new vscode.EventEmitter<void>();
  readonly onDidChange = this.changed.event;
  private readonly subscriptions: vscode.Disposable[];
  private readonly timer: ReturnType<typeof setInterval>;

  constructor(
    private readonly connections: ConnectionManager,
    private readonly state: vscode.Memento,
    private readonly output: vscode.OutputChannel,
  ) {
    this.status.name = "Prometheux Compute";
    this.status.command = "prometheux.selectCompute";
    this.subscriptions = [
      this.status,
      this.changed,
      connections.onDidChange(() => void this.refresh()),
      vscode.window.onDidChangeWindowState((window) => {
        if (window.focused) void this.refresh();
      }),
    ];
    this.timer = setInterval(() => {
      if (vscode.window.state.focused && this.available) void this.refresh();
    }, BACKGROUND_REFRESH_MS);
  }

  private get selectionKey(): string | undefined {
    const url = this.connections.connection?.url;
    return url ? `prometheux.compute:${url}` : undefined;
  }

  get selection(): Selection | undefined {
    const key = this.selectionKey;
    return key ? this.state.get<Selection>(key) : undefined;
  }

  private async select(machine: Machine | undefined): Promise<void> {
    const key = this.selectionKey;
    if (!key) return;
    await this.state.update(key, machine ? { machineId: machine.machineId, name: machine.name } : undefined);
    this.render();
  }

  get selectedMachine(): Machine | undefined {
    const selection = this.selection;
    return selection ? this.machines.find((machine) => machine.machineId === selection.machineId) : undefined;
  }

  /** The `compute` payload for runs, fetches and saves; undefined lets the platform choose. */
  compute(): Compute | undefined {
    const selection = this.selection;
    return selection ? { machine_configs: { id: selection.machineId } } : undefined;
  }

  private client(): Prometheux {
    return this.connections.requireClient();
  }

  /** Reloads the machine list and every machine's status. */
  async refresh(): Promise<Machine[]> {
    if (!this.connections.connection) {
      this.machines = [];
      this.available = false;
      this.render();
      return [];
    }
    try {
      const overview = unwrap<{ user_machines_enabled?: Record<string, unknown>[] }>(await this.client().machines.list());
      const enabled = (overview.user_machines_enabled ?? []).filter(
        (machine) => machine.status === "Enabled" && machine.for_compute !== false,
      );
      this.machines = await Promise.all(
        enabled.map(async (machine): Promise<Machine> => {
          const catalog = (machine.machines ?? {}) as Record<string, unknown>;
          const userMachineId = String(machine.id);
          return {
            userMachineId,
            machineId: String(catalog.id ?? ""),
            name: String(catalog.name ?? userMachineId),
            cores: typeof catalog.cores === "number" ? catalog.cores : undefined,
            memoryGb: typeof catalog.memory_gb === "number" ? catalog.memory_gb : undefined,
            state: await this.fetchState(userMachineId),
          };
        }),
      );
      this.available = true;
      if (!this.selection) {
        // Like the web app: pick up a machine that is already running.
        const running = this.machines.find((machine) => machine.state === "started");
        if (running) await this.select(running);
      }
    } catch (error) {
      // Platforms without compute pools (local development, some self-hosted
      // setups) answer with an error: hide the selector there.
      this.output.appendLine(`Compute pool machines unavailable: ${errorMessage(error)}`);
      this.machines = [];
      this.available = false;
    }
    this.render();
    this.changed.fire();
    return this.machines;
  }

  private async fetchState(userMachineId: string): Promise<MachineState> {
    try {
      return machineState(unwrap<StatusData>(await this.client().machines.status(userMachineId)));
    } catch {
      return "unknown";
    }
  }

  private setState(machine: Machine, state: MachineState): void {
    machine.state = state;
    this.render();
    this.changed.fire();
  }

  private render(): void {
    if (!this.available || !this.machines.length) {
      this.status.hide();
      return;
    }
    const selected = this.selectedMachine;
    if (!selected) {
      this.status.text = "$(server) No compute selected";
      this.status.tooltip = "Choose the compute pool machine Prometheux runs use";
    } else {
      const suffix = selected.state === "started" ? "" : ` (${selected.state})`;
      this.status.text = `${STATE_ICONS[selected.state]} ${selected.name}${suffix}`;
      this.status.tooltip = `Runs use ${selected.name}. Click to change or start a machine.`;
    }
    this.status.show();
  }

  /** The dropdown: machines with their status; start / stop buttons per row. */
  async pick(): Promise<void> {
    const startButton = { iconPath: new vscode.ThemeIcon("play"), tooltip: "Start machine" };
    const stopButton = { iconPath: new vscode.ThemeIcon("debug-stop"), tooltip: "Stop machine" };
    const refreshButton = { iconPath: new vscode.ThemeIcon("refresh"), tooltip: "Refresh status" };
    type Item = vscode.QuickPickItem & { machine?: Machine };

    const quickPick = vscode.window.createQuickPick<Item>();
    quickPick.title = "Compute Pool Machines";
    quickPick.placeholder = "Choose the machine your runs use";
    quickPick.buttons = [refreshButton];
    const toItems = (): Item[] => {
      const selectedId = this.selection?.machineId;
      return [
        ...this.machines.map((machine) => ({
          label: `${STATE_ICONS[machine.state]} ${machine.name}`,
          description: [
            machine.cores ? `${machine.cores} cores` : "",
            machine.memoryGb ? `${machine.memoryGb} GB` : "",
            machine.state,
            machine.machineId === selectedId ? "selected" : "",
          ]
            .filter(Boolean)
            .join(" · "),
          buttons: machine.state === "started" ? [stopButton] : machine.state === "stopped" || machine.state === "crashed" ? [startButton] : [],
          machine,
        })),
        { label: "", kind: vscode.QuickPickItemKind.Separator },
        { label: "$(circle-slash) No compute selected", description: "the platform picks a running machine" },
      ];
    };
    const reload = async () => {
      quickPick.busy = true;
      await this.refresh();
      quickPick.items = toItems();
      quickPick.busy = false;
    };

    quickPick.items = toItems();
    quickPick.busy = true;
    quickPick.show();
    void reload();

    const updates = this.onDidChange(() => {
      quickPick.items = toItems();
    });
    quickPick.onDidTriggerButton(() => void reload());
    quickPick.onDidTriggerItemButton(async ({ item, button }) => {
      if (!item.machine) return;
      if (button === startButton) {
        await this.select(item.machine);
        void this.start(item.machine);
      } else if (button === stopButton) {
        void this.stop(item.machine);
      }
    });
    quickPick.onDidAccept(async () => {
      const item = quickPick.selectedItems[0];
      quickPick.hide();
      if (!item) return;
      await this.select(item.machine);
      if (item.machine && (item.machine.state === "stopped" || item.machine.state === "crashed")) {
        const choice = await vscode.window.showInformationMessage(
          `${item.machine.name} is ${item.machine.state}. Start it? It is billed while it runs.`,
          "Start",
        );
        if (choice === "Start") await this.start(item.machine);
      }
    });
    quickPick.onDidHide(() => {
      updates.dispose();
      quickPick.dispose();
    });
  }

  /** Starts a machine and waits, with a progress notification, until it is up. */
  async start(machine: Machine): Promise<boolean> {
    try {
      unwrap(await this.client().machines.setActive(machine.userMachineId, true));
    } catch (error) {
      vscode.window.showErrorMessage(`Could not start ${machine.name}: ${errorMessage(error)}`);
      return false;
    }
    this.setState(machine, "starting");
    this.output.appendLine(`Starting ${machine.name}…`);
    return this.waitUntilStarted(machine);
  }

  async waitUntilStarted(machine: Machine): Promise<boolean> {
    const state = await vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: `Starting ${machine.name}`, cancellable: true },
      async (progress, token) => {
        const deadline = Date.now() + START_TIMEOUT_MS;
        while (!token.isCancellationRequested && Date.now() < deadline) {
          const current = await this.fetchState(machine.userMachineId);
          if (current !== machine.state) this.setState(machine, current);
          progress.report({ message: current });
          if (current === "started" || current === "stopped" || current === "crashed") return current;
          await sleep(POLL_MS);
        }
        return token.isCancellationRequested ? "cancelled" : "timeout";
      },
    );
    this.output.appendLine(`${machine.name}: ${state}`);
    if (state === "started") {
      vscode.window.showInformationMessage(`${machine.name} is running.`);
      return true;
    }
    if (state === "stopped" || state === "crashed") {
      vscode.window.showErrorMessage(`${machine.name} did not start (${state}).`);
    } else if (state === "timeout") {
      vscode.window.showWarningMessage(`${machine.name} is still starting. Check again from the compute selector.`);
    }
    return false;
  }

  async stop(machine: Machine): Promise<void> {
    const confirm = await vscode.window.showWarningMessage(
      `Stop ${machine.name}?`,
      { modal: true, detail: "Runs in progress on this machine will fail." },
      "Stop",
    );
    if (confirm !== "Stop") return;
    try {
      unwrap(await this.client().machines.setActive(machine.userMachineId, false));
      this.setState(machine, "stopping");
      this.output.appendLine(`Stopping ${machine.name}`);
    } catch (error) {
      vscode.window.showErrorMessage(`Could not stop ${machine.name}: ${errorMessage(error)}`);
    }
  }

  /**
   * Called before a run, like the web app's `ensureCompute`: returns false
   * when the run should not go ahead (no machine running and the user did
   * not start one).
   */
  async ensureReady(): Promise<boolean> {
    if (!this.available || !this.machines.length) return true;
    const selected = this.selectedMachine;
    if (selected?.state === "started") return true;
    if (selected?.state === "starting") return this.waitUntilStarted(selected);
    if (selected && (selected.state === "stopped" || selected.state === "crashed")) {
      const choice = await vscode.window.showWarningMessage(
        `${selected.name} is ${selected.state}.`,
        { modal: true, detail: "Start it to run? It is billed while it runs." },
        "Start and Run",
      );
      return choice === "Start and Run" && (await this.start(selected));
    }
    if (this.machines.some((machine) => machine.state === "started")) return true;
    const choice = await vscode.window.showWarningMessage(
      "No compute pool machine is running.",
      { modal: true, detail: "Choose a machine to start, then run again." },
      "Choose Machine",
    );
    if (choice) await this.pick();
    return false;
  }

  dispose(): void {
    clearInterval(this.timer);
    for (const subscription of this.subscriptions) subscription.dispose();
  }
}
