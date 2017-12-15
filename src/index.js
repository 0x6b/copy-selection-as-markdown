browser.contextMenus.create({
    id                 : 'copy-selection-as-markdown',
    title              : 'Copy Selection as Markdown',
    contexts           : ['page', 'selection'],
    documentUrlPatterns: ['<all_urls>']
  }, () => {
    if (browser.runtime.lastError) console.log(`Error: ${browser.runtime.lastError}`)
  }
)

browser.contextMenus.onClicked.addListener(({menuItemId}, {id}) => {
  if (menuItemId === 'copy-selection-as-markdown') {
    browser.tabs.executeScript(id, {file: 'copy.js'})
  }
})
