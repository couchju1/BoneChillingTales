// Scans src/content for banned words and punctuation from the Phase 9 human pass.
// Story bodies, titles and descriptions are checked. Source titles are skipped,
// since those quote other publishers.
//
// Also lists placeholders still waiting on you, like [NEEDS CLIENT PROOF], in published
// content and site.config.json. They're warnings normally, and fail with --launch.
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("../src/content/", import.meta.url).pathname;

const BANNED = [
  "delve", "elevate", "empower", "seamless", "unlock", "robust", "leverage", "streamline",
  "comprehensive", "cutting-edge", "top-notch", "one-stop shop", "tailored solutions",
  "passionate about", "trusted partner", "we pride ourselves", "journey", "look no further",
  "in today's fast-paced world", "whether you're", "bombshell", "shocking", "chilling turn",
  "little did they know", "sent shockwaves", "tight-knit community", "a cold case that haunts",
];

const PUNCTUATION = [
  { pattern: /\u2014/, name: "em dash" },
  { pattern: /\u2013/, name: "en dash" },
  { pattern: /;/, name: "semicolon" },
];

// Frontmatter keys whose values are our own words.
const CHECKED_KEYS = /^\s*(title|seoTitle|description|person|summary|text)\s*:|\btext:\s/;

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "['\u2019]");
const bannedPatterns = BANNED.map((word) => ({
  word,
  pattern: new RegExp(`(?<![\\w-])${escape(word)}(?![\\w-])`, "i"),
}));

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(md|mdx)$/.test(entry.name)) yield path;
  }
}

const problems = [];
const placeholders = [];
const PLACEHOLDER = /\[(NEEDS[^\]]*|VERIFY[^\]]*|YOUR CALL[^\]]*|CLIENT TO VERIFY[^\]]*|KIT FORM URL|G-X+|TOKEN)\]/;
const launch = process.argv.includes("--launch");

for await (const file of walk(ROOT)) {
  const lines = (await readFile(file, "utf8")).split("\n");
  const isDraft = lines.some((l) => /^draft:\s*true\b/.test(l));
  if (!isDraft) {
    lines.forEach((line, i) => {
      const m = line.match(PLACEHOLDER);
      if (m) placeholders.push(`${relative(process.cwd(), file)}:${i + 1}  ${m[0]}`);
    });
  }
  let inFrontmatter = lines[0] === "---";

  lines.forEach((line, i) => {
    if (i === 0 && inFrontmatter) return;
    if (inFrontmatter && line === "---") {
      inFrontmatter = false;
      return;
    }
    if (inFrontmatter && (line.trimStart().startsWith("#") || !CHECKED_KEYS.test(line))) return;
    // Our own update text sits on the same line as other fields, so check only the text value.
    const textOnly = inFrontmatter && /\btext:\s/.test(line) ? line.slice(line.search(/\btext:\s/)) : line;

    const where = `${relative(process.cwd(), file)}:${i + 1}`;
    for (const { word, pattern } of bannedPatterns) {
      if (pattern.test(textOnly)) problems.push(`${where}  banned phrase "${word}"`);
    }
    if (!inFrontmatter) {
      for (const { pattern, name } of PUNCTUATION) {
        if (pattern.test(textOnly)) problems.push(`${where}  ${name}`);
      }
    }
  });
}

const configLines = (await readFile(new URL("../site.config.json", import.meta.url), "utf8")).split("\n");
configLines.forEach((line, i) => {
  const m = line.match(PLACEHOLDER);
  if (m) placeholders.push(`site.config.json:${i + 1}  ${m[0]}`);
});

if (placeholders.length > 0) {
  const label = launch ? "Not ready to launch" : "Placeholders still to fill";
  console[launch ? "error" : "warn"](`${label} (${placeholders.length}):\n` + placeholders.map((p) => `  ${p}`).join("\n"));
  if (launch) problems.push(`${placeholders.length} placeholder(s) above`);
}

if (problems.length > 0) {
  console.error(`Content check failed (${problems.length}):\n` + problems.map((p) => `  ${p}`).join("\n"));
  process.exit(1);
}
console.log("Content check passed.");
