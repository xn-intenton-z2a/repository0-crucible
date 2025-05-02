# Overview

This feature implements the capital-cities command to fetch world capital data from a free public API and output it as an OWL ontology in JSON format. It enables users to generate a JSON file representing an OWL ontology of capital cities with basic metadata and type information.

# Source File Changes (src/lib/main.js)

1. Add import of fetch from node-fetch.
2. Register a new commander command named capital-cities with a descriptive summary.
3. In the action handler perform an HTTP GET to https://restcountries.com/v3.1/all.
4. Extract each country’s capital array and construct an OWL JSON structure with keys:
   - @context: standard OWL JSON context metadata.
   - ontology: object containing:
     - individuals: array of objects each representing a CapitalCity instance with properties id, name, country.
     - classes: object defining CapitalCity as an rdfs:Class.
5. Serialize the OWL JSON structure and output to stdout.
6. Catch and log fetch or parsing errors, and exit with a nonzero code on failure.

# Tests (tests/unit/main.test.js)

1. Mock the fetch function to return a small sample array of country objects with capital fields.
2. Simulate CLI invocation of node src/lib/main.js capital-cities.
3. Capture stdout, parse the output as JSON, and verify that:
   - The @context key is present.
   - The ontology.individuals array contains entries matching the mock capitals.
   - The classes object defines CapitalCity correctly.
4. Test error handling path by mocking fetch to reject and asserting that main exits without uncaught exceptions.

# Documentation (README.md)

1. Add a Features entry for the capital-cities command with a brief description.
2. Provide a usage example:
   node src/lib/main.js capital-cities
3. Note that the command produces an OWL ontology in JSON format of world capitals.

# Dependencies (package.json)

1. Add node-fetch as a dependency for HTTP requests to the public API.