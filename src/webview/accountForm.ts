// The account form's script (bundled to dist/webview/accountForm.js; runs in the webview).
// Values are set with `.value` / `textContent`, never HTML.
import type { FormMessage, FormRequest } from "../accounts/accountEditor";
import type { AccountForm, Platform } from "../accounts/model";

declare function acquireVsCodeApi(): { postMessage(message: FormRequest): void };
const vscode = acquireVsCodeApi();

const CLOUD_HINT = "Leave empty: it is worked out from the API key (https://api.prometheux.ai/jarvispy/<organization>/<username>).";
const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const input = (id: string) => element<HTMLInputElement>(id);

let editing = false;
let tokenSaved = false;

function platform(): Platform {
  const checked = document.querySelector<HTMLInputElement>('input[name="platform"]:checked');
  return checked?.value === "foundry" ? "foundry" : "prometheux";
}

/** Shows the fields of the chosen platform and fits labels and hints to it. */
function refresh(): void {
  const current = platform();
  document.querySelectorAll<HTMLElement>("[data-platform]").forEach((section) => {
    section.hidden = section.dataset.platform !== current;
  });
  const where = element<HTMLSelectElement>("where").value;
  const keep = editing && tokenSaved ? " Leave empty to keep the saved one." : "";
  if (current === "foundry") {
    element("urlLabel").textContent = "Foundry URL";
    input("url").placeholder = "https://acme.palantirfoundry.com";
    element("urlHint").textContent = "The address of your Foundry, as in the browser.";
    element("tokenLabel").textContent = "Foundry token";
    element("tokenHint").textContent = `Create one in Foundry under Account → Settings → Tokens.${keep}`;
  } else {
    element("urlLabel").textContent = "API URL";
    input("url").placeholder = where === "local" ? "http://localhost:8000" : "https://…";
    element("urlHint").textContent =
      where === "cloud" ? CLOUD_HINT : where === "local" ? "A development jarvispy (RUN_MODE=development)." : "Your platform's API URL (the SDKs' JARVISPY_URL).";
    element("tokenLabel").textContent = "API key";
    element("tokenHint").textContent =
      (where === "local" ? "A development backend accepts devtoken." : "Create one in the Prometheux app under Settings → API keys.") + keep;
  }
}

function form(): AccountForm {
  return {
    name: input("name").value,
    platform: platform(),
    url: input("url").value,
    ontology: input("ontology").value,
    functionSuffix: input("functionSuffix").value,
    token: input("token").value,
  };
}

function status(ok: boolean, message: string): void {
  const box = element("status");
  box.className = ok ? "ok" : "error";
  box.textContent = message;
}

window.addEventListener("message", (event: MessageEvent<FormMessage>) => {
  const message = event.data;
  if (message.type === "init") {
    editing = message.editing;
    tokenSaved = message.tokenSaved;
    element("title").textContent = editing ? `Edit ${message.form.name}` : "Add Account";
    const radio = document.querySelector<HTMLInputElement>(`input[name="platform"][value="${message.form.platform}"]`);
    if (radio) radio.checked = true;
    input("name").value = message.form.name;
    input("url").value = message.form.url;
    input("ontology").value = message.form.ontology ?? "";
    input("functionSuffix").value = message.form.functionSuffix ?? "PX";
    const url = message.form.url;
    element<HTMLSelectElement>("where").value =
      !url || url.startsWith("https://api.prometheux.ai/") ? "cloud" : url.startsWith("http://localhost") ? "local" : "custom";
    refresh();
  }
  if (message.type === "result") status(message.ok, message.message);
});

document.querySelectorAll('input[name="platform"]').forEach((radio) => radio.addEventListener("change", refresh));
element<HTMLSelectElement>("where").addEventListener("change", () => {
  if (element<HTMLSelectElement>("where").value === "local" && !input("url").value) input("url").value = "http://localhost:8000";
  refresh();
});
element("form").addEventListener("submit", (event) => {
  event.preventDefault();
  status(true, "Saving…");
  vscode.postMessage({ type: "save", form: form(), use: input("use").checked });
});
element("test").addEventListener("click", () => {
  status(true, "Connecting…");
  vscode.postMessage({ type: "test", form: form() });
});
element("cancel").addEventListener("click", () => vscode.postMessage({ type: "cancel" }));
vscode.postMessage({ type: "ready" });
