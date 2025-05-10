# Overview
This feature adds a Prometheus-compatible metrics endpoint to the existing HTTP API server, exposing application and algorithm performance metrics in plain text format suitable for scraping by Prometheus or other monitoring systems.

# CLI Interface
When the server is started with --serve, a new endpoint GET /metrics is available:

GET /metrics  
  Returns current application metrics in Prometheus exposition format.

# Implementation
- Add a dependency on prom-client for metrics collection.
- In src/lib/main.js, import prom-client and create a Registry instance.
- Define and register metrics:
  • Counter calculation_requests_total with label algorithm for count of calculation requests.
  • Histogram calculation_duration_seconds recording latencies of pi computations.
  • Counter cache_hits_total and cache_misses_total for caching behavior.
  • Gauge active_requests for current in-flight requests.
- Instrument existing handlers (calculate, extract-digit, benchmark, list-algorithms, diagnostics) to update these metrics appropriately.
- In the HTTP server setup, add a route handler for GET /metrics:
  • Set response header Content-Type: text/plain; version=0.0.4; charset=utf-8
  • Write registry.metrics() output and end with status code 200.
- Ensure metrics endpoint does not trigger any computation logic and is accessible without query parameters.

# Testing
- Add unit tests in tests/unit/main.test.js:
  • Start the HTTP server with a random available port.
  • Invoke GET /metrics and verify status code 200 and Content-Type header.
  • Check that response body contains expected metric names (calculation_requests_total, calculation_duration_seconds).
  • Simulate a calculation request then request /metrics again and verify counter increments.
- Mock prom-client regulators if needed to avoid real registry state across tests.

# Documentation
- Update README.md under Features:
  • Document the /metrics endpoint and its purpose.
  • Provide example usage:  
    curl http://localhost:3000/metrics
  • Note dependency on prom-client and how to enable metrics in production environments.
