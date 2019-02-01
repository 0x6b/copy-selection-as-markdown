browser.contextMenus.create(
  {
    id: "copy-as-markdown",
    title: "Copy Title and URL as Markdown",
    contexts: ["page", "frame"],
    documentUrlPatterns: ["<all_urls>"]
  },
  () => {
    if (browser.runtime.lastError) console.log(`Error: ${browser.runtime.lastError}`);
  }
);

browser.contextMenus.create(
  {
    id: "copy-selection-as-markdown",
    title: "Copy Selection as Markdown",
    contexts: ["selection"],
    documentUrlPatterns: ["<all_urls>"]
  },
  () => {
    if (browser.runtime.lastError) console.log(`Error: ${browser.runtime.lastError}`);
  }
);

browser.contextMenus.onClicked.addListener(({ menuItemId }, { id }) => {
  if (menuItemId === "copy-selection-as-markdown" || menuItemId === "copy-as-markdown") {
    browser.tabs.executeScript(id, { file: "copy.js" });
  }
});

browser.browserAction.onClicked.addListener(() => browser.tabs.executeScript({ file: "copy.js" }));
