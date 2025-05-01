# Core JSON-LD and Ontology Processing and Querying

# Dependencies
- Add jsonld to dependencies in package.json for JSON-LD operations
- Add @comunica/query-sparql to dependencies for SPARQL querying support

# Library API
- Export function compact(document, context)
  Returns a promise resolving to a compacted JSON-LD document based on the provided context
- Export function expand(document)
  Returns a promise resolving to an expanded JSON-LD document
- Export function generateOntology(data, options)
  Returns a promise resolving to a JSON-LD OWL ontology document with @context including OWL and RDF prefixes, @id set to the provided ontology IRI, @graph containing converted data nodes
- Export function queryOntology(ontologyDocument, sparqlQuery, options)
  Returns a promise resolving to SPARQL result set in JSON format; supports defaultGraph IRI and query bindings
- Export function esjQuery(ontologyDocument, expression)
  Returns a promise resolving to an array of matched JSON nodes for a simple dot expression syntax

# CLI Enhancements
- Support flags:
  --compact to read JSON from stdin or file and output compacted JSON-LD
  --expand to read JSON-LD input and output expanded form
  --context <path> to supply a JSON-LD context file for compacting
  --to-owl <ontologyIri> to generate an OWL ontology JSON-LD and write to stdout or a file
  --ontology-base <IRI> to include @base in context
  --query <sparqlFile> to run a SPARQL query file against an OWL ontology JSON input
  --esj <expression> to run a dot expression query against the ontology JSON
  --default-graph <IRI> to set the default graph IRI for SPARQL query semantics
- Read JSON input from stdin or a file argument
- Write JSON output or query results to stdout or a specified output path
- Update help text to include new flags and usage examples

# Tests
- Add unit tests for compact and expand using examples from JSON_LD_SYNTAX.md
- Add unit tests for queryOntology with SPARQL_PROTOCOL.md examples
- Add unit tests for esjQuery covering nested object access and filtering
- Add CLI tests to verify each flag invokes correct library API and produces valid JSON or SPARQL result output

# Documentation
- Update README Features section to describe Core JSON-LD and Ontology Processing and Querying OWL Ontologies
- Provide usage examples without code escapes:
  cat input.json | node src/lib/main.js --compact --context context.json
  cat input.json | node src/lib/main.js --expand
  cat data.json | node src/lib/main.js --to-owl http://example.org/onto --ontology-base http://example.org/base > ontology.json
  cat ontology.json | node src/lib/main.js --query select.sparql > results.json
  cat ontology.json | node src/lib/main.js --esj term.property