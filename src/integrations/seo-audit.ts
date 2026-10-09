import type { AstroIntegration } from "astro";
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Reads every built page and fails the build on SEO mistakes: a missing title, description
 * or canonical, more or fewer than one H1, a generator tag, or a title or description that
 * another indexable page already uses. Long titles and descriptions are warnings.
 */
export default function seoAudit(): AstroIntegration {
  return {
    name: "seo-audit",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const errors: string[] = [];
        const warnings: string[] = [];
        const titles = new Map<string, string>();
        const descriptions = new Map<string, string>();

        for (const file of await htmlFiles(root)) {
          const page = "/" + relative(root, file).replace(/index\.html$/, "");
          const html = await readFile(file, "utf8");
          const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
          const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
          const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
          const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;

          if (!title) errors.push(`${page}: no <title>`);
          if (!description) errors.push(`${page}: no meta description`);
          if (!/<link rel="canonical" href="https:\/\/[^"]+\/"/.test(html)) errors.push(`${page}: no canonical URL ending in /`);
          if (h1s !== 1) errors.push(`${page}: ${h1s} H1 headings, needs exactly 1`);
          if (/<meta name="generator"/.test(html)) errors.push(`${page}: has a generator meta tag`);
          if (title.length > 60) warnings.push(`${page}: title is ${title.length} characters (aim for 60 or fewer)`);
          if (description.length > 155) warnings.push(`${page}: description is ${description.length} characters (aim for 155 or fewer)`);

          if (noindex) continue;
          if (titles.has(title)) errors.push(`${page}: same title as ${titles.get(title)}: "${title}"`);
          if (descriptions.has(description)) errors.push(`${page}: same description as ${descriptions.get(description)}`);
          titles.set(title, page);
          descriptions.set(description, page);
        }

        if (process.env.PREVIEW_DRAFTS === "1") {
          logger.warn("This build includes drafts (PREVIEW_DRAFTS=1). Preview it, but don't deploy it.");
        }
        for (const w of warnings) logger.warn(w);
        if (errors.length) {
          throw new Error(`SEO audit found ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
        }
        logger.info(`SEO audit passed (${titles.size} indexable pages).`);
      },
    },
  };
}

async function htmlFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith(".html")) out.push(path);
  }
  return out;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
