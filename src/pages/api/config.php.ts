import type { APIRoute } from "astro";
import { site, isPlaceholder } from "../../lib/config";

/**
 * Writes dist/api/config.php so suggest.php knows where to send mail.
 * Blank until forms.suggestTo in site.config.json holds a real address.
 */
export const GET: APIRoute = () => {
  const to = isPlaceholder(site.forms.suggestTo) ? "" : site.forms.suggestTo;
  const domain = new URL(site.domain).hostname.replace(/^www\./, "");
  const php = `<?php\nreturn ${phpArray({ to, domain })};\n`;
  return new Response(php, { headers: { "Content-Type": "text/plain" } });
};

const phpArray = (values: Record<string, string>) =>
  "[" +
  Object.entries(values)
    .map(([k, v]) => `'${k}' => '${v.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`)
    .join(", ") +
  "]";
