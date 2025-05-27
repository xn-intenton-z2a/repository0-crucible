# Summary
Enhance the existing Fetch Source feature to add an optional output-file argument. When provided, fetched data is written to a file instead of printing to stdout.

# Functional Requirements

## CLI Flag --fetch-source <url> [--output-file <path>]
- Detect `--fetch-source` and validate URL is one of `supportedDataSources`; if missing or unsupported, print an error to stderr and exit code 1.
- Fetch JSON data from the URL via `fetchSource(url)`.  
- If `--output-file <path>` is present:
  - Validate a file path follows the flag; if missing, print an error to stderr and exit code 1.
  - Write the JSON data to the file with `fs/promises.writeFile(path, JSON.stringify(data, null, 2))`.
  - On success, exit code 0 without printing to stdout.
  - On write error, print error message to stderr and exit code 1.
- If `--output-file` is absent:
  - Print the JSON data to stdout and exit code 0.

## Programmatic API
- `export async function fetchSource(url: string): Promise<any>`
  - Validates URL is supported or throws `Error("Unsupported data source: " + url)`.
  - Uses global `fetch` to retrieve and parse JSON.
- No changes to `getSupportedDataSources()`.

# Testing

## Unit Tests
- Stub `global.fetch` to return a mock response for `fetchSource`; assert resolve or reject for valid and invalid URLs.
- Stub `fs/promises.writeFile` to simulate success and failure; assert correct invocation and error handling.

## CLI Integration Tests
- Valid URL without output-file: expect JSON printed to stdout and exit code 0.
- Valid URL with output-file: expect no stdout, file write called with formatted JSON, exit code 0.
- Missing URL: expect error to stderr and exit code 1.
- Unsupported URL: expect error to stderr and exit code 1.
- Missing file path: expect error to stderr and exit code 1.
- Write error: expect error to stderr and exit code 1.

# Documentation
- Update `README.md`: add **Fetch Source** feature with `--output-file` option and examples.
- Create or update `docs/FETCH_SOURCE.md` with API reference, CLI examples, and error scenarios.
