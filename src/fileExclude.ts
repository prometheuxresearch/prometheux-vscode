// No `vscode` import: the unit tests bundle this file.

/**
 * The `files.exclude` setting as a test on a path relative to its workspace folder, the way
 * Explorer applies it: a pattern starting with "**" + "/" matches at any depth (every .git), one
 * without matches from the folder's root (the top-level out). Patterns set to false (or to a
 * `when` condition) are not applied.
 */
export function excludeMatcher(patterns: Record<string, unknown>): (relativePath: string) => boolean {
  const regexes = Object.entries(patterns)
    .filter(([, value]) => value === true)
    .map(([glob]) => {
      const anywhere = glob.startsWith("**/");
      const body = (anywhere ? glob.slice(3) : glob)
        .replace(/[.+^$()|[\]\\]/g, "\\$&")
        .replace(/\{([^}]*)\}/g, (_, alternatives: string) => `(${alternatives.split(",").join("|")})`)
        .replace(/\*\*/g, "\u0000")
        .replace(/\*/g, "[^/]*")
        .replace(/\?/g, "[^/]")
        .replace(/\u0000/g, ".*");
      return new RegExp(`${anywhere ? "(^|/)" : "^"}${body}$`);
    });
  return (relativePath) => regexes.some((regex) => regex.test(relativePath));
}
