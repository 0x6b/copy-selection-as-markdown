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

browser.contextMenus.create(
  {
    id: "copy-link-as-markdown",
    title: "Copy Link as Markdown",
    contexts: ["link"],
    documentUrlPatterns: ["<all_urls>"]
  },
  () => {
    if (browser.runtime.lastError) console.log(`Error: ${browser.runtime.lastError}`);
  }
);

browser.contextMenus.onClicked.addListener(({ menuItemId, linkText, linkUrl }, { id }) => {
  if (menuItemId === "copy-selection-as-markdown" || menuItemId === "copy-as-markdown") {
    browser.tabs.executeScript(id, { file: "copy.js" });
  } else if (menuItemId === "copy-link-as-markdown") {
    browser.tabs.executeScript(id, { file: "copy-link.js" }).then(() => {
      linkText = linkText.replace(/[\\\[\]]/g, (match) => '\\'+match);
      linkUrl = linkUrl.replace(/\\/g, '%5C').replace(/\(/g, '%28').replace(/\)/g, '%29');
      browser.tabs.sendMessage(id, { text: `[${linkText}](${linkUrl})` });
    });
  }
});

browser.browserAction.onClicked.addListener(() => browser.tabs.executeScript({ file: "copy.js" }));
