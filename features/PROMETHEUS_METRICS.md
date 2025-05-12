# Overview

Introduce Prometheus metrics collection and exposition to monitor the application’s performance, request rates, and error counts. Users can integrate the service into their observability stack to track API usage, algorithm execution times, and resource usage in real time.

# Implementation

1. Dependency
   • Add prom-client@^14.0.0 to package.json dependencies.

2. Metrics Registry and Defaults
   • In src/lib/main.js at module scope, import Prometheus from 'prom-client'.
   • Create a Registry instance and register default metrics (process CPU, memory, event loop lag).
   • Configure default collection interval via PROM_METRICS_INTERVAL environment variable (default: 5000 ms).

3. Custom Metrics
   • Define a Histogram named `http_request_duration_seconds` labeled by `method` and `route` to record handler durations in seconds.
   • Define a Counter named `http_requests_total` labeled by `method`, `route`, and `status_code` to count requests by outcome.
   • Define a Counter named `pi_calculations_total` labeled by `algorithm` and `type` (cli or http) to track calculation invocation counts.

4. HTTP Integration
   • In createApp(), before any routes, mount middleware that:
     – Starts a timer from the histogram on request start.
     – On response finish, record duration, increment request counter with method, route, and status code labels.
   • In each π calculation branch inside /pi handler, increment `pi_calculations_total` with algorithm label and type=http.
   • Expose a new endpoint `GET /metrics` that:
     – Sets Content-Type to `register.contentType`.
     – Returns the metrics registry output via `registry.metrics()`.

5. CLI Integration (Optional)
   • For CLI main(), after each calculation, increment `pi_calculations_total` with type=cli. Registry may be exported for external collection in long-lived CLI processes.

6. Failure Handling
   • Wrap metrics collection and exposition in try/catch. On errors, log warnings but do not impact primary execution.

# Testing

1. Unit Tests in tests/unit/server.test.js:
   - Mock prom-client to verify default metrics registered once.
   - Simulate a request to /pi and /metrics; verify metrics text output contains `http_requests_total` and `http_request_duration_seconds_bucket`.
   - Validate that after calling /pi, the pi_calculations_total counter increases with correct labels.

2. CLI Metrics Export Tests:
   - Spy on prom-client Counter.inc in main() path to ensure pi_calculations_total is incremented for CLI calls.

# Documentation

1. docs/USAGE.md:
   • Add **Metrics** section describing how to enable metrics via PROM_METRICS_INTERVAL and access /metrics endpoint.
   • Provide cURL example:
     curl http://localhost:3000/metrics

2. README.md:
   • Under **Features**, add **Prometheus Metrics** describing metrics exposure on /metrics and default metric names.
