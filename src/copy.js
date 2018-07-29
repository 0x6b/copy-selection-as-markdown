import { getSelectionAsMarkdown, doCopy } from "./lib/util";

let text = `[${document.title}](${document.URL})`;
let selection = getSelectionAsMarkdown();

browser.storage.local.get("use-quote").then(
  result => {
    if (typeof result["use-quote"] === "undefined" || result["use-quote"]) {
      selection = selection
        .split("\n")
        .map(line => `> ${line}`)
        .join("\n");
      if (selection !== "> ") text += `\n\n${selection}`;
    } else {
      if (selection !== "") text += `\n\n${selection}`;
    }
    doCopy(text);
  },
  error => {
    console.error(`Error: ${error}`);
  }
);
