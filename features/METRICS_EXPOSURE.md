# Overview

Introduce Prometheus-compatible metrics for the HTTP API to allow service monitoring and alerting. Expose counters and histograms for request counts, durations, and algorithm-specific usage under a dedicated `/metrics` endpoint. This enables integration with Prometheus and other observability tools for real-time tracking of API performance and usage patterns.

# Implementation

1. Dependency
   • Add `prom-client` to package.json dependencies.

2. Metrics Setup
   • In `src/lib/main.js`, import `prom-client` and initialize a Registry.
   • Register default process and runtime metrics via `collectDefaultMetrics({ register })`.
   • Define custom metrics:
     - `api_request_count` Counter labeled by `method` and `endpoint`.
     - `api_request_duration_seconds` Histogram labeled by `endpoint` and `algorithm` with appropriate buckets.

3. Middleware Integration
   • Before all routes, add an Express middleware that:
     - Records a start time when a request arrives.
     - Increments `api_request_count` with request method and path.
     - On response finish, observes duration in seconds into the histogram labeled with the path and parsed algorithm.

4. Metrics Endpoint
   • Add GET `/metrics` route after all other routes:
     - Set `Content-Type` to `text/plain; version=0.0.4`.
     - Return the output of `register.metrics()`.

# Testing

1. Unit Tests in `tests/unit/server.test.js`:
   - Mock an HTTP GET to `/pi?digits=2`, then to `/metrics`.
   - Assert `/metrics` returns 200, header `content-type` includes `text/plain`.
   - Confirm body contains lines matching `# TYPE api_request_count counter`, `api_request_count{method="GET",endpoint="/pi"}`, and histogram buckets for `api_request_duration_seconds`.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add **GET /metrics** describing the endpoint and how to scrape it with Prometheus.
   • Show example: `curl http://localhost:3000/metrics`.

2. README.md
   • Under **Features**, add **Metrics Exposure** with brief description and example usage for Prometheus integration.