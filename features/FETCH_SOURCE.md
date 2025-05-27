# Summary
Add a programmatic API function and a CLI flag to fetch live JSON data from supported public data sources. This enables users to retrieve raw data using --fetch-source without writing custom fetch logic.

# Functional Requirements
- In src/lib/main.js:
  - Export an asynchronous function fetchSource(url): Promise<any> that uses the global fetch API to retrieve and parse JSON from the given URL.
  - In the main(args) entrypoint detect the flag --fetch-source followed by a URL string:
    - Validate that the URL appears in supportedDataSources.
      - If not supported, print an error to stderr and exit with code 1.
    - If supported, call fetchSource(url), print the formatted JSON to stdout, and exit with code 0.
  - Preserve existing --list-sources behavior and default behavior for other arguments.

# API
- fetchSource(url: string): Promise<any> — fetches and returns parsed JSON for a supported URL.
- getSupportedDataSources(): string[] — unchanged, returns the list of URLs.
- main(args: string[]): Promise<void> — updated to handle --fetch-source.

# CLI Usage
To fetch JSON data from a source:
npm run start -- --fetch-source https://restcountries.com/v3.1/all

# Testing
- Unit tests in tests/unit/main.test.js:
  - Stub global.fetch to return a controlled JSON response and assert fetchSource resolves accordingly.
  - Assert fetchSource rejects when called with an unsupported URL.
- CLI integration tests:
  - Simulate main(["--fetch-source", validUrl]), spy on console.log and process.exit, and assert correct JSON output and exit code 0.
  - Simulate main(["--fetch-source", invalidUrl]), spy on console.error and process.exit, and assert error message and exit code 1.

# Documentation
- Update README.md:
  - Under Features add Fetch Source section describing the flag and programmatic API.
  - Under Usage add an example invocation and sample output.
- Add docs/FETCH_SOURCE.md containing the full details and examples mirroring README.