# Description
Provide unified SPARQL capabilities for querying ontology artifacts, including arbitrary queries and a preset capital-cities ontology generation, across CLI, programmatic API, and HTTP server modes.

# CLI Support
- Add flag `--query <file> <sparqlQuery>` (alias `-q`) to execute a SPARQL SELECT or ASK query on a local JSON-LD OWL artifact. On success output SPARQL JSON results via `console.log(JSON.stringify(..., null, 2))`; on missing arguments log an error and return without throwing; on engine or file errors log the error message.
- Add flag `--capital-cities` (alias `-cc`) to run a predefined SPARQL query against the default or specified endpoint and output an OWL-compatible JSON-LD document containing country and capital individuals with `@context` and `@graph`.

# Programmatic API
- Export `sparqlQuery(filePath: string, queryString: string): Promise<object>` that reads and parses the specified file, runs the query via Comunica `QueryEngine`, and returns standard SPARQL JSON for bindings or boolean results.
- Export `getCapitalCities(endpoint?: string): Promise<object>` that constructs and submits the fixed `SELECT ?country ?capital` query, parses the response, and returns a JSON-LD ontology document.

# HTTP Server Endpoints
- GET `/query?file=<file>&sparql=<query>` responds with status 200 and `application/json` body containing SPARQL JSON results; missing parameters return 400 plain-text error; query errors return 500 with error message.
- GET `/capital-cities` responds with status 200 and `application/json` containing the OWL JSON-LD capital cities document; fetch or parse errors return 500 plain-text error.

# Testing
- Unit tests for CLI handlers: missing args, successful query logging, error logging for both flags.
- Unit tests for `sparqlQuery` covering file read errors, JSON parse errors, SELECT results binding conversion, ASK boolean conversion, and error propagation.
- Unit tests for `getCapitalCities` covering successful fetch and JSON parsing, and error codes `QUERY_ERROR` and `INVALID_JSON` on failure.
- HTTP integration tests for `/query` and `/capital-cities` verifying status codes, content types, response bodies for success and error cases.

# Documentation Updates
- Update docs/FEATURES.md to merge entries for SPARQL query and capital-cities under a single SPARQL Queries feature, including CLI flags, HTTP endpoints, programmatic API signatures, example invocations, and sample outputs.