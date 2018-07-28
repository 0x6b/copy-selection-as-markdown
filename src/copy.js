import { getSelectionAsMarkdown, doCopy } from "./lib/util";

let text = `[${document.title}](${document.URL})`;
let selection = getSelectionAsMarkdown();
if (selection !== "> ") text += `\n\n${selection}`;

doCopy(text);
