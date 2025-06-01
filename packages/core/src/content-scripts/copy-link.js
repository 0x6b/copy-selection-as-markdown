import { doCopy } from "../clipboard.js";

browser.runtime.onMessage.addListener((message) =>
  doCopy(message.text, message.html),
);