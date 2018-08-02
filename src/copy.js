import { doCopy, getSelectionAsMarkdown } from "./lib/util";

async function main() {
  try {
    let options = await browser.storage.local.get();
    options["use-quote"] = typeof options["use-quote"] === "undefined" ? true : options["use-quote"];
    options["link-to-source"] = typeof options["link-to-source"] === "undefined" ? true : options["link-to-source"];
    options.headingStyle = typeof options.headingStyle === "undefined" ? "atx" : options.headingStyle;
    options.bulletListMarker = typeof options.bulletListMarker === "undefined" ? "-" : options.bulletListMarker;
    options.codeBlockStyle = typeof options.codeBlockStyle === "undefined" ? "indented" : options.codeBlockStyle;
    options.fence = typeof options.fence === "undefined" ? "`" : options.fence;
    options.emDelimiter = typeof options.emDelimiter === "undefined" ? "_" : options.emDelimiter;
    options.strongDelimiter = typeof options.strongDelimiter === "undefined" ? "**" : options.strongDelimiter;
    options.linkStyle = typeof options.linkStyle === "undefined" ? "inlined" : options.linkStyle;
    options.linkReferenceStyle =
      typeof options.linkReferenceStyle === "undefined" ? "full" : options.linkReferenceStyle;
    options.debug = typeof options.debug === "undefined" ? true : options.debug;

    let text = `[${document.title}](${document.URL})`;
    let selection = getSelectionAsMarkdown(options);

    if (selection !== "") {
      if (options["use-quote"]) {
        selection = selection
          .split("\n")
          .map(line => `> ${line}`)
          .join("\n");
      }
      if (options["link-to-source"]) {
        text += `\n\n${selection}`;
      } else {
        text = selection;
      }
    }

    if (config["debug"]) {
      console.log("/* --- copy-selection-as-markdown debug information --- */");
      console.log("/* --- INPUT ------------------------------------------ */");
      console.log(result.html);
      console.log("/* --- OUTPUT------------------------------------------ */");
      console.log(result.output);
      console.log("/* --- URL -------------------------------------------- */");
      console.log(result.url);
      console.log("/* ---------------------------------------------------- */");
    }
    doCopy(text);
  } catch (e) {
    console.error(e);
  }
}

main();
