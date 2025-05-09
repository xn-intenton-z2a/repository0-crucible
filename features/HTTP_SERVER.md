# Overview
Implement an embedded HTTP server mode for the π calculation tool, exposing REST endpoints for computing π in text or PNG formats, streaming real-time progress via Server-Sent Events (SSE), running benchmarks over HTTP, and serving a self-documenting OpenAPI specification with interactive Swagger UI.

# Implementation Details

## CLI Integration

- Add flags in src/lib/main.js:
  • `--serve` (boolean) to enter HTTP server mode.
  • `--port <n>` (integer, default 3000) to specify listening port.
- When `--serve` is detected, skip CLI output logic and initialize the HTTP server on the specified port.

## Dependencies

- Add express for routing and middleware.
- Add cors to allow cross-origin requests.
- Add zod to validate incoming query parameters.
- Add swagger-ui-express to serve the Swagger UI.
- Use js-yaml or inline JSON to generate OpenAPI spec.

## Server Initialization

In main.js on `serve` mode:

1. Create an Express application.
2. Apply CORS and express.json middleware.
3. Load or build an OpenAPI document describing all endpoints.
4. Mount Swagger UI at `GET /docs`, pointing to `GET /openapi.json`.

## Endpoints

### GET /pi

- Query: `digits` (int 1–10000), `method` (chudnovsky|gauss-legendre|machin|nilakantha), `format` (text|png).
- Validate with zod; on error respond 400 with JSON error.
- For `format=text`, calculate π and respond `text/plain` with body = π string.
- For `format=png`, calculate π, render monochrome PNG using pureimage, and respond `image/png`.

### GET /pi/stream

- Query: same as `/pi`, plus optional `progressInterval` (int 1–100).
- Respond with headers:
  - `Content-Type: text/event-stream`
  - `Cache-Control: no-cache`
  - `Connection: keep-alive`
- Call calculatePi with an onProgress callback that writes SSE events:
  - `event: progress` with JSON `{ percentComplete: <n> }`.
- After completion, emit:
  - `event: result` with JSON `{ pi: <string>, pngBase64?: <string> }` if PNG.
- Close the stream.

### GET /benchmark

- Query: `digits` (int), `methods` (comma-separated list), `runs` (int).
- Validate inputs with zod.
- Call existing `benchmarkPi` function.
- Respond `application/json` with array of benchmark result objects.

### GET /openapi.json

- Serve the OpenAPI document as JSON.


# Tests

- In `tests/unit/http.server.test.js`, use vitest and supertest to:
  • Verify validation errors return 400 with JSON error.
  • Validate `/pi` endpoints return correct status, content type, and body for text and PNG formats.
  • Validate `/pi/stream` SSE events sequence: progress events increasing to 100, then result.
  • Validate `/benchmark` returns JSON array matching shape of `benchmarkPi` output.
  • Validate `/openapi.json` is valid JSON containing defined paths.


# Documentation Updates

- README.md:
  • Document `--serve` and `--port` flags.
  • List all HTTP endpoints with example `curl` commands.
- docs/USAGE.md:
  • Add section "HTTP Server Usage" with endpoint details, query parameter descriptions, and sample requests.
  • Include instructions to view Swagger UI at `/docs` and raw spec at `/openapi.json`.
