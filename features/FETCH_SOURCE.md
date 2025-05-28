# Summary
Add a new CLI flag `--fetch-source <url>` and a programmatic API `fetchSource(url)` to retrieve raw JSON data from one of the supported public data source URLs.  This feature will allow users to fetch live data without writing custom HTTP code.

# Functional Requirements
- In **src/lib/main.js**:
  - Export an asynchronous function:
      export async function fetchSource(url: string): Promise<any>
  - The function must:
    - Validate that `url` is included in `getSupportedDataSources()`.
    - If not supported, throw an error with message `Unsupported data source: <url>`.
    - Use the global `fetch` API to request JSON from the URL and return the parsed result.
  - Extend the `main(args: string[])` entrypoint to detect the flag `--fetch-source <url>`:
    1. If the URL argument is missing or begins with `--`, print `Error: URL is required for --fetch-source` to stderr and exit with code `1`.
    2. Validate that the URL matches one of the values returned by `getSupportedDataSources()`; on failure, print `Error: Unsupported data source: <url>` to stderr and exit code `1`.
    3. Call `await fetchSource(url)`:
       - If successful, print `JSON.stringify(data, null, 2)` to stdout and exit code `0`.
       - On fetch or parse errors, catch the error, print `Error: <message>` to stderr, and exit code `1`.
  - Preserve the existing `--list-sources` behavior and default CLI output for other flags.

# Testing
- **Unit Tests** in `tests/unit/main.test.js`:
  - Stub `global.fetch` to return a mock response with a `json()` method resolving to sample data.
    - Assert that `fetchSource(validUrl)` resolves to the sample data and that `fetch(validUrl)` was invoked.
  - Assert that calling `fetchSource(invalidUrl)` rejects with `Error: Unsupported data source: <invalidUrl>`.
- **CLI Integration Tests**:
  - **Valid URL**:
    - Spy on `console.log` and `process.exit`.
    - Run `await main(["--fetch-source", validUrl])` and assert JSON is printed and exit code `0`.
  - **Missing URL**:
    - Spy on `console.error` and `process.exit`.
    - Run `await main(["--fetch-source"])` and assert error message and exit code `1`.
  - **Unsupported URL**:
    - Spy on `console.error` and `process.exit`.
    - Run `await main(["--fetch-source", invalidUrl])` and assert error message and exit code `1`.

# Documentation
- Update **README.md**:
  - Under **Features**, add a **Fetch Source** entry summarizing the new flag and `fetchSource()` API.
  - In the **Usage** section, include:
    ```bash
    # Fetch JSON data from a supported source
    npm run start -- --fetch-source <url>
    # Sample output: formatted JSON array or object
    ```
- If necessary, update `package.json` to ensure the `start` script supports invoking `--fetch-source`.
