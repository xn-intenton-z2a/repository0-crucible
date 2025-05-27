# Summary
Add a new CLI flag `--fetch-source <url>` and a programmatic API function `fetchSource(url)` to retrieve raw JSON data from supported public data sources. This enables users to access live data without writing custom fetch logic.

# Functional Requirements

- In `src/lib/main.js`:
  1. Define and export an asynchronous function:
     ```js
     export async function fetchSource(url: string): Promise<any> {
       if (!getSupportedDataSources().includes(url)) {
         throw new Error(`Unsupported data source: ${url}`);
       }
       const response = await fetch(url);
       return await response.json();
     }
     ```
  2. Extend the `main(args: string[])` entrypoint to detect the flag `--fetch-source <url>`:
     - If the URL argument is missing, print `Error: URL is required for --fetch-source` to stderr and exit with code `1`.
     - If the URL is not one of the supported data sources, print `Error: Unsupported data source: <url>` to stderr and exit with code `1`.
     - Otherwise, call `fetchSource(url)` and print `JSON.stringify(data, null, 2)` to stdout, then exit with code `0`.
     - On fetch errors, catch the error, print `Error: <message>` to stderr, and exit with code `1`.
  3. Preserve existing behavior for `--list-sources` and default CLI output.

# API

- `fetchSource(url: string): Promise<any>` — Fetches and returns parsed JSON from a supported public data source URL or rejects with an error if unsupported or on network failure.

# CLI Usage

```bash
npm run start -- --fetch-source <url>
```

Example:

```bash
npm run start -- --fetch-source https://restcountries.com/v3.1/all
```

# Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Stub `global.fetch` to return a mock response with a `json()` method resolving to sample data. Assert that `fetchSource(validUrl)` resolves to the sample data and that `fetch` was called with `validUrl`.
  - Call `fetchSource(invalidUrl)` and assert it rejects with `Error: Unsupported data source: <invalidUrl>`.
- **CLI Integration Tests**:
  - **Valid URL**: spy on `console.log` and `process.exit`, simulate `main(["--fetch-source", validUrl])`, and assert correct JSON output to stdout and exit code `0`.
  - **Missing URL**: spy on `console.error` and `process.exit`, simulate `main(["--fetch-source"])`, and assert the correct error message and exit code `1`.
  - **Unsupported URL**: spy on `console.error` and `process.exit`, simulate `main(["--fetch-source", invalidUrl])`, and assert the correct error message and exit code `1`.

# Documentation

- Update `README.md`: Under **Features**, add **Fetch Source** with a brief description and CLI usage example. Under **Usage**, include the `--fetch-source` example and sample output.
- Create or update `docs/FETCH_SOURCE.md` mirroring README guidance with full API reference, usage examples, and error scenarios.