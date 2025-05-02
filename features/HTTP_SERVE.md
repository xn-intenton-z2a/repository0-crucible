# Overview
Add a serve subcommand that launches an HTTP server exposing the core CLI capabilities over REST endpoints. This enables programmatic access to conversion, listing, retrieval, and filtering of OWL ontologies without invoking the CLI directly.

# Implementation
1. Subcommand Detection
   - In src/lib/main.js, detect when first argument equals serve and shift it off the args list.
   - Parse optional flags port (number, default 3000) and host (string, default 0.0.0.0) using the existing Zod schema approach.

2. HTTP Server Setup
   - Use createServer from node:http to listen on the given host and port.
   - Log startup info to stdout: server listening host:port.

3. REST API Endpoints
   - GET /diagnostics
     Returns JSON diagnostics identical to --diagnostics mode with status 200.
   - POST /convert
     Accept JSON body with data (object), ontologyIri (string, required), baseIri (string, optional).
     Call generateOntology and return serialized JSON-LD with status 200.
   - POST /list-terms
     Accept JSON body with ontology (JSON-LD document).
     Validate ontology["@graph"] is array, return array of @id strings with status 200.
   - POST /get-term
     Accept JSON body with ontology (JSON-LD), term (string).
     Find node by local name after #; if found return node object with status 200, else status 404 with error JSON.
   - POST /filter
     Accept JSON body with ontology (JSON-LD), property (string), value (string).
     Validate @graph, filter nodes where node[property] equals value, return array with status 200.

4. Error Handling
   - For JSON parse errors or missing body fields respond 400 with { error: message }.
   - For internal exceptions respond 500 with { error: message }.

# Testing
- Add tests in tests/unit/http-serve.test.js covering:
  • Server startup returns 200 on GET /diagnostics with correct JSON.
  • POST /convert returns expected ontology for sample data.
  • POST /list-terms, /get-term, /filter with success and error scenarios (missing fields, invalid ontology, term not found).
  • Invalid JSON bodies produce 400 and correct error responses.

# Documentation
- Update README.md under HTTP API section describing the serve command, flags, endpoint summary, and example HTTP requests and responses.
- Append to docs/USAGE.md a section for HTTP endpoints matching the API design above with curl examples.
