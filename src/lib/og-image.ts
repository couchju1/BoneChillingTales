import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { CaseStatus } from "./config";

const STATUS_COLOR: Record<CaseStatus, string> = {
  unsolved: "#E85A4E",
  missing: "#E3A23B",
  solved: "#86B58F",
  "in-court": "#E8DACB",
};

type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

let assets: Promise<{ fonts: Parameters<typeof satori>[1]["fonts"]; logo: string }> | null = null;
function loadAssets() {
  assets ??= (async () => {
    // Paths from the project root: the build bundles this file, so import.meta.url moves.
    const root = process.cwd();
    const font = (name: string) => readFile(join(root, "src/assets/og-fonts", name));
    const logo = await readFile(join(root, "public/images/logo-wordmark-284.png"));
    return {
      fonts: [
        { name: "Newsreader", data: await font("newsreader-600.ttf"), weight: 600, style: "normal" },
        { name: "Public Sans", data: await font("public-sans-400.ttf"), weight: 400, style: "normal" },
        { name: "Public Sans", data: await font("public-sans-600.ttf"), weight: 600, style: "normal" },
      ],
      logo: `data:image/png;base64,${logo.toString("base64")}`,
    };
  })();
  return assets;
}

export interface OgCard {
  title: string;
  status: CaseStatus;
  statusLabel: string;
  place: string;
  year: number;
}

/** 1200x630 PNG share card: headline, status chip, place and year on Night, wordmark in the corner. */
export async function renderOgImage(card: OgCard): Promise<Buffer> {
  const { fonts, logo } = await loadAssets();
  const color = STATUS_COLOR[card.status];
  const size = card.title.length > 70 ? 60 : card.title.length > 45 ? 72 : 84;

  const body = h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexGrow: 1,
      padding: "60px 72px 48px",
    },
    [
      h("div", { display: "flex", alignItems: "center", gap: 28, fontSize: 30 }, [
        h(
          "div",
          {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "6px 22px",
            border: `3px solid ${color}`,
            borderRadius: 999,
            color,
            fontWeight: 600,
          },
          [
            ...(card.status === "in-court" ? [] : [h("div", { width: 14, height: 14, borderRadius: 999, background: color })]),
            card.statusLabel,
          ],
        ),
        h("div", { color: "#A89C8E" }, `${card.place} · ${card.year}`),
      ]),
      h(
        "div",
        { display: "flex", fontFamily: "Newsreader", fontWeight: 600, fontSize: size, lineHeight: 1.08, maxWidth: 1000 },
        card.title,
      ),
      h("div", { display: "flex", alignItems: "flex-end", justifyContent: "space-between" }, [
        h("img", { width: 220, height: 88 }, undefined, { src: logo, width: 220, height: 88 }),
        h("div", { color: "#A89C8E", fontSize: 26, letterSpacing: 2 }, "BONECHILLINGTALES.COM"),
      ]),
    ],
  );

  const tree = h(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      background: "#120F0D",
      color: "#E8DACB",
      fontFamily: "Public Sans",
    },
    [body, h("div", { height: 12, background: "#AD0404" })],
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
