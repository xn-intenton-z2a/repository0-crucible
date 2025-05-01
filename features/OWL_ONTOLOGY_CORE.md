# Core JSON-LD and Ontology Processing

## Dependencies
- Add jsonld to dependencies in package.json
- Add @comunica/query-sparql to dependencies for SPARQL querying

## Library API
- Export function compact(document, context) returning a promise that resolves to a compacted JSON-LD document
- Export function expand(document) returning a promise that resolves to an expanded JSON-LD document
- Export function generateOntology(data, options) returning a promise that resolves to a JSON-LD OWL ontology document with @context including OWL and RDF prefixes, @id set to the provided ontology IRI, and @graph containing converted data nodes
- Export function queryOntology(ontologyDocument, sparqlQuery, options) returning a promise that resolves to a SPARQL result set in JSON format
- Export function esjQuery(ontologyDocument, expression) returning a promise that resolves to an array of matched JSON nodes for a simple dot-expression syntax

## CLI Enhancements
- Support flags:
  --compact to compact JSON-LD input
  --expand to expand JSON-LD input
  --context <path> to supply a JSON-LD context file for compacting
  --to-owl <outputPath> to generate an OWL ontology JSON-LD and write to the specified path or stdout
  --ontology-base <IRI> to supply a base IRI for the generated ontology
  --query <sparqlFile> to run a SPARQL query file against an OWL ontology JSON input
  --esj <expression> to run a dot-expression query against the ontology JSON
  --default-graph <IRI> to set the default graph IRI for query semantics
- Read JSON input from stdin or a file argument
- Write JSON output or query results to stdout or a specified output path
- Update help text to include new flags and usage examples

## Tests
- Add unit tests for compact, expand, generateOntology, queryOntology, and esjQuery functions using examples from JSON_LD_SYNTAX.md and SPARQL_PROTOCOL.md
- Add CLI tests to verify each flag invokes the correct library API without errors and produces valid JSON or SPARQL result output

## Documentation
- Update README Features section to describe Core JSON-LD and Ontology Processing and Querying OWL Ontologies
- Provide usage examples:
  cat input.json | node src/lib/main.js --compact --context context.json
  cat input.json | node src/lib/main.js --expand
  cat data.json | node src/lib/main.js --to-owl http://example.org/onto --ontology-base http://example.org/base > ontology.json
  cat ontology.json | node src/lib/main.js --query select.sparql > results.json
  cat ontology.json | node src/lib/main.js --esj Graph.term.property