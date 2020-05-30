import TurndownService from "turndown";
import turndownPluginMathJax from "./turndown-plugin-mathjax";
import turndownPluginGfmStrikethrough from "./turndown-plugin-gfm-strikethrough";
import turndownPluginImg from "./turndown-plugin-img";
import turndownPluginLinkWithoutStyling from "./turndown-plugin-link-without-styling";
import turndownPluginListItem from "./turndown-plugin-list-item";
import { tables, taskListItems } from "turndown-plugin-gfm";
import * as clipboard from "clipboard-polyfill";

const url = require("url");

const getSelectionAsMarkdown = options => {
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

  let html = "";
  let sel = document.getSelection();

  if (sel.rangeCount === 0) {
    let frames = document.getElementsByTagName("iframe");
    if (frames) {
      for (let i = 0; i < frames.length; i++) {
        if (
          frames[i].contentDocument != null &&
          frames[i].contentWindow.document != null &&
          frames[i].contentWindow.document.getSelection() &&
          frames[i].contentWindow.document.getSelection().rangeCount > 0
        ) {
          sel = frames[i].contentWindow.document.getSelection();
        }
      }
    }
  }

  if (sel.rangeCount) {
    const container = document.createElement("div");

    for (let i = 0; i < sel.rangeCount; ++i) {
      container.appendChild(sel.getRangeAt(i).cloneContents());
    }

    for (let a of container.getElementsByTagName("a")) {
      if (a.hasAttribute("href") && !a.getAttribute("href").startsWith("http")) {
        a.setAttribute("href", url.resolve(document.URL, a.getAttribute("href")));
      }
    }

    for (let img of container.getElementsByTagName("img")) {
      if (img.hasAttribute("src") && !img.getAttribute("src").startsWith("http")) {
        img.setAttribute("src", url.resolve(document.URL, img.getAttribute("src")));
      }
    }

    html = container.innerHTML;
  }

  return { html, output: turndownService.turndown(html), url: document.URL };
};

const doCopy = (text, html) => {
  const dt = new clipboard.DT();
  dt.setData("text/plain", text);
  dt.setData("text/html", html);
  clipboard.write(dt);
};

export { getSelectionAsMarkdown, doCopy };
