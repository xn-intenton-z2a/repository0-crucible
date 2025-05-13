# Overview

Introduce IP-based rate limiting middleware to the HTTP API endpoints to protect against abuse and ensure fair usage. Each client IP is limited to a fixed number of requests per time window, returning HTTP 429 when exceeded. This enhances API reliability and defends against denial-of-service patterns.

# Implementation

1. Dependency
   • Add `express-rate-limit` to dependencies in package.json.

2. Middleware Configuration
   • In src/lib/main.js, import rateLimit from 'express-rate-limit'.
   • Define a limiter with options:
     - windowMs: 60 * 1000 (1 minute)
     - max: 60 (max 60 requests per minute per IP)
     - standardHeaders: true
     - legacyHeaders: false
     - message: { error: 'Too many requests, please try again later.' }
   • Apply limiter globally before all routes with `app.use(limiter)`.

3. Customization
   • Allow overriding windowMs and max via environment variables RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX.
   • Parse numeric values with defaults if not set.

# Testing

1. Unit Tests in tests/unit/server.test.js:
   - Configure test to simulate more than max requests:
     • Perform 61 GET requests to `/pi` quickly.
     • Expect the 61st response to have status 429 and JSON body `{ error: 'Too many requests, please try again later.' }`.
   - Test that headers `Retry-After` and rate-limit headers (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`) are present.

# Documentation

1. docs/USAGE.md:
   • Under **REST Endpoints**, add **Rate Limiting** section describing default limits and how to configure via environment variables.

2. README.md:
   • Under **Features**, add **Rate Limiting** with a brief note that the API enforces per-minute limits and returns HTTP 429 on excess.
