import { getCollection } from "astro:content";

/** Published cases only. Every page that lists or renders cases goes through this, so drafts never build. */
export function getPublishedCases() {
  return getCollection("cases", ({ data }) => !data.draft);
}

export function getPublishedUpdates() {
  return getCollection("updates", ({ data }) => !data.draft);
}

export function getPublishedPages() {
  return getCollection("pages", ({ data }) => !data.draft);
}
