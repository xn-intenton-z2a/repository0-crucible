# HTTP_API Feature

# Overview
Extend existing HTTP server mode to expose Prometheus metrics and a version endpoint reporting the application version.

# Endpoints

GET /metrics
  Returns metrics in Prometheus text exposition format with HELP and TYPE headers.
  Content-Type: text/plain; version=0.0.4

Metrics exposed:
  emoticon_requests_total        Counter of all HTTP GET requests served
  emoticon_requests_root_total   Counter of root requests (GET /)
  emoticon_requests_list_total   Counter of list requests (GET /list)
  emoticon_requests_json_total   Counter of JSON requests (GET /json and GET /json/list)
  emoticon_requests_seeded_total Counter of seeded requests (GET /json?seed)
  emoticon_requests_errors_total Counter of requests resulting in non-2xx status codes

GET /version
  Returns a JSON object with the current application version
  Content-Type: application/json
  Response body: { version: string }

# Implementation Details
In src/lib/main.js:
- Read the version from package.json via import or process.env.npm_package_version
- Define and initialize in-memory counters for each endpoint and error case before starting the server
- In the HTTP server handler, after determining the response status and content, increment the appropriate counter based on pathname and status code
- Register the GET /metrics route before general handlers to output HELP and TYPE headers and current counter values
- Register the GET /version route before increment logic to return the version without affecting counters
- Ensure that requests to /metrics and /version do not increment any emoticon request counters

# Tests
In tests/unit/server.test.js:
- Add a test for GET /metrics to assert status 200, correct Content-Type header, and presence of HELP, TYPE, and metric lines matching defined counters
- Simulate multiple requests to different endpoints and verify that the metrics endpoint reflects expected counter values
- Add a test for GET /version to assert status 200, correct Content-Type header, and a JSON response body containing version matching package.json