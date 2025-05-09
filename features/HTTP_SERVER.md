# Overview

Add HTTP server capabilities to the CLI tool, enabling clients to calculate π and run benchmarks over HTTP.

# HTTP Server Mode

Extend the CLI with a --serve flag and optional --port flag (default 3000) to run an HTTP server. When in server mode, all CLI flags relating to text or PNG output are ignored.

# Endpoints

## GET /pi

Query parameters:
  digits (required): integer between 1 and 10000
  method (optional): chudnovsky, gauss-legendre, machin, nilakantha; default chudnovsky
  format (optional): text or png; default text

Responses:
  200 text/plain for format=text; body contains π digits string
  200 image/png for format=png; body contains PNG rendering of π digits
  400 application/json for invalid parameters; body { error: string }

## GET /benchmark

Query parameters:
  digits (required): integer between 1 and 10000
  methods (optional): comma-separated list of methods; default all methods
  runs (optional): integer ≥1; default 3

Responses:
  200 application/json; JSON array of BenchmarkResult objects with keys method, runs, averageTimeMs, minTimeMs, maxTimeMs
  400 application/json for invalid parameters; body { error: string }

# Implementation Details

1. Add express and swagger-ui-express to dependencies.
2. In src/lib/main.js, detect --serve and --port flags. When serving, initialize an Express server listening on the port.
3. Define route handlers:
   - /pi: validate query, invoke calculatePi, send text or PNG response. Use pureimage to render PNG when format=png.
   - /benchmark: validate query, parse methods list, invoke benchmarkPi, send JSON response.
4. Build an OpenAPI 3.0 specification object in code that includes both endpoints, parameter and response schemas.
5. Serve the OpenAPI JSON at GET /openapi.json and host Swagger UI at GET /docs using swagger-ui-express.

# Testing

- Unit tests in tests/unit/http.docs.test.js to verify openapi.json includes /pi and /benchmark definitions.
- End-to-end tests in tests/e2e/http.server.test.js using supertest:
  * Start server on a random port.
  * Test GET /pi and GET /benchmark with valid and invalid parameters.
  * Assert HTTP status codes, content-types, and response bodies.

# Documentation

- Update README.md under Features to describe HTTP server mode and example curl invocations:
    curl "http://localhost:3000/pi?digits=100&method=chudnovsky"
    curl "http://localhost:3000/benchmark?digits=50&methods=machin,nilakantha&runs=2"
- Update docs/USAGE.md with an HTTP Server section including parameter descriptions, sample requests, and sample responses.