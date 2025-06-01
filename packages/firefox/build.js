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

async function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function build() {
  try {
    // Build JavaScript files
    await esbuild.build({
      entryPoints: {
        index: "./src/index.js",
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
    await copyFile("manifest.json", "dist/manifest.json");
    
    // Copy core dist files
    await copyDirectory("../core/dist", "dist");
    
    // Copy icons
    await copyDirectory("icons", "dist/icons");

    console.log("Firefox build completed successfully");
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
        index: "./src/index.js",
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