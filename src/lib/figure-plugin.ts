import { defineMdastPlugin } from "satteri";

/** Turns a paragraph holding only an image with a title, like ![alt](./photo.jpg "Caption"),
 *  into a figure with the title as its caption. */
export const figures = defineMdastPlugin({
  name: "figures",
  paragraph(node, ctx) {
    const [img, ...rest] = node.children;
    if (rest.length > 0 || img?.type !== "image" || !img.title) return;
    ctx.replaceNode(node, {
      type: "figure",
      data: { hName: "figure" },
      children: [
        { ...img, title: null },
        { type: "figureCaption", data: { hName: "figcaption" }, children: [{ type: "text", value: img.title }] },
      ],
    } as never);
  },
});
