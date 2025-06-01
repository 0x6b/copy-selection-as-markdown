import * as clipboard from "clipboard-polyfill";

export const doCopy = async (text, html) => {
  const item = new clipboard.ClipboardItem({
    "text/html": new Blob([html], { type: "text/html" }),
    "text/plain": new Blob([text], { type: "text/plain" }),
  });
  await clipboard.write([item]);
};
