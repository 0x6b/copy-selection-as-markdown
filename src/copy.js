import { getSelectionAsMarkdown, doCopy } from "./lib/util";

async function main() {
  try {
    const quote = (await browser.storage.local.get("use-quote"))["use-quote"];
    const link = (await browser.storage.local.get("link-to-source"))["link-to-source"];

    let text = `[${document.title}](${document.URL})`;
    let selection = getSelectionAsMarkdown();

    if (selection !== "") {
      if (typeof quote === "undefined" || quote) {
        selection = selection
          .split("\n")
          .map(line => `> ${line}`)
          .join("\n");
      }
      if (link) {
        text += `\n\n${selection}`;
      } else {
        text = selection;
      }
    }

    doCopy(text);
  } catch (e) {
    console.error(e);
  }
}

main();
