# Core OWL Ontology Generation

This feature provides the library API and command-line interface for generating OWL ontologies in JSON-LD format from JSON input.

# Library API

- Export function generateOntology(data, options)
  - data: object whose keys are term names and values are term property objects
  - options: object with required property ontologyIri and optional property baseIri
  - Returns a promise resolving to a JSON-LD document with
    - @context containing owl and rdf prefixes and @base when baseIri is provided
    - @id set to the ontology IRI
    - @graph containing one node per term, each with an @id constructed as ontologyIri#term and all supplied properties
  - Throws an error when options.ontologyIri is missing

- Default export is undefined

# CLI Interface

- Support flags
  --help                  Show usage information
  --to-owl <ontologyIri>  Read JSON from stdin, invoke generateOntology, and output JSON-LD OWL ontology to stdout
  --ontology-base <IRI>   Supply base IRI for the @context @base field

- Behavior
  - Read JSON input from stdin
  - Parse the input or report a parse error message
  - If --to-owl is provided, require a following ontology IRI and invoke generateOntology
  - On success, print the resulting JSON-LD document with two-space indentation
  - On missing option or error, write a descriptive message to stderr

# Tests

- Unit tests for generateOntology covering
  - Correct inclusion of owl and rdf prefixes
  - Construction of @id and @graph nodes
  - Inclusion of @base when baseIri is provided

- CLI tests covering
  - Main module imports cleanly and default export non-null
  - Running without flags terminates without error
  - --help flag prints usage including --to-owl description
  - Error handling when JSON parse fails or ontology IRI is missing

# Documentation

- Update README Features section to describe generateOntology and CLI flags --to-owl and --ontology-base
- Provide usage examples without code fences, for example:
  cat data.json | node src/lib/main.js --to-owl http://example.org/onto --ontology-base http://example.org/base
  node src/lib/main.js --help