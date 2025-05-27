# Summary

Add a new CLI flag `--fetch-source` and a programmatic API `fetchSource(url)` to retrieve live JSON data from supported public data sources.  Users can choose to print the fetched data on the console or write it to a file.

# Functional Requirements

- In `src/lib/main.js`:
  - Export an asynchronous function:

      export async function fetchSource(url: string): Promise<any>

    - The function must:
      1. Validate that `url` is included in `getSupportedDataSources()`.
         - If not supported, throw an error with message `Unsupported data source: <url>`.
      2. Use the global `fetch` API to retrieve JSON and return the parsed data.
  
  - Extend the `main(args: string[])` entrypoint to detect the flag `--fetch-source <url>`:
    1. Ensure a URL follows the flag; if missing or starting with `--`, print `Error: URL is required for --fetch-source` to stderr and exit with code `1`.
    2. Validate that the URL matches one of the supported sources; if not, print `Error: Unsupported data source: <url>` to stderr and exit with code `1`.
    3. After fetching data:
       - If the optional `--output-file <path>` flag is provided immediately after the URL:
         - Ensure a file path follows; if missing or starts with `--`, print `Error: File path is required for --output-file` to stderr and exit with code `1`.
         - Write the fetched JSON data to the specified file with two-space indentation.
         - On success, exit with code `0` without printing to stdout.
         - On write failure, print the write error message to stderr and exit with code `1`.
       - If no `--output-file` flag is present:
         - Print the fetched JSON with `JSON.stringify(data, null, 2)` to stdout.
         - Exit with code `0`.

# CLI Usage

- Fetch and print JSON data:

      npm run start -- --fetch-source <url>

- Fetch and save JSON data to a file:

      npm run start -- --fetch-source <url> --output-file <filePath>

# API

```js
import { fetchSource, getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const sources = getSupportedDataSources();
  const data = await fetchSource(sources[0]);
  console.log(data);
})();
```

# Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  1. Stub `global.fetch` to return a mock Response with `json()` resolving to sample data.  Assert that `fetchSource(validUrl)` resolves to that data and that `fetch` was called with `validUrl`.
  2. Call `fetchSource(invalidUrl)` and assert it rejects with `Unsupported data source: <invalidUrl>`.

- **CLI Integration Tests**:
  1. **Valid URL, no output-file**:
     - Spy on `console.log` and `process.exit`.
     - Run `await main(["--fetch-source", validUrl])` and assert JSON printed matches sample data and exit code `0`.
  2. **Valid URL, with output-file**:
     - Spy on `fs/promises.writeFile`, suppress `console.log`, spy on `process.exit`.
     - Run `await main(["--fetch-source", validUrl, "--output-file", path])` and assert `writeFile` called with formatted JSON and exit code `0`, and no stdout output.
  3. **Missing URL**:
     - Spy on `console.error` and `process.exit`.
     - Run `await main(["--fetch-source"])` and assert error message and exit code `1`.
  4. **Unsupported URL**:
     - Spy on `console.error` and `process.exit`.
     - Run `await main(["--fetch-source", invalidUrl])` and assert error message and exit code `1`.
  5. **Missing file path**:
     - Spy on `console.error` and `process.exit`.
     - Run `await main(["--fetch-source", validUrl, "--output-file"])` and assert error message and exit code `1`.
  6. **Write-file error**:
     - Mock `writeFile` to reject.
     - Spy on `console.error` and `process.exit`.
     - Run with `--output-file` and assert error printed and exit code `1`.

# Documentation

- Update `README.md`:
  - Under **Features**, add a **Fetch Source** section describing the CLI flag, optional `--output-file`, and basic usage examples.
  - Under **Usage**, include examples for printing and saving JSON data.

- Create `docs/FETCH_SOURCE.md` with:
  - Feature summary.
  - Detailed API reference for `fetchSource`.
  - CLI flag descriptions, examples, and sample outputs.
  - Error scenarios and messages.
