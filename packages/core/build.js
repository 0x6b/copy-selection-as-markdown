import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        copy: "./src/content-scripts/copy.js",
        "copy-link": "./src/content-scripts/copy-link.js",
        settings: "./src/settings/settings.js",
      },
      bundle: true,
      outdir: "./dist",
      format: "iife",
      target: ["firefox57"],
      platform: "browser",
      minify: true,
      sourcemap: false,
      external: ["webextension-polyfill"],
    });

    // Copy static files
    await copyFile("src/settings/settings.html", "dist/settings.html");
    await copyFile(
      "../../node_modules/.pnpm/webextension-polyfill@0.8.0/node_modules/webextension-polyfill/dist/browser-polyfill.min.js",
      "dist/browser-polyfill.min.js"
    );

    console.log("Core build completed successfully");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const isWatch = process.argv.includes("--watch");
  
  if (isWatch) {
    esbuild.context({
      entryPoints: {
        copy: "./src/content-scripts/copy.js",
        "copy-link": "./src/content-scripts/copy-link.js",
        settings: "./src/settings/settings.js",
      },
      bundle: true,
      outdir: "./dist",
      format: "iife",
      target: ["firefox57"],
      platform: "browser",
      minify: true,
      sourcemap: false,
      external: ["webextension-polyfill"],
    }).then(ctx => {
      ctx.watch();
      console.log("Watching for changes...");
    });
  } else {
    build();
  }
}

export { build };