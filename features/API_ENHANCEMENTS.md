# Overview

Consolidate and enhance HTTP API capabilities by providing a machine-readable OpenAPI specification, an interactive Swagger UI at `/docs`, a server-sent events streaming endpoint for iterative π approximation at `/pi/stream`, and global request rate limiting to protect against abuse. This unified feature ensures comprehensive API documentation, real-time progress updates, and secure usage limits.

# Implementation

1. Dependencies
   • Add `swagger-ui-express` and `express-rate-limit` to `package.json` dependencies.

2. OpenAPI Specification Endpoint
   • In `createApp()`, construct an `openapiSpec` object defining all existing endpoints (`/pi`, `/pi/data`, `/pi/chart`, `/pi/stream`, `/benchmark`, `/dashboard`).
   • Include path parameters, query schemas, request and response bodies, and SSE event definitions for `/pi/stream`.
   • Register GET `/openapi.json` returning the JSON spec: `res.json(openapiSpec)`.

3. Swagger UI Setup
   • In `createApp()`, import `swaggerUi` from `swagger-ui-express`.
   • Add middleware: `app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec))` to serve interactive documentation.

4. Server-Sent Events Streaming Endpoint
   • In `createApp()`, register GET `/pi/stream`.
   • Parse and validate query parameters via the existing `ApiParamsSchema`.
   • Set SSE headers (`Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`).
   • Compute π approximation updates (Leibniz, sampling, etc.) and periodically `res.write` frames:
     ```
     data: { index, approximation, error }
     
     ```
   • Send `event: end` at completion and close the stream.

5. Rate Limiting Middleware
   • Import `rateLimit` from `express-rate-limit` in `createApp()`.
   • Configure global limiter using env vars (`RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`, `RATE_LIMIT_STANDARD_HEADERS`, `RATE_LIMIT_LEGACY_HEADERS`).
   • Apply to all API routes before handlers: `app.use(rateLimit(config))`.

# Testing

1. Unit Tests (`tests/unit/server.test.js`)
   • Verify GET `/openapi.json` returns status 200 with the correct JSON spec.
   • Verify GET `/docs` returns HTML containing Swagger UI assets.
   • Simulate SSE connection to `/pi/stream`, mock `res.write`, assert SSE frames and final `event: end`.
   • Mock `express-rate-limit` middleware and verify it is applied; simulate exceed limit and assert HTTP 429 with JSON error and rate limit headers.

# Documentation

1. `docs/USAGE.md`
   • Under **REST Endpoints**, add sections for **GET /openapi.json**, **GET /docs**, and **GET /pi/stream** with usage examples.
   • Document environment variables for rate limiting and example 429 response.

2. `README.md`
   • Under **Features**, replace separate OpenAPI UI and Rate Limiting entries with **API Enhancements** describing machine-readable spec at `/openapi.json`, interactive docs at `/docs`, SSE progress at `/pi/stream`, and request caps with config via environment variables.
   • Provide example `curl` commands and sample rate limit headers.
