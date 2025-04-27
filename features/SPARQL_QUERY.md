# Description
Add support for executing SPARQL SELECT queries against OWL JSON-LD artifacts from both CLI and HTTP server endpoints. Enables users to query any saved ontology document with arbitrary SPARQL and receive standard SPARQL JSON results.

# Implementation
1. CLI Support
   - In main(args), detect `--query` or `-q` flag followed by two arguments: `<filePath>` and `<sparqlQuery>`.
   - If either argument is missing, output an error via console.error with message Missing required arguments: filePath and sparqlQuery and return without throwing.
   - Call `await queryOntologies(filePath, sparqlQuery)` and on success console.log(JSON.stringify(results, null, 2)).
   - On error, catch and console.error(err.message).

2. HTTP Server Support (under `--serve`)
   - Add route for GET `/query` in the HTTP request handler.
   - Parse URL query parameters:
     • `file` for the JSON-LD file path (required)
     • `sparql` for the SPARQL query string (required)
   - If either is missing, respond with status 400 and Content-Type text/plain and body Missing required query parameters: file and sparql.
   - Otherwise, call `await queryOntologies(file, sparql)`.
     • On success respond 200 with Content-Type application/json and body JSON.stringify(results, null, 2).
     • On error respond 500 with Content-Type text/plain and body err.message.

# Testing
- **Unit tests for CLI**: verify that `main(["--query","path","SELECT..."])` calls queryOntologies and logs JSON output, missing args logs error, thrown errors are caught and logged.
- **HTTP integration tests**: start server via `main(["--serve"])`, send GET `/query?file=<path>&sparql=<encoded>` and verify 200, header application/json, body matches SPARQL JSON results; test missing params returns 400 with plain-text error; test queryOntologies exception returns 500 and error message.

# Documentation Updates
- Update docs/FEATURES.md and docs/USAGE.md to include the `--query` CLI option and HTTP `/query` endpoint with usage examples and sample output.
- Update README.md under Features and Usage sections to describe SPARQL query support and provide example invocations.