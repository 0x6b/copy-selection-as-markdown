export const DEFAULT_OPTIONS = {
  "use-quote": true,
  "link-to-source": true,
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "indented",
  fence: "`",
  emDelimiter: "_",
  strongDelimiter: "**",
  linkStyle: "inlined",
  linkReferenceStyle: "full",
  debug: false,
  mathjax: false,
  gfm: false,
  linkWithoutStyling: false,
  img: false,
  embedImage: false,
  titleSubstitution: "",
  reduceListItemPadding: false,
  replaceAngleBrackets: false,
};

export function getOptionWithDefault(options, key) {
  return typeof options[key] === "undefined" ? DEFAULT_OPTIONS[key] : options[key];
}

export function getAllOptionsWithDefaults(options) {
  const result = {};
  for (const key in DEFAULT_OPTIONS) {
    result[key] = getOptionWithDefault(options, key);
  }
  
  // Special handling for fence option - repeat 3 times for markdown
  if (result.fence && typeof result.fence === "string") {
    result.fence = result.fence.repeat(3);
  }
  
  return result;
}