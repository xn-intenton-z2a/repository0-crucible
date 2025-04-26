# Ontology Toolkit

## Overview
This feature unifies ontology validation and SPARQL querying capabilities into a single comprehensive toolkit. Users can validate JSON-LD OWL ontologies and execute SPARQL queries against them through the CLI, enabling inspection and data extraction in one cohesive workflow.

## Functionality

### Validation

- Recognize a --validate flag followed by an optional file path; default to stdin when no path is provided.
- Load the JSON-LD document using the jsonld library.
- Invoke jsonld.expand with processingMode set to json-ld-1.1 to detect syntax and context errors.
- Optionally perform jsonld.flatten to verify term definitions and graph structure.
- On success, output a summary JSON object { valid: true, triples: <number> } to stdout and exit with status code zero.
- On failure, display detailed error information and exit with a non-zero status code.

### SPARQL Query

- Recognize a --query flag followed by a SPARQL query file path or inline query string.
- Accept an optional --input flag for the ontology JSON-LD file (defaulting to stdin) and an optional --out flag for results (defaulting to stdout).
- Use jsonld.expand to convert the JSON-LD ontology into RDF triples via jsonld.toRDF.
- Instantiate a Comunica SPARQL engine (@comunica/actor-init-sparql) with the RDF dataset.
- Execute the provided SPARQL query and stream the results as JSON.
- On query parsing or execution errors, display clear error messages and exit with a non-zero status code.

## Usage

- Validate a file:
  node src/lib/main.js --validate ontology.json
  cat ontology.json | node src/lib/main.js --validate

- Execute a SPARQL query:
  node src/lib/main.js --query query.sparql --input ontology.json
  cat ontology.json | node src/lib/main.js --query "SELECT ?s WHERE {?s a <http://www.w3.org/2002/07/owl#Class>}" --out results.json

## Testing

- Add unit tests in tests/unit/main.test.js mocking jsonld.expand, jsonld.flatten, jsonld.toRDF, and a dummy Comunica engine:
  - Simulate a valid JSON-LD document and assert exit code zero with expected validation summary.
  - Simulate expansion errors for validation and verify error handling.
  - Supply sample ontology and a simple SPARQL query, verify correct result JSON is emitted.
  - Simulate SPARQL parse errors and ensure proper error handling.
  - Test file input, stdin input, and --out file output modes.

## Documentation

- Add dependencies jsonld and @comunica/actor-init-sparql in package.json.
- Update README.md under Features and Usage to document --validate and --query flags, dependency installation, example commands, and expected output.