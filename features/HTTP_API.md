# HTTP_API Feature

# Overview
Extend existing HTTP server mode to expose Prometheus metrics and version endpoint reporting application version, enhance CLI mode with version flag, and add healthcheck endpoint for monitoring systems.

# Endpoints
GET /metrics
  Returns metrics in Prometheus text exposition format with HELP and TYPE headers
  Content-Type: text/plain; version=0.0.4

GET /version
  Returns a JSON object with the current application version
  Content-Type: application/json
  Response body: { version: string }

GET /health
  Returns OK for health check probing
  Content-Type: text/plain
  Response body: OK

GET /
  Returns a random emoticon in plain text

GET /list
  Returns all emoticons one per line in plain text

GET /json
  Returns a JSON object for random or seeded emoticon based on query parameters

GET /json/list
  Returns a JSON array of all emoticons

Any other GET path
  Returns 404 with JSON or plain text error depending on Accept header

# CLI Options
--serve       Start HTTP server mode instead of CLI
--port <n>    Set listening port (default 3000)
--version     Show application version and exit
-v            Alias for --version

# Implementation Details
In src/lib/main.js:
- Detect --version or -v flags before any other mode and exit after logging version
- Add GET /health handler before emoticon routes to return status 200 and text OK without incrementing counters
- Keep existing handlers for metrics, version, emoticons, JSON modes unchanged except ensure health does not affect counters
- Do not increment any counters when serving /health

# Tests
In tests/unit/server.test.js:
- Add test for GET /health returns status 200 with content-type text/plain and body OK
- Verify that calling /health does not change metrics values

In tests/unit/main.test.js:
- Ensure main with flags --serve and --port still starts server with health endpoint available as described