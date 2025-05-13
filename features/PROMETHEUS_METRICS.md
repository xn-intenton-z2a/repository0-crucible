# Overview

Expose Prometheus-style metrics via a dedicated HTTP endpoint to enable monitoring of API usage and performance of π calculation services. Capture request counts and latency distributions for each route.

# Implementation

1. Dependencies
   • Add prom-client to package.json dependencies.

2. Metrics Registration
   • Import promClient from 'prom-client'.
   • Create a Counter http_request_count with labels method and route.
   • Create a Histogram http_request_duration_seconds with labels method and route configured with suitable buckets.

3. Instrumentation Middleware
   • On each incoming request, record start time in request context.
   • After response is finished, increment the counter and observe duration in the histogram with labels request.method and request.path.

4. Metrics Endpoint
   • Add GET /metrics route in createApp().
   • Return metrics via promClient.register.metrics() and set Content-Type to text/plain; version=0.0.4.

# Testing

1. tests/unit/server.test.js:
   - Test GET /metrics returns 200 and Content-Type text/plain; version=0.0.4.
   - Assert response body contains metrics named http_request_count and http_request_duration_seconds.
   - After calling /pi, GET /metrics again to verify http_request_count increased for the /pi route.

# Documentation

1. docs/USAGE.md:
   • Under **REST Endpoints**, add **GET /metrics** with description and example:
     curl http://localhost:3000/metrics

2. README.md:
   • Under **Features**, add **Metrics Exposure** describing Prometheus metrics endpoint for request counts and latencies.