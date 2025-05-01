# Core OWL Ontology Generation

This feature provides the fundamental library API and command-line interface for generating OWL ontologies in JSON-LD format from arbitrary JSON data.

# Library API

- Export function generateOntology(data, options)
  - data: object whose keys are term names and values are term property objects
  - options: object with required property ontologyIri (string) and optional baseIri (string)
  - Returns: Promise resolving to a JSON-LD document with @context containing owl and rdf prefixes and optional @base, @id set to the ontology IRI, and @graph containing term nodes
  - Throws an error when options.ontologyIri is missing

# CLI Interface

- Support flags:
  --help              Show help text describing usage and available flags
  --to-owl <IRI>      Read JSON from stdin or file argument, parse as data, and output JSON-LD OWL ontology to stdout
  --ontology-base <IRI>  Include @base in the JSON-LD @context

- Behavior:
  - Read JSON text from stdin or a file path argument
  - Parse input into an object or default to empty object
  - Invoke generateOntology with parsed data and provided IRI options
  - Serialize and print the resulting JSON-LD with indentation
  - On parse or missing option errors, print descriptive error messages

# Tests

- Unit tests for generateOntology covering:
  - Correct inclusion of owl and rdf prefixes
  - Proper @id and @graph entries for sample term data
  - Inclusion of @base when baseIri is provided
- CLI tests for:
  - Help output includes --to-owl and --ontology-base flags
  - Invocation without flags exits gracefully and prints help
  - Invocation of --to-owl with valid JSON input and valid IRI prints expected JSON-LD
  - Error handling when JSON parse fails or missing ontology IRI

# Documentation

- Update README Features section to describe OWL ontology generation capabilities
- Provide examples without code fences:
  cat data.json | node src/lib/main.js --to-owl http://example.org/onto --ontology-base http://example.org/base > ontology.json
  node src/lib/main.js --help
