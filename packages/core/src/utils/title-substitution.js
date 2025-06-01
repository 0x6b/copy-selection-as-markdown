import RegexEscape from "regex-escape";

const regexpRegexp = /^\/(.+)\/$/;

export const convertTitleSubstitution = (titleSubstitutionOption = "") => {
  const convertLine = (line) => {
    if (line.match(regexpRegexp)) {
      const [, expression] = regexpRegexp.exec(line);
      return expression;
    } else {
      return RegexEscape(line);
    }
  };
  return new RegExp(
    titleSubstitutionOption
      .split(/\n/)
      .map((line) => `(${convertLine(line)})`)
      .join("|"),
    "g",
  );
};