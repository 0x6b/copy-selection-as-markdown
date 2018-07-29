document.addEventListener("DOMContentLoaded", () => {
  browser.storage.local.get("use-quote").then(
    result => {
      document.querySelector("#quote").checked = result["use-quote"] || true;
    },
    error => {
      console.log(`Error: ${error}`);
    }
  );
});

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  browser.storage.local.set({
    "use-quote": document.querySelector("#quote").checked
  });
});
