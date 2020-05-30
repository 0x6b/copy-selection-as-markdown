// Generate test cases from CommonMark spec
// https://github.com/commonmark/commonmark.js/blob/c8798f34bf2e6c219ad477dfa5f1e52eb7ca57e4/test/spec.txt
// https://github.com/commonmark/commonmark.js/blob/c8798f34bf2e6c219ad477dfa5f1e52eb7ca57e4/test/test.js
const { readFileSync, writeFileSync } = require("fs");

const spec = readFileSync("spec.txt", "utf8");
const tests = spec.replace(/\r\n?/g, "\n").replace(/^<!-- END TESTS -->(.|[\n])*/m, "");

let current_section = "";
let example_number = 0;

tests.replace(/^`{32} example\n([\s\S]*?)^\.\n([\s\S]*?)^`{32}$|^#{1,6} *(.*)$/gm,
  (_, markdownSubmatch, htmlSubmatch, sectionSubmatch) => {
    if (sectionSubmatch) {
      current_section = sectionSubmatch;
    } else {
      example_number++;
      writeFileSync(`${example_number}.${current_section.toLowerCase().replace(/ /g, "_")}.html`, htmlSubmatch);
    }
  });

