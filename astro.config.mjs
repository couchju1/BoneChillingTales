// @ts-check
import { defineConfig } from "astro/config";
import site from "./site.config.json" with { type: "json" };

export default defineConfig({
  site: site.domain,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
