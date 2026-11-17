import { Prometheux } from "prometheux-chain";
import { FoundryClient } from "../foundry/client";
import type { Account } from "./model";

// Parses on any engine; used to check that a Foundry account reaches the Prometheux functions.
const PROBE_PROGRAM = 'probe(1).\nprobeOut(X) <- probe(X).\n@output("probeOut").';

/** Checks that an account's URL and token work. Resolves with a short description, rejects otherwise. */
export async function testAccount(account: Account, token: string): Promise<string> {
  if (account.platform === "prometheux") {
    const ontologies = await new Prometheux({ token, baseUrl: account.url, maxRetries: 0 }).ontologies.list();
    return `Connected: ${ontologies.length} ontolog${ontologies.length === 1 ? "y" : "ies"} visible.`;
  }
  const problem = await new FoundryClient({
    url: account.url,
    token,
    ontology: account.ontology ?? "",
    functionSuffix: account.functionSuffix,
  }).validate(PROBE_PROGRAM);
  if (problem) throw new Error(`The functions answered, but rejected a test program: ${problem}`);
  return `Connected: the Prometheux functions (run${account.functionSuffix ?? "PX"}, …) answer.`;
}
