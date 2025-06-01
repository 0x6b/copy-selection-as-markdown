import { imgToDataUrl, resolveRelativeUrls } from "./utils/url-resolver.js";

export const getSelection = () => {
  let sel = document.getSelection();

  if (sel.rangeCount === 0) {
    const frames = document.getElementsByTagName("iframe");
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

  return sel;
};

export const getSelectionHtml = async (options) => {
  const sel = getSelection();
  let html = "";

  if (sel.rangeCount) {
    const container = document.createElement("div");

    for (let i = 0; i < sel.rangeCount; ++i) {
      container.appendChild(sel.getRangeAt(i).cloneContents());
    }

    // Resolve relative URLs
    resolveRelativeUrls(container, document.URL);

    // Handle image embedding if enabled
    if (options.embedImage) {
      for (const img of container.getElementsByTagName("img")) {
        if (
          img.hasAttribute("src") &&
          img.getAttribute("src").startsWith("http") &&
          (img.getAttribute("src").split("?", 2)[0].endsWith("gif") ||
            img.getAttribute("src").split("?", 2)[0].endsWith("jpg") ||
            img.getAttribute("src").split("?", 2)[0].endsWith("jpeg") ||
            img.getAttribute("src").split("?", 2)[0].endsWith("png") ||
            img.getAttribute("src").split("?", 2)[0].endsWith("webp"))
        ) {
          img.setAttribute("src", await imgToDataUrl(img));
        }
      }
    }

    html = container.innerHTML;
  }

  return html;
};
