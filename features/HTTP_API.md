# HTTP_API Feature

# Overview
Add Prometheus-compatible metrics endpoint to the existing HTTP server mode. The new `/metrics` endpoint provides operational insights on usage patterns, request counts, and error rates. This enables users and operators to integrate emoticon service monitoring into dashboards and alerting systems.

# Endpoints

GET /metrics
  Returns metrics in Prometheus text exposition format.
  Content-Type: text/plain; version=0.0.4

Metrics exposed:
  emoticon_requests_total        Counter of all HTTP GET requests served.
  emoticon_requests_random_total Counter of random emoticon requests (root and /json without seed).
  emoticon_requests_seeded_total Counter of seeded emoticon requests (/json?seed).
  emoticon_requests_list_total   Counter of list requests (/list and /json/list).
  emoticon_requests_errors_total Counter of requests resulting in a non-200 status.

# Implementation Details

In src/lib/main.js:
- Initialize in-memory counters for each metric before server creation.
- Increment counters appropriately inside request handler based on pathname and status code.
- For `/metrics`, format counters in Prometheus text format, one metric per line with HELP and TYPE headers:
  HELP emoticon_requests_total Total number of HTTP emoticon requests
  TYPE emoticon_requests_total counter
  emoticon_requests_total <value>
- Register `/metrics` route in the server request listener before other routes.
- Ensure metrics endpoint does not increment emoticon_requests_total or error counters.

# Tests

In tests/unit/server.test.js:
- Add a suite for metrics endpoint:
  - Prime server with a known sequence of requests (random, seeded, list, invalid path).
  - Request GET /metrics and parse response body lines to extract metric values.
  - Assert each metric counter matches the number of previous requests of that type.
  - Verify Content-Type header matches text/plain; version=0.0.4.
- Use http.request as in existing tests to issue requests and count responses.
