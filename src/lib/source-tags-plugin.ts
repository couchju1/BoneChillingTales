import { defineMdastPlugin } from "satteri";
import { SOURCE_TAG, sourceAnchor } from "./sources";

type Node = { type: string; value?: string; url?: string; children?: Node[]; data?: object };

const citation = (group: string): Node => {
  const links: Node[] = [];
  group
    .split(",")
    .map((id) => id.trim())
    .forEach((id, i) => {
      if (i > 0) links.push({ type: "citeComma", data: { hName: "span", hProperties: { ariaHidden: "true" } }, children: [{ type: "text", value: "," }] });
      links.push({
        type: "link",
        url: `#${sourceAnchor(id)}`,
        children: [
          { type: "citeLabel", data: { hName: "span", hProperties: { className: ["visually-hidden"] } }, children: [{ type: "text", value: "Source " }] },
          { type: "text", value: id.slice(1) },
        ],
      });
    });
  // Citations stay out of search excerpts.
  return { type: "cite", data: { hName: "sup", hProperties: { className: ["cite"], "data-pagefind-ignore": "index" } }, children: links };
};

/** Turns [S3] and [S2, S5] in story text into superscript links to the source list. */
export const sourceTags = defineMdastPlugin({
  name: "source-tags",
  text(node, ctx) {
    if (!node.value.includes("[S")) return;
    const parts: Node[] = [];
    let last = 0;
    for (const match of node.value.matchAll(SOURCE_TAG)) {
      // Drop the space before a tag so the superscript sits against the word.
      const before = node.value.slice(last, match.index).replace(/\s+$/, "");
      if (before) parts.push({ type: "text", value: before });
      parts.push(citation(match[1]!));
      last = match.index + match[0].length;
    }
    if (parts.length === 0) return;
    const after = node.value.slice(last);
    if (after) parts.push({ type: "text", value: after });
    ctx.replaceNode(node, { type: "citeRun", data: { hName: "span" }, children: parts } as never);
  },
});
