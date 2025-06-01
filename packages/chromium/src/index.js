// Import browser polyfill for service worker
importScripts("browser-polyfill.min.js");

chrome.contextMenus.create(
  {
    id: "copy-selection-as-markdown",
    title: "Copy Selection as Markdown",
    contexts: ["selection"],
    documentUrlPatterns: ["<all_urls>"],
  },
  () => {
    if (chrome.runtime.lastError)
      console.log(`Error: ${chrome.runtime.lastError}`);
  },
);

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["browser-polyfill.min.js"]
  });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["copy.js"]
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["browser-polyfill.min.js"]
  });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["copy.js"]
  });
});
