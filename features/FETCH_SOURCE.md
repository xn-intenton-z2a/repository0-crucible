# Summary

Add a new CLI flag `--fetch-source` and a programmatic API function `fetchSource(url)` to retrieve raw JSON data from supported public data sources. Users can print the data to stdout or write it to a file with an optional `--output-file` parameter.

# Functional Requirements

- In `src/lib/main.js`:
  1. Export an asynchronous function `fetchSource(url: string): Promise<any>` that:
     - Validates the provided URL against `getSupportedDataSources()`.
     - If unsupported, throws an error `Unsupported data source: <url>`.
     - Uses the global `fetch` API to retrieve JSON and returns the parsed result.
  2. Extend the existing `main(args: string[])` entry point to detect the `--fetch-source <url>` flag:
     - If the URL argument is missing or starts with `--`, print `Error: URL is required for --fetch-source` to stderr and exit with code 1.
     - After validating the URL, call `fetchSource(url)`.
     - Detect an optional `--output-file <filePath>` argument immediately after the URL:
       - If provided, write the fetched JSON to the file using `fs/promises.writeFile` with two-space indentation.
       - On successful write, exit with code 0 without printing to stdout.
       - On write failure, print the error message to stderr and exit with code 1.
     - If no `--output-file` flag is provided, print the fetched JSON via `console.log(JSON.stringify(data, null, 2))` and exit with code 0.
  3. Preserve all existing behavior, including the `--list-sources` flag and default demo output.

# CLI Usage

Fetch and print data:
```
npm run start -- --fetch-source https://restcountries.com/v3.1/all
```

Fetch and save to a file:
```
npm run start -- --fetch-source https://restcountries.com/v3.1/all --output-file data.json
```

# API

```js
import { getSupportedDataSources, fetchSource } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const sources = getSupportedDataSources();
  try {
    const data = await fetchSource(sources[0]);
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
})();
```

# Testing

- Unit Tests (in `tests/unit/main.test.js`):
  - Stub `global.fetch` to return a mock response with a `json()` method resolving to sample data. Assert `fetchSource(validUrl)` resolves to that data and `fetch` was called correctly.
  - Assert `fetchSource(invalidUrl)` rejects with `Unsupported data source: <invalidUrl>`.
  - Stub `fs/promises.writeFile` to simulate success and failure:
    - Verify write is called with the correct path and formatted JSON.
    - Simulate rejection and assert the error is printed and process exits with code 1.

- CLI Integration Tests (in `tests/unit/main.test.js`):
  - **Valid URL without output-file**: Spy on `console.log` and `process.exit`; run `await main(["--fetch-source", validUrl])`; assert JSON printed and exit code 0.
  - **Valid URL with output-file**: Spy on `fs/promises.writeFile`, suppress `console.log`, spy on `process.exit`; run `await main(["--fetch-source", validUrl, "--output-file", path])`; assert write called, no stdout, and exit code 0.
  - **Missing URL**: Spy on `console.error` and `process.exit`; run `await main(["--fetch-source"])`; assert error and exit code 1.
  - **Unsupported URL**: Spy on `console.error` and `process.exit`; run `await main(["--fetch-source", invalidUrl])`; assert error and exit code 1.

# Documentation

- Update `README.md`:
  - Under **Features**, add a **Fetch Source** entry describing the CLI flag, optional `--output-file`, and summary.
  - Under **Usage**, include examples for printing and saving JSON data.

- Create `docs/FETCH_SOURCE.md`:
  - Mirror the README content with full API reference, CLI usage, code examples, and error scenarios.
