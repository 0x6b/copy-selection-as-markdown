import TurndownService from "turndown";
import { tables, taskListItems } from "turndown-plugin-gfm";
import turndownPluginGfmStrikethrough from "./plugins/gfm-strikethrough.js";
import turndownPluginImgReferenceStyle from "./plugins/img-reference-style.js";
import turndownPluginImg from "./plugins/img.js";
import turndownPluginLinkWithoutStyling from "./plugins/link-without-styling.js";
import turndownPluginListItem from "./plugins/list-item.js";
import turndownPluginMathJax from "./plugins/mathjax.js";
import { getSelectionHtml } from "./selection.js";

const configureTurndownService = (options) => {
  const turndownService = TurndownService(options);

  if (options.mathjax) {
    turndownService.use(turndownPluginMathJax);
  }

  if (options.gfm) {
    turndownService.use(turndownPluginGfmStrikethrough);
    turndownService.use(tables);
    turndownService.use(taskListItems);
  }

  if (options.img) {
    turndownService.use(turndownPluginImg);
  }

  if (options.linkWithoutStyling) {
    turndownService.use(turndownPluginLinkWithoutStyling);
  }

  if (options.reduceListItemPadding) {
    turndownService.use(turndownPluginListItem);
  }

  if (options.embedImage) {
    turndownService.use(turndownPluginImgReferenceStyle);
  }

  if (options.replaceAngleBrackets) {
    turndownService.escape = (string) =>
      string
        // Escape backslash escapes!
        .replace(/\\(\S)/g, "\\\\$1")

        // Escape headings
        .replace(/^(#{1,6} )/gm, "\\$1")

        // Escape hr
        .replace(/^([-*_] *){3,}$/gm, (match, character) =>
          match.split(character).join("\\" + character),
        )

        // Escape ol bullet points
        .replace(/^(\W* {0,3})(\d+)\. /gm, "$1$2\\. ")

        // Escape ul bullet points
        .replace(/^([^\\\w]*)[*+-] /gm, (match) =>
          match.replace(/([*+-])/g, "\\$1"),
        )

        // Escape blockquote indents
        .replace(/^(\W* {0,3})> /gm, "$1\\> ")

        // Escape em/strong *
        .replace(/\*+(?![*\s\W]).+?\*+/g, (match) =>
          match.replace(/\*/g, "\\*"),
        )

        // Escape em/strong _
        .replace(/_+(?![_\s\W]).+?_+/g, (match) => match.replace(/_/g, "\\_"))

        // Escape code _
        .replace(/`+(?![`\s\W]).+?`+/g, (match) => match.replace(/`/g, "\\`"))

        // Escape link brackets
        .replace(/[\[\]]/g, "\\$&")

        // Replace angle brackets
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
  }

  return turndownService;
};

export const getSelectionAsMarkdown = async (options) => {
  const turndownService = configureTurndownService(options);
  const html = await getSelectionHtml(options);

  return {
    html,
    output: turndownService.turndown(html),
    url: document.URL,
  };
};
