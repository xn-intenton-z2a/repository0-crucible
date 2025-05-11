# Overview

Add a Prometheus metrics endpoint to the HTTP server mode to expose operational and performance metrics in text format. This allows service operators to integrate monitoring and alerting using Prometheus or compatible tools.

# Implementation Details

• Add prom-client as a dependency in package.json.
• In src/lib/main.js during server setup when --serve is enabled:
  • Import { Registry, Counter, Histogram, collectDefaultMetrics } from 'prom-client'.
  • Instantiate a Registry and call collectDefaultMetrics({ register: registry }).
  • Create a Counter metric http_requests_total with labels method and route.
  • Create a Histogram metric pi_calculation_duration_seconds to observe durations of PI computations.
  • In middleware before each handler, increment http_requests_total with route and method.
  • Wrap calculatePi and related operations to record execution time via histogram.observe(duration).
  • Define GET /metrics route that sets content type to 'text/plain; version=0.0.4' and responds with registry.metrics().

# Testing

• Unit tests in tests/unit/main.test.js using supertest:
  - Start server with main(["--serve","0"]).
  - Perform sample requests such as GET /pi?digits=5 and then GET /metrics.
  - Assert /metrics responds status 200, content type includes text/plain, and body contains http_requests_total and pi_calculation_duration_seconds.
  - Test that multiple /pi requests increment the counter values (using regex on metrics output).
  - Test error routes increment http_requests_total with correct labels.

# Documentation

• Update README.md under HTTP API section to add a Metrics subsection:
  - Describe the metrics endpoint URL: /metrics.
  - Note default content type and Prometheus text format version.
  - Provide example:
      curl http://localhost:3000/metrics
  - List key metrics exposed: process metrics, http_requests_total, pi_calculation_duration_seconds.
