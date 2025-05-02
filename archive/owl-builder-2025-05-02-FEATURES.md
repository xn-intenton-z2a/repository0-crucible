features/CLI_COMMANDS.md
# features/CLI_COMMANDS.md
# Overview

This feature consolidates the existing CLI parser and capital-cities command into a unified command-line interface using commander.js. It introduces an in-code mapping of data sources and implements two core commands: list-sources and capital-cities, delivering immediate value to users by enabling discovery of available data sources and generation of an OWL ontology for world capitals.

# Source File Changes (src/lib/main.js)

1. Import dependencies:
   - import { program } from 'commander'
   - import fetch from 'node-fetch'
2. Define a constant DATA_SOURCES as an object mapping source names to their URLs (e.g., restcountries: "https://restcountries.com/v3.1/all").
3. Configure program metadata: name, description, version (sync with package.json).
4. Define command list-sources:
   - Description: List available public data sources and their endpoints.
   - Action: Print DATA_SOURCES as a JSON object to stdout.
5. Define command capital-cities:
   - Description: Fetch world capital data and output an OWL ontology in JSON format.
   - Action handler:
     a. Perform HTTP GET to the restcountries endpoint from DATA_SOURCES.
     b. Extract each country’s capital array and build an OWL JSON structure:
        - @context: standard OWL JSON context metadata.
        - ontology:
          - individuals: array of CapitalCity instances with id, name, country.
          - classes: define CapitalCity as an rdfs:Class.
     c. Serialize the structure and output to stdout.
     d. Catch and log errors, exiting with a nonzero code.
6. Invoke program.parseAsync() to handle CLI input and async actions.

# Tests (tests/unit/main.test.js)

1. Add a test suite for list-sources:
   - Simulate invocation of node src/lib/main.js list-sources.
   - Capture stdout, parse as JSON, and assert keys match DATA_SOURCES.
2. Enhance the existing capital-cities tests:
   - Mock fetch to return a sample array of countries with capitals.
   - Simulate CLI invocation of node src/lib/main.js capital-cities.
   - Capture stdout, parse JSON, verify @context, individuals array entries, and classes definition.
   - Mock fetch rejection to assert error is caught and process exits gracefully.
3. Retain the Main Module Import test.

# Documentation (README.md)

1. Update the Features section to describe two commands:
   - list-sources: list public data sources and endpoints.
   - capital-cities: generate an OWL ontology of world capitals in JSON.
2. Add usage examples:
   ```bash
   node src/lib/main.js list-sources
   node src/lib/main.js capital-cities
   ```
3. Note output formats and error behavior.

# Dependencies (package.json)

1. Add commander to dependencies for CLI parsing.
2. Add node-fetch to dependencies for HTTP requests.
