import { DEFAULT_OPTIONS, getOptionWithDefault } from "./defaults.js";

document.addEventListener("DOMContentLoaded", () => {
  browser.storage.local.get().then(
    (result) => {
      document.querySelector("#quote").checked = getOptionWithDefault(
        result,
        "use-quote",
      );
      document.querySelector("#link").checked = getOptionWithDefault(
        result,
        "link-to-source",
      );
      document.querySelector("form").headingStyle.value = getOptionWithDefault(
        result,
        "headingStyle",
      );
      document.querySelector("form").bulletListMarker.value =
        getOptionWithDefault(result, "bulletListMarker");
      document.querySelector("form").codeBlockStyle.value =
        getOptionWithDefault(result, "codeBlockStyle");
      document.querySelector("form").fence.value = getOptionWithDefault(
        result,
        "fence",
      );
      document.querySelector("form").emDelimiter.value = getOptionWithDefault(
        result,
        "emDelimiter",
      );
      document.querySelector("form").strongDelimiter.value =
        getOptionWithDefault(result, "strongDelimiter");
      document.querySelector("form").linkStyle.value = getOptionWithDefault(
        result,
        "linkStyle",
      );
      document.querySelector("form").linkReferenceStyle.value =
        getOptionWithDefault(result, "linkReferenceStyle");
      document.querySelector("#debug").checked = getOptionWithDefault(
        result,
        "debug",
      );
      document.querySelector("#mathjax").checked = getOptionWithDefault(
        result,
        "mathjax",
      );
      document.querySelector("#gfm").checked = getOptionWithDefault(
        result,
        "gfm",
      );
      document.querySelector("#linkWithoutStyling").checked =
        getOptionWithDefault(result, "linkWithoutStyling");
      document.querySelector("#img").checked = getOptionWithDefault(
        result,
        "img",
      );
      document.querySelector("#embedImage").checked = getOptionWithDefault(
        result,
        "embedImage",
      );
      document.querySelector("#titleSubstitution").value = getOptionWithDefault(
        result,
        "titleSubstitution",
      );
      document.querySelector("#reduceListItemPadding").value =
        getOptionWithDefault(result, "reduceListItemPadding");
      document.querySelector("#replaceAngleBrackets").value =
        getOptionWithDefault(result, "replaceAngleBrackets");
    },
    (error) => console.log(`Error: ${error}`),
  );
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  let embedImage = document.querySelector("#embedImage").checked || false;

  if (embedImage) {
    embedImage = await browser.permissions.request({
      origins: ["<all_urls>"],
      permissions: [],
    });
    document.querySelector("#embedImage").checked = embedImage;
  } else {
    await browser.permissions.remove({ origins: ["<all_urls>"] });
  }

  browser.storage.local.set({
    "use-quote": document.querySelector("#quote").checked,
    "link-to-source": document.querySelector("#link").checked,
    headingStyle: document.querySelector("form").headingStyle.value,
    bulletListMarker: document.querySelector("form").bulletListMarker.value,
    codeBlockStyle: document.querySelector("form").codeBlockStyle.value,
    fence: document.querySelector("form").fence.value,
    emDelimiter: document.querySelector("form").emDelimiter.value,
    strongDelimiter: document.querySelector("form").strongDelimiter.value,
    linkStyle: document.querySelector("form").linkStyle.value,
    linkReferenceStyle: document.querySelector("form").linkReferenceStyle.value,
    debug: document.querySelector("#debug").checked,
    mathjax: document.querySelector("#mathjax").checked,
    gfm: document.querySelector("#gfm").checked,
    linkWithoutStyling: document.querySelector("#linkWithoutStyling").checked,
    img: document.querySelector("#img").checked,
    embedImage,
    titleSubstitution: document.querySelector("#titleSubstitution").value,
    reduceListItemPadding: document.querySelector("#reduceListItemPadding")
      .value,
    replaceAngleBrackets: document.querySelector("#replaceAngleBrackets").value,
  });
});
