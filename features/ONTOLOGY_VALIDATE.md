# Ontology Validation

## Overview
CLI feature to validate a JSON-LD OWL ontology by checking its structure and context compliance using the jsonld library.

## Functionality

- Add jsonld as a dependency in package.json.
- Extend src/lib/main.js to recognize a --validate flag followed by an optional file path; default to stdin when no path is provided.
- Load the JSON-LD document from the specified file or from stdin.
- Invoke jsonld.expand with processingMode set to json-ld-1.1 to detect syntax and context errors.
- Optionally perform jsonld.flatten to ensure term definitions and graph structure are valid.
- On success, output a confirmation message or a JSON object summarizing that the ontology is valid and exit with code zero.
- On validation failure, capture and display detailed error information and exit with a non-zero status code.

## Usage

node src/lib/main.js --validate ontology.json
# or read from stdin
cat ontology.json | node src/lib/main.js --validate

## Testing

- Write unit tests in tests/unit/main.test.js mocking jsonld.expand and jsonld.flatten:
  - Simulate a valid JSON-LD document and assert exit code zero with expected output.
  - Simulate expansion errors and verify proper error handling and non-zero exit code.
  - Test both file input and stdin input paths.

## Documentation

- Update README.md under Features and Usage to document the new --validate option, include installation instructions for the jsonld dependency, and add usage examples.