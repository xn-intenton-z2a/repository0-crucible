# Overview
Extend the embedded HTTP server mode to include real-time progress streaming via Server-Sent Events (SSE) and automatically generated OpenAPI documentation with a Swagger UI.

# CLI Integration
When the tool is invoked with --serve:
- Parse flags --serve (boolean) and --port <n> (integer, default 3000).
- Skip standard CLI output and start the HTTP server on the specified port.

# Server Implementation
Dependencies
- Ensure express, cors, and zod are installed.

Express App Setup in src/lib/main.js
- On serve mode, create an Express application.
- Use JSON body parser and CORS middleware.

Endpoints
GET /pi
  • Query parameters: digits (integer 1–10000), method (chudnovsky, gauss-legendre, machin, nilakantha), format (text or png).
  • Validate inputs with zod, respond 400 JSON { error } on failure.
  • On format=text send text/plain with the π string.
  • On format=png render a monochrome PNG of the digits via pureimage and send image/png.

GET /benchmark
  • Query parameters: digits (integer 1–10000), methods (comma separated list), runs (integer ≥1).
  • Validate inputs, respond 400 JSON { error } on failure.
  • Invoke benchmarkPi and return application/json with an array of BenchmarkResult objects.

# SSE Streaming
Add Server-Sent Events endpoint at GET /pi/stream
  • Accept same query parameters as GET /pi plus optional progress-interval (integer 1–100, default 5).
  • On connection, set headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive.
  • During calculation, emit progress events at each interval:
      event: progress
  data: { percentComplete: <n> }
  • After completion, emit a final result event with payload:
      event: result
  data: { pi: string, pngBase64?: string }
  • Close the stream after sending the result event.

# OpenAPI Documentation
Generate and serve OpenAPI spec and Swagger UI:
GET /openapi.json
  • Return a JSON document defining the REST API schema for /pi, /pi/stream, /benchmark, /openapi.json, and /docs.
  • Include parameter definitions, response schemas, and error formats.

GET /docs
  • Serve an interactive Swagger UI that reads /openapi.json.
  • Integrate swagger-ui-express or serve a static HTML page referencing the JSON spec.

# Error Handling
- Validation errors respond with status 400 and JSON { error }.
- Unexpected errors respond with status 500 and JSON { error }.

# Tests
Add unit tests in tests/unit/http.server.sse.test.js using supertest and eventsource-parser:
- Test GET /pi/stream returns a 200 SSE stream with proper headers.
- Parse SSE messages and assert progress events in increasing order followed by a result event with correct payload.

Add unit tests in tests/unit/openapi.test.js:
- Test GET /openapi.json returns valid OpenAPI schema (has openapi version, paths for /pi, /pi/stream, /benchmark).
- Test GET /docs returns 200 and contains Swagger UI HTML markers.

# Documentation
Update README.md under Features:
### HTTP Server Mode
Include examples for:
  curl "http://localhost:3000/pi?digits=100&method=chudnovsky&format=text"
  curl "http://localhost:3000/pi/stream?digits=500&progress-interval=10"
  curl "http://localhost:3000/benchmark?digits=50&methods=machin,gauss-legendre&runs=3"
  curl http://localhost:3000/openapi.json
  open http://localhost:3000/docs

Update docs/USAGE.md HTTP Server section to describe SSE endpoint and OpenAPI docs with parameter definitions and sample usage.