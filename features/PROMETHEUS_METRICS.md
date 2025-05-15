# Overview

Expose Prometheus-compatible metrics and health-check endpoints to enable comprehensive observability and operational readiness. This feature provides default process and Node.js metrics, custom HTTP and π calculation performance metrics, and lightweight endpoints for liveness and readiness probes.

# Implementation

1. Dependencies
   • Ensure `prom-client` is listed in `package.json` dependencies.

2. Metrics Setup
   • Create a Prometheus Registry and register default metrics (process_cpu_user_seconds_total, process_resident_memory_bytes, etc.).
   • Define custom metrics:
     - `http_requests_total` (Counter): labels `method`, `endpoint`, `status_code`
     - `http_request_duration_seconds` (Histogram): labels `method`, `endpoint` with sensible buckets
     - `pi_calculation_duration_seconds` (Histogram): labels `algorithm` and `status`

3. Middleware Instrumentation
   • In `createApp()`, before all routes, apply middleware to start a timer for each incoming request:
     ```js
     const end = httpRequestDuration.startTimer({ method: req.method, endpoint: req.route?.path || req.path });
     res.on('finish', () => {
       httpRequestsTotal.inc({ method: req.method, endpoint: req.route?.path || req.path, status_code: res.statusCode });
       end();
     });
     ```
   • Wrap π calculation handlers to observe duration with `piCalculationDuration`.

4. `/metrics` Endpoint
   • Register `GET /metrics` returning `registry.metrics()` with `Content-Type: text/plain; version=0.0.4`.
   • Honor `METRICS_ENABLED` environment variable (default `true`) to enable or disable instrumentation and the endpoint.

5. Health-Check Endpoints
   • Register `GET /healthz`: always respond with HTTP 200 and JSON `{ status: 'ok' }` for liveness probes.
   • Register `GET /ready`: perform quick self-checks (e.g., metrics registry initialized) and respond with HTTP 200 and JSON `{ status: 'ready' }`, or HTTP 500 with `{ status: 'error' }` if a check fails.

# Testing

1. Unit Tests (`tests/unit/server.test.js`)
   • Mock `prom-client` registry to capture and verify metrics output.  
   • Test `GET /metrics` returns status 200, correct content type, and includes default and custom metric names.  
   • Test `GET /healthz` returns status 200 and JSON `{ status: 'ok' }`.  
   • Test `GET /ready` returns status 200 and JSON `{ status: 'ready' }`.  
   • Simulate API requests and verify counters `http_requests_total` and histograms increment as expected.

# Documentation

1. `docs/USAGE.md`
   • Under **REST Endpoints**, add sections for **GET /metrics**, **GET /healthz**, and **GET /ready** with usage examples:
     ```bash
     curl http://localhost:3000/metrics
     curl http://localhost:3000/healthz
     curl http://localhost:3000/ready
     ```

2. `README.md`
   • Under **Features**, update **Prometheus Metrics** to mention health-check endpoints `/healthz` and `/ready` alongside `/metrics` and how to configure `METRICS_ENABLED`.