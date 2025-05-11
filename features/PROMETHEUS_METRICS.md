# HTTP Prometheus Metrics Feature

## Overview

Enable the HTTP API server to expose operational metrics in Prometheus format. This feature provides a `/metrics` endpoint using the prom-client library and records request counters and duration histograms for key routes, allowing users to monitor performance and reliability.

## Functional Requirements

- Add dependency `prom-client` to package.json.
- In `startHttpServer` in `src/lib/main.js`, import prom-client:
  - const client = require('prom-client') or import * as client from 'prom-client'.
- Initialize a default registry: e.g., `const register = new client.Registry()`.
- Enable default metrics: `client.collectDefaultMetrics({ register })`.
- Define HTTP metrics:
  - A counter `http_requests_total` labeled by method and route.
  - A histogram `http_request_duration_seconds` labeled by method and route, with suitable buckets.
- Add middleware before routes:
  - On each request, start a timer: `const end = histogram.startTimer({ method: req.method, route: req.route ? req.route.path : req.path })`.
  - On response finish, call `end()` and increment `http_requests_total` with same labels.
- Register GET `/metrics` endpoint:
  - Respond with content type `register.contentType` (e.g., 'text/plain; version=0.0.4').
  - Return `await register.metrics()` in the response body.
- Ensure `/metrics` is mounted before the 404 fallback handler.

## Testing

- **Unit Tests** (`tests/unit/http.test.js`):
  - Mock an Express app and verify middleware invocation increments counters and records durations.
  - Start `startHttpServer({ port: 0 })` and perform a GET `/metrics` request:
    - Assert status `200`, `Content-Type` header matches Prometheus format.
    - Assert the body contains lines starting with `# HELP http_requests_total` and sample metrics entries.
- **Integration Tests** (`tests/e2e/http.test.js`):
  - Launch the HTTP server on an ephemeral port.
  - Issue a sequence of API requests (e.g., GET `/pi`), then GET `/metrics`:
    - Verify that `http_requests_total{method="GET",route="/pi"}` and `http_request_duration_seconds` are present and non-zero.
  - Confirm that metrics update correctly after each request.