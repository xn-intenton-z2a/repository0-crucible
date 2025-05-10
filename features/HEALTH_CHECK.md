# Health Check Endpoint Feature

# Overview

Provide a lightweight health check endpoint that enables readiness and liveness probes for containerized and production deployments. Clients can verify the service is running and retrieve basic uptime metrics without invoking heavy pi computations.

# Functional Requirements

- In `startHttpServer` within `src/lib/main.js`, register a new route:

  GET /health

- The endpoint should respond with status code 200 and a JSON object containing:
  - `status`: string, always "ok"
  - `uptime`: number, service uptime in seconds (use `process.uptime()`)
  - `timestamp`: string, current server time in ISO 8601 format (use `new Date().toISOString()`)

- Set the `Content-Type` header to `application/json` for this response.

- Ensure this route is declared before the 404 fallback handler.

# Testing

- **Unit Tests** in `tests/unit/http.test.js`:
  - Mock `startHttpServer` or spin up the server on an ephemeral port and perform a request to `/health`.
  - Assert response status is 200.
  - Assert the returned JSON has keys `status`, `uptime`, and `timestamp`.
  - Validate `status` is "ok", `uptime` is a non-negative number, and `timestamp` is a valid ISO string.

- **Integration Tests** in `tests/e2e/http.test.js`:
  - Start the HTTP server on an ephemeral port.
  - Perform HTTP GET `/health` and assert:
    - The `Content-Type` header is `application/json`.
    - The JSON body matches the expected shape and valid values.
  - Ensure an unexpected route (e.g., `/healthz`) still returns 404.

# Dependencies

- No new external dependencies required; use built-in `process` module for uptime and `Date` for timestamp.
