# Overview

Add API rate limiting to the HTTP server mode to protect CPU-intensive endpoints from excessive or abusive usage. This prevents denial-of-service scenarios and helps manage resource consumption when multiple clients call the service rapidly.

# CLI Interface

Extend main(args) to accept the following flags alongside --serve and --cors:

--rate-limit-window-ms <ms>    Time window in milliseconds for request counting (default: 60000)
--rate-limit-max <n>           Maximum number of requests allowed per window per IP (default: 60)

When the server mode is active, these options configure a rate limiter that applies to all HTTP API routes.

# Implementation Details

In src/lib/main.js:
• Install and import express-rate-limit from the "express-rate-limit" package.
• After creating the Express app and applying CORS, construct a rate limiter:
  const limiter = rateLimit({
    windowMs: opts.rateLimitWindowMs,
    max: opts.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
  });
• Apply limiter as middleware on the app before defining routes: app.use(limiter).
• Parse the new flags in main (argv) and expose them in opts.rateLimitWindowMs and opts.rateLimitMax (default values if flags omitted).
• Ensure invalid values (non-integer, negative) result in an error message and exit code 1 on startup, preventing the server from starting.

# Testing

Add tests in tests/unit/main.test.js and tests/e2e/cli.test.js:
• Unit tests with supertest: configure server with a low max (e.g., 2 requests per window) and verify that a third request to /pi?digits=1 within the same window yields status 429 and an appropriate JSON error message.
• Test flag parsing: invoking CLI with --serve 0 --rate-limit-window-ms 1000 --rate-limit-max 1 starts the server and enforces a single request per second.
• Test invalid flag values: passing non-numeric or negative values for rate-limit flags triggers console.error and process.exit(1) without server startup.

# Documentation

Update README.md under HTTP API:
• Document the new --rate-limit-window-ms and --rate-limit-max flags and their defaults.
• Provide examples:
    node src/lib/main.js --serve 3000 --rate-limit-window-ms 60000 --rate-limit-max 100
    curl http://localhost:3000/pi?digits=10
    # After 100 requests: HTTP/1.1 429 Too Many Requests

• Note that the limiter uses IP-based counting and sends standard rate-limit headers.