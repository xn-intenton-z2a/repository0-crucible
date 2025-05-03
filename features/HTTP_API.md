# HTTP_API Feature

# Overview
Extend the existing HTTP server mode with an embeddable Express middleware interface. Maintain all current endpoints, metrics, version and health checks while allowing users to integrate emoticon routes into their own Express applications via a provided router factory.

# Endpoints

All current endpoints remain unchanged when running built-in server mode:

GET /metrics
  Returns Prometheus metrics with HELP and TYPE headers
  Content-Type: text/plain; version=0.0.4

GET /version
  Returns JSON object with { version: string }
  Content-Type: application/json

GET /health
  Returns OK
  Content-Type: text/plain

GET /
  Returns a random emoticon in plain text

GET /list
  Returns all emoticons one per line in plain text

GET /json
  Returns JSON object for random or seeded selection
  Supports query parameter seed=<n>

GET /json/list
  Returns JSON array of all emoticon strings

Any other GET path
  Returns 404 with JSON or plain text error based on Accept header

Non-GET requests
  Return 404 and increment emoticon_requests_errors_total

# Express Middleware

Provide a function createEmoticonRouter(options) that returns an Express Router mounted with the same endpoint handlers. Options may include:
  basePath: string (default '/')
  metricsPrefix: string (default '')
  initialCounters: object (override default counters)
The router uses the same request counters and config loading logic as the built-in server mode.

# CLI Options

--serve       Start built-in HTTP server mode (listening port defaults to 3000)
--port <n>    Specify HTTP server port; invalid values result in an error and exit code 1

# Implementation Details

1. In src/lib/main.js, export createEmoticonRouter alongside main and version.
2. Use an internal function that accepts an http.Server or Express Router to mount handlers.
3. Maintain a single counters object shared between built-in and middleware modes.
4. Ensure health endpoint does not increment counters and metrics endpoint reflects current values without side effects.
5. Do not alter existing behavior of built-in server when using --serve.

# Tests

- Verify createEmoticonRouter returns an Express Router with all endpoints responding as in standalone mode.
- Use supertest to mount router on an Express app and assert each path (/ , /list, /json, /version, /health, /metrics, unknown) behaves correctly.
- Test that non-GET requests on the middleware increment errors counter and return proper format based on Accept header.

# Documentation

Update docs/HTTP_API.md to include Express Middleware section and usage examples. Update README.md to reference createEmoticonRouter in Programmatic API examples.