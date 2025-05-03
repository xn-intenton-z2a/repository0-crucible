# HTTP_API Feature

## Overview
Provide an HTTP server mode for the emoticon CLI that exposes endpoints for random emoticon selection, deterministic seeding, full list retrieval over HTTP, JSON count support, version reporting, and monitoring via metrics. This feature enables integration of the emoticon service into web-based workflows, dashboards, and monitoring systems.

**All responses include Access-Control-Allow-Origin: * by default.**

## Configuration
The HTTP server supports loading a custom emoticon list using the same mechanism as the CLI:

- CLI Flag: `--config <path>` to a JSON or YAML file.
- Environment Variable: `EMOTICONS_CONFIG` if the CLI flag is not provided.

When using a custom list, endpoints `/`, `/list`, `/json`, `/json?seed=<n>`, `/json?count=<n>`, and `/json/list` will use emoticons from the provided list:

```bash
# Start server with custom JSON config
node src/lib/main.js --serve --config fixtures/custom.json

# Start server with custom YAML config via env var
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --serve
```

## Endpoints

- **GET /**
  - Returns a single random emoticon as plain text.
  - Content-Type: `text/plain`
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /list**
  - Returns all available emoticons, one per line in plain text.
  - Content-Type: `text/plain`
  - Increments `emoticon_requests_list_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json**
  - Returns a JSON object: `{ "face": string, "mode": "random", "seed": null }`.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json?seed=<n>**
  - If `<n>` is a non-negative integer, returns `{ "face": string, "mode": "seeded", "seed": <n> }` deterministically selected.
  - If `<n>` is invalid, responds with status 400 and error message.
  - Content-Type: `application/json` (when requested via Accept header) or `text/plain`
  - Increments `emoticon_requests_json_total` and `emoticon_requests_seeded_total` metrics.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json?count=<n>**
  - If `<n>` is a non-negative integer, returns a JSON array of `<n>` emoticon strings, random by default.
  - When combined with `seed=<s>`, returns `<n>` deterministic emoticons starting from seed `<s>`, i.e., seeds `<s>`, `<s+1>`, ..., `<s+n-1>`.
  - If `<n>` or `<s>` is invalid, responds with status 400 and error message in JSON or plain text based on Accept header.
  - Increments `emoticon_requests_json_total` metric and, if seeded, `emoticon_requests_seeded_total`.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json?list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json/list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /version**
  - Returns the current application version.
  - Content-Type: `application/json`
  - Response body: `{ "version": string }`
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /health**
  - Returns OK for health check probing.
  - Content-Type: `text/plain`
  - Response body: `OK`
  - Does not increment any counters.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /metrics**
  - Returns a Prometheus-compatible metrics exposition of internal request counters.
  - Content-Type: `text/plain; version=0.0.4`
  - Exposes counters: `emoticon_requests_total`, `emoticon_requests_root_total`, `emoticon_requests_list_total`, `emoticon_requests_json_total`, `emoticon_requests_seeded_total`, `emoticon_requests_errors_total`.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **Any other path**
  - Responds with status 404.
  - If `Accept: application/json` header is present, returns `{ "error": "Not Found" }`.
  - Otherwise returns plain text `Not Found`.
  - **Includes header** `Access-Control-Allow-Origin: *`

## Non-GET Requests
All non-GET requests return status `404`. If `Accept: application/json` header is present, the response is JSON:

```json
{ "error": "Not Found" }
```

Otherwise, the response is plain text:

```
Not Found
```

Each non-GET request increments the `emoticon_requests_errors_total` counter.

## Example Usage with curl

```bash
# Random plain text
curl http://localhost:3000/

# List all emoticons in plain text
curl http://localhost:3000/list

# Random JSON
curl http://localhost:3000/json

# Seeded JSON (seed=2)
curl http://localhost:3000/json?seed=2

# JSON count (3 random emoticons)
curl http://localhost:3000/json?count=3

# Seeded JSON count (seeds 5,6,7)
curl http://localhost:3000/json?seed=5&count=3

# List JSON array via query
curl http://localhost:3000/json?list

# List JSON array via path
curl http://localhost:3000/json/list

# Version endpoint
curl http://localhost:3000/version

# Health endpoint
curl http://localhost:3000/health

# Metrics endpoint
curl http://localhost:3000/metrics

# Error: Invalid seed returns 400 (plain text)
curl http://localhost:3000/json?seed=abc

# Error: Invalid count returns 400 and JSON error
curl -H "Accept: application/json" http://localhost:3000/json?count=abc

# Unknown path returns 404 (plain text)
curl http://localhost:3000/unknown

# Unknown path returns 404 and JSON error
curl -H "Accept: application/json" http://localhost:3000/unknown

# Check CORS header
curl -I http://localhost:3000/  # Response headers include Access-Control-Allow-Origin: *
```