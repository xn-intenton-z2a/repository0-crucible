# Summary
Add a new CLI flag --fetch-source and a programmatic API function fetchSource(url) to retrieve JSON data from supported public data sources. Optionally persist the output to a file with --output-file.

# Functional Requirements

In src/lib/main.js:

1. Export an async function fetchSource(url: string): Promise<any>
   * Validate that url is included in getSupportedDataSources().
   * If unsupported, throw Error("Unsupported data source: " + url).
   * Use global fetch() to retrieve the URL and return parsed JSON.

2. Extend main(args: string[]) to detect --fetch-source <url> [--output-file <path>]:
   1. If no URL or URL starts with --, print Error: URL is required for --fetch-source to stderr and exit code 1.
   2. If URL not supported, print Error: Unsupported data source: <url> to stderr and exit code 1.
   3. Call await fetchSource(url).
   4. If --output-file <path> is provided:
      * If no path or argument starts with --, print Error: File path is required for --output-file and exit code 1.
      * Use fs/promises.writeFile to write JSON.stringify(data, null, 2) to the file.
      * On success exit code 0 with no stdout.
      * On write error print the error message to stderr and exit code 1.
   5. If no --output-file, print JSON.stringify(data, null, 2) to stdout and exit code 0.

# CLI Usage

```bash
# Fetch and print data
npm run start -- --fetch-source https://restcountries.com/v3.1/all

# Fetch and save to file
npm run start -- --fetch-source https://restcountries.com/v3.1/all --output-file data.json
```

# Testing

In tests/unit/main.test.js:

- Stub global.fetch to return a mock Response with json() resolving to sample data. Assert fetchSource(validUrl) resolves and calls fetch.
- Assert fetchSource(invalidUrl) rejects with the correct error.
- Mock fs/promises.writeFile to resolve and reject:
  * On resolve, verify writeFile is called with correct path and JSON.
  * On rejection, assert error printed to stderr and process.exit(1).
- CLI integration tests:
  * **Valid URL without output-file:** spy console.log and process.exit; run main(["--fetch-source", validUrl]); assert printed JSON and exit code 0.
  * **Valid URL with output-file:** spy writeFile and process.exit; run main(["--fetch-source", validUrl, "--output-file", outPath]); assert writeFile call and exit code 0.
  * **Missing URL:** run main(["--fetch-source"]); assert error and exit code 1.
  * **Unsupported URL:** run main(["--fetch-source", invalidUrl]); assert error and exit code 1.
  * **Missing file path:** run main(["--fetch-source", validUrl, "--output-file"]); assert error and exit code 1.
  * **Write error:** simulate writeFile rejection; assert error and exit code 1.

# Documentation

- Update README.md under **Features** to include **Fetch Source** with summary and note optional --output-file.
- Update docs/FETCH_SOURCE.md to mirror API reference, CLI usage, examples, and error scenarios.