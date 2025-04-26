# Overview

Add a built-in HTTP server to expose core CLI capabilities through a RESTful API, enabling integration with other tools and services without calling the CLI directly.

# Functionality

- Recognize a --serve flag in src/lib/main.js with optional --port <number> defaulting to 3000
- On invocation start an HTTP server listening on the specified port
- Expose the following endpoints:
  - GET /help
    - Return JSON listing available API endpoints and descriptions
    - Include supported parameters and example usages
  - GET /sources
    - Return the SOURCES constant as a JSON object mapping sourceKey to URL
  - POST /refresh
    - Accept JSON body with keys:
      - sources: array of sourceKey identifiers
      - base: optional IRI or filename to merge into
    - Invoke existing refresh logic
    - Return merged JSON-LD ontology in response body
  - POST /merge-persist
    - Accept JSON body containing an array of JSON-LD documents or file paths (if provided)
    - Invoke merge logic on the supplied documents
    - Return combined JSON-LD ontology
  - POST /query
    - Accept JSON body with keys:
      - sparql: SPARQL query string
      - ontology: optional JSON-LD document to query; default to last refreshed ontology
    - Execute SELECT or ASK queries using jsonld.toRDF and N3.Store
    - Return JSON array of results for SELECT or boolean for ASK
- Handle errors per route with descriptive JSON error messages and appropriate HTTP status codes
- Gracefully shut down on SIGINT, closing the server

# Testing

- Add tests in tests/unit/main.test.js using an HTTP client (for example supertest or node http) to:
  - Start the server on an ephemeral port and verify each endpoint returns expected status codes and payloads
  - Simulate invalid input and confirm error responses and status codes
  - Mock underlying functions (refresh, merge, query) to control behavior and validate routing

# Documentation

- Update README.md under Features to include --serve flag and HTTP API details
- Extend docs/USAGE.md with a new section Service API showing endpoints, request and response examples