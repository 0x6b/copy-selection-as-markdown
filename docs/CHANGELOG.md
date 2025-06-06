# Changelog

## Planned (but not scheduled yet)

## 0.23.0 - 2025-06-01

- Manifest V3 migration

## 0.22.0 - 2024-03-17

### Changed

- Update dependencies (#127)

Due to major version bump of (6.0.0 to 7.1.3) the [Turndown](https://github.com/mixmark-io/turndown/) which this extension heavily relies on, the behavior might've been changed. It might be impossible for me to reserve backward compatibility, but I will try to fix the issue as much as possible, if any.

## 0.21.0 - 2021-06-27

### Added

- Support regular expression in title substitution (#80). Thanks @viktomas for this great enhancement!

## 0.20.4 - 2020-10-09

### Added

- Add advanced option to embed <img>s as base64 text (#73)

## 0.19.1 - 2020-10-03

### Fixed

- Remove unnecessary permissions (#72). Thanks @bs for the report! 

## 0.19.0 - 2020-05-30

### Changed

- Update dependencies (#64)

Escaping rule for potential Markdown syntax is changed after dependency update, and cannot be undone for security reason.

## [0.18.1](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.18.1) - 2020-05-29

### Fixed

- Fix wrong number of fence characters (#62). Thanks @t-e-r-m for the report!

## [0.18.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.18.0) - 2020-05-10


### Added

- Copy rich text versionof selection to the clipboard (#60)

## [0.17.1](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.17.1) - 2020-05-09


### Fixed

- Update settings text from Append to Prepend (#59) thanks to @clach04

## [0.17.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.17.0) - 2020-02-06

### Added

- Add option to replace `<>` with HTML entities (#53)
- Add option to reduce padding spaces for list items (#51)

## [0.16.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.16.0) - 2019-10-14

### Added

- Add option to title text substitution (#47)

## [0.15.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.15.0) - 2019-10-14

### Added

- Add preference to disable link styling (#43)

## [0.14.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.14.0) - 2019-07-15

### Added

- Add preference to use `img` tag for image instead of `![]()` (#41)

## [0.13.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.13.0) - 2019-07-15

### Changed

- add save button to the button and more visible (#40)

## [0.12.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.12.0) - 2019-07-14

### Added

- add shortcut key support (#39)

## [0.11.1](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.11.1) - 2019-02-19

### Fixed

- Escape text and URL when copying link (#34) thanks to @Changaco!

## [0.11.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.11.0) - 2019-02-17

### Added

- add context menu to link (#33)

## [0.10.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.10.0) - 2019-02-01

### Added

- support iframe without text selection (#30)

## [0.9.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.9.0) - 2019-01-30

### Added

- support selected text in iframe (#27)

## [0.8.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.8.0) - 2019-01-23

### Added

- implement toolbar button (#26)

## [0.7.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.7.0) - 2019-01-09

### Added

- implement GitHub Flavored Markdown extension support (#17)

### Changed

- set minimum version to Firefox 57 (Android is not tested though)

## [0.6.2](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.6.2) - 2019-01-07

### Changed

- highlighted text is not deselected after copying (#20)

## [0.6.1](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.6.1) - 2019-01-04

### Changed

- handle `a` tag without `href` attribute correctly (#18)

## [0.6.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.6.0) - 2018-12-17

### Added

- add preliminary MathJax support (#8)
- add debug option (d1dbd05 and 167cbb8)

## [0.5.2](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.5.2) - 2018-10-22

### Added

- add preference for setting Markdown flavor (#13)

### Changed

- specify application ID explicitly in order to prevent warning messages on Mozilla's validation test.

There is no v0.5.0 as Mozilla's review for that version was not completed for unknown reason. Also no v0.5.1 as it was WIP status.

## [0.4.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.4.0) - 2018-09-25

### Added

- implement setting whether include link to source web page in the beginning of copied text (#11)

## [0.3.1](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.3.1) - 2018-07-29

### Changed

- fix setting is stored but not reflected on settings page (#7)

## [0.3.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.3.0) - 2018-07-29

### Added

- implement setting for quoting

## [0.2.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.2.0) - 2018-07-28

### Added

- support `img` tag

## [0.1.1](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.1.1) - 2017-12-17

### Changed

- Prevent copying unnecessary quote (7cb86e1)

## [0.1.0](https://addons.mozilla.org/en-US/firefox/addon/copy-selection-as-markdown/versions/0.1.0) - 2017-12-15

### Added

- initial release

## Note

- The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- Date is in UTC
  ```console
  $ TZ=UTC git log --date=iso-local --tags --simplify-by-decoration --pretty="format:%cd %d"
  ```
