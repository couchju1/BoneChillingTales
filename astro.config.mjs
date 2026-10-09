// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import site from "./site.config.json" with { type: "json" };
import { sourceTags } from "./src/lib/source-tags-plugin.ts";

export default defineConfig({
  site: site.domain,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  markdown: {
    processor: satteri({ mdastPlugins: [sourceTags] }),
  },
});
