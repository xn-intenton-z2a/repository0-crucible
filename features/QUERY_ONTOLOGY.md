# Overview
Add a CLI option to execute SPARQL queries against an OWL ontology represented as JSON-LD. This feature allows users to load an existing JSON-LD ontology, submit a SPARQL query, and receive structured query results in JSON format.

# Functionality
- Introduce a new dependency on @comunica/actor-init-sparql to provide a SPARQL query engine for RDF data.
- Extend src/lib/main.js to recognize a --query flag followed by a SPARQL query file path and an optional --input flag for the ontology JSON-LD file (defaulting to stdin).
- Use the jsonld API to expand and convert the JSON-LD ontology into RDF triples via jsonld.toRDF.
- Initialize a Comunica SPARQL engine with the RDF dataset and execute the provided query.
- Stream query results as JSON to stdout or to a file when --out <filename> is specified.
- On query parsing errors, invalid input, or execution failures, display a clear error message and exit with a non-zero status code.

# Usage
- node src/lib/main.js --query myQuery.sparql --input ontology.json
- cat ontology.json | node src/lib/main.js --query myQuery.sparql --out results.json
- node src/lib/main.js --query "SELECT ?s WHERE {?s a <http://www.w3.org/2002/07/owl#Class>}"

# Testing
- Write unit tests in tests/unit/main.test.js to mock jsonld.toRDF and a dummy Comunica engine:
  - Supply a sample JSON-LD ontology and a simple SPARQL query, verify correct result JSON is emitted.
  - Simulate parse errors in the SPARQL query and ensure proper error handling and exit code.
  - Test file input, stdin input, and --out file output modes.

# Documentation
- Update README.md under Features and Usage to describe the new --query flag, dependency installation, example commands, and expected JSON output.