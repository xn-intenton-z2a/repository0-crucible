# Overview

Extend the existing HTTP server mode to include a dedicated benchmarking endpoint. Clients can now request performance measurements of π calculation algorithms via HTTP and receive structured JSON results alongside the existing /pi endpoint and Swagger UI documentation.

# HTTP Server Mode

- Retain --serve flag to start the server and --port to configure its listening port (default 3000).
- Server continues to serve /pi and static documentation under /openapi.json and /docs.

# Endpoints

## GET /pi

Query parameters:
  digits (required): integer between 1 and 10000
  method (optional): chudnovsky, gauss-legendre, machin, nilakantha; default chudnovsky
  format (optional): text or png; default text

Responses:
  200 text/plain for format=text with body containing the π digits string
  200 image/png for format=png with body containing a PNG rendering of the π digits
  400 application/json for invalid or missing parameters with payload { error: string }

## GET /benchmark

Query parameters:
  digits (required): integer between 1 and 10000
  methods (optional): comma-separated list of algorithm names; default all methods
  runs (optional): integer ≥1; default 3

Responses:
  200 application/json with body JSON array of BenchmarkResult objects:
    [ { method, runs, averageTimeMs, minTimeMs, maxTimeMs }, ... ]
  400 application/json for invalid parameters with payload { error: string }

# Swagger UI Documentation

- Serve a unified OpenAPI 3.0 specification at GET /openapi.json, now including /benchmark path definitions, parameter schemas, and response schemas.
- Serve interactive UI at GET /docs using swagger-ui-dist assets pointing to the updated /openapi.json spec.

# Implementation Details

1. In src/lib/main.js, after defining the /pi route, add a route handler for /benchmark that:
   - Reads and validates query parameters digits, methods, and runs.
   - Splits methods by comma into an array, validates each method.
   - Calls benchmarkPi(digits, runs, methodsArray) and returns JSON response.
2. In the OpenAPI spec builder (in main.js or separate module), append /benchmark path with appropriate parameters and responses.
3. No additional dependencies required beyond existing swagger-ui-dist and decimal.js.

# Testing

- Unit tests in tests/unit/http.docs.test.js:
  * Verify /openapi.json includes /benchmark definition under paths.
  * Mock HTTP server GET /benchmark?digits=10&methods=machin,nilakantha&runs=2 and assert correct JSON schema structure.
- End-to-end tests in tests/e2e/http.docs.test.js:
  * Launch server on a random port.
  * Perform GET /benchmark with valid and invalid parameters.
  * Validate HTTP status codes, content-types, and JSON body values for runs, averageTimeMs, minTimeMs, maxTimeMs.

# Documentation

- Update README.md under Features to include “HTTP benchmarking endpoint” with example usage:
    node src/lib/main.js --serve --port 3000 and navigate to GET /benchmark?digits=100&methods=chudnovsky&runs=5
- Update docs/USAGE.md to document /benchmark endpoint parameters, sample requests, and sample JSON responses.