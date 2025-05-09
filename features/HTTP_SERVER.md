# Overview
Enable HTTP server mode for π computation with full API support, including health checks, on-demand π endpoints in text and PNG, real-time progress streaming, benchmarking, OpenAPI specification, and Swagger UI documentation.

# Endpoints

## GET /health
Return service health status

- Status: 200
- Body: { "status": "ok" }

## GET /pi
Compute π on demand

- Query parameters
  - digits (integer 1–10000, default 100)
  - method (chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  - format (text|png, default text)
- Behavior
  - format=text: respond with Content-Type text/plain and π digit string
  - format=png: render monochrome PNG of π digits, respond with Content-Type image/png

## GET /pi/stream
Stream computation progress and final result via Server-Sent Events

- Query parameters: same as /pi plus progressInterval (integer 1–100, default 5)
- Headers: Content-Type text/event-stream, Cache-Control no-cache, Connection keep-alive
- Events
  - progress: JSON payload { percentComplete: number } at each interval
  - result: JSON payload { pi: string, pngBase64?: string } then close stream

## GET /benchmark
Run performance benchmarks and return timing data

- Query parameters
  - digits (integer 1–10000, default 100)
  - methods (comma-separated list or all)
  - runs (integer ≥1, default 3)
- Response: application/json array of { method, runs, averageTimeMs, minTimeMs, maxTimeMs }

## GET /openapi.json
Serve the OpenAPI v3 specification for the HTTP API in JSON format

- Status: 200
- Content-Type: application/json
- Body: OpenAPI specification document

## GET /docs
Serve Swagger UI for interactive API exploration

- Embeds the OpenAPI spec at /openapi.json
- Accessible via a browser for testing endpoints

# CLI Integration

- Add flags --serve (boolean) and --port <n> (integer ≥1, default 3000)
- When --serve is true, skip CLI computation logic and start the HTTP server on the specified port

# Implementation Details

1. Dependencies
   - express for HTTP routing
   - zod for request validation
   - pureimage for PNG rendering
   - swagger-ui-express and swagger-jsdoc for OpenAPI generation and UI

2. Server Setup in main.js
   - On --serve, initialize an Express app with JSON and URL-encoded middleware
   - Load or generate OpenAPI spec via swagger-jsdoc from route annotations or a config object
   - Use swagger-ui-express to serve UI at /docs with spec URL /openapi.json
   - Mount routes for /health, /pi, /pi/stream, /benchmark, and /openapi.json
   - Use Zod schemas to validate query parameters and return 400 on invalid inputs
   - Integrate calculatePi, renderPiAsPng, and benchmarkPi for endpoint handlers
   - Implement SSE in /pi/stream using response.write and proper headers

# Tests

- Unit and integration tests using supertest in tests/unit/http.server.test.js
  - /health returns 200 and { status: ok }
  - /pi returns correct text and image content types and bodies
  - /pi/stream emits SSE progress and result events
  - /benchmark returns JSON array with valid timing data
  - /openapi.json returns a valid OpenAPI v3 JSON object
  - /docs serves HTML content with Swagger UI assets

# Documentation

- Update README.md under HTTP Server Mode to include OpenAPI and Swagger UI usage
- Update docs/USAGE.md to document /openapi.json endpoint and /docs UI route with examples