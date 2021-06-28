const {
  clippy: { path }
} = require("@primer/octicons");
const { writeFileSync } = require("fs");
const { resolve } = require("path");
const { parseString } = require("xml2js");

// Light and dark colors are taken from https://design.firefox.com/photon/visuals/iconography.html
const icons = [
  { name: "extension", color: "#222222", fill: "#e7f0fd", opacity: "1.0" },
  { name: "browser-action-light", color: "#f9f9fa", fill: "#0a1f39", opacity: "0.8" },
  { name: "browser-action-dark", color: "#0c0c03", fill: "#e7f0fd", opacity: "0.8" }
];

const createIcon = (path, { color, fill, opacity }) => {
  return new Promise((resolve, reject) => {
    parseString(path, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(`<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<rect rx="1" ry="1" width="16" height="16" fill="${fill}" stroke="0"/>
<path fill="${color}" fill-opacity="${opacity}" stroke-width="0.3" stroke-opacity="0.8" d="${result.path.$.d}"/>
</svg>`);
    });
  });
};

icons.forEach(async ({ name, color, fill, opacity }) => {
  const data = await createIcon(path, { color, fill, opacity });
  const filename = resolve(__dirname, `${name}.svg`);
  writeFileSync(filename, data);
  console.log(`Generate ${name} icon at ${filename}`);
});
