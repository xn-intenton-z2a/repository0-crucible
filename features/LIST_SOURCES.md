# Summary
Extend the existing List Sources feature to support dynamic refreshing of the in-memory data source list from a remote JSON configuration and improve the CLI API for combined operations.

# Functional Requirements

1. In src/lib/main.js:
   - Export an async function `refreshSupportedDataSources(configUrl: string): Promise<void>` that:
     - Uses `fetch(configUrl)` to retrieve JSON; expects an array of URL strings.
     - Validates each element is a well-formed HTTP or HTTPS URL.
     - Replaces the in-memory `supportedDataSources` array with the fetched list.
   - Modify `getSupportedDataSources()` to always return the current in-memory list after any refresh.

2. Extend the `main(args: string[])` entrypoint:
   - Detect `--refresh-sources <configUrl>` before other flags:
     1. If `<configUrl>` is missing or invalid (starts with `--`), print `Error: Config URL required for --refresh-sources` to stderr and exit with code 1.
     2. Call `await refreshSupportedDataSources(configUrl)`.
     3. On success, print `Sources refreshed` and exit with code 0.
     4. On failure, print the error message to stderr and exit with code 1.
   - After refresh handling, detect `--list-sources`:
     - Print `JSON.stringify(getSupportedDataSources(), null, 2)` to stdout and exit with code 0.
   - Ensure all other existing flags and default CLI behavior remain unchanged.

# CLI Usage

```bash
npm run start -- --refresh-sources https://example.com/sources.json --list-sources
```

# Testing

- Unit tests for `refreshSupportedDataSources`:
  - Stub global `fetch` to return valid and invalid JSON arrays; assert list updates or errors are thrown.
- CLI integration tests:
  - Simulate `main(["--refresh-sources", validConfigUrl])`; spy on console.log and process.exit; assert output and exit code 0.
  - Simulate missing `<configUrl>`; spy on console.error and process.exit; assert error message and exit code 1.
  - After successful refresh, simulate `main(["--list-sources"])`; assert printed JSON matches updated list and exit 0.
