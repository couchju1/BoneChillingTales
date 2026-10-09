import { getEntry, render } from "astro:content";
import { getPublishedCases, toRowData, type Case } from "./content";
import { sortRows } from "./case-row";

export const PAGE_SIZE = 30;

export const EMPTY_HUB = "No stories here yet. New cases are added every week.";

/** Rows for a hub, newest news first. */
export async function hubRows(filter: (c: Case) => boolean = () => true) {
  const cases = await getPublishedCases();
  return sortRows(cases.filter(filter).map(toRowData), "latest");
}

/** A hub's copy from src/content/pages. */
export async function hubCopy(id: string) {
  const entry = await getEntry("pages", id);
  if (!entry) return undefined;
  const { Content } = await render(entry);
  return { ...entry.data, Content };
}

export async function requireHubCopy(id: string) {
  const copy = await hubCopy(id);
  if (!copy) throw new Error(`Missing hub copy: add src/content/pages/${id}.md`);
  return copy;
}
