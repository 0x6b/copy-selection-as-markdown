import { doCopy } from "./util";

const browser = require("webextension-polyfill");

browser.runtime.onMessage.addListener((message) =>
  doCopy(message.text, message.html),
);
