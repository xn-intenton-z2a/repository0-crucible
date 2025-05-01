# Core JSON-LD and Ontology Processing

# Dependencies
- Add jsonld to dependencies in package.json

# Library API
- Export function compact(document, context) returning a promise that resolves to a compacted JSON-LD document
- Export function expand(document) returning a promise that resolves to an expanded JSON-LD document
- Export function generateOntology(data, options) returning a promise that resolves to a JSON-LD OWL ontology document with @context including OWL and RDF prefixes, @id set to the provided ontology IRI, and @graph containing converted data nodes

# CLI Enhancements
- Support flags:
  - --compact to compact JSON-LD input
  - --expand to expand JSON-LD input
  - --context <path> to supply a JSON-LD context file for compacting
  - --to-owl <outputPath> to generate an OWL ontology JSON-LD and write to the specified path or stdout
  - --ontology-base <IRI> to supply a base IRI for the generated ontology
- Read JSON input from stdin or a file argument
- Write JSON-LD output to stdout or the specified output path
- Update help text to list new flags and usage examples

# Tests
- Add unit tests for compact, expand, and generateOntology functions using examples from JSON_LD_SYNTAX.md
- Add CLI tests to verify each flag invokes the correct library API without errors and produces valid JSON-LD output

# Documentation
- Update README Features section to describe Core JSON-LD and Ontology Processing
- Provide usage examples for both library API and CLI commands:
  - cat input.json | node src/lib/main.js --compact --context context.json
  - cat input.json | node src/lib/main.js --expand
  - cat data.json | node src/lib/main.js --to-owl --ontology-base http://example.org/ontology