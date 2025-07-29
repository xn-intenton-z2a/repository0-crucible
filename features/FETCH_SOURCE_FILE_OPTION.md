# Summary
Add an optional --output-file <path> parameter to the existing --fetch-source CLI flag and fetchSource API, allowing users to write fetched JSON data to a file instead of printing to stdout.

# Functional Requirements

## CLI Behavior
- Extend `main(args)` in `src/lib/main.js` to detect:
  - `--fetch-source <url>` (required)
  - Optional `--output-file <path>` immediately following the URL.
- Workflow:
  1. Validate that a URL argument follows `--fetch-source`; if missing or starting with `--`, print `Error: URL is required for --fetch-source` to stderr and exit with code 1.
  2. Validate that the URL is one of `getSupportedDataSources()`; if not, print `Error: Unsupported data source: <url>` to stderr and exit with code 1.
  3. Call `const data = await fetchSource(url)`.
  4. If `--output-file <path>` is present:
     - Validate that a file path follows; if missing or starting with `--`, print `Error: File path is required for --output-file` to stderr and exit with code 1.
     - Use `fs/promises.writeFile(path, JSON.stringify(data, null, 2))` to persist data.
     - On success, exit with code 0 without printing to stdout.
     - On write error, print the error message to stderr and exit with code 1.
  5. If `--output-file` is absent, print `JSON.stringify(data, null, 2)` to stdout and exit with code 0.
- Preserve existing `--list-sources` behavior and default stub output for other flags.

## API Behavior
- `export async function fetchSource(url: string): Promise<any>`
  - Validates URL against `getSupportedDataSources()` or throws `Error('Unsupported data source: ' + url)`.
  - Uses global `fetch` to retrieve JSON and returns parsed data.

# Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Mock `global.fetch` to resolve a sample JSON object; assert `fetchSource(validUrl)` resolves and calls fetch correctly.
  - Assert `fetchSource(invalidUrl)` rejects with the correct error.
  - Stub `fs/promises.writeFile` to:
    - Resolve: assert it is called with the correct path and formatted JSON when `--output-file` is used.
    - Reject: assert `console.error` is called with the error message and `process.exit(1)`.

- **CLI Integration Tests**:
  - **Without output-file**:
    - Spy on `console.log` and `process.exit`; run `await main(['--fetch-source', validUrl])`; assert printed JSON and exit code 0.
  - **With output-file**:
    - Spy on `fs/promises.writeFile` and `process.exit`, suppress `console.log`; run `await main(['--fetch-source', validUrl, '--output-file', 'out.json'])`; assert file write and exit code 0.
  - **Missing URL**: assert error message and exit code 1.
  - **Unsupported URL**: assert error message and exit code 1.
  - **Missing file path**: assert error message and exit code 1.
  - **Write failure**: mock writeFile rejection and assert error message and exit code 1.

# Documentation

- Update `README.md`:
  - Under **Features**, update **Fetch Source** to mention `--output-file` support.
  - Under **Usage**, add examples:
    ```bash
    npm run start -- --fetch-source <url>
    npm run start -- --fetch-source <url> --output-file data.json
    ```
- Update or create `docs/FETCH_SOURCE.md` with an **With output-file** section showing usage and behavior.