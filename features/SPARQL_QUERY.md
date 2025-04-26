# Overview
Add a --query flag to execute SPARQL queries against an OWL ontology represented in JSON-LD. This feature enables users to load a JSON-LD ontology, convert it to RDF triples, run SELECT and ASK queries, and output results as JSON or boolean values.

# Functionality
- Recognize a --query <sparqlString> flag and an optional --file <filename> argument in src/lib/main.js. Default to reading JSON-LD ontology from stdin when --file is omitted.
- Extend dependencies in package.json to include:
  - n3 for RDF triple store and parsing
  - sparqljs for parsing SPARQL queries
- On invocation:
  - Load and parse the JSON-LD ontology from the specified file or stdin
  - Use jsonld.toRDF to convert JSON-LD to N-Quads
  - Load resulting triples into a new N3.Store
  - Use sparqljs to parse the SPARQL query string
  - Execute SELECT queries by iterating over matching patterns in the store
  - For SELECT: output JSON array of result bindings
  - For ASK: output 'true' or 'false'
  - Exit with code zero on success, non-zero on parse or execution errors

# Usage
node src/lib/main.js --query "SELECT ?s ?p ?o WHERE { ?s ?p ?o }" --file ontology.jsonld
cat ontology.jsonld | node src/lib/main.js --query "ASK WHERE { <http://example.org/resource/1> ?p ?o }"

# Testing
- Add unit tests in tests/unit/main.test.js
  - Mock jsonld.toRDF to return sample N-Quads
  - Create an N3.Store with sample triples
  - Test SELECT queries return correct binding arrays
  - Test ASK queries evaluate to true or false
  - Simulate invalid SPARQL syntax and verify error exit code

# Documentation
- Update README.md under Features to document the --query flag with description, argument details, file input behavior, and example commands
- Expand docs/USAGE.md to include a subsection on executing SPARQL queries and sample output