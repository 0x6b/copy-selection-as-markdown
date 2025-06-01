import TurndownService from "turndown";
import turndownPluginMathJax from "./plugins/mathjax.js";
import turndownPluginGfmStrikethrough from "./plugins/gfm-strikethrough.js";
import turndownPluginImg from "./plugins/img.js";
import turndownPluginImgReferenceStyle from "./plugins/img-reference-style.js";
import turndownPluginLinkWithoutStyling from "./plugins/link-without-styling.js";
import turndownPluginListItem from "./plugins/list-item.js";
import { tables, taskListItems } from "turndown-plugin-gfm";
import { getSelectionHtml } from "./selection.js";

const configureTurndownService = (options) => {
  let turndownService = TurndownService(options);

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
    turndownService.escape = function (string) {
      return (
        string
          // Escape backslash escapes!
          .replace(/\\(\S)/g, "\\\\$1")

          // Escape headings
          .replace(/^(#{1,6} )/gm, "\\$1")

          // Escape hr
          .replace(/^([-*_] *){3,}$/gm, function (match, character) {
            return match.split(character).join("\\" + character);
          })

          // Escape ol bullet points
          .replace(/^(\W* {0,3})(\d+)\. /gm, "$1$2\\. ")

          // Escape ul bullet points
          .replace(/^([^\\\w]*)[*+-] /gm, function (match) {
            return match.replace(/([*+-])/g, "\\$1");
          })

          // Escape blockquote indents
          .replace(/^(\W* {0,3})> /gm, "$1\\> ")

          // Escape em/strong *
          .replace(/\*+(?![*\s\W]).+?\*+/g, function (match) {
            return match.replace(/\*/g, "\\*");
          })

          // Escape em/strong _
          .replace(/_+(?![_\s\W]).+?_+/g, function (match) {
            return match.replace(/_/g, "\\_");
          })

          // Escape code _
          .replace(/`+(?![`\s\W]).+?`+/g, function (match) {
            return match.replace(/`/g, "\\`");
          })

          // Escape link brackets
          .replace(/[\[\]]/g, "\\$&")

          // Replace angle brackets
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
      );
    };
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
