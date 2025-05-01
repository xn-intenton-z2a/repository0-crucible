# Overview

Add capabilities to define and fetch from public data sources. Provide constants for known open public APIs, allow users to list available sources, and retrieve JSON data for transformation into OWL ontologies.

# Library API

- Export function listSources()
  - Returns a promise that resolves to an array of source names defined in a new file src/lib/sources.js

- Export function fetchSource(sourceName, options)
  - Reads API endpoint and credentials from src/lib/sources.js and environment variables
  - Performs HTTP GET requests to fetch JSON data
  - Returns a promise resolving to the fetched JSON or rejects with a descriptive error
  - Options:
    - outputPath (string): path to save the raw JSON; if omitted, data is returned only

# CLI Enhancements

- Support flags:
  - --list-sources to list all configured data sources
  - --fetch <sourceName> [--output <path>] to fetch data for given source and write to path or stdout
  - --config <path> to supply a custom sources configuration file

- HTTP requests use global fetch with retries on network errors

# Tests

- Add unit tests for listSources to confirm correct source names from src/lib/sources.js
- Add tests for fetchSource to simulate successful fetch, missing source, and network error scenarios
- Add CLI tests to verify flags invoke correct API calls, handle output file creation, and error messages

# Documentation

- Update README Features section with Data Source Crawler details and usage examples:
  - node src/lib/main.js --list-sources
  - node src/lib/main.js --fetch wikidata --output data.json
  - node src/lib/main.js --fetch capitals

- Describe environment variables required for APIs (for example WIKIDATA_API_URL, WIKIDATA_TOKEN)