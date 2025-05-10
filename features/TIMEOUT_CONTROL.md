# Overview

This feature adds execution timeouts to long-running π computations and related operations. Users can specify a maximum time limit for CLI commands and HTTP API endpoints to prevent unresponsive or runaway tasks. When the timeout is reached, the operation is aborted and an appropriate error is returned.

# CLI Interface

--timeout <seconds>
    Abort the π computation, digit extraction, or benchmark run if it exceeds the specified number of seconds. Accepts a positive integer or float. By default no timeout is applied.

# HTTP API

For endpoints that perform computation (/calculate, /digits, /benchmark, /stream):
  timeout: number (optional)
    Query parameter specifying the maximum number of seconds allowed for the operation. If exceeded, the server aborts the computation and responds with status code 503 and a JSON error message.

# Implementation

- In src/lib/main.js, parse the new --timeout flag for CLI commands and extract the timeout query parameter in HTTP handlers.
- Wrap each computational function (chudnovskyPi, bbpDigit loop for extraction, benchmarkPi, digit stream, etc.) in a Promise.race against a timeout promise:
    • Create a controller that rejects after timeout seconds with a custom TimeoutError.
    • When the timeout triggers, abort any in-progress computation (where supported) or ignore further callbacks.
- Ensure that for CLI:
    • On timeout, log an error message to stderr indicating the operation timed out, and exit with status code 2.
- For HTTP API:
    • Catch the TimeoutError in each route handler.
    • Respond with status code 503 Service Unavailable, Content-Type application/json, and a body { error: "Operation timed out after X seconds" }.
- No additional dependencies are required; rely on built-in setTimeout and Promise rejection.

# Testing

- Add unit tests in tests/unit/main.test.js:
    • Simulate a long-running mock chudnovskyPi and invoke main with --timeout 0.01; verify process exits with code 2 and stderr contains timeout message.
    • Test that without --timeout, the same mock completes normally.
    • For HTTP handlers, start the server on a random port and send GET /calculate?digits=...&timeout=0; verify 503 status and JSON error response.
    • Simulate a successful request with timeout greater than execution time and verify correct response.

# Documentation

- Update README.md under Features:
    • Document the --timeout flag and the timeout query parameter.
    • Show example CLI usage:
        node src/lib/main.js --calculate-pi 100000 --timeout 60
    • Show example HTTP usage:
        curl http://localhost:3000/calculate?digits=1000&timeout=5
