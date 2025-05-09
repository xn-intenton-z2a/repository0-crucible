# Overview
Add embedded HTTP server mode to the CLI tool, enabled via the --serve flag. The server exposes REST endpoints for π calculation, benchmarking, and real-time progress streaming via Server-Sent Events, and provides a self-documenting OpenAPI specification with Swagger UI.

# CLI Integration
• Parse --serve (boolean) and --port <n> (integer, default 3000) in src/lib/main.js.
• When --serve is present, skip standard CLI behavior and start the HTTP server on the specified port.

# Server Implementation
## Dependencies
Add express for routing, cors for cross-origin support, zod for request validation, swagger-ui-express for serving Swagger UI, and js-yaml for loading the OpenAPI document.

## Initialization
In main.js, when serve mode is detected:
    Create an Express app.
    Apply cors middleware and express.json.
    Load or generate OpenAPI spec in JSON and YAML formats.

# Routes
Define the following endpoints on the Express app:

## GET /pi
Accept query parameters digits, method, format, output optional (ignored in server).
Validate inputs using zod. For format=text, calculatePi and respond with text/plain. For format=png, render PNG via pureimage and respond with image/png.

## GET /pi/stream
Accept digits, method, progress-interval. Respond with Content-Type=text/event-stream, Cache-Control no-cache, Connection keep-alive. During calculatePi invoke onProgress callbacks to emit events:
event: progress
data: { percentComplete: number }
After completion, emit:
event: result
data: { pi: string, pngBase64?: string }
Then close the connection.

## GET /benchmark
Accept digits, methods, runs. Validate inputs, invoke benchmarkPi, and respond with application/json containing array of results.

## GET /openapi.json
Serve the generated OpenAPI JSON spec.

## GET /docs
Serve interactive Swagger UI using swagger-ui-express, pointing at /openapi.json.

# Tests
• Unit tests in tests/unit/http.server.test.js using vitest and supertest to validate each endpoint, status codes, payload shapes, and SSE event order.
• End-to-end tests in tests/e2e/http.server.e2e.js parsing the SSE stream and verifying OpenAPI UI at /docs.

# Documentation
• Update README.md to document --serve and --port flags and list all HTTP endpoints with examples.
• Update docs/USAGE.md under HTTP Server Usage with detailed descriptions and sample curl commands.
## FeatureNamesToBeDeleted
none