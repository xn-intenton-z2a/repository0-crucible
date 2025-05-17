# Overview

Consolidate API key authentication and per-client rate limiting into a unified protection middleware to secure and stabilize all HTTP endpoints.  Ensure only authorized clients can access protected routes and prevent abuse by limiting request rates under configurable thresholds.

# Implementation

1. Dependencies
   • Add express-rate-limit to dependencies in package.json (if not already present).
   • No new dependencies for API key parsing.

2. Configuration
   • Read environment variables:
     – API_KEYS: comma-separated list of valid API keys.
     – RATE_LIMIT_WINDOW_MS: time window in ms (default 60000).
     – RATE_LIMIT_MAX: max requests per window (default 60).
     – DISABLE_API_PROTECTION: optional flag (true to bypass both in development).

3. Middleware Setup
   • Create authenticateApiKey(req, res, next):
     – Extract key from X-API-KEY header or api_key query param.
     – If env DISABLE_API_PROTECTION is true or NODE_ENV is development, skip.
     – If missing or invalid, respond 401 with header WWW-Authenticate: API key realm="api" and JSON { error: "Unauthorized" }.
     – On valid key, attach req.apiKey and call next().

   • Create rateLimiter using express-rate-limit:
     – Options: windowMs, max, standardHeaders: true, legacyHeaders: false.
     – Custom handler: respond 429 with JSON { error: 'Too many requests, please try again later.' }.
     – Exempt health checks by mounting limiter on all routes except /healthz and /ready.

4. Integration in createApp()
   • Apply authenticateApiKey and rateLimiter globally (order: authentication first, then rate limiting).
   • Bypass middleware when DISABLE_API_PROTECTION=true or in development.
   • Protect all routes: /pi, /pi/data, /pi/chart, /pi/stream, /dashboard, /metrics, /benchmark.

# Testing

1. Unit Tests in tests/unit/server.test.js:
   • Valid API key in header/query yields 200 for protected endpoints.
   • Missing or invalid key yields 401 with correct WWW-Authenticate header and JSON error.
   • DISABLE_API_PROTECTION=true or NODE_ENV=development bypasses checks.
   • Rate limiting: simulate exceeding RATE_LIMIT_MAX in RATE_LIMIT_WINDOW_MS and assert 429, JSON error, and rate limit headers RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset.
   • Confirm health endpoints /healthz and /ready not affected by rate limiting.

# Documentation

1. docs/USAGE.md:
   • Under **REST Endpoints**, add notes for API key auth requirement and rate limiting defaults.  Provide examples:
     ```bash
     curl -H "X-API-KEY: yourkey" http://localhost:3000/pi
     for i in {1..70}; do curl -i -H "X-API-KEY: yourkey" http://localhost:3000/pi; done
     ```

2. README.md:
   • Under **Features**, replace separate **API Key Authentication** and **Rate Limiting** entries with **API Protection** summarizing both capabilities and configuration via env vars.