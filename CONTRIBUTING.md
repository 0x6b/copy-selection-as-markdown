# Contributing

## Setup development prerequisites

- Create a [Firefox Add-ons](https://addons.mozilla.org) (AMO) account
- Install followings:
    - [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) enabled [Firefox](https://www.mozilla.org/firefox/)
    - [Node.js](http://nodejs.org) and optionally [Yarn](https://yarnpkg.com)
    - Python 2.x for compiling `dtrace-provider` (`web-ext` requires this as dependency)

## Fork on GitHub

Before you do anything else, login on [GitHub](https://github.com/) and fork this repository.

## Clone your fork locally

Install [Git](https://git-scm.com/) and clone your forked repository locally.

## Play with your fork

1. Open your terminal, navigate to local repository directory
2. Export AMO's API key and secret as environment variable
    ```sh
    $ export WEB_EXT_API_KEY=...
    $ export WEB_EXT_API_SECRET=...
    ```
3. Install dependencies: `yarn install`
4. Create a new topic branch
    ```sh
    $ git checkout -b add-new-feature
    ```
5. Run js bundler/watcher and firefox: `yarn watch`
6. Modify source code and firefox will reload the extension automatically

## Open a pull request

1. Commit your changes locally, [rebase onto upstream/master](https://github.com/blog/2243-rebase-and-merge-pull-requests), then push the changes to GitHub
    ```sh
    $ git push origin add-new-feature
    ```
2. Go to your fork on GitHub, switch to your topic branch, then click "Compare and pull request" button.

## References

### Package Scripts

Run with `yarn <script-name>`.

- Watchers
    - `prewatch`: Generate icon before starting `watch`
    - `watch`: Run watch scripts below
    - `watch:webextension`: Run [`web-ext run`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_run) which watches all extension source files and reload the extension in Firefox as files change
    - `watch:js`: Run [`webpack`](https://webpack.github.io/docs/cli.html) in [watch mode](https://webpack.github.io/docs/cli.html#watch-mode-watch)
    - `watch:assets`: Watch assets change in `src` and copy it to `dist`
- Builds
    - `format`: format JS files by [Prettier](https://prettier.io/)
    - `generate-icons`: Generate icons
    - `copy-assets`: Copy assets in `src` to `dist`
    - `webpack`: Run [`webpack`](https://webpack.js.org) to bundle scripts according to the [`webpack.config.js`](https://webpack.js.org/concepts/configuration/)
    - `prebuild`: Run `copy-assets` and `webpack` before build
    - `build`: Build the extension with [`web-ext build`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_build)
    - `postbuild`: Sign the extension with [`web-ext sign`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_sign) after build
- Cleanup
    - `clean`: Remove `dist/icons/`, `dist/*.js`, and `dist/*.json`
    - `clean-all`: Remove `dist/icons/`, `dist/*.js`, `dist/*.json`, and `node_modules`

### Mozilla Developer Network (MDN)

- [Browser Extensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
- [Getting started with web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)
- [Signing and distributing your add-on](https://developer.mozilla.org/en-US/Add-ons/Distribution)

### Icon

- [Octicons](https://octicons.github.com/)
