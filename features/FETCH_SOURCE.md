# Summary
Add a new CLI flag `--fetch-source` and a programmatic API function `fetchSource(url: string): Promise<any>` to retrieve raw JSON data from supported public data sources. This feature enables users to fetch live data without writing custom fetch logic.

# Functional Requirements

1. In `src/lib/main.js`:
   - Export an asynchronous function:
     ```js
     export async function fetchSource(url: string): Promise<any> {
       const sources = getSupportedDataSources();
       if (!sources.includes(url)) {
         throw new Error(`Unsupported data source: ${url}`);
       }
       const response = await fetch(url);
       return await response.json();
     }
     ```
   - Extend the `main(args: string[])` entrypoint to detect the flag `--fetch-source <url>`:
     1. If the URL argument is missing or starts with `--`, print `Error: URL is required for --fetch-source` to stderr and exit with code 1.
     2. Validate the URL against `getSupportedDataSources()`. If unsupported, print `Error: Unsupported data source: <url>` to stderr and exit with code 1.
     3. Call `await fetchSource(url)`:
        - On success, print `JSON.stringify(data, null, 2)` to stdout and exit with code 0.
        - On fetch or parse error, catch the error, print `Error: <message>` to stderr and exit with code 1.
     4. Preserve existing `--list-sources` behavior and default CLI output.

# API

- `fetchSource(url: string): Promise<any>` — Fetches and returns parsed JSON from the given supported data source URL or rejects if unsupported.

# CLI Usage

```bash
# Fetch JSON data from a supported source
npm run start -- --fetch-source <url>
```

# Testing

In `tests/unit/main.test.js`:

- **Unit Tests**:
  - Stub `global.fetch` to return a mock response with a `json()` method resolving to sample data. Assert that `fetchSource(validUrl)` resolves to that data and that `fetch` was called correctly.
  - Assert that `fetchSource(invalidUrl)` rejects with `Error: Unsupported data source: <invalidUrl>`.

- **CLI Integration Tests**:
  - **Valid URL**:
    - Spy on `console.log` and `process.exit`.
    - Call `await main(["--fetch-source", validUrl])` and assert the correct JSON output and exit code 0.
  - **Missing URL**:
    - Spy on `console.error` and `process.exit`.
    - Call `await main(["--fetch-source"])` and assert the correct error message and exit code 1.
  - **Unsupported URL**:
    - Spy on `console.error` and `process.exit`.
    - Call `await main(["--fetch-source", invalidUrl])` and assert the correct error message and exit code 1.
