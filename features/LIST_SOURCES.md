# Summary
Extend and document the existing List Sources feature to support dynamic configuration and refresh of data source URLs.

# Functional Requirements

1. In `src/lib/main.js`:
   - Export an asynchronous function `refreshSupportedDataSources(configUrl: string): Promise<void>` that:
     - Fetches JSON from `configUrl`, expecting an array of URL strings.
     - Validates each entry is a well-formed URL; throws `Error("Invalid data source URL: <entry>")` if any entry is invalid.
     - Updates the in-memory `supportedDataSources` array with the fetched list.
   - Modify `getSupportedDataSources()` to return the current in-memory list (after any refresh).
   - In the `main(args: string[])` entrypoint, before other flags:
     - Detect `--refresh-sources <configUrl>`:
       1. If `<configUrl>` is missing or starts with `--`, print `Error: Config URL required for --refresh-sources` to stderr and exit with code 1.
       2. Call `await refreshSupportedDataSources(configUrl)`.
       3. On success, print `Sources refreshed` to stdout and exit with code 0.
       4. On failure, print the error message to stderr and exit with code 1.
   - Preserve the existing `--list-sources` behavior to print the current list as JSON and exit with code 0.

# CLI Usage

```bash
# Refresh sources
npm run start -- --refresh-sources https://example.com/sources.json

# List current sources
npm run start -- --list-sources
```

# Testing

- Unit tests for `refreshSupportedDataSources`:
  - Stub `fetch` to return valid and invalid JSON arrays; assert the in-memory list updates or errors appropriately.
- CLI integration tests:
  - `main(["--refresh-sources", validUrl])`: spy on `console.log` and `process.exit(0)`.
  - `main(["--refresh-sources"])`: spy on `console.error` and `process.exit(1)`.
  - After refresh, `main(["--list-sources"])` prints the updated array and exits with code 0.
