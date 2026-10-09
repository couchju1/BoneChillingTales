import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPublishedCases, getPublishedUpdates } from "../lib/content";
import { site } from "../lib/config";

/** New stories and update posts, newest first. */
export const GET: APIRoute = async () => {
  const cases = await getPublishedCases();
  const live = new Set(cases.map((c) => c.id));
  const updates = (await getPublishedUpdates()).filter((u) => live.has(u.data.case.id));

  const items = [
    ...cases.map((c) => ({
      title: c.data.title,
      description: c.data.description,
      pubDate: c.data.published,
      link: `/cases/${c.id}/`,
      categories: [site.statuses[c.data.status].label, c.data.state],
    })),
    ...updates.map((u) => ({
      title: u.data.title,
      description: u.data.description,
      pubDate: u.data.date,
      link: `/updates/${u.id}/`,
      categories: ["Update"],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: site.siteName,
    description: site.description,
    site: site.domain,
    items,
    customData: "<language>en-us</language>",
    trailingSlash: true,
  });
};
