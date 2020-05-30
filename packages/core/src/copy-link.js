import { doCopy } from "./util";

browser.runtime.onMessage.addListener((message) =>
  doCopy(message.text, message.html)
);

