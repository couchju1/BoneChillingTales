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
  return `<sup class="cite" data-pagefind-ignore>${links.join('<span aria-hidden="true">,</span>')}</sup>`;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Plain frontmatter text (summary, timeline, updates) to HTML with citation links. */
export function withCitations(text: string): string {
  return escapeHtml(text)
    .replace(SOURCE_TAG, (_, group: string) => citationHtml(group))
    .replace(/\s+(<sup class="cite")/g, "$1");
}

/** Text with its [S#] tags removed, for places a link can't hold more links. */
export function stripCitations(text: string): string {
  return text.replace(SOURCE_TAG, "").replace(/\s+([.,!?])/g, "$1").replace(/\s{2,}/g, " ").trim();
}

const CITE_HTML = /<sup class="cite"[^>]*>.*?<\/sup>/g;

/**
 * Story HTML with the superscripts lifted out of the sentences. Each section (the opening, then
 * everything under an h2) ends with one line listing the sources it used, so the story reads
 * without interruptions and every fact stays traceable.
 */
export function sourcesBySection(html: string): string {
  return html
    .split(/(?=<h2[\s>])/)
    .map((part) => {
      const ids: number[] = [];
      for (const sup of part.match(CITE_HTML) ?? []) {
        for (const m of sup.matchAll(/href="#source-(\d+)"/g)) {
          const n = Number(m[1]);
          if (!ids.includes(n)) ids.push(n);
        }
      }
      if (ids.length === 0) return part;
      const links = ids
        .sort((a, b) => a - b)
        .map((n) => `<a href="#${sourceAnchor(`S${n}`)}">${n}</a>`)
        .join(", ");
      return (
        part.replace(CITE_HTML, "") +
        `<p class="section-sources ui" data-pagefind-ignore>Sources for this section: ${links}</p>`
      );
    })
    .join("");
}

/** Just the citation links from a piece of text, as HTML. */
export function citationsOnly(text: string): string {
  return [...text.matchAll(SOURCE_TAG)].map((m) => citationHtml(m[1]!)).join("");
}
