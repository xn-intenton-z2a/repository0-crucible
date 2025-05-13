# Overview

Consolidate HTTP security and documentation capabilities by adding IP-based rate limiting middleware and automated OpenAPI documentation with an interactive Swagger UI. This feature enhances API reliability, defends against abuse, and improves developer discoverability of endpoints without external references.

# Implementation

1. Dependencies
   • Add `express-rate-limit` and `swagger-ui-express` to dependencies in package.json.

2. Rate Limiting Middleware
   • Import rateLimit from 'express-rate-limit'.
   • Configure limiter with:
     - windowMs: from environment variable `RATE_LIMIT_WINDOW_MS` or default 60000 (1 minute)
     - max: from environment variable `RATE_LIMIT_MAX` or default 60 requests per window per IP
     - standardHeaders: true, legacyHeaders: false
     - message: `{ error: 'Too many requests, please try again later.' }`
   • Apply limiter globally in createApp() before all routes with `app.use(limiter)`.

3. OpenAPI & Swagger UI
   • Import swaggerUi from 'swagger-ui-express'.
   • Define `apiSpec` object conforming to OpenAPI 3.0 with `info`, `servers`, and `paths` for `/pi`, `/pi/data`, `/pi/chart`, `/dashboard`.
   • Add GET `/openapi.json` route to serve the JSON spec.
   • Mount Swagger UI middleware at `/docs` with `app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec))`.

# Testing

1. tests/unit/server.test.js:
   - Simulate over-limit requests for GET `/pi` to trigger HTTP 429; verify status, JSON message, and presence of rate-limit headers (`Retry-After`, `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`).
   - GET `/openapi.json` returns 200 and JSON containing `paths` with required endpoints.
   - GET `/docs` returns HTML containing 'SwaggerUIBundle'.

# Documentation

1. docs/USAGE.md:
   • Under **REST Endpoints**, add **Rate Limiting** section describing default limits and environment variables to override.
   • Add **API Documentation** section explaining how to access `/openapi.json` and `/docs`.

2. README.md:
   • Under **Features**, add **HTTP Hardening**: note that the API enforces per-minute IP rate limits and exposes an OpenAPI spec with interactive Swagger UI at `/docs`.