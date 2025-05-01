# Core OWL Ontology Generation

This feature provides the fundamental library API and command-line interface for generating OWL ontologies in JSON-LD format from arbitrary JSON data, and adds powerful query capabilities to filter and extract ontology nodes based on expressions.

# Library API

- Export function generateOntology(data, options)
  - data: object whose keys are term names and values are term property objects
  - options: object with required property ontologyIri (string) and optional baseIri (string)
  - Returns: Promise resolving to a JSON-LD document with @context containing owl and rdf prefixes and optional @base, @id set to the ontology IRI, and @graph containing term nodes
  - Throws an error when options.ontologyIri is missing

- Export function queryOntology(ontology, expression)
  - ontology: JSON-LD document as produced by generateOntology or loaded from file
  - expression: string using ESJ-like syntax for filtering, for example type=Person and name=Alice
  - Returns: Promise resolving to an array of nodes from the ontology @graph that match the expression, supporting equality and logical and/or operators
  - Throws an error for invalid syntax or when ontology has no @graph

# CLI Interface

- Support flags:
  --help                  Show help text describing usage and available flags
  --to-owl <IRI>          Read JSON from stdin or file argument, parse as data, and output JSON-LD OWL ontology to stdout
  --ontology-base <IRI>   Include @base in the JSON-LD @context
  --query <expression>    Read an OWL JSON-LD document from stdin or file, apply queryOntology with the expression, and output matching nodes as JSON

- Behavior:
  - Read input from stdin or a file path argument
  - If --to-owl is provided, parse input JSON into data and invoke generateOntology
  - If --query is provided, parse input JSON-LD into an object and invoke queryOntology
  - Serialize and print resulting JSON with indentation
  - On parse, missing option, or query errors, print descriptive error messages

# Tests

- Unit tests for generateOntology covering existing scenarios
- Unit tests for queryOntology covering simple equality, logical combinations, and syntax errors
- CLI tests for:
  - Help output includes --query flag
  - Invocation of --query with valid ontology and expression prints expected filtered nodes
  - Error handling when query syntax is invalid or input is not a JSON-LD ontology

# Documentation

- Update README Features section to describe query capabilities and new CLI flag --query
- Provide examples without code fences:
  cat ontology.json | node src/lib/main.js --query type=Person and name=Alice > result.json
  node src/lib/main.js --help