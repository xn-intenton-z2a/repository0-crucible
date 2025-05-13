# Overview

Introduce unified monitoring endpoints to provide health and metrics for the HTTP API. This feature consolidates basic liveness/readiness checks with Prometheus-style metrics export, enabling observability and automated monitoring in production environments.

# Implementation

1. Dependencies
   • Add prom-client to dependencies in package.json.

2. Health Endpoint
   • Register GET /health returning JSON: { status: 'ok', uptime, timestamp }.
   • Use existing process.uptime and new Date() APIs.

3. Metrics Endpoint
   • In createApp(), import prom-client and initialize a Registry.
   • Create and register common metrics:
     – http_request_duration_seconds: Histogram of request durations labeled by method and route.
     – http_requests_total: Counter of total HTTP requests labeled by method and route.
   • Add middleware to record metrics for each incoming request:
     – Increment http_requests_total.
     – Start a timer and observe duration after response finishes.
   • Expose GET /metrics to return Registry.metrics() with Content-Type text/plain; version=0.0.4.

4. Middleware Ordering
   • Apply metrics middleware before all routes.
   • Ensure /health and /metrics are served without authentication.

# Testing

1. HTTP Tests (tests/unit/server.test.js)
   • GET /health returns 200, Content-Type application/json, and JSON body with status 'ok', numeric uptime, and ISO timestamp.
   • GET /metrics returns 200, Content-Type text/plain; version=0.0.4, and a payload including metrics names http_request_duration_seconds and http_requests_total.
   • Record metrics by making a request to /pi then GET /metrics and assert counters increased.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, document **GET /health** and **GET /metrics** with examples. Show sample Prometheus scrape.

2. README.md
   • Under **Features**, add **API Monitoring** with brief description and examples:
     - curl http://localhost:3000/health
     - curl http://localhost:3000/metrics