import { readFileSync } from "fs";
import { assert } from "chai";
import { JSDOM } from "jsdom";

import TurndownService from "turndown";
import turndownPluginMathJax from "../src/lib/turndown-plugin-mathjax";

const tests = [
  {
    filename: "1",
    url:
      "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/web-ext_command_reference"
  },
  {
    filename: "2",
    url: "https://www.mozilla.org/en-US/contribute/"
  },
  {
    filename: "issue-8-1-1",
    url:
      "https://stats.stackexchange.com/questions/235528/backpropagation-with-softmax-cross-entropy"
  },
  {
    filename: "issue-8-1-2",
    url:
      "https://stats.stackexchange.com/questions/235528/backpropagation-with-softmax-cross-entropy"
  },
  {
    filename: "issue-8-2",
    url: "https://blog.csdn.net/aws3217150/article/details/53840029"
  }
];

describe("copy-selection-as-markdown", () => {
  const turndownService = TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-"
  });
  turndownService.use(turndownPluginMathJax);

  tests.forEach(test => {
    it(`${test.url} (${test.filename})`, () => {
      const input = new JSDOM(
        readFileSync(`${__dirname}/fixtures/${test.filename}.html`, "utf-8")
      ).window.document;
      const output = readFileSync(
        `${__dirname}/fixtures/${test.filename}.md`,
        "utf-8"
      ).trim();

      assert.equal(turndownService.turndown(input), output);
    });
  });
});
