export default function img(turndownService) {
  turndownService.addRule("img", {
    filter: ["img"],
    references: [],
    replacement: function (content, node) {
      const id = this.references.length + 1;
      let title = "";
      title = node.title ? node.title : node.alt ? node.alt : "";
      this.references.push("[img" + id + "]: " + node.src);
      return "![" + title + "][img" + id + "]";
    },
    append: function () {
      let references = "";
      if (this.references.length) {
        references = "\n\n" + this.references.join("\n") + "\n\n";
        this.references = [];
      }
      return references;
    },
  });
}
