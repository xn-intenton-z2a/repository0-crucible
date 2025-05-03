# HTTP_API Feature

# Overview
Extend the existing HTTP server mode to expose operational insights and service metadata. In addition to existing emoticon endpoints and Prometheus-compatible metrics, add a version endpoint that reports the application version.

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

GET /version
  Returns a JSON object with the current application version.
  Content-Type: application/json
  Response body: { version: string }

# Implementation Details

In src/lib/main.js:
- Read version from package.json via import or process.env.npm_package_version.
- Register /version route before error fallback:
  - On GET /version, send JSON with version and HTTP 200.
- Existing metric counters:
  - Initialize in-memory counters for all HTTP endpoints except /metrics and /version.
  - Increment counters based on pathname and status code.
- For /metrics, format counters with HELP and TYPE headers and one metric per line.
- Ensure /metrics and /version do not increment request counters.

# Tests

In tests/unit/server.test.js:
- Add a test for GET /version:
  - Issue GET /version, parse JSON response body, and assert it contains the version matching package.json.
  - Verify status code is 200 and Content-Type header matches application/json.
- Update beforeAll to import version from package.json for comparison.
