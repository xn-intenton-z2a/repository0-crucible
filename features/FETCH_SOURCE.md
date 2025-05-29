# Summary
Add a CLI flag --fetch-source <url> and a programmatic API fetchSource(url) to retrieve live JSON data from supported public data sources, with optional file output via --output-file.

# Functional Requirements

* In src/lib/main.js:
  - Export async function fetchSource(url: string): Promise<any>
    * Validate that url is in getSupportedDataSources().
    * If not, throw Error("Unsupported data source: <url>").
    * Use global fetch() to get and parse JSON.
  - Extend main(args: string[]) to handle:
    * --fetch-source <url>
      1. Validate url argument is provided and supported; on error print to stderr and exit code 1.
      2. Call await fetchSource(url).
      3. Detect optional --output-file <path>:
         - If present, validate path; write JSON.stringify(data, null, 2) to file; on success exit 0, on write error print error and exit 1.
      4. If no --output-file, print JSON.stringify(data, null, 2) to stdout and exit 0.
  - Preserve existing --list-sources behavior and default output.

# Testing

* Unit Tests (tests/unit/main.test.js):
  - Stub global.fetch for fetchSource(validUrl) and assert resolution and fetch call.
  - Assert fetchSource(invalidUrl) rejects with correct error.
  - Mock fs/promises.writeFile to resolve and reject; assert file write behavior and error handling.
* CLI Integration Tests:
  - Valid URL without output-file: spy console.log and process.exit; run main([...]) and assert output and exit 0.
  - Valid URL with output-file: spy writeFile and process.exit; suppress console.log; assert write call and exit 0.
  - Missing URL, unsupported URL, missing file path, and write errors: assert stderr messages and exit 1.

# Documentation

* Update README.md under **Features** to add **Fetch Source** entry with summary and CLI examples for both console and file output.
* Add docs/FETCH_SOURCE.md mirroring README with API reference, usage examples, and error scenarios.