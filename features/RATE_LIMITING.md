# Overview

Provide configurable rate limiting middleware for the HTTP API endpoints to prevent abuse and ensure fair usage. Users can adjust the request window duration and maximum allowed requests via CLI flags or environment variables. Rate limiting is applied to /pi, /pi/data, /pi/chart, and /dashboard routes by default with sensible defaults to protect service stability.

# Implementation

1. Dependencies
   • Install express-rate-limit and add it to dependencies in package.json.

2. Configuration
   • CLI Integration: Add --rate-limit-window (number, milliseconds) and --rate-limit-max (number of requests) to minimist flags and extend Zod CLIOptionsSchema. Support environment variables RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX as fallback values.
   • Default values: windowMs = 900000 (15 minutes), max = 100 requests.

3. Middleware Setup
   • In createApp(), import rateLimit from express-rate-limit.
   • Before registering the /pi, /pi/data, /pi/chart, and /dashboard routes, apply rateLimit middleware configured with the resolved windowMs and max.
   • Ensure error responses return HTTP 429 with JSON body { error: "Too many requests" }.

4. Fallback Behavior
   • On invalid or missing CLI flags and env vars, use default limits. If parsing fails, log a warning but continue with defaults.

# Testing

1. HTTP Tests (tests/unit/server.test.js)
   • Issue more than max requests within a short window and assert that subsequent requests to /pi return HTTP 429 and JSON { error: "Too many requests" }.
   • Test custom limits by starting the server with CLI flags or env vars and verifying behavior.

# Documentation

1. docs/USAGE.md
   • Under REST Endpoints, document rate limiting behavior and new CLI flags --rate-limit-window, --rate-limit-max, and environment variables RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX.

2. README.md
   • Under Features, add **API Rate Limiting** with a description and example usage showing how to configure limits via CLI and env vars.
