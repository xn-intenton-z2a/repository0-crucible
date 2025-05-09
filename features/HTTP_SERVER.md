# HTTP Server Mode

Register HTTP API endpoints for π calculation and benchmarking using Express.

# Endpoints

## GET /pi
Query parameters:
  digits (required): integer between 1 and 10000
  method (optional): chudnovsky, gauss-legendre, machin, nilakantha; default chudnovsky
  format (optional): text or png; default text

Responses:
  200 text/plain for format=text; body contains π digits string
  200 image/png for format=png; body contains PNG rendering of π digits
  400 application/json for invalid parameters; body contains { error: string }

## GET /benchmark
Query parameters:
  digits (required): integer between 1 and 10000
  methods (optional): comma-separated list of methods; default all methods
  runs (optional): integer ≥1; default 3

Responses:
  200 application/json; array of BenchmarkResult objects with keys method, runs, averageTimeMs, minTimeMs, maxTimeMs
  400 application/json for invalid parameters; body contains { error: string }

## GET /openapi.json and /docs
Serve OpenAPI 3.0 JSON at /openapi.json and host Swagger UI at /docs.

# Implementation Details

1. Add express and swagger-ui-express to dependencies.
2. In src/lib/main.js, parse --serve and --port flags. When in server mode, initialize Express server on the specified port.
3. Define route handlers:
   - /pi: validate query parameters, invoke calculatePi or render PNG via pureimage, and send appropriate response.
   - /benchmark: validate query parameters, invoke benchmarkPi, and send JSON results.
4. Construct an OpenAPI specification object in code with parameter and response schemas, serve it at /openapi.json.
5. Integrate swagger-ui-express to mount UI at /docs pointing to /openapi.json.
6. Ensure proper error handling: invalid inputs return 400 with JSON error messages.

# Testing

- Unit tests in tests/unit/http.docs.test.js to verify openapi.json includes definitions for /pi and /benchmark.
- End-to-end tests in tests/e2e/http.server.test.js using supertest:
  * Start server on a random port and test GET /pi and GET /benchmark with valid and invalid parameters.
  * Assert HTTP status codes, Content-Type headers, and response bodies.

# Documentation

- Update README.md under Features to describe HTTP API mode with example curl commands:
    curl "http://localhost:3000/pi?digits=100&method=chudnovsky"
    curl "http://localhost:3000/benchmark?digits=50&methods=machin,nilakantha&runs=2"
- Update docs/USAGE.md with an HTTP Server section including parameter descriptions, sample requests, and sample responses.
