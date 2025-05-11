# HTTP Rate Limiting Feature

## Overview
Implement request rate limiting for the HTTP API server to protect against abuse and ensure fair usage. This feature applies rate-limiting middleware to all endpoints and provides configurable limits via CLI flags.

## Functional Requirements
- Add dependency "express-rate-limit" to package.json.
- In src/lib/main.js, import rateLimit from 'express-rate-limit'.
- Accept new CLI flags:
  --rate-limit         Enable rate limiting middleware (boolean; default false).
  --rate-limit-window <ms>    Time window in milliseconds for rate limiting (integer ≥ 1000; default 60000).
  --rate-limit-max <n>        Maximum number of requests per window (integer ≥ 1; default 60).
- When --rate-limit is provided:
  - Before registering routes in startHttpServer, apply rateLimit({ windowMs, max, message }) as a global middleware.
  - Default response on limit exceeded: HTTP 429 with JSON { error: 'Too many requests, please try again later.' }.
- Validate CLI inputs and exit with a descriptive error for invalid values.

## CLI Interface
- Flags:
  --rate-limit
  --rate-limit-window <ms>
  --rate-limit-max <n>
- Example:
  node src/lib/main.js --serve --port 3000 --rate-limit --rate-limit-window 60000 --rate-limit-max 100

## Dependencies
- Add "express-rate-limit" to dependencies in package.json.

## Testing
- Unit tests in tests/unit/http.test.js:
  - Mock express app and verify rateLimit middleware is applied when enabled.
  - Test invalid flag values produce descriptive errors and exit non-zero.
- CLI e2e tests in tests/e2e/http.test.js:
  - Start server with rate limiting enabled and a low max (e.g., max=2) and issue 3 rapid requests to any endpoint, asserting the third responds with 429 and correct JSON error.
  - Confirm normal behavior when --rate-limit is not provided or when under the limit.