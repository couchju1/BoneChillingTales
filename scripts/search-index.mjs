// Builds the Pagefind search index for dist/. Only story and update pages are marked for
// indexing (data-pagefind-body). With none of those yet, Pagefind would index every page,
// hubs included, so the index is skipped until the first story is published.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

async function hasSearchablePage(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "pagefind") {
      if (await hasSearchablePage(path)) return true;
    } else if (entry.name.endsWith(".html") && (await readFile(path, "utf8")).includes("data-pagefind-body")) {
      return true;
    }
  }
  return false;
}

if (!(await hasSearchablePage("dist"))) {
  console.log("Search index skipped: no published stories or updates yet.");
  process.exit(0);
}

const run = spawnSync("pagefind", ["--site", "dist"], { stdio: "inherit", shell: process.platform === "win32" });
process.exit(run.status ?? 1);
