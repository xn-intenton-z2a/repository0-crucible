# Summary
Add a new CLI flag "--fetch-source" and a programmatic API function fetchSource(url) to retrieve live JSON data from supported public data sources. This enables users to fetch data without writing custom HTTP logic.

# Functional Requirements
- In src/lib/main.js:
  - Export an asynchronous function fetchSource(url) that:
    - Validates that url appears in the list returned by getSupportedDataSources().
    - If not supported, throws an error with message Unsupported data source: <url>.
    - Uses the global fetch API to fetch JSON and returns the parsed result.
  - Extend the main(args) entry point to detect the flag "--fetch-source" followed by a URL argument:
    - If the URL argument is missing or begins with a dash, print an error to stderr and exit with code 1.
    - If the URL is not in supported data sources, print an error and exit with code 1.
    - Otherwise, call fetchSource(url):
      - On success, print the JSON as a formatted string to stdout and exit with code 0.
      - On fetch or parse error, catch the error, print the error message to stderr and exit with code 1.
- Preserve existing behavior for the --list-sources flag and default CLI output.

# API
The function fetchSource(url) returns a promise that resolves to the fetched JSON object or rejects with an error if the URL is unsupported or the request fails.

# CLI Usage
Users can run the tool with the fetch flag to retrieve live data, for example:
  npm run start -- --fetch-source https://restcountries.com/v3.1/all
This prints the JSON response from the given source URL.

# Testing
- Add unit tests in tests/unit/main.test.js for fetchSource:
  - Stub global.fetch to return a mock response that resolves with a sample JSON object and assert fetchSource resolves to that object.
  - Assert that fetchSource rejects with the correct error message for an unsupported URL.
- Add CLI integration tests:
  - Simulate calling main(["--fetch-source", validUrl]) and spy on console.log and process.exit to assert the JSON output and exit code 0.
  - Simulate calling main(["--fetch-source"]) (missing URL) and main(["--fetch-source", invalidUrl]) to assert the correct error messages and exit code 1.

# Documentation
- Update README.md under the Features section to describe the fetch-source flag and the fetchSource API.
- Add example invocations and sample output for the fetch-source command.
- Create a docs/FETCH_SOURCE.md file with full API reference, detailed usage examples, and test guidance.