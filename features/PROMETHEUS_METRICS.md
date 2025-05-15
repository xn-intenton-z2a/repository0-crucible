# Overview

Expose Prometheus-compatible metrics for all HTTP endpoints and internal performance of π calculations. This feature enables users and operators to monitor request rates, response latencies, error rates, and algorithm-specific durations via a unified `/metrics` endpoint.

# Implementation

1. Dependencies
   • Add `prom-client` to `package.json` dependencies.
   • Import and initialize `prom-client` in `src/lib/main.js`.

2. Metrics Setup
   • Create a Prometheus Registry and register default process and Node.js metrics.
   • Define custom metrics:
     - `http_requests_total` (Counter): Labels `method`, `endpoint`, `status_code`.
     - `http_request_duration_seconds` (Histogram): Labels `method`, `endpoint` with sensible buckets.
     - `pi_calculation_duration_seconds` (Histogram): Labels `algorithm` and `status`.

3. Middleware Instrumentation
   • In `createApp()`, before all routes, apply middleware to start a timer for each incoming request:
     ```js
     const end = httpRequestDuration.startTimer({ method: req.method, endpoint: req.route?.path || req.path });
     res.on('finish', () => {
       httpRequestsTotal.inc({ method: req.method, endpoint: req.route?.path || req.path, status_code: res.statusCode });
       end({ method: req.method, endpoint: req.route?.path || req.path });
     });
     ```
   • Wrap π calculation handlers to observe duration with `piCalculationDuration`.

4. `/metrics` Endpoint
   • Register GET `/metrics` in `createApp()` that returns `registry.metrics()` with `Content-Type: text/plain; version=0.0.4`.
   • Respect `METRICS_ENABLED` environment variable (default `true`) to enable or disable the endpoint and instrumentation.

# Testing

1. Unit Tests (`tests/unit/server.test.js`)
   • Mock `prom-client` registry to capture metrics output.
   • Verify GET `/metrics` returns 200, correct content type, and includes default and custom metric names.
   • Simulate API requests and validate `http_requests_total` and `http_request_duration_seconds` counters increment as expected.

# Documentation

1. `docs/USAGE.md`
   • Under **REST Endpoints**, add **GET /metrics** with description and example:
     ```bash
     curl http://localhost:3000/metrics
     ```

2. `README.md`
   • Under **Features**, add **Prometheus Metrics** describing the `/metrics` endpoint and how to configure `METRICS_ENABLED`.
   • Provide sample Prometheus scrape configuration snippet.