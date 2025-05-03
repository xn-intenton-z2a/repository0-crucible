# HTTP_API Feature

# Overview
Extend existing HTTP server mode to expose Prometheus metrics and a version endpoint reporting the application version, and enhance CLI mode with a version flag.

# Endpoints
GET /metrics
  Returns metrics in Prometheus text exposition format with HELP and TYPE headers.
  Content-Type: text/plain; version=0.0.4

GET /version
  Returns a JSON object with the current application version
  Content-Type: application/json
  Response body: { version: string }

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
- Detect --version or -v flags at the start of main before any other mode
- Import version from package.json via version export
- On version flag, call console.log with version and process.exit(0)
- HTTP server handlers remain unchanged and continue to handle metrics and version endpoints without incrementing counters

# Tests
In tests/unit/main.test.js:
- Spy on console.log and process.exit and verify main(['--version']) logs version from package.json and exits with code 0
- Verify main(['-v']) behaves identically
- Ensure existing HTTP tests for GET /version and GET /metrics continue to pass