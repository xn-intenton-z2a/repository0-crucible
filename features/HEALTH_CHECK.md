# Health Check Endpoint Feature

## Overview
Provide a lightweight health check endpoint that enables readiness and liveness probes for containerized and production deployments. Clients can verify the service is running and retrieve basic uptime metrics without invoking heavy π computations.

## Functional Requirements

- In `startHttpServer` within `src/lib/main.js`, register a new route:

  GET /health

- The endpoint must respond with status code 200 and a JSON object containing:
  - `status`: string, always "ok"
  - `uptime`: number, service uptime in seconds (use `process.uptime()`)
  - `timestamp`: string, current server time in ISO 8601 format (use `new Date().toISOString()`)

- Set the `Content-Type` header to `application/json` for this response.

- Ensure this route is declared before the 404 fallback handler.

## Implementation Details

- Import `process` and use `process.uptime()` and `Date` APIs available.
- In the Express app setup of `startHttpServer`, add `app.get('/health', (req, res) => { ... })` before other routes or the catch-all middleware.
- Construct and send the JSON response object and end the request.

## Testing

- **Unit Tests** in `tests/unit/http.test.js`:
  - Spin up or mock `startHttpServer` and perform a GET request to `/health` on an ephemeral port.
  - Assert that the response status is 200.
  - Assert the JSON body has keys `status`, `uptime`, and `timestamp`.
  - Validate that `status` equals "ok`, `uptime` is a non-negative number, and `timestamp` is a valid ISO timestamp string.

- **Integration Tests** in `tests/e2e/http.test.js`:
  - Launch the HTTP server on an ephemeral port.
  - Perform an HTTP GET `/health`:
    - Verify the `Content-Type` header is `application/json`.
    - Verify the JSON response structure and values.
  - Confirm that an unexpected route (e.g., `/healthz`) returns 404 as before.