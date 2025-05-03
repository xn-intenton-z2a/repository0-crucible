# HTTP_API Feature

## Overview
Provide an HTTP server mode for the emoticon CLI that exposes endpoints for random emoticon selection, deterministic seeding, full list retrieval over HTTP, version reporting, and monitoring via metrics. This feature enables integration of the emoticon service into web-based workflows, dashboards, and monitoring systems.

## Configuration
The HTTP server supports loading a custom emoticon list using the same mechanism as the CLI:

- CLI Flag: `--config <path>` to a JSON or YAML file.
- Environment Variable: `EMOTICONS_CONFIG` if the CLI flag is not provided.

When using a custom list, endpoints `/`, `/list`, `/json`, `/json?seed=<n>`, and `/json/list` will use emoticons from the provided list:

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

- **GET /list**
  - Returns all available emoticons, one per line in plain text.
  - Content-Type: `text/plain`
  - Increments `emoticon_requests_list_total` metric.

- **GET /json**
  - Returns a JSON object: `{ "face": string, "mode": "random", "seed": null }`.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.

- **GET /json?seed=<n>**
  - If `<n>` is a non-negative integer, returns `{ "face": string, "mode": "seeded", "seed": <n> }` deterministically selected.
  - If `<n>` is invalid, responds with status 400 and error message.
  - Content-Type: `application/json` (when requested via Accept header) or `text/plain`
  - Increments `emoticon_requests_json_total` and `emoticon_requests_seeded_total` metrics.

- **GET /json?list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.

- **GET /json/list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.

- **GET /version**
  - Returns the current application version.
  - Content-Type: `application/json`
  - Response body: `{ "version": string }`

- **GET /metrics**
  - Returns a Prometheus-compatible metrics exposition of internal request counters.
  - Content-Type: `text/plain; version=0.0.4`
  - Exposes counters: `emoticon_requests_total`, `emoticon_requests_root_total`, `emoticon_requests_list_total`, `emoticon_requests_json_total`, `emoticon_requests_seeded_total`, `emoticon_requests_errors_total`.

- **Any other path**
  - Responds with status 404.
  - If `Accept: application/json` header is present, returns `{ "error": "Not Found" }`.
  - Otherwise returns plain text `Not Found`.

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

# List JSON array via query
curl http://localhost:3000/json?list

# List JSON array via path
curl http://localhost:3000/json/list

# Version endpoint
curl http://localhost:3000/version

# Metrics endpoint
curl http://localhost:3000/metrics

# Error: Invalid seed returns 400 (plain text)
curl http://localhost:3000/json?seed=abc

# Error: Invalid seed returns 400 and JSON error
curl -H "Accept: application/json" http://localhost:3000/json?seed=abc

# Unknown path returns 404 (plain text)
curl http://localhost:3000/unknown

# Unknown path returns 404 and JSON error
curl -H "Accept: application/json" http://localhost:3000/unknown
```