import type { APIRoute, GetStaticPaths } from "astro";
import { getPublishedCases, type Case } from "../../lib/content";
import { renderOgImage } from "../../lib/og-image";
import { site } from "../../lib/config";

export const getStaticPaths = (async () => {
  const cases = await getPublishedCases();
  return cases.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ entry: Case }> = async ({ props }) => {
  const { data } = props.entry;
  const png = await renderOgImage({
    title: data.title,
    status: data.status,
    statusLabel: site.statuses[data.status].label,
    place: `${data.town}, ${data.state}`,
    year: data.incidentDate.getUTCFullYear(),
  });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
