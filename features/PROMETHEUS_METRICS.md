# Overview

Provide instrumentation and health endpoints for monitoring π calculation services.  Expose Prometheus-compatible metrics, including request counts, response durations, and algorithm-specific calculation latencies.  Add `/metrics` for scraping, and simple `/healthz` and `/ready` endpoints for liveness and readiness checks.  This ensures operators can reliably observe service health and performance in production.

# Implementation

1. Dependencies
   • Add `prom-client` to dependencies in `package.json` (version `^14.0.1`).
   • No other new dependencies.

2. Metrics Registry and Default Metrics
   • In `createApp()`, import `prom-client` and create a new `Registry`.
   • Register default metrics (`collectDefaultMetrics`) with the registry.
   • Create custom metrics:
     - `http_request_duration_seconds` (Histogram) tracking HTTP endpoints by method and route.
     - `pi_calculation_duration_seconds` (Histogram) tracking duration of individual π calculations by algorithm.
     - `pi_calculation_requests_total` (Counter) labeling total calculation requests by algorithm and status code.

3. Middleware Instrumentation
   • Add an Express middleware early in the chain that:
     - Records `start = process.hrtime()` on each request.
     - On `res.finish`, observes duration in `http_request_duration_seconds` with labels `{ method, route, statusCode }`.
     - For `/pi` endpoint only, record `pi_calculation_requests_total` and observe `pi_calculation_duration_seconds` by algorithm label.

4. Metrics and Health Endpoints
   • Register `GET /metrics`:
     - Respond with `registry.metrics()`.
     - Set header `Content-Type: text/plain; version=0.0.4`.
   • Register `GET /healthz`:
     - Return status 200 and JSON `{ status: "ok" }`.
   • Register `GET /ready`:
     - Return status 200 and JSON `{ status: "ok" }`.

# Testing

1. Unit Tests in `tests/unit/server.test.js`:
   • Mock `prom-client` registry to verify `collectDefaultMetrics` is called.
   • Simulate HTTP GET `/metrics`, assert status 200, `Content-Type` header, and that returned body contains Prometheus metric names (e.g., `http_request_duration_seconds`).
   • Send a request to `/pi?digits=2&algorithm=leibniz` and verify that:
     - `pi_calculation_requests_total` counter increments for algorithm `leibniz` in the metrics output.
     - `http_request_duration_seconds` histogram has observations labeled with `method="GET"` and `route="/pi"`.
   • Test `/healthz` and `/ready` return correct JSON and status 200.

# Documentation

1. `docs/USAGE.md`:
   • Under **REST Endpoints**, add:
     - **GET /metrics**: Prometheus metrics endpoint; example
       ```bash
       curl http://localhost:3000/metrics
       ```
     - **GET /healthz** and **GET /ready**: Health check endpoints returning JSON `{ status: "ok" }`.

2. `README.md`:
   • Under **Features**, add **Prometheus Metrics & Health** with a brief description and examples:
     ```bash
     # Scrape Prometheus metrics
     curl http://localhost:3000/metrics

     # Liveness and Readiness checks
     curl http://localhost:3000/healthz
     curl http://localhost:3000/ready
     ```