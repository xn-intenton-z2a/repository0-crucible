# Overview
Add an HTTP API server mode to expose π calculation endpoints over RESTful HTTP. This allows programmatic clients to request π digits and performance metrics without using the CLI.

# Endpoints

GET /pi
  Query parameters:
    digits: positive integer of digits after the decimal point to compute
    algorithm: one of chudnovsky, bbp, gauss-legendre, leibniz
  Response (application/json):
    {
      digits: string of π to the requested precision,
      algorithm: chosen algorithm name,
      durationMs: execution time in milliseconds,
      peakMemoryBytes: highest memory usage during computation
    }

POST /pi
  Body (application/json):
    {
      digits: positive integer,
      algorithm: string
    }
  Response: same as GET /pi

# Implementation Details

- Update src/lib/main.js:
  - Parse a --serve flag to start the HTTP server instead of the CLI.
  - When --serve is provided, initialize an Express server listening on a configurable port (default 3000).
  - Mount the GET and POST /pi endpoints that delegate to the existing calculate logic.
- Add express to dependencies in package.json.
- Extend tests in tests/unit/main.test.js and add HTTP integration tests to verify endpoints return correct status codes and JSON structure. Use a temporary server instance and HTTP client (for example node-fetch).
- Update README.md:
  - Document HTTP API usage examples for both GET and POST.
  - Show sample curl commands and sample JSON responses.
