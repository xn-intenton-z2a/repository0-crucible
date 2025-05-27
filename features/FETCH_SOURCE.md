# Summary
Add a new CLI flag fetch-source and a programmatic API to fetch and output raw JSON data from a supported public data source. This enables users to retrieve live data from the predefined sources without writing custom fetch logic.

# Functional Requirements
- In src/lib/main.js:
  - Export an async function fetchSource(url: string): Promise<any> that uses the global fetch API to retrieve JSON data from the given URL.
  - In the main(args) entrypoint, detect the flag --fetch-source followed by a URL string.
    - Validate that the provided URL matches one of the entries in supportedDataSources.
      - If not, print an error message to stderr and exit with code 1.
    - If valid, call fetchSource(url), print JSON.stringify(data, null, 2) to stdout, and exit with code 0.
  - Ensure existing flags and functionality (including --list-sources) remain unchanged.

# API
- fetchSource(url: string): Promise<any> — fetches and returns parsed JSON from the URL.
- getSupportedDataSources(): string[] — unchanged, returns the list of supported source URLs.
- main(args: string[]): void — extended to handle the new flag.

# CLI Usage
- npm run start -- --fetch-source <url>
- Example: npm run start -- --fetch-source https://restcountries.com/v3.1/all

# Testing
- In tests/unit/main.test.js:
  - Unit tests for fetchSource:
    - Stub global.fetch to return a mock Response object with sample JSON.
    - Assert fetchSource resolves to the expected object.
  - CLI integration tests for main:
    - Valid URL scenario: spy on console.log and process.exit; simulate main(["--fetch-source", validUrl]); assert correct JSON output and exit code 0.
    - Invalid URL scenario: spy on console.error and process.exit; simulate main(["--fetch-source", invalidUrl]); assert error message and exit code 1.

# Documentation
- Update README.md:
  - Under **Features**, add a **Fetch Source** section describing the new flag and API.
  - Under **Usage**, include an example invocation and sample output.
- Create docs/FETCH_SOURCE.md mirroring the README guidance with full details.