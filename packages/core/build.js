const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

async function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

async function build() {
  try {
    // Build JavaScript files
    await esbuild.build({
      entryPoints: {
        copy: "./src/copy.js",
        "copy-link": "./src/copy-link.js",
        settings: "./src/settings.js",
      },
      bundle: true,
      outdir: "./dist",
      format: "iife",
      target: ["firefox57"],
      platform: "browser",
      minify: true,
      sourcemap: false,
    });

    // Copy static files
    await copyFile("src/settings.html", "dist/settings.html");
    await copyFile(
      "../../node_modules/webextension-polyfill/dist/browser-polyfill.min.js",
      "dist/browser-polyfill.min.js"
    );

    console.log("Core build completed successfully");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  const isWatch = process.argv.includes("--watch");
  
  if (isWatch) {
    esbuild.context({
      entryPoints: {
        copy: "./src/copy.js",
        "copy-link": "./src/copy-link.js",
        settings: "./src/settings.js",
      },
      bundle: true,
      outdir: "./dist",
      format: "iife",
      target: ["firefox57"],
      platform: "browser",
      minify: true,
      sourcemap: false,
    }).then(ctx => {
      ctx.watch();
      console.log("Watching for changes...");
    });
  } else {
    build();
  }
}

module.exports = { build };