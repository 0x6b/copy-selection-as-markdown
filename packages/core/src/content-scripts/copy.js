import { doCopy } from "../clipboard.js";
import { getSelectionAsMarkdown } from "../conversion.js";
import { convertTitleSubstitution } from "../utils/title-substitution.js";
import { getAllOptionsWithDefaults } from "../settings/defaults.js";

async function main() {
  try {
    let rawOptions = await browser.storage.local.get();
    let options = getAllOptionsWithDefaults(rawOptions);

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

`);
    }
    await doCopy(text, html);
  } catch (e) {
    console.error(e);
  }
}

main();