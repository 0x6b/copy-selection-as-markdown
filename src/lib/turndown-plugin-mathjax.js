let rules = {};

// remove display formula
rules.removeDisplayFormula = {
  filter: node => {
    return node.nodeName === "DIV" && node.className === "MathJax_Display";
  },
  replacement: () => ""
};

// remove inline formula
rules.removeInlineFormulat = {
  filter: node => {
    return (
      node.nodeName === "SPAN" &&
      node.className === "MathJax" &&
      node.style["text-align"] !== "center"
    );
  },
  replacement: () => ""
};

// remove new lines surrounding blank paragraph before script node
rules.paragraphBeforeScriptNode = {
  filter: "p",

  replacement: function(content, node) {
    var hasSiblings = node.nextSibling;

    if (
      hasSiblings &&
      node.nextSibling.nodeName === "SCRIPT" &&
      node.nextSibling.type.startsWith("math/tex")
    ) {
      return content;
    }

    return "\n\n" + content + "\n\n";
  }
};

// extract script tag as content
rules.extractRaw = {
  filter: node => {
    return node.nodeName === "SCRIPT" && node.type.startsWith("math/tex");
  },
  replacement: (content, node) => {
    if (node.type === "math/tex; mode=display") {
      return `\n\n$$${node.innerText.trim()}$$\n\n`;
    } else if (node.type === "math/tex") {
      return `$${node.innerText.trim()}$`;
    }
    return "(ERROR while copying MathJax formula)";
  }
};

export default function mathjax(turndownService) {
  for (const [key, value] of Object.entries(rules)) {
    turndownService.addRule(key, value);
  }
}
