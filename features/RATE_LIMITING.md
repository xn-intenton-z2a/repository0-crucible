# Overview

Introduce request rate limiting for HTTP API endpoints to prevent abuse and ensure fair usage. Limit client requests per time window, returning HTTP 429 when limits are exceeded, and expose standard rate limit headers to inform clients.

# Implementation

1. Dependencies
   • Add `express-rate-limit` to dependencies.

2. Configuration
   • Support environment variables:
     - `RATE_LIMIT_WINDOW_MS` (default: 60000) for time window in milliseconds.
     - `RATE_LIMIT_MAX_REQUESTS` (default: 100) for maximum requests per IP within the window.
     - `RATE_LIMIT_STANDARD_HEADERS` (default: true) to enable standard rate limit response headers.
     - `RATE_LIMIT_LEGACY_HEADERS` (default: false) for legacy header support.

3. Middleware Setup
   • In `createApp()`, import rateLimit from `express-rate-limit`.
   • Create a global rate limiter using configured options.
   • Apply the rate limiter to all API routes (`/pi`, `/pi/data`, `/pi/chart`, `/benchmark`, `/dashboard`, `/docs`, etc.) before route handlers.

4. Error Handling
   • When a client exceeds the limit, express-rate-limit will automatically return HTTP 429 with a JSON body `{ message: 'Too many requests, please try again later.' }`.

# Testing

1. Unit Tests (`tests/unit/server.test.js`)
   • Mock `express-rate-limit` to return a dummy middleware and verify it is applied to app.
   • Simulate rapid requests exceeding the limit and assert the 429 status and error JSON.
   • Verify rate limit headers (`RateLimit-Limit`, `RateLimit-Remaining`, `Retry-After`) appear in responses.

2. Integration Tests
   • Use `supertest` to send more than `RATE_LIMIT_MAX_REQUESTS` within the window and confirm HTTP 429.
   • Test that well within limits requests return 200.

# Documentation

1. docs/USAGE.md:
   • Under **REST Endpoints**, add note about rate limiting defaults and configuration via environment variables.
   • Show example of HTTP 429 response.

2. README.md:
   • Under **Features**, add **Rate Limiting** with description of request caps and examples of configuring limits.
