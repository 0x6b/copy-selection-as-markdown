const {
  clippy: { path },
} = require("@primer/octicons");
const { writeFileSync } = require("fs");
const { resolve } = require("path");
const { parseString } = require("xml2js");

// Light and dark colors are taken from https://design.firefox.com/photon/visuals/iconography.html
const icons = [
  { name: "extension", color: "#222222", opacity: "1.0" },
  { name: "browser-action-light", color: "#f9f9fa", opacity: "0.8" },
  { name: "browser-action-dark", color: "#0c0c03", opacity: "0.8" },
];

const createIcon = (path, color, opacity) => {
  return new Promise((resolve, reject) => {
    parseString(path, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(`<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path fill="${color}" fill-opacity="${opacity}" d="${result.path.$.d}"/>
</svg>`);
    });
  });
};

icons.forEach(async ({ name, color, opacity }) => {
  const data = await createIcon(path, color, opacity);
  const filename = resolve(__dirname, `${name}.svg`);
  writeFileSync(filename, data);
  console.log(`Generate ${name} icon at ${filename}`);
});
