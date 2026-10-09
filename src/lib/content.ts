import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "./config";
import { isoDate, daysBetween } from "./dates";
import type { CaseRowData } from "./case-row";

export type Case = CollectionEntry<"cases">;

/**
 * Drafts show up under `npm run dev`, or in a build run with PREVIEW_DRAFTS=1, so a
 * story can be checked before it goes live. They're marked noindex with a banner.
 * A normal build (what deploys) never includes them.
 */
export const showDrafts = import.meta.env.DEV || process.env.PREVIEW_DRAFTS === "1";

/** Every page that lists or renders cases goes through this. */
export function getPublishedCases() {
  return getCollection("cases", ({ data }) => showDrafts || !data.draft);
}

export function getPublishedUpdates() {
  return getCollection("updates", ({ data }) => showDrafts || !data.draft);
}

export function getPublishedPages() {
  return getCollection("pages", ({ data }) => showDrafts || !data.draft);
}

/** Newest dated update on a case, or its publish date. Hubs and "Still open" sort on this. */
export function lastActivity(entry: Case): Date {
  const dates = [entry.data.published, ...entry.data.updates.map((u) => u.date)];
  return new Date(Math.max(...dates.map((d) => d.getTime())));
}

/** One case to read next: same state first, then same status, then the newest. */
export function relatedCase(entry: Case, all: Case[]): Case | undefined {
  const others = all
    .filter((c) => c.id !== entry.id)
    .sort((a, b) => lastActivity(b).getTime() - lastActivity(a).getTime());
  return (
    others.find((c) => c.data.state === entry.data.state) ??
    others.find((c) => c.data.status === entry.data.status) ??
    others[0]
  );
}

export const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado",
  CT: "Connecticut", DE: "Delaware", DC: "District of Columbia", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
  KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts",
  MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico",
  NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

/** +16055551234 → (605) 555-1234 */
export function formatPhone(e164: string): string {
  const d = e164.replace(/^\+1/, "");
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

const FRESH_DAYS = 30;

export function toRowData(entry: Case): CaseRowData {
  const d = entry.data;
  const counterLabel = site.statuses[d.status].counterLabel;
  const countFrom = d.status === "missing" ? d.lastSeenDate : d.incidentDate;
  const last = lastActivity(entry);
  const year = d.incidentDate.getUTCFullYear();
  return {
    id: entry.id,
    person: d.person,
    town: d.town,
    state: d.state,
    status: d.status,
    statusLabel: site.statuses[d.status].label,
    counterLabel: counterLabel && countFrom ? counterLabel : null,
    countFrom: counterLabel && countFrom ? isoDate(countFrom) : null,
    year,
    decade: Math.floor(year / 10) * 10,
    line: d.description,
    lastActivity: isoDate(last),
    incident: isoDate(d.incidentDate),
    fresh: last > d.published && daysBetween(last, new Date()) >= 0 && daysBetween(last, new Date()) <= FRESH_DAYS,
  };
}

export interface FeedItem {
  date: Date;
  text: string;
  href: string;
  person: string;
}

/**
 * Dated one-liners for "Latest on cases we follow": update posts plus the update log
 * entries on each story, skipping the "Story published" line that lands on the publish date.
 */
export async function latestUpdates(cases: Case[], limit: number): Promise<FeedItem[]> {
  const byId = new Map(cases.map((c) => [c.id, c]));
  const posts = (await getPublishedUpdates()).flatMap((u) => {
    const story = byId.get(u.data.case.id);
    return story ? [{ date: u.data.date, text: u.data.title, href: `/updates/${u.id}/`, person: story.data.person }] : [];
  });
  const logs = cases.flatMap((c) =>
    c.data.updates
      .filter((u) => u.date.getTime() !== c.data.published.getTime())
      .map((u) => ({ date: u.date, text: u.text, href: `/cases/${c.id}/#updates-heading`, person: c.data.person })),
  );
  return [...posts, ...logs].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, limit);
}

/** Every correction: update log entries marked as corrections, plus update posts marked as corrections. */
export async function allCorrections(cases: Case[]): Promise<FeedItem[]> {
  const byId = new Map(cases.map((c) => [c.id, c]));
  const fromLogs = cases.flatMap((c) =>
    c.data.updates
      .filter((u) => u.type === "correction")
      .map((u) => ({ date: u.date, text: u.text, href: `/cases/${c.id}/#updates-heading`, person: c.data.person })),
  );
  const fromPosts = (await getPublishedUpdates()).flatMap((u) => {
    const story = byId.get(u.data.case.id);
    return u.data.type === "correction" && story
      ? [{ date: u.data.date, text: u.data.title, href: `/updates/${u.id}/`, person: story.data.person }]
      : [];
  });
  return [...fromLogs, ...fromPosts].sort((a, b) => b.date.getTime() - a.date.getTime());
}
