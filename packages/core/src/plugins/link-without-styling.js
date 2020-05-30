export default function strikethrough(turndownService) {
  turndownService.addRule("inlineLink", {
    filter: (node, options) =>
      options.linkStyle === "inlined" &&
      node.nodeName === "A" &&
      node.getAttribute("href"),
    replacement: (content, node) =>
      `${content} (${node.getAttribute("href")}${
        node.title ? ` "${node.title}"` : ""
      })`,
  });
}
