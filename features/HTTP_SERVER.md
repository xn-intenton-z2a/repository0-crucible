# HTTP_SERVER

## Overview
Extend the existing HTTP server mode to provide health checks, SSE streaming for progress, and automatic OpenAPI specification with Swagger UI, in addition to the current endpoints for π computation and benchmarking.

## Endpoints

### GET /health
- Respond with status 200 and JSON payload { status: 'ok' } to indicate server readiness.

### GET /pi
- Query parameters:
  - digits (int, 1–10000, default 100)
  - method (string: chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  - format (string: text|png, default text)
- Validate inputs using zod. On validation error, respond 400 with JSON error details.
- For text format, compute π and respond 200 text/plain with the digit string.
- For png format, compute π, render monochrome image of digits with pureimage, and respond 200 image/png.

### GET /pi/stream
- Server-Sent Events endpoint for real-time progress and final result.
- Accept same parameters as /pi plus optional progressInterval (int, 1–100, default 5).
- On client connect, set headers cache-control no-cache, content-type text/event-stream, connection keep-alive.
- During computation, emit progress events:
    event: progress
    data: { percentComplete: number }
- On completion, emit result event:
    event: result
    data: { pi: string, pngBase64?: string }
- Then close the stream.

### GET /benchmark
- Query parameters:
  - digits (int, 1–10000, default 100)
  - methods (comma-separated names, default all)
  - runs (int ≥1, default 3)
- Validate inputs. On error, respond 400 with JSON error.
- Invoke benchmarkPi and respond with 200 application/json array of benchmark results.

### GET /openapi.json
- Serve the OpenAPI specification as JSON describing all HTTP endpoints and schemas.

### GET /docs
- Serve Swagger UI at /docs using swagger-ui-express, pointing to /openapi.json.

## CLI Integration
- When CLI invoked with --serve and --port, initialize Express app and mount all routes above.
- Ensure CLI flags --serve and --port remain as documented.

## Implementation Details
1. Add dependencies swagger-ui-express and yamljs or js-yaml to dependencies.
2. In src/lib/main.js:
   - After express setup, import swaggerUi and the generated OpenAPI JSON object or YAML file.
   - Register /health, /pi, /pi/stream, /benchmark, /openapi.json, and /docs routes.
   - Reuse existing calculatePi, benchmarkPi, and rendering helpers.
3. Use zod to define and parse schemas for each endpoint.
4. For SSE, implement a helper to write event lines and flush responses.
5. Ensure errors in routes are caught and result in JSON error responses.

## Tests
- In tests/unit/http.server.test.js:
  - Add tests for GET /health responds with 200 and status ok.
  - Test GET /openapi.json returns valid JSON with expected paths.
  - Test GET /docs serves Swagger UI HTML content.
  - Test SSE /pi/stream emits progress and result events under simulated fast calculation.
- Use supertest and eventsource-parser for SSE tests.

## Documentation
- Update README.md under HTTP Server Mode to list new endpoints /health, /openapi.json, and /docs with example curl commands.
- Update docs/USAGE.md to document health check endpoint and OpenAPI specification, and include sample requests for SSE and docs.