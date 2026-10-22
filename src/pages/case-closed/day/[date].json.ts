import type { APIRoute, GetStaticPaths } from "astro";
import game from "../../../data/case-closed.json";

// One small file per day, so the page only ever loads today's answer and the
// full schedule never ships to the browser. Covers two years from launch; the
// answer list repeats once it runs out.
const DAYS = 730;

const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export const getStaticPaths = (() =>
  Array.from({ length: DAYS }, (_, i) => {
    const entry = game.cases[i % game.cases.length]!;
    return { params: { date: addDays(game.launch, i) }, props: { number: i + 1, ...entry } };
  })) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(props), { headers: { "Content-Type": "application/json" } });
