# Changelog

## Language

- [English](https://github.com/TmRichrd/0xbot-chat/blob/main/CHANGELOG.md)
- [中文](https://github.com/TmRichrd/0xbot-chat/blob/main/CHANGELOG.zh-CN.md)

## [1.0.9] - 2025-04-19

### Changed
- Updated documentation URLs to point to the correct GitHub repository
- Fixed language switching links in all documentation files
- Improved documentation navigation between different language versions

## [1.0.8] - 2025-04-19

### Added
- Added loading state for AI responses
- Added customizable loading text through `loadingText` option
- Added empty message display with customizable text through `emptyText` option
- Added improved message handling for streaming responses
- Added better error handling for message sending
- Added opening text display when there are no messages

### Changed
- Improved loading state management to show/hide at appropriate times
- Enhanced message streaming to update loading state immediately when content arrives
- Optimized message state management for better user experience

### Fixed
- Fixed loading state persistence issue during message streaming
- Fixed loading indicator display timing
- Fixed message content update logic 