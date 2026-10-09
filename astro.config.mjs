// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import site from "./site.config.json" with { type: "json" };
import { sourceTags } from "./src/lib/source-tags-plugin.ts";
import seoAudit from "./src/integrations/seo-audit.ts";

// Pages that say noindex stay out of the sitemap too.
const NOT_IN_SITEMAP = ["/404/", "/suggest/sent/"];

export default defineConfig({
  site: site.domain,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  markdown: {
    processor: satteri({ mdastPlugins: [sourceTags], features: { headingAttributes: true } }),
  },
  integrations: [
    sitemap({
      filter: (page) => !NOT_IN_SITEMAP.some((path) => new URL(page).pathname === path),
    }),
    seoAudit(),
  ],
});
