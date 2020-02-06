export default function listItem(turndownService) {
  turndownService.addRule("listItem", {
    filter: "li",
    replacement: function(content, node, options) {
      content = content
        .replace(/^\n+/, "") // remove leading newlines
        .replace(/\n+$/, "\n") // replace trailing newlines with just a single one
        .replace(/\n/gm, "\n    "); // indent
      let prefix = options.bulletListMarker + " ";
      const parent = node.parentNode;
      if (parent.nodeName === "OL") {
        const start = parent.getAttribute("start");
        const index = Array.prototype.indexOf.call(parent.children, node);
        prefix = (start ? Number(start) + index : index + 1) + ". ";
      }
      return prefix + content + (node.nextSibling && !/\n$/.test(content) ? "\n" : "");
    }
  });
}
