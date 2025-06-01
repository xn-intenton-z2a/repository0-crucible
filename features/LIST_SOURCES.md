# Summary
Add an API and CLI option to refresh and list supported data sources dynamically.

# Functional Requirements

- In src/lib/main.js:
  - Define and export an async function `refreshSupportedDataSources(configUrl: string): Promise<void>` that fetches a JSON array of strings from the given URL, validates each is a valid URL, and replaces the in-memory `supportedDataSources`.
  - Extend `getSupportedDataSources(): string[]` to always return the current list.
  - In the `main(args)` entrypoint:
    - Detect `--refresh-sources <configUrl>`:
      1. If `configUrl` is missing, print `Error: Config URL required for --refresh-sources` to stderr and exit with code 1.
      2. Call `await refreshSupportedDataSources(configUrl)`; on success, print `Sources refreshed` and exit 0; on failure, print the error message and exit 1.
    - Detect `--list-sources` and print `JSON.stringify(getSupportedDataSources(), null, 2)` to stdout, then exit 0.
  - Preserve other flags and default behavior.

# Testing

- Unit tests for `refreshSupportedDataSources`:
  - Stub `global.fetch` to return a valid JSON array of URLs and assert the in-memory list is updated.
  - Stub `fetch` to return invalid data and assert an error is thrown.
- CLI integration tests:
  - Valid `--refresh-sources <url>` prints `Sources refreshed` and exits 0.
  - Missing URL prints the error and exits 1.
  - After refresh, `--list-sources` reflects the new list.

# Documentation

- Update README.md under **Features** to describe **List Sources** and **Refresh Sources** with examples:
  - `npm run start -- --list-sources`
  - `npm run start -- --refresh-sources https://example.com/sources.json`
- Add docs/LIST_SOURCES.md with API reference and examples.
