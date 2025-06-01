export default function strikethrough(turndownService) {
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => "~~" + content + "~~",
  });
}
