# Export Ontology in Multiple Formats

## Overview
Extend the CLI to support serialization of an existing OWL ontology in JSON-LD into alternative RDF formats. Users can convert ontologies to Turtle, N-Quads, or RDF/XML without writing custom scripts.

## Functionality
- Recognize an --export-format <format> flag in src/lib/main.js where <format> is one of jsonld | turtle | nquads | rdfxml
- Accept an optional --file <filename> argument to read the JSON-LD ontology from disk; default to stdin when omitted
- Use jsonld.toRDF to convert the JSON-LD document to N-Quads
- For output formats:
  - jsonld: write the original JSON-LD document or recompact via jsonld.compact before output
  - nquads: write raw N-Quads string
  - turtle: parse N-Quads into an N3.Store and serialize to Turtle via N3.Writer
  - rdfxml: parse N-Quads into an N3.Store and serialize to RDF/XML via an RDF/XML writer library or custom serializer
- Support an optional --out <filename> argument to write the result; default to stdout if omitted
- Emit descriptive error messages and exit with non-zero status for unrecognized formats, parse errors, or serialization failures

## Usage
- node src/lib/main.js --export-format turtle --file ontology.jsonld --out ontology.ttl
- cat ontology.jsonld | node src/lib/main.js --export-format nquads

## Testing
- Add unit tests in tests/unit/main.test.js mocking jsonld.toRDF and N3.Writer
  - Verify each format option produces expected output strings
  - Simulate reading from stdin and file paths
  - Test error on unsupported format strings
  - Confirm that --out writes to the correct file or defaults to stdout

## Documentation
- Update README.md under Features to list the --export-format flag, describe supported formats, parameters, and examples
- Extend docs/USAGE.md with a new section on Format Conversion showing commands and sample output