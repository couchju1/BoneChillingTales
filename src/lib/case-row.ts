// Shared by the build (CaseRow.astro) and the hub filter script, so a row looks
// the same whether the server or the browser drew it. No astro:content imports here.

import { daysSinceText } from "./days-since";

export interface CaseRowData {
  id: string;
  person: string;
  town: string;
  state: string;
  status: "unsolved" | "missing" | "solved" | "in-court";
  statusLabel: string;
  /** "Missing" or "Unsolved" when the row shows a days-since count. */
  counterLabel: string | null;
  /** ISO day the count starts from. */
  countFrom: string | null;
  year: number;
  decade: number;
  line: string;
  /** ISO date of the newest update, or the publish date. */
  lastActivity: string;
  incident: string;
  /** Small photo URL, or null when the case has no photo. */
  thumb: string | null;
  /** Shown in place of the photo when there is none. */
  initials: string;
  /** Updated in the last 30 days. Shows the amber dot. */
  fresh: boolean;
}

export type SortMode = "latest" | "oldest";

export function sortRows(rows: CaseRowData[], mode: SortMode): CaseRowData[] {
  return [...rows].sort((a, b) =>
    mode === "oldest"
      ? a.incident.localeCompare(b.incident)
      : b.lastActivity.localeCompare(a.lastActivity) || b.incident.localeCompare(a.incident),
  );
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** level: the row name's heading level. 2 on hubs, 3 under a section heading. */
export function caseRowHtml(d: CaseRowData, level: 2 | 3 = 2): string {
  const fresh = d.fresh ? `<span class="case-row-fresh" title="New update"><span class="visually-hidden">New update. </span></span>` : "";
  const counter =
    d.counterLabel && d.countFrom
      ? `<span class="days-since pending" data-days-since="${d.countFrom}" data-label="${escape(d.counterLabel)}" aria-hidden="true">${escape(daysSinceText(d.countFrom, d.counterLabel) ?? "")}</span>`
      : "";
  // Decorative: the name sits right beside it.
  const thumb = d.thumb
    ? `<img class="case-row-thumb" src="${escape(d.thumb)}" alt="" width="80" height="80" loading="lazy" decoding="async">`
    : `<span class="case-row-thumb case-row-thumb-empty" aria-hidden="true">${escape(d.initials)}</span>`;
  return (
    `<li class="case-row">` +
    thumb +
    `<h${level} class="case-row-name"><a href="/cases/${escape(d.id)}/">${fresh}${escape(d.person)}</a></h${level}>` +
    `<p class="case-row-meta ui">` +
    `<span class="chip chip-${d.status}">${escape(d.statusLabel)}</span>` +
    `<span>${escape(d.town)}, ${escape(d.state)}</span>` +
    `<span>${d.year}</span>${counter}</p>` +
    `<p class="case-row-line">${escape(d.line)}</p>` +
    `</li>`
  );
}
