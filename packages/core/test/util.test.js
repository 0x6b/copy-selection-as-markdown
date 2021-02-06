import { convertTitleSubstitution } from "../src/util";

describe("util", () => {
  describe("convertTitleSubstitution", () => {
    test.each`
      title                  | substitutionOption           | result
      ${"abcd"}              | ${"cd"}                      | ${"ab"}
      ${"/\\^%[]hello"}      | ${"/\\^%[]"}                 | ${"hello"}
      ${"second line title"} | ${"first line\nsecond line"} | ${" title"}
    `(
      "provides string title substitution on $title",
      ({ title, substitutionOption, result }) => {
        expect(
          title.replace(convertTitleSubstitution(substitutionOption), "")
        ).toBe(result);
      }
    );
  });
});
