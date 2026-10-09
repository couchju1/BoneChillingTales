// Turns redirects.txt into 301 rules inside dist/.htaccess, between the REDIRECTS markers.
import { readFile, writeFile } from "node:fs/promises";

// Full https URLs, so a redirect never drops to http behind Hostinger's proxy.
const { domain } = JSON.parse(await readFile("site.config.json", "utf8"));

const lines = (await readFile("redirects.txt", "utf8")).split("\n");
const rules = [];
lines.forEach((raw, i) => {
  const line = raw.trim();
  if (!line || line.startsWith("#")) return;
  const [from, to, extra] = line.split(/\s+/);
  const ok = (p) => /^\/[\w\-./]*$/.test(p ?? "");
  if (!ok(from) || !ok(to) || extra) {
    throw new Error(`redirects.txt line ${i + 1}: expected "/old-path/ /new-path/", got "${line}"`);
  }
  const pattern = from.replace(/^\//, "").replace(/[.]/g, "\\.").replace(/\/$/, "");
  rules.push(`  RewriteRule ^${pattern}/?$ ${domain}${to} [R=301,L]`);
});

const file = "dist/.htaccess";
const htaccess = await readFile(file, "utf8");
const start = "  # BEGIN REDIRECTS";
const end = "  # END REDIRECTS";
const before = htaccess.slice(0, htaccess.indexOf(start));
const after = htaccess.slice(htaccess.indexOf(end) + end.length);
const block = `${start} (written by scripts/redirects.mjs from redirects.txt)\n${rules.join("\n")}${rules.length ? "\n" : ""}${end}`;
await writeFile(file, before + block + after);
console.log(`Redirects: ${rules.length} rule(s) written to dist/.htaccess.`);
