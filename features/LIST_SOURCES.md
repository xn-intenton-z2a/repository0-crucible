# Summary

Enhance list-sources by adding the ability to refresh the in-memory data source URLs from a remote JSON endpoint and then list them in one command.

# Functional Requirements

1. Export an async function `refreshSupportedDataSources(configUrl: string): Promise<void>` in `src/lib/main.js` that:
   - Fetches JSON from `configUrl` via the global `fetch` API, expecting an array of URL strings.
   - Validates that each entry is a well-formed HTTP or HTTPS URL.
   - Updates the in-memory `supportedDataSources` array with the fetched list.

2. Update `main(args: string[])` in `src/lib/main.js` to:
   - Detect `--refresh-sources <configUrl>` before other flags:
     - If `<configUrl>` is missing or starts with `--`, print `Error: Config URL required for --refresh-sources` to stderr and exit with code 1.
     - Call `await refreshSupportedDataSources(configUrl)`.
     - On success, print `Sources refreshed` to stdout and exit with code 0.
     - On failure, print the error message to stderr and exit with code 1.
   - After handling refresh, detect `--list-sources`:
     - Print `JSON.stringify(getSupportedDataSources(), null, 2)` to stdout and exit with code 0.
   - Preserve behavior for all existing flags and default CLI behavior.

# CLI Usage

```bash
npm run start -- --refresh-sources <configUrl> --list-sources
```

# Testing

- **Unit Tests**:
  - Stub `fetch` to return valid and invalid JSON arrays to test `refreshSupportedDataSources` behavior.
- **CLI Integration Tests**:
  - Simulate `main(['--refresh-sources', validUrl])`, spy on `console.log` and `process.exit`, and verify output and exit code.
  - Simulate missing `configUrl` and verify error and exit code.
  - After refresh success, simulate `main(['--list-sources'])` and verify the printed list reflects the updated in-memory URLs and exit code.