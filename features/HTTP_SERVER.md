# Overview
Add an embedded HTTP server mode to the CLI, enabled via the --serve flag. When run in server mode, the tool will spin up an Express application exposing RESTful endpoints for π calculation and benchmarking, plus an SSE endpoint for live progress updates, an OpenAPI spec, and a Swagger UI.

# CLI Integration
In src/lib/main.js:
• Parse new flags --serve (boolean) and --port <n> (integer, default 3000).
• When --serve is present, skip normal CLI output and initialize the HTTP server on the specified port.

# Server Implementation
1. **Dependencies**
   – Add express and swagger-ui-express to package.json dependencies.
   – Optionally use cors and zod for input validation.

2. **Express App Setup**
   – In main(), after flag parsing, when serve=true:
     • Create an Express instance.
     • Mount JSON body parser and CORS middleware.
     • Define routes:
       - GET /pi
         • Query: digits (1–10000), method (optional), format (text|png).
         • Validate inputs and return 400 JSON { error } on invalid.
         • On text: send text/plain with π string.
         • On png: render monochrome PNG via pureimage and send image/png.

       - GET /pi/stream
         • Query: same as /pi plus optional progress-interval.
         • Validate inputs.
         • Set headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive.
         • Call calculatePi with onProgress callback emitting SSE events:
           event: progress\ndata: { percentComplete: n }\n
         • After finish: event: result\ndata: { pi: string, pngBase64?: string }
         • Close stream.

       - GET /benchmark
         • Query: digits, methods (comma-separated), runs.
         • Validate and return JSON array of BenchmarkResult.

       - GET /openapi.json
         • Return an in-memory OpenAPI 3.0 JSON object describing all endpoints, parameters, and responses.

       - GET /docs
         • Mount swagger-ui-express pointing at /openapi.json.

3. **Error Handling**
   – All validation errors return 400 application/json.
   – Unexpected errors return 500 with { error }.

# Testing
- **Unit tests** in tests/unit/http.docs.test.js:
  • Assert openapi.json includes definitions for /pi, /pi/stream, /benchmark.

- **Integration tests** in tests/e2e/http.server.test.js using supertest:
  • Test GET /pi with valid and invalid parameters; assert status codes and content types.
  • Test GET /pi/stream: parse SSE events, ensure progress events and final result.
  • Test GET /benchmark: valid runs and invalid cases.

# Documentation
- Update README.md under Features → HTTP Server Mode with example curl commands.
- Update docs/USAGE.md HTTP Server section with parameter descriptions, sample requests, and responses.