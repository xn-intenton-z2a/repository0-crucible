# Fetch Source

## Overview
Add a CLI option to fetch remote JSON data from configured open public data sources. This feature enables users to retrieve data from known API endpoints and output it as raw JSON for downstream transformation into OWL ontologies.

## Functionality
- Introduce a SOURCES constant in src/lib/main.js mapping source keys to URLs (e.g., 'capitalCities': 'https://restcountries.com/v3.1/all').
- Implement a --fetch <sourceKey> CLI flag that:
  - Validates the provided sourceKey exists in SOURCES.
  - Uses the built-in fetch API to retrieve JSON data.
  - Writes the fetched data to stdout or to a file when --out <filename> is specified.
  - Displays an error message and non-zero exit code if fetch fails or sourceKey is invalid.

## Usage
- node src/lib/main.js --fetch capitalCities
- node src/lib/main.js --fetch capitalCities --out data.json
- Add help text in README under Features and Usage sections.

## Testing
- Write unit tests in tests/unit/main.test.js to mock global.fetch:
  - Verify that providing a valid sourceKey invokes fetch with the correct URL.
  - Simulate a successful response and ensure output is correct.
  - Simulate a fetch error and verify that main exits with an error.

## Documentation
- Update README.md to list the new --fetch flag, example commands, and expected output.
- Add a Usage subsection describing the sourceKey list and output options.
