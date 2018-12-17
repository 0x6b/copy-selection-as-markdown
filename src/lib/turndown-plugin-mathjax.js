let rules = {};

// remove display formula
rules.removeDisplayFormula = {
  filter: node => {
    return node.nodeName === "DIV" && node.className === "MathJax_Display";
  },
  replacement: () => ""
};

// remove inline formula
rules.removeInlineFormula = {
  filter: node => {
    return node.nodeName === "SPAN" && node.className === "MathJax" && node.style["text-align"] !== "center";
  },
  replacement: () => ""
};

rules.removeBlankListItem = {
  filter: ["li"],
  replacement: function(content, node, options) {
    node.childNodes.forEach(child => {
      if (child.className && child.className.startsWith("MathJax")) {
        node.removeChild(child);
      }
    });
    //console.log(content);
    content = content
      .replace(/^\n+/, "") // remove leading newlines
      .replace(/\n+$/, "\n") // replace trailing newlines with just a single one
      .replace(/\n/gm, "\n    "); // indent
    let prefix = options.bulletListMarker + "   ";
    const parent = node.parentNode;
    if (parent.nodeName === "OL") {
      const start = parent.getAttribute("start");
      const index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + ".  ";
    }
    if (content !== "") {
      return prefix + content + (node.nextSibling && !/\n$/.test(content) ? "\n" : "");
    }
    return "";
  }
};

// remove new lines surrounding blank paragraph before script node
rules.paragraphBeforeScriptNode = {
  filter: "p",
  replacement: function(content, node) {
    var hasSiblings = node.nextSibling;

    if (hasSiblings && node.nextSibling.nodeName === "SCRIPT" && node.nextSibling.type.startsWith("math/tex")) {
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
    // `textContent` is for JSDOM testing
    // [innerText implementation · Issue #1245 · jsdom/jsdom](https://github.com/jsdom/jsdom/issues/1245)
    if (node.type === "math/tex; mode=display") {
      return `\n\n$$${node.innerText || node.textContent}$$\n\n`;
    } else if (node.type === "math/tex") {
      return `$${node.innerText || node.textContent}$`;
    }
    return "(ERROR while copying MathJax formula)";
  }
};

export default function mathjax(turndownService) {
  for (const [key, value] of Object.entries(rules)) {
    turndownService.addRule(key, value);
  }
}
