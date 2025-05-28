# Summary
Add a new CLI flag --fetch-source <url> and a programmatic API fetchSource(url) to retrieve live JSON data from supported public data sources.

# Functional Requirements
In src/lib/main.js
- Export an async function fetchSource(url string) that validates the url against getSupportedDataSources() and returns parsed JSON from fetch(url).
- Extend the main(args) entrypoint to detect the --fetch-source flag followed by a URL argument:
  - If the URL is missing or not supported, print an error to stderr and exit with code 1.
  - Otherwise, call fetchSource(url), print JSON.stringify(data, null, 2) to stdout, and exit with code 0.

# CLI Usage
npm run start -- --fetch-source https://restcountries.com/v3.1/all

# Testing
- Unit tests for fetchSource:
  - Mock global.fetch to return a sample JSON response and assert fetchSource resolves with the data.
  - Assert fetchSource rejects when given an unsupported URL.
- CLI integration tests:
  - Simulate main(["--fetch-source", validUrl]) and assert console.log was called with formatted JSON and process.exit(0).
  - Simulate missing or invalid URL scenarios and assert error output and exit code 1.

# Documentation
- Update README.md under Features to add a Fetch Source entry with a brief summary and CLI example.
- Create docs/FETCH_SOURCE.md that describes fetchSource(url) API, the --fetch-source flag, sample outputs, and error cases.