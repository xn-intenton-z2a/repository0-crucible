# Description
Implement CLI and HTTP support for executing SPARQL SELECT queries against OWL JSON-LD artifacts using the existing queryOntologies API. This feature enables users to run arbitrary SPARQL queries on saved ontologies and retrieve results in standard SPARQL JSON format.

# Implementation

1. CLI Support
   - In main(args), detect `--query` or `-q` flag.
   - Expect two positional arguments following the flag: `<filePath>` and `<sparqlQuery>`.
   - If either argument is missing, output an error via `console.error('Usage: --query <filePath> "<SPARQL query>"')` and return without throwing.
   - Call `await queryOntologies(filePath, sparqlQuery)`.
   - On success, output results with `console.log(JSON.stringify(results, null, 2))` and return.
   - On error, catch and output `console.error(err.message)`.

2. HTTP Support (under `--serve` mode)
   - In HTTP server request handler, add route for `GET /query`.
   - Parse URL query parameters:
     • `file` for the JSON-LD file path (required)
     • `sparql` for the SPARQL query string (required)
   - If missing `file` or `sparql`, respond with status `400`, header `Content-Type: text/plain`, body `Missing required query parameters: file and sparql`.
   - Otherwise, invoke `await queryOntologies(file, sparql)`.
   - On success, respond with status `200`, header `Content-Type: application/json`, and body `JSON.stringify(results, null, 2)`.
   - On error, respond with status `500`, header `Content-Type: text/plain`, and body `err.message`.

# CLI Usage

To execute a SPARQL query on a JSON-LD ontology file:

node src/lib/main.js --query ontologies/enhanced-ontology.json "SELECT ?s WHERE { ?s a <http://www.w3.org/2002/07/owl#Class> }"

Or using shorthand:

node src/lib/main.js -q ontologies/enhanced-ontology.json "SELECT ?s ?p ?o WHERE { ?s ?p ?o }"

# HTTP Usage

When running the server with `--serve`, request:

GET /query?file=ontologies/enhanced-ontology.json&sparql=SELECT%20?s%20?p%20?o%20WHERE%20{%20?s%20?p%20?o%20}

Response:
- Status: 200
- Content-Type: application/json
- Body: SPARQL JSON Results with `head.vars` and `results.bindings`.

# Testing

- **Unit tests (tests/unit/main.query.test.js):**
  • Mock `console.log`, `console.error`, and `queryOntologies`.
  • Verify CLI invocation with valid args calls `queryOntologies` and logs JSON.
  • Verify missing args emit usage error without throwing.
  • Simulate `queryOntologies` throwing an error and verify `console.error` prints the message.

- **HTTP integration tests (tests/unit/main.serve.query.test.js):**
  • Start server via `main(['--serve'])` on an ephemeral port.
  • Request `/query` without parameters: expect 400, `text/plain` and usage error.
  • Request `/query?file=invalid.json&sparql=...`: if file missing, expect 500 with error message.
  • Create a sample ontology file, request `/query?file=<path>&sparql=SELECT...`, expect 200, `application/json`, and valid SPARQL JSON results.

# Documentation Updates

- Update `docs/FEATURES.md` and `docs/USAGE.md` to include the `--query` CLI option and the HTTP `/query` endpoint with usage examples and sample result.
- Update `README.md` under Features and Usage to describe SPARQL query support and provide example invocations.