# Summary
Add a new CLI flag `--fetch-source` and a programmatic API function `fetchSource(url)` to retrieve live JSON data from supported public data sources. This enables users to fetch and display raw data without writing custom HTTP logic.

# Functional Requirements
- In `src/lib/main.js`:
  - Export an async function:

        export async function fetchSource(url: string): Promise<any>

    - The function must:
      1. Call `getSupportedDataSources()` to get the list of valid URLs.
      2. If the provided `url` is not in that list, throw an Error: `Unsupported data source: <url>`.
      3. Otherwise call `fetch(url)` to retrieve JSON and return the parsed result.
  - Extend the existing `main(args)` entrypoint to detect the flag `--fetch-source <url>`:
    1. If no `<url>` follows the flag or it starts with `--`, print `Error: URL is required for --fetch-source` to stderr and exit code `1`.
    2. Validate the URL against supported sources; if unsupported, print `Error: Unsupported data source: <url>` to stderr and exit code `1`.
    3. On success, call `await fetchSource(url)`, then print `JSON.stringify(data, null, 2)` to stdout and exit code `0`.
    4. On network or parse errors, catch the error, print `Error: <message>` to stderr and exit code `1`.
    5. Preserve existing `--list-sources` behavior and default stub output for other flags.

# CLI Usage

Retrieve JSON from a supported source and print to console:

```bash
npm run start -- --fetch-source <url>
```

# API

Programmatic access to fetch data:

```js
import { fetchSource, getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const validUrls = getSupportedDataSources();
  const data = await fetchSource(validUrls[0]);
  console.log(data);
})();
```

# Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Stub `global.fetch` to return a mock response with a `json()` method resolving to sample data.  Assert that `fetchSource(validUrl)` resolves to that data and that `fetch` was called with `validUrl`.
  - Assert that `fetchSource(invalidUrl)` rejects with an `Error: Unsupported data source: <invalidUrl>`.
- **CLI Integration Tests** in `tests/unit/main.test.js`:
  - **Valid URL**: spy on `console.log` and `process.exit`, then call `await main(["--fetch-source", validUrl])`; assert JSON printed and exit code `0`.
  - **Missing URL**: spy on `console.error` and `process.exit`, call `await main(["--fetch-source"])`; assert error message and exit code `1`.
  - **Unsupported URL**: spy on `console.error` and `process.exit`, call `await main(["--fetch-source", invalidUrl])`; assert error message and exit code `1`.

# Documentation

- Update `README.md`:
  - Under **Features**, add **Fetch Source** with a brief summary and CLI usage example.
  - Under **Usage**, include:

    ```bash
    npm run start -- --fetch-source <url>
    # Sample output: formatted JSON
    ```