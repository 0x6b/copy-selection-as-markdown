import { readdirSync, readFileSync } from "fs";
import { join, extname, sep } from "path";
import { JSDOM } from "jsdom";

import TurndownService from "turndown";
import turndownPluginMathJax from "../src/plugins/mathjax";

const turndownService = TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-"
});
turndownService.use(turndownPluginMathJax);

const testCases = readdirSync(join(__dirname, sep, "commonmark"));

testCases.forEach(testCase => {
  if (extname(testCase) === ".html") {
    test(`${testCase}`, () => {
      const input = new JSDOM(readFileSync(`${__dirname}/commonmark/${testCase}`, "utf-8")).window.document;
      expect(turndownService.turndown(input)).toMatchSnapshot();
    });
  }
});
