# Changelog

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
