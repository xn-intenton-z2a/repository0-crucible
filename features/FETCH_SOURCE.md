# Summary
Add a new CLI flag `--fetch-source` and a programmatic API `fetchSource(url)` to retrieve raw JSON data from supported public data sources. This feature enables users to fetch live data without writing custom HTTP logic.

# Functional Requirements

- In `src/lib/main.js`:
  1. Export an asynchronous function:
     ```js
     export async function fetchSource(url: string): Promise<any> {
       if (!getSupportedDataSources().includes(url)) {
         throw new Error(`Unsupported data source: ${url}`);
       }
       const response = await fetch(url);
       return await response.json();
     }
     ```
  2. Extend the `main(args)` entry point to handle:
     - `--fetch-source <url>`
       - If the URL argument is missing or begins with `--`, print `Error: URL is required for --fetch-source` to stderr and exit with code `1`.
       - If the URL is not in `getSupportedDataSources()`, print `Error: Unsupported data source: <url>` to stderr and exit code `1`.
       - Otherwise, call `await fetchSource(url)`:
         - On success, print the fetched JSON with `JSON.stringify(data, null, 2)` and exit code `0`.
         - Catch network or parse errors, print `Error: <message>` to stderr and exit code `1`.
  3. Preserve existing `--list-sources` behavior and default CLI output.

# API

- `fetchSource(url: string): Promise<any>` — Fetches and returns parsed JSON from the given supported URL or rejects if unsupported.

# CLI Usage

```bash
# Fetch JSON data from a supported source and print to console
tnpm run start -- --fetch-source https://restcountries.com/v3.1/all
```

# Testing

- **Unit Tests** (`tests/unit/main.test.js`):
  - Stub `global.fetch` to return a mock response with a `json()` method resolving to sample data. Assert `fetchSource(validUrl)` resolves to that data and `fetch` was called correctly.
  - Call `fetchSource(invalidUrl)` and assert it rejects with `Unsupported data source: <invalidUrl>`.
- **CLI Integration Tests**:
  - **Valid URL**:
    - Spy on `console.log` and `process.exit`; call `await main(["--fetch-source", validUrl])`; assert JSON printed and exit code `0`.
  - **Missing URL**:
    - Spy on `console.error` and `process.exit`; call `await main(["--fetch-source"])`; assert error message and exit code `1`.
  - **Unsupported URL**:
    - Spy on `console.error` and `process.exit`; call `await main(["--fetch-source", invalidUrl])`; assert error message and exit code `1`.

# Documentation

- Update `README.md`:
  - Under **Features**, add **Fetch Source** with summary and CLI usage example.
- Create `docs/FETCH_SOURCE.md`:
  - Describe the `fetchSource(url)` API, the `--fetch-source` flag, sample commands, output examples, and error scenarios.
