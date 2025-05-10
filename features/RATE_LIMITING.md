# Overview

This feature introduces a configurable rate limiting mechanism for the HTTP API server to prevent clients from making excessive requests. It enforces per-IP request quotas over a sliding time window, improving server reliability and guarding against abuse.

# CLI Interface

--rate-limit <number>
    Maximum allowed HTTP requests per client IP in each time window. Accepts a positive integer. Default is 100.

--rate-limit-window <seconds>
    Length of the time window in seconds for rate limit counting. Accepts a positive integer. Default is 60.

--no-rate-limit
    Disable rate limiting entirely, allowing unlimited requests.

# HTTP API

When the server is started with --serve and rate limiting is enabled:
  • Each incoming request is tracked by client IP.  
  • If a client exceeds the specified rate-limit within the configured window, the server responds with status code 429 Too Many Requests and a JSON body { error: "Rate limit exceeded: X requests per Y seconds" } where X and Y reflect configured values.
  • Rate limiting applies to all API endpoints (/calculate, /digits, /benchmark, /stream, /metrics, /algorithms).

# Implementation

- In src/lib/main.js:
  • Parse the --rate-limit, --rate-limit-window, and --no-rate-limit flags at startup.
  • When starting the HTTP server, if rate limiting is enabled, create an in-memory Map that tracks for each client IP: count of requests and timestamp of window start.
  • For each request:
    1. Determine client IP from request.socket.remoteAddress.
    2. If the window has expired for that IP, reset count and timestamp.
    3. Increment the request count.  
    4. If the count exceeds the configured limit, immediately respond with 429 and do not forward to handlers.
    5. Otherwise, pass the request to the existing route handlers.
  • Ensure that entries in the Map are cleaned up after the window expires to avoid memory growth.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock requests from the same IP and simulate multiple calls to the server handler within a single window; verify that after exceeding the limit the response status is 429 with the correct JSON error.
  • Simulate requests spaced beyond the rate-limit-window boundary and verify that counts reset and requests are accepted again.
  • Test that --no-rate-limit disables enforcement even after many requests.
  • Verify that other endpoints and functionality behave as expected when rate limiting is active and when disabled.

# Documentation

- Update README.md under Features to describe the new flags --rate-limit, --rate-limit-window, and --no-rate-limit.
- Provide example commands:
    node src/lib/main.js --serve --rate-limit 50 --rate-limit-window 30
    curl http://localhost:3000/calculate?digits=1000
- Explain the 429 response and how to adjust limits for production use.