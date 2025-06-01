import { convertTitleSubstitution } from "../src/utils/title-substitution";

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

    test.each`
      title                  | substitutionOption       | result
      ${"abcd"}              | ${"/[abc]+/"}            | ${"d"}
      ${"title #1234"}       | ${"/ #\\d+/"}            | ${"title"}
      ${"second line title"} | ${"first line\n/[^l]+/"} | ${"ll"}
    `(
      "provides regex title substitution on $title",
      ({ title, substitutionOption, result }) => {
        expect(
          title.replace(convertTitleSubstitution(substitutionOption), "")
        ).toBe(result);
      }
    );
  });
});
