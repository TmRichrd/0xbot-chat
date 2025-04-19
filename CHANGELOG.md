# Changelog

## Language

- [English](CHANGELOG.md)
- [中文](CHANGELOG.zh-CN.md)

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