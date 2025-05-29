# Summary
Enhance the existing List Sources feature to include a programmatic API for refreshing configurations dynamically and improve documentation and examples.

# Functional Requirements
- In src/lib/main.js:
  - Export an async function `refreshSupportedDataSources(configUrl: string): Promise<void>` that:
    - Fetches JSON from `configUrl`, expecting an array of URL strings.
    - Validates that each entry is a well-formed URL.
    - Updates the in-memory `supportedDataSources` array with the fetched list.
  - Extend `main(args)` to detect:
    - `--refresh-sources <configUrl>`:
      1. Validate `configUrl` is provided; otherwise print `Error: Config URL required for --refresh-sources` and exit with code 1.
      2. Call `await refreshSupportedDataSources(configUrl)`.
      3. On success, print `Sources refreshed` and exit code 0.
      4. On failure, print the error message and exit code 1.
  - Ensure existing `--list-sources` behavior reflects the updated list.

# API
- `getSupportedDataSources(): string[]` — returns the current list of source URLs.
- `refreshSupportedDataSources(configUrl: string): Promise<void>` — fetches and updates the list.

# CLI Usage
```bash
# Refresh supported sources from remote config
npm run start -- --refresh-sources https://example.com/sources.json
```