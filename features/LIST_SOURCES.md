# Summary
Extend and document the existing List Sources feature with a programmatic refresh API.

# Functional Requirements
- In src/lib/main.js:
  - Export an async function `refreshSupportedDataSources(configUrl: string): Promise<void>` that fetches a JSON array of URLs from `configUrl`, validates each URL, and updates the in-memory `supportedDataSources` list.
  - Modify `getSupportedDataSources()` to always return the current in-memory list.
  - In `main(args: string[])`, before handling other flags:
    - Detect `--refresh-sources <configUrl>`:
      1. If `<configUrl>` is missing, print `Error: Config URL required for --refresh-sources` to stderr and `process.exit(1)`.
      2. Call `await refreshSupportedDataSources(configUrl)`.
      3. On success, print `Sources refreshed` to stdout and `process.exit(0)`.
      4. On error, print the error message to stderr and `process.exit(1)`.
    - Retain the existing `--list-sources` flag to print the current list as JSON and exit code 0.

# CLI Usage
```bash
# Refresh supported sources from remote config
npm run start -- --refresh-sources https://example.com/sources.json

# List current sources
npm run start -- --list-sources
```

# Testing
- Unit tests for `refreshSupportedDataSources`:
  - Stub `fetch` to return valid and invalid arrays; assert the in-memory list updates or errors.
- CLI integration tests:
  - `main(["--refresh-sources", validUrl])`: spy on console.log and `process.exit(0)`.
  - `main(["--refresh-sources"])`: spy on console.error and `process.exit(1)`.
  - After refresh, `main(["--list-sources"])` prints the updated array and exits 0.
