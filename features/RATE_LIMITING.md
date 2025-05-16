# Overview

Enhance HTTP API resilience by adding per-client rate limiting middleware using express-rate-limit. Clients are limited to a configurable number of requests per time window to prevent abuse and ensure service stability under load.

# Implementation

1. Dependencies
   • Add express-rate-limit to dependencies in package.json.

2. Configuration
   • Support environment variables RATE_LIMIT_WINDOW_MS (default 60000) and RATE_LIMIT_MAX (default 60).
   • In createApp, read and parse these values as integers.

3. Middleware Setup
   • Import rateLimit from express-rate-limit.
   • Define a limiter: rateLimit({
       windowMs: windowMs,
       max: maxRequests,
       standardHeaders: true,
       legacyHeaders: false,
       handler: (req, res) => {
         res.status(429).json({ error: 'Too many requests, please try again later.' });
       }
     });
   • Apply limiter globally before all routes.

4. Health Endpoints Exemption
   • Bypass rate limiting for `/healthz` and `/ready` endpoints by mounting limiter only on API routes under `/` except health checks.

# Testing

1. Unit Tests in tests/unit/server.test.js:
   • Mock environment variables for windowMs and max.
   • Send requests exceeding the limit and assert status 429 and JSON error.
   • Verify headers `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` are present.
   • Confirm normal requests under the limit return status 200 for `/pi`.
   • Confirm `/healthz` and `/ready` are unaffected by rate limiting.

# Documentation

1. docs/USAGE.md:
   • Under **REST Endpoints**, add note that API endpoints are rate limited with default window and max.
   • Provide example of hitting limit:
     ```bash
     for i in {1..70}; do curl -i http://localhost:3000/pi; done
     ```

2. README.md:
   • Under **Features**, add **Rate Limiting** with description of default limits and env vars.
   • Show how to configure:
     ```bash
     RATE_LIMIT_WINDOW_MS=60000 RATE_LIMIT_MAX=100 npm run serve
     ```