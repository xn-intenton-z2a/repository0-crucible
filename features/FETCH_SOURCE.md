# Summary
Add a new CLI flag `--fetch-source` and programmatic API `fetchSource(url)` to retrieve and output live JSON data from supported public data sources. This feature enables users to fetch raw data without writing custom HTTP logic.

# Functional Requirements

- In `src/lib/main.js`:
  - Export an async function:
        export async function fetchSource(url: string): Promise<any>
    - The function must:
      - Validate that the URL is included in `supportedDataSources`.
      - If not supported, throw an error with message `Unsupported data source: <url>`.
      - Use the global `fetch` API to retrieve JSON and return the parsed data.
  - Extend the `main(args)` entrypoint to detect the flag:
      --fetch-source <url>
    - If provided:
      1. Ensure a URL follows the flag; if missing, print `Error: URL is required for --fetch-source` to stderr and exit with code 1.
      2. Validate the URL against `supportedDataSources`; if unsupported, print `Error: Unsupported data source: <url>` to stderr and exit with code 1.
      3. Call `fetchSource(url)`, then print `JSON.stringify(data, null, 2)` to stdout and exit with code 0.
      4. On fetch errors, print `Error: <message>` to stderr and exit with code 1.
  - Preserve existing `--list-sources` behavior and default CLI output.

# API

- `fetchSource(url: string): Promise<any>` — Fetches and returns JSON data for a supported URL or rejects if unsupported.
- Exports `getSupportedDataSources(): string[]` and `main(args: string[]): Promise<void>` remain unchanged except for handling the new flag.

# CLI Usage

```bash
# Fetch JSON data from a supported source
npm run start -- --fetch-source https://restcountries.com/v3.1/all
```

# Testing

- **Unit Tests** (in `tests/unit/main.test.js`):
  - Stub `global.fetch` to return a mock response with `json()` resolving to sample data.
  - Assert that `fetchSource(validUrl)` resolves to the sample data and calls `fetch(validUrl)`.
  - Assert that `fetchSource(invalidUrl)` rejects with `Unsupported data source: <url>`.

- **CLI Integration Tests**:
  - **Valid URL**:
    - Spy on `console.log` and `process.exit`.
    - Execute `await main(["--fetch-source", validUrl])`.
    - Verify JSON output matches the stubbed data and exit code is 0.
  - **Unsupported URL**:
    - Spy on `console.error` and `process.exit`.
    - Execute `await main(["--fetch-source", invalidUrl])`.
    - Verify error message and exit code 1.
  - **Missing URL**:
    - Spy on `console.error` and `process.exit`.
    - Execute `await main(["--fetch-source"])`.
    - Verify error message and exit code 1.

# Documentation

- Update `README.md`:
  - Under **Features**, add **Fetch Source** with summary and CLI usage.
  - Under **Usage**, include an example of `npm run start -- --fetch-source <url>` and sample output.
- Create `docs/FETCH_SOURCE.md` mirroring the README with full examples and API reference.
