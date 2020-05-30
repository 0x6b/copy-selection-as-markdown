const browser = require("webextension-polyfill");

browser.contextMenus.create(
  {
    id: "copy-selection-as-markdown",
    title: "Copy Selection as Markdown",
    contexts: ["selection"],
    documentUrlPatterns: ["<all_urls>"],
  },
  () => {
    if (browser.runtime.lastError)
      console.log(`Error: ${browser.runtime.lastError}`);
  }
);

browser.contextMenus.onClicked.addListener(() => {
  browser.tabs.executeScript({ file: "copy.js" });
});

browser.browserAction.onClicked.addListener(() =>
  browser.tabs.executeScript({ file: "copy.js" })
);
