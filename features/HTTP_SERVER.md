# Overview
Implement embedded HTTP server mode with GET /pi and GET /benchmark endpoints, enabling programmatic access to π calculations and performance benchmarks via a RESTful API.

# CLI Integration
When the tool is invoked with --serve:
- Parse flags --serve (boolean) and --port <n> (integer, default 3000).
- Skip standard CLI output and start the HTTP server on the specified port.

# Server Implementation
Dependencies
- Add express for server, cors for cross origin, and zod for input validation.

Express App Setup in src/lib/main.js
- On serve mode create an Express application.
- Use JSON body parser and CORS middleware.

Endpoints
GET /pi
  • Query parameters: digits (integer 1–10000), method (chudnovsky, gauss-legendre, machin, nilakantha), format (text or png).
  • Validate inputs with zod and return 400 JSON { error } on failure.
  • On format=text send text/plain with the π string.
  • On format=png render a monochrome PNG of the digits via pureimage and send image/png.

GET /benchmark
  • Query parameters: digits (integer 1–10000), methods (comma separated list of valid method names), runs (integer ≥1).
  • Validate inputs and return 400 JSON { error } on invalid.
  • Invoke benchmarkPi and return application/json with an array of BenchmarkResult objects.

Error Handling
- Validation errors respond with status 400 and JSON payload { error }.
- Unexpected errors respond with status 500 and JSON { error }.

# Tests
Add unit tests in tests/unit/http.server.test.js using supertest
- Test GET /pi with valid parameters returns status 200 and correct content type.
- Test GET /pi with invalid parameters yields status 400 and error message.
- Test GET /benchmark valid returns status 200 JSON array of BenchmarkResult entries.
- Test GET /benchmark invalid returns status 400.

# Documentation
- In README.md under Features add HTTP Server Mode examples for GET /pi and GET /benchmark.
- In docs/USAGE.md add HTTP Server section detailing endpoints, parameters, validation rules, and sample curl commands.