import {
  doCopy,
  getSelectionAsMarkdown,
  convertTitleSubstitution,
} from "./util";

async function main() {
  try {
    let options = await browser.storage.local.get();
    options["use-quote"] =
      typeof options["use-quote"] === "undefined" ? true : options["use-quote"];
    options["link-to-source"] =
      typeof options["link-to-source"] === "undefined"
        ? true
        : options["link-to-source"];
    options.headingStyle =
      typeof options.headingStyle === "undefined"
        ? "atx"
        : options.headingStyle;
    options.bulletListMarker =
      typeof options.bulletListMarker === "undefined"
        ? "-"
        : options.bulletListMarker;
    options.codeBlockStyle =
      typeof options.codeBlockStyle === "undefined"
        ? "indented"
        : options.codeBlockStyle;
    options.fence =
      typeof options.fence === "undefined" ? "```" : options.fence.repeat(3);
    options.emDelimiter =
      typeof options.emDelimiter === "undefined" ? "_" : options.emDelimiter;
    options.strongDelimiter =
      typeof options.strongDelimiter === "undefined"
        ? "**"
        : options.strongDelimiter;
    options.linkStyle =
      typeof options.linkStyle === "undefined" ? "inlined" : options.linkStyle;
    options.linkReferenceStyle =
      typeof options.linkReferenceStyle === "undefined"
        ? "full"
        : options.linkReferenceStyle;
    options.debug =
      typeof options.debug === "undefined" ? false : options.debug;
    options.mathjax =
      typeof options.mathjax === "undefined" ? false : options.mathjax;
    options.gfm = typeof options.gfm === "undefined" ? false : options.gfm;
    options.linkWithoutStyling =
      typeof options.linkWithoutStyling === "undefined"
        ? false
        : options.linkWithoutStyling;
    options.img = typeof options.img === "undefined" ? false : options.img;
    options.embedImage = typeof options.embedImage === "undefined" ? false : options.embedImage;
    options.titleSubstitution =
      typeof options.titleSubstitution === "undefined"
        ? ""
        : options.titleSubstitution;
    options.reduceListItemPadding =
      typeof options.reduceListItemPadding === "undefined"
        ? false
        : options.reduceListItemPadding;
    options.replaceAngleBrackets =
      typeof options.replaceAngleBrackets === "undefined"
        ? false
        : options.replaceAngleBrackets;

    let title = document.title;
    if (options.titleSubstitution !== "") {
      let pattern = convertTitleSubstitution(options.titleSubstitution);
      title = title.replace(pattern, "");
    }
    let text = options.linkWithoutStyling
      ? `${title} (${document.URL})`
      : `[${title}](${document.URL})`;
    let html = `<a href="${document.URL}">${title}</a>`;
    let selection = await getSelectionAsMarkdown(options);

    if (selection.output !== "") {
      if (options["use-quote"]) {
        selection.output = selection.output
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n");
      }
      if (options["link-to-source"]) {
        text += `\n\n${selection.output}`;
        html += `<br><br><blockquote>${selection.html}</blockquote>`;
      } else {
        text = selection.output;
        html = selection.html;
      }
    }

    if (options.debug) {
      console.log(`
/* --- copy-selection-as-markdown debug information ------------------------------------------------------- */
### INPUT

\`\`\`html
${selection.html}
\`\`\`

### OUTPUT

\`\`\`markdown
${selection.output}
\`\`\`

### Source URL

${selection.url}
/* --- end of copy-selection-as-markdown debug information ------------------------------------------------ */
Open new issue at https://github.com/0x6b/copy-selection-as-markdown/issues/new with information above.

`      );
    }
    doCopy(text, html);
  } catch (e) {
    console.error(e);
  }
}

main();
