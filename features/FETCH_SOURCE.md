# Summary
Extend the existing fetch-source feature to support fetching JSON data from supported public data sources, with an optional --output-file flag to write the result to disk or print to console.

# Functional Requirements

## API
- Export an asynchronous function `fetchSource(url: string): Promise<any>` in `src/lib/main.js`:
  - Retrieve the array of supported URLs via `getSupportedDataSources()`.
  - If the provided URL is not in the list, throw `Error("Unsupported data source: <url>")`.
  - Use the global `fetch` API to retrieve the URL and return the parsed JSON result.

## CLI Behavior
- In the `main(args: string[])` entrypoint:
  - Detect the flag `--fetch-source <url>`:
    1. If `<url>` is missing or starts with `--`, print `Error: URL is required for --fetch-source` to stderr and exit code 1.
    2. Validate the URL against supported sources; if unsupported, print `Error: Unsupported data source: <url>` to stderr and exit code 1.
    3. Call `await fetchSource(url)` to retrieve data.
    4. Detect an optional `--output-file <path>` immediately after the URL:
       - If provided, and `<path>` is missing or invalid, print `Error: File path is required for --output-file` to stderr and exit code 1.
       - Write `JSON.stringify(data, null, 2)` to the file using `fs/promises.writeFile`.
       - On write success, exit with code 0 (no console output).
       - On write failure, print the error message to stderr and exit code 1.
    5. If no `--output-file`, print `JSON.stringify(data, null, 2)` to stdout and exit code 0.
- Preserve the existing `--list-sources` flag and default stub behavior for other flags.

# Testing
- **Unit Tests** (`tests/unit/main.test.js`):
  - Stub `global.fetch` to resolve sample JSON; assert `fetchSource(validUrl)` resolves and `fetch(validUrl)` is called.
  - Assert `fetchSource(invalidUrl)` rejects with the correct error message.
  - Stub `fs/promises.writeFile` for success and rejection to test file writing and error scenarios.

- **CLI Integration Tests**:
  - **Without `--output-file`**: spy on `console.log` and `process.exit`; run `main(["--fetch-source", validUrl])`; assert JSON printed and exit 0.
  - **With `--output-file`**: spy on `writeFile` and `process.exit`, suppress console.log; run `main(["--fetch-source", validUrl, "--output-file", "data.json"])`; assert file write and exit 0.
  - Test missing URL, unsupported URL, missing file path, and write failure to confirm correct error messages and exit code 1.

# Documentation
- Update `README.md` under **Features** to describe **Fetch Source** with `--fetch-source <url> [--output-file <path>]` usage examples:
  ```bash
  npm run start -- --fetch-source https://restcountries.com/v3.1/all
  npm run start -- --fetch-source https://restcountries.com/v3.1/all --output-file data.json
  ```
- Create or update `docs/FETCH_SOURCE.md` to mirror the API reference, CLI usage, examples, and error scenarios.