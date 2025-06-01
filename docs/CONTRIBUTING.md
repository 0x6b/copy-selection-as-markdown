# Contributing

## Setup development prerequisites

- Create a [Firefox Add-ons](https://addons.mozilla.org) (AMO) account
- Install followings:
  - [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) enabled [Firefox](https://www.mozilla.org/firefox/)
  - [Node.js](http://nodejs.org) v20.x
  - [pnpm](https://pnpm.io/) for package management (monorepo support)
  - Python 2.x for compiling `dtrace-provider` (`web-ext` requires this as dependency)

## Fork on GitHub

Before you do anything else, login on [GitHub](https://github.com/) and [fork](https://help.github.com/articles/fork-a-repo/) this repository

## Clone your fork locally

Install [Git](https://git-scm.com/) and clone your forked repository locally.

```sh
$ git clone https://github.com/<your-account>/copy-selection-as-markdown.git
```

## Play with your fork

The project uses [Semantic Versioning 2.0.0](http://semver.org/) and is organized as a monorepo with packages in `packages/`. You don't have to update version numbers in package.json files as releases are maintained centrally.

1. Open your terminal, navigate to local repository directory
2. Export AMO's API key and secret as environment variable
   ```sh
   $ export WEB_EXT_API_KEY=...
   $ export WEB_EXT_API_SECRET=...
   ```
3. Install dependencies
   ```sh
   $ pnpm install
   ```
4. Create a new topic branch
   ```sh
   $ git checkout -b add-new-feature
   ```
5. Run js bundler/watcher and firefox
   ```sh
   $ pnpm run watch
   ```
6. Modify source code and firefox will reload the extension automatically

## Testing

1. Run test cases
   ```sh
   $ pnpm test
   ```

To make sure Turndown conversion remains intact after my modification for supporting [MathJax](https://www.mathjax.org/), I use [Jest snapshot testing](https://jestjs.io/docs/en/snapshot-testing). When you updated [Turndown](https://github.com/domchristie/turndown), you have to [update snapshots](<(https://jestjs.io/docs/en/cli.html#updatesnapshot)>).

1. Comment out following line from [`packages/core/test/test.js`](../packages/core/test/test.js)
   ```js
   turndownService.use(turndownPluginMathJax);
   ```
2. Update Jest snapshot
   ```sh
   $ pnpm --filter copy-selection-as-markdown-core test -- --updateSnapshot
   ```
3. Revert [`packages/core/test/test.js`](../packages/core/test/test.js)
4. Run test cases
   ```sh
   $ pnpm test
   ```

## Open a pull request

1. Commit your changes locally, [rebase onto upstream/master](https://github.com/blog/2243-rebase-and-merge-pull-requests), then push the changes to GitHub
   ```sh
   $ git push origin add-new-feature
   ```
2. Go to your fork on GitHub, switch to your topic branch, then click "Compare and pull request" button.

## Project Structure

This project is organized as a monorepo with the following packages:

- `packages/core/` - Core functionality and markdown conversion logic
- `packages/firefox/` - Firefox-specific extension code and manifest
- `packages/chromium/` - Chromium-specific extension code and manifest

Each package has its own `package.json` with specific dependencies and build scripts. The root `package.json` orchestrates builds across all packages using pnpm workspaces.

## References

### Package Scripts

Run with `pnpm run <script-name>` from the project root.

- Watchers
  - `watch`: Run watch scripts for all packages
  - `watch:core`: Watch core package only
  - `watch:firefox`: Watch Firefox package only
- Builds
  - `build`: Build all packages (core, firefox, chromium)
  - `generate`: Generate WebExtension artifacts
  - `format`: Format JS files with [Biome](https://biomejs.dev/)
- Testing
  - `test`: Run tests across all packages
- Maintenance
  - `clean`: Clean all build artifacts

### Mozilla Developer Network (MDN)

- [Browser Extensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
- [Getting started with web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)
- [Signing and distributing your add-on](https://developer.mozilla.org/en-US/Add-ons/Distribution)
