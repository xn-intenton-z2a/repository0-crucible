# Overview

Add a fully functional HTTP server mode to the CLI tool with REST endpoints for computing π, running benchmarks, serving OpenAPI specs, and streaming progress via Server-Sent Events (SSE). When invoked with --serve, the application launches an Express server and exposes the following core endpoints under a configurable port.

# Endpoints

## GET /health
Return service health status.

- Response: 200 JSON {
  "status": "ok"
}

## GET /pi
Compute π on demand.

- Query parameters:
  • digits (int, 1–10000, default 100)
  • method (string, chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  • format (text|png, default text)
- Responses:
  • text/plain with π digits when format=text
  • image/png rendered monochrome PNG when format=png

## GET /pi/stream
Stream progress and final result via SSE.

- Query parameters same as /pi plus:
  • progressInterval (int 1–100, default 5)
- Response headers:
  • Content-Type: text/event-stream
  • Cache-Control: no-cache
  • Connection: keep-alive
- Event stream:
  • event: progress with JSON { percentComplete: number }
  • event: result with JSON { pi: string, pngBase64?: string } then close

## GET /benchmark
Run performance benchmarks.

- Query parameters:
  • digits (int, 1–10000, default 100)
  • methods (csv of valid method names, default all)
  • runs (int ≥1, default 3)
- Response: 200 JSON array of { method, runs, averageTimeMs, minTimeMs, maxTimeMs }

## GET /openapi.json
Serve OpenAPI 3 specification JSON describing all endpoints and schemas.

- Response: 200 JSON OpenAPI document

# Implementation Details

1. Flag Parsing
   - In src/lib/main.js, add --serve and --port flags. When serve is true, skip CLI output and start server.
   - Validate port is integer ≥1.

2. Server Setup
   - Import express, zod for parameter validation, swagger-ui-express and js-yaml.
   - Create new Express app. Use JSON middleware and optional CORS.

3. Route Handlers
   - /health: return { status: ok }.
   - /pi: parse and validate query via zod schemas, call calculatePi or render PNG via pureimage, send appropriate headers and body.
   - /pi/stream: set SSE headers, call calculatePi with onProgress to write SSE frames, encode PNG to base64 if format=png, then send final result event and end.
   - /benchmark: parse and validate, await benchmarkPi, send JSON.
   - /openapi.json: generate or load OpenAPI spec at runtime (e.g., from YAML), send JSON.
   - /docs: mount Swagger UI pointing at /openapi.json.

4. Startup
   - Listen on configured port and log a startup message.

# Testing

- Unit tests in tests/unit/http.server.test.js using supertest:
  • /health returns 200 and correct JSON
  • /pi returns text and PNG responses with valid and invalid params
  • /pi/stream emits SSE events in order
  • /benchmark returns JSON array and error on invalid params
  • /openapi.json returns valid OpenAPI JSON

- Integration tests in tests/e2e/http.server.e2e.js:
  • Launch server in-process, use supertest and eventsource-parser to verify SSE stream and endpoints complete successfully

# Documentation

- Update README.md under HTTP Server Mode with --serve and --port flags and curl examples for all endpoints.
- Update docs/USAGE.md under HTTP Server section listing all endpoints, parameters, response formats, and example commands.