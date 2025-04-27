# Description
Add support for executing SPARQL SELECT queries against OWL JSON-LD artifacts from both the CLI and the HTTP server. Users can submit arbitrary SPARQL queries against any saved ontology document and receive standard SPARQL JSON results.

# Implementation

## CLI Support
- In main(args), detect the --query or -q flag followed by two arguments: filePath and sparqlQuery.
- If filePath or sparqlQuery is missing, output an error via console.error with message Missing required arguments: filePath and sparqlQuery and return without throwing.
- On valid arguments, call await queryOntologies(filePath, sparqlQuery).
- On success, console.log(JSON.stringify(results, null, 2)).
- On error, catch and console.error(err.message).

## HTTP Server Support
- In the server request handler under --serve, add a GET /query route.
- Parse URL search parameters file and sparql from the incoming request URL.
- If either parameter is missing, respond with status 400, header Content-Type text/plain, and body Missing required query parameters: file and sparql.
- Otherwise call await queryOntologies(file, sparql).
- On success respond status 200 with header Content-Type application/json and body JSON.stringify(results, null, 2).
- On error respond status 500 with header Content-Type text/plain and body err.message.

# Testing
- Unit tests for CLI:
  • Verify that main(["--query","path","SELECT ..."]) calls queryOntologies and logs JSON output.
  • Verify missing args logs error and returns without throwing.
  • Verify thrown errors from queryOntologies are caught and logged.

- HTTP integration tests:
  • Start server via main(["--serve"]) on an ephemeral port.
  • Send GET /query?file=<path>&sparql=<encoded> and verify status 200, Content-Type application/json, and that the body matches expected SPARQL JSON results.
  • Send GET /query without parameters and verify status 400 with plain-text error.
  • Mock queryOntologies to throw and verify status 500 with error message.

# Documentation Updates
- Update docs/FEATURES.md to include the query option under Features, describing CLI and HTTP usage.
- Update docs/USAGE.md and README.md under Usage to document the --query flag and /query endpoint, with example invocations and sample output.