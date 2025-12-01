# Summary
Extend the fetch-source feature to support fetching JSON data from a supported public data source via `--fetch-source <url>` and a programmatic `fetchSource(url)` API, with an optional `--output-file <path>` flag to write the result to disk or print to console.

# Functional Requirements

## API: fetchSource
- Export an asynchronous function `fetchSource(url: string): Promise<any>` in `src/lib/main.js` that:
  1. Calls `getSupportedDataSources()` to retrieve the list of valid URLs.
  2. If `url` is not in that list, throws `Error("Unsupported data source: " + url)`.  
  3. Otherwise calls `fetch(url)` to retrieve JSON and returns the parsed result.

## CLI: --fetch-source
- In `main(args: string[])`:
  1. Detect `--fetch-source <url>`:
     - If `<url>` is missing or starts with `--`, print `Error: URL is required for --fetch-source` to stderr and exit with code 1.
     - If `url` is unsupported, print `Error: Unsupported data source: <url>` to stderr and exit with code 1.
  2. Call `await fetchSource(url)` to retrieve data.
  3. Detect optional `--output-file <path>` immediately following the URL:
     - If provided, and `<path>` is missing or invalid, print `Error: File path is required for --output-file` to stderr and exit with code 1.
     - Write `JSON.stringify(data, null, 2)` to the file using `fs/promises.writeFile`.
     - On write success, exit code 0 with no stdout output.
     - On write failure, print the error message to stderr and exit code 1.
  4. If no `--output-file`, print `JSON.stringify(data, null, 2)` to stdout and exit code 0.
  5. Preserve existing `--list-sources` behavior and default CLI output.

# Testing

- **Unit Tests** (`tests/unit/main.test.js`):  
  - Stub `global.fetch` to return a mock response whose `json()` resolves to sample data; assert `fetchSource(validUrl)` resolves to that data and calls `fetch(validUrl)`.  
  - Assert `fetchSource(invalidUrl)` rejects with `Error("Unsupported data source: invalidUrl")`.  
  - Stub `fs/promises.writeFile` to resolve and reject; verify correct invocation and error handling when `--output-file` is used.

- **CLI Integration Tests**:  
  - **Valid URL without output-file**: spy on `console.log` and `process.exit`; run `await main(["--fetch-source", validUrl])`; assert JSON printed and exit code 0.  
  - **Valid URL with output-file**: spy on `writeFile` and `process.exit`, suppress `console.log`; run `await main(["--fetch-source", validUrl, "--output-file", outPath])`; assert `writeFile` called and exit code 0.  
  - **Missing URL**: run `await main(["--fetch-source"])`; assert error and exit code 1.  
  - **Unsupported URL**: run `await main(["--fetch-source", invalidUrl])`; assert error and exit code 1.  
  - **Missing file path**: run `await main(["--fetch-source", validUrl, "--output-file"])`; assert error and exit code 1.  
  - **Write-file error**: simulate write failure and assert error printed and exit code 1.

# Documentation

- Update `README.md`:
  - Under **Features**, add **Fetch Source** with summary and note `--output-file` support.  
  - Under **Usage**, include examples:  
    ```bash
    npm run start -- --fetch-source https://restcountries.com/v3.1/all
    npm run start -- --fetch-source https://restcountries.com/v3.1/all --output-file data.json
    ```

- Update `docs/FETCH_SOURCE.md` to mirror the above, including API reference, CLI usage, examples, and error scenarios.