import type { APIRoute } from "astro";
import { getPublishedCases, toRowData } from "../lib/content";

/** Row data for every published case. The hub filters fetch this when a filter is set. */
export const GET: APIRoute = async () => {
  const cases = await getPublishedCases();
  return new Response(JSON.stringify(cases.map(toRowData)), {
    headers: { "Content-Type": "application/json" },
  });
};
