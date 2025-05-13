# Overview

Consolidate API documentation and runtime metrics into a single observability feature. Expose an OpenAPI 3.0 specification and interactive Swagger UI alongside Prometheus-compatible metrics endpoints. Users and operators gain a standardized API reference and real-time insight into request rates, error counts, and algorithm performance in one feature.

# Implementation

1. Dependencies
   • Add prom-client@^14.0.0 and swagger-ui-express@^4.6.3 to package.json dependencies.

2. Metrics Setup
   • Import prom-client in src/lib/main.js and create a Registry instance.
   • Register default process metrics (CPU, memory, event loop lag) and set collection interval via PROM_METRICS_INTERVAL (default 5000 ms).
   • Define:
     - Counter http_requests_total labeled by method, route, status_code.
     - Histogram http_request_duration_seconds labeled by method, route.
     - Counter pi_calculations_total labeled by algorithm and type (cli or http).

3. Metrics Middleware and Endpoint
   • In createApp(), before routes, mount middleware that starts a timer from the histogram on each request and increments http_requests_total on response finish.
   • After each π calculation branch in /pi, increment pi_calculations_total with algorithm and type=http.
   • Mount GET /metrics to return registry.metrics() with appropriate Content-Type.

4. OpenAPI and Swagger UI
   • Import swagger-ui-express in src/lib/main.js.
   • Define an openapiSpec object with openapi: 3.0.0, info, servers, and paths for /pi, /pi/data, /pi/chart, /dashboard, and /metrics.
   • Mount GET /openapi.json to serve the spec JSON.
   • Mount /docs to serve interactive Swagger UI using swaggerUi.setup(openapiSpec).

5. Error Handling
   • Wrap metric collection and UI mounting in try/catch. On error, log a warning and continue normal API behavior without failing.

# Testing

1. Unit Tests in tests/unit/server.test.js
   • Mock prom-client to verify default metrics registered and counters/histogram instantiated.
   • Simulate GET /metrics and ensure response contains Prometheus metric names and correct Content-Type.
   • Simulate GET /openapi.json to verify openapi property is 3.0.0 and required paths keys present.
   • Simulate GET /docs and verify HTML response contains Swagger UI assets and title.
   • Test that after calling GET /pi, pi_calculations_total counter inc is invoked.

# Documentation

1. docs/USAGE.md
   • Add **Observability** section describing:
     - PROM_METRICS_INTERVAL environment variable and how to access /metrics.
     - Swagger UI at /docs and raw spec at /openapi.json.
     - cURL examples for metrics and docs routes.

2. README.md
   • Under **Features**, replace **Prometheus Metrics** and **API Documentation** entries with **Observability**.
   • Describe combined metrics exposure and interactive API documentation with example commands.