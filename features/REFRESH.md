# Refresh Ontology

## Overview
The CLI gains a --refresh flag that orchestrates fetching JSON data from configured public sources, converting it into an OWL ontology represented as JSON-LD, merging multiple ontologies, and persisting the final result.

## Functionality
- Introduce a --refresh option that accepts one or more sourceKey identifiers corresponding to entries in the SOURCES constant.
- For each sourceKey:
  - Validate existence in SOURCES.
  - Retrieve JSON data via the built-in fetch API.
  - Transform the JSON input into a JSON-LD document:
    - Define a standard @context with OWL, RDF, RDFS, and XSD IRIs.
    - Construct an @graph array where each element is an individual with an @id based on a configurable base IRI and the object id or array index.
    - Map object properties to data properties, assigning appropriate XSD datatypes for values.
- Normalize and flatten each generated JSON-LD fragment, merge all @graph arrays into a single ontology, and remove duplicate triples by structural comparison.
- Support an optional --base <filename> argument to read an existing ontology and merge into it before adding newly generated individuals.
- Support an optional --out <filename> argument to write the merged ontology to a file; default to stdout if omitted.
- Emit a clear error message and exit with a non-zero code on invalid sourceKey, fetch failures, JSON parse errors, or merge conflicts.

## Usage
- node src/lib/main.js --refresh capitalCities countries --base existing.json --out mergedOntology.json
- cat partialData.json | node src/lib/main.js --refresh capitalCities --out ontology.json

## Testing
- Write unit tests in tests/unit/main.test.js mocking global.fetch and jsonld APIs:
  - Verify fetch is invoked with correct URLs for each sourceKey.
  - Supply sample JSON arrays and assert generated @context and @graph structures.
  - Simulate duplicate records across sources and verify that duplicate triples are eliminated.
  - Test behavior with and without the --base and --out options, including stdout default.
  - Confirm error handling on invalid inputs and network failures.

## Documentation
- Update README.md under Features and Usage to document the --refresh flag, describe parameters, show example commands, and sample output.