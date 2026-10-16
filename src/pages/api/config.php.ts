import type { APIRoute } from "astro";
import { site, isPlaceholder } from "../../lib/config";

/**
 * Writes dist/api/config.php so suggest.php and subscribe.php know where to send mail.
 * Blank until forms.suggestTo in site.config.json holds a real address.
 * newsletterCc is copied on each sign-up, blank when newsletter.cc is unset.
 */
export const GET: APIRoute = () => {
  const to = isPlaceholder(site.forms.suggestTo) ? "" : site.forms.suggestTo;
  const newsletterCc = isPlaceholder(site.newsletter.cc) ? "" : (site.newsletter.cc ?? "");
  const domain = new URL(site.domain).hostname.replace(/^www\./, "");
  const php = `<?php\nreturn ${phpArray({ to, domain, newsletterCc })};\n`;
  return new Response(php, { headers: { "Content-Type": "text/plain" } });
};

const phpArray = (values: Record<string, string>) =>
  "[" +
  Object.entries(values)
    .map(([k, v]) => `'${k}' => '${v.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`)
    .join(", ") +
  "]";
