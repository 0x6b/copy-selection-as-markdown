export default function img(turndownService) {
  turndownService.addRule("img", {
    filter: ["img"],
    replacement: (content, node) => {
      const src = node.getAttribute("src")
        ? `src="${node.getAttribute("src")}"`
        : "";
      const alt = node.alt ? `alt="${node.alt}"` : "";
      const title = node.title ? `title="${node.title}"` : "";
      const width = node.getAttribute("width")
        ? `width="${node.getAttribute("width")}"`
        : "";
      const height = node.getAttribute("height")
        ? `height="${node.getAttribute("height")}"`
        : "";
      return src
        ? "<img " +
            [src, alt, title, width, height].filter((e) => e !== "").join(" ") +
            ">"
        : "";
    },
  });
}
