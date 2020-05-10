import { doCopy } from "./lib/util";

browser.runtime.onMessage.addListener(message => doCopy(message.text, message.html));
