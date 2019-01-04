import { readFileSync } from "fs";
import { JSDOM } from "jsdom";

import TurndownService from "turndown";
import turndownPluginMathJax from "../src/lib/turndown-plugin-mathjax";

const turndownService = TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-"
});
turndownService.use(turndownPluginMathJax);

const testCases = [
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
  },
  {
    filename: "issue-18",
    url: "https://urukrama.wordpress.com/openbox-guide/#xcompmgr"
  }
];

testCases.forEach(testCase => {
  test(`${testCase.filename}.html (${testCase.url})`, () => {
    const input = new JSDOM(readFileSync(`${__dirname}/fixtures/${testCase.filename}.html`, "utf-8")).window.document;
    const expected = readFileSync(`${__dirname}/fixtures/${testCase.filename}.md`, "utf-8").trim();
    expect(turndownService.turndown(input)).toEqual(expected);
  });
});
