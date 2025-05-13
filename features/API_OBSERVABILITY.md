# Overview

Consolidate HTTP security and observability into a unified feature that enhances API reliability, defenses, and monitoring by combining rate limiting, automated OpenAPI documentation with interactive Swagger UI, and Prometheus metrics exposure.

# Dependencies

- express-rate-limit
- swagger-ui-express
- prom-client

# Implementation

1. Rate Limiting Middleware
   - Import rateLimit from express-rate-limit
   - Configure limiter with windowMs read from RATE_LIMIT_WINDOW_MS (default 60000) and max from RATE_LIMIT_MAX (default 60)
   - Enable standardHeaders and disable legacyHeaders
   - Apply limiter globally in createApp before all routes

2. OpenAPI Documentation and Swagger UI
   - Define an apiSpec object conforming to OpenAPI version 3.0 with info, servers, and paths for /pi, /pi/data, /pi/chart, and /dashboard
   - Add GET /openapi.json route returning the JSON spec
   - Mount swagger-ui-express middleware at /docs to serve interactive UI based on apiSpec

3. Prometheus Metrics Exposure
   - Import promClient from prom-client
   - Create a Counter http_request_count with labels method and route
   - Create a Histogram http_request_duration_seconds with labels method and route and appropriate buckets
   - Add middleware to record request start time, then on response finish increment counter and observe duration
   - Add GET /metrics route returning promClient.register.metrics() with Content-Type text/plain; version=0.0.4

# Testing

- Simulate exceeding rate limits for GET /pi to verify HTTP 429 status, JSON error message, and presence of Retry-After, RateLimit-Limit, RateLimit-Remaining, and RateLimit-Reset headers
- GET /openapi.json should return status 200 and JSON object containing the defined paths
- GET /docs should return status 200 HTML containing swagger UI bundle identifiers
- GET /metrics should return status 200 text plain metrics including http_request_count and http_request_duration_seconds metrics entries

# Documentation

- Update docs/USAGE.md under REST Endpoints to include sections for rate limiting, API documentation, and metrics exposure with examples
- Update README.md under Features to describe API Observability with rate limiting, OpenAPI spec, Swagger UI at /docs, and Prometheus metrics at /metrics