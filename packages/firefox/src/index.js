browser.contextMenus.create(
  {
    id: "copy-as-markdown",
    title: "Copy Title and URL as Markdown",
    contexts: ["page", "frame"],
    documentUrlPatterns: ["<all_urls>"],
  },
  () => {
    if (browser.runtime.lastError)
      console.log(`Error: ${browser.runtime.lastError}`);
  },
);

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
  },
);

browser.contextMenus.create(
  {
    id: "copy-link-as-markdown",
    title: "Copy Link as Markdown",
    contexts: ["link"],
    documentUrlPatterns: ["<all_urls>"],
  },
  () => {
    if (browser.runtime.lastError)
      console.log(`Error: ${browser.runtime.lastError}`);
  },
);

browser.contextMenus.onClicked.addListener(
  ({ menuItemId, linkText, linkUrl }, { id }) => {
    if (
      menuItemId === "copy-selection-as-markdown" ||
      menuItemId === "copy-as-markdown"
    ) {
      browser.scripting
        .executeScript({
          target: { tabId: id },
          files: ["browser-polyfill.min.js"],
        })
        .then(() => {
          browser.scripting.executeScript({
            target: { tabId: id },
            files: ["copy.js"],
          });
        });
    } else if (menuItemId === "copy-link-as-markdown") {
      browser.scripting
        .executeScript({
          target: { tabId: id },
          files: ["browser-polyfill.min.js"],
        })
        .then(() => {
          browser.scripting
            .executeScript({
              target: { tabId: id },
              files: ["copy-link.js"],
            })
            .then(() => {
              linkText = linkText.replace(/([\\`*_[\]<>])/g, "\\$1");
              linkUrl = linkUrl.replace(
                /[\\!'()*]/g,
                (c) => `%${c.charCodeAt(0).toString(16)}`,
              );
              browser.tabs.sendMessage(id, {
                text: `[${linkText}](${linkUrl})`,
                html: `<a href="${linkUrl}">${linkText}</a>`,
              });
            });
        });
    }
  },
);

browser.action.onClicked.addListener((tab) =>
  browser.scripting
    .executeScript({
      target: { tabId: tab.id },
      files: ["browser-polyfill.min.js"],
    })
    .then(() => {
      browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["copy.js"],
      });
    }),
);
