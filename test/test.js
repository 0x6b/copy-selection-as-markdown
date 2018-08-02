import { readFileSync } from "fs";
import { assert } from "chai";
import { JSDOM } from "jsdom";

import TurndownService from "turndown";
import turndownPluginMathJax from "../src/lib/turndown-plugin-mathjax";

const tests = [
  {
    filename: "issue-8-1-1",
    url:
      "https://stats.stackexchange.com/questions/235528/backpropagation-with-softmax-cross-entropy"
  },
  {
    filename: "issue-8-1-2",
    url:
      "https://stats.stackexchange.com/questions/235528/backpropagation-with-softmax-cross-entropy"
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
