# Health Check Feature

## Overview
Provide a lightweight readiness and liveness endpoint for the HTTP API server to support monitoring and deployment probes. This endpoint allows clients and orchestration systems to verify that the service is running and healthy without invoking expensive π computations.

## Functional Requirements

- In `startHttpServer` within `src/lib/main.js`, register a new route GET `/health` before any other routes:
  - Respond with status code `200` and a JSON object:
    {
      "status": "ok",
      "uptime": <number>,
      "timestamp": "<ISO 8601 string>"
    }
  - `uptime` must be obtained from `process.uptime()` (in seconds, as a number).
  - `timestamp` must be `new Date().toISOString()`.
  - Set `Content-Type` header to `application/json`.

## Testing

- **Unit Tests** (`tests/unit/http.test.js`):
  - After starting the server on an ephemeral port, issue a GET request to `/health`:
    - Assert status `200`.
    - Assert `Content-Type` is `application/json`.
    - Assert response JSON has keys `status`, `uptime`, and `timestamp`.
    - Assert `status` is the string "ok".
    - Assert `uptime` is a non-negative number.
    - Assert `timestamp` is a valid ISO 8601 string.

- **Integration Tests** (`tests/e2e/http.test.js`):
  - Start the server with `--serve --port 0`, then GET `/health`:
    - Verify `200` and JSON structure as above.
    - Ensure unexpected routes (e.g., `/healthz`) still return `404` JSON error as before.

## Documentation Changes

- Update `README.md` under the **HTTP API** section to document the new `/health` endpoint.
- In `docs/HTTP_API.md`, add a **GET /health** section with description, response schema, and examples.
