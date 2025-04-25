# Transform JSON to OWL

## Overview
Add a CLI option to convert raw JSON data into an OWL ontology represented as JSON-LD. This feature enables users to input a JSON file produced by the fetch command or any compatible JSON source and generate an OWL ontology for downstream use and inspection.

## Functionality
- Extend src/lib/main.js to recognize a --build-intermediate flag followed by an input filename or default to reading JSON from stdin.
- Parse the JSON input and generate a JSON-LD document with:
  - A @context defining common OWL terms (rdf, rdfs, owl, xsd).
  - A @graph array where each element represents an individual:
    - Use a configurable base IRI plus the object id or array index to form the @id of each individual.
    - Map each property of the JSON object to a data property in the individual.
- Support an optional --out <filename> argument to write the JSON-LD output to a file instead of stdout.
- Validate that the input is valid JSON and emit an error with a non-zero exit code on parse failure.

## Usage
- node src/lib/main.js --build-intermediate data.json
- cat data.json | node src/lib/main.js --build-intermediate
- node src/lib/main.js --build-intermediate data.json --out ontology.json

## Testing
- Add unit tests in tests/unit/main.test.js to:
  - Supply a sample JSON array and verify the generated @context and @graph structure.
  - Test file input and stdin input modes.
  - Simulate invalid JSON input and confirm error handling.

## Documentation
- Update README.md to describe the new --build-intermediate flag, its parameters, and example commands.