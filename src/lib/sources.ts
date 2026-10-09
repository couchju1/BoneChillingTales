/** Matches [S3] and [S2, S5]. Keep in sync with SOURCE_TAG in src/content.config.ts. */
export const SOURCE_TAG = /\[(S\d+(?:\s*,\s*S\d+)*)\]/g;

export const sourceAnchor = (id: string) => `source-${id.slice(1)}`;

/** Superscript links for one tag group, like [S2, S5]. Returns an HTML string. */
export function citationHtml(group: string): string {
  const links = group
    .split(",")
    .map((id) => id.trim())
    .map(
      (id) =>
        `<a href="#${sourceAnchor(id)}"><span class="visually-hidden">Source </span>${id.slice(1)}</a>`,
    );
  return `<sup class="cite">${links.join('<span aria-hidden="true">,</span>')}</sup>`;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Plain frontmatter text (summary, timeline, updates) to HTML with citation links. */
export function withCitations(text: string): string {
  return escapeHtml(text)
    .replace(SOURCE_TAG, (_, group: string) => citationHtml(group))
    .replace(/\s+(<sup class="cite">)/g, "$1");
}

/** Text with its [S#] tags removed, for places a link can't hold more links. */
export function stripCitations(text: string): string {
  return text.replace(SOURCE_TAG, "").replace(/\s+([.,!?])/g, "$1").replace(/\s{2,}/g, " ").trim();
}

/** Just the citation links from a piece of text, as HTML. */
export function citationsOnly(text: string): string {
  return [...text.matchAll(SOURCE_TAG)].map((m) => citationHtml(m[1]!)).join("");
}
