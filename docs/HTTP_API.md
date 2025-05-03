# HTTP_API Feature

## Overview
Provide an HTTP server mode for the emoticon CLI that exposes endpoints for random emoticon selection, deterministic seeding, full list retrieval over HTTP, version reporting, and monitoring via metrics. This feature enables integration of the emoticon service into web-based workflows, dashboards, and monitoring systems.

## Endpoints

- **GET /**
  - Returns a single random emoticon as plain text.
  - Content-Type: `text/plain`

- **GET /list**
  - Returns all available emoticons, one per line in plain text.
  - Content-Type: `text/plain`

- **GET /json**
  - Returns a JSON object: `{ "face": string, "mode": "random", "seed": null }`.
  - Content-Type: `application/json`

- **GET /json?seed=<n>**
  - If `<n>` is a non-negative integer, returns `{ "face": string, "mode": "seeded", "seed": <n> }` deterministically selected.
  - If `<n>` is invalid, responds with status 400 and error message.
  - Content-Type: `application/json` (when requested via Accept header) or `text/plain`.

- **GET /json/list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`

- **GET /version**
  - Returns the current application version.
  - Content-Type: `application/json`
  - Response body: `{ "version": string }`

- **GET /metrics**
  - Returns a Prometheus-compatible metrics exposition of internal request counters.
  - Content-Type: `text/plain; version=0.0.4`
  - Exposes the following counters:
    - `emoticon_requests_total`
    - `emoticon_requests_random_total`
    - `emoticon_requests_seeded_total`
    - `emoticon_requests_list_total`
    - `emoticon_requests_errors_total`
  - Sample output:
    ```
    # HELP emoticon_requests_total emoticon_requests_total counter
    # TYPE emoticon_requests_total counter
    emoticon_requests_total 5
    # HELP emoticon_requests_random_total emoticon_requests_random_total counter
    # TYPE emoticon_requests_random_total counter
    emoticon_requests_random_total 2
    # HELP emoticon_requests_seeded_total emoticon_requests_seeded_total counter
    # TYPE emoticon_requests_seeded_total counter
    emoticon_requests_seeded_total 1
    # HELP emoticon_requests_list_total emoticon_requests_list_total counter
    # TYPE emoticon_requests_list_total counter
    emoticon_requests_list_total 3
    # HELP emoticon_requests_errors_total emoticon_requests_errors_total counter
    # TYPE emoticon_requests_errors_total counter
    emoticon_requests_errors_total 0
    ```

- **Any other path**
  - Responds with status 404.
  - If `Accept: application/json` header is present, returns `{ "error": "Not Found" }`.
  - Otherwise returns plain text `Not Found`.

## CLI Options

- `--serve`       : Start the HTTP server instead of running CLI.
- `--port <n>`    : Set the listening port (default: 3000).

## Usage Examples

```bash
# Start server on default port 3000
node src/lib/main.js --serve
# Listening on port 3000

# Start server on port 4000
node src/lib/main.js --serve --port 4000
# Listening on port 4000

# Fetch a random emoticon
curl http://localhost:3000/

# Fetch the full list in plain text
curl http://localhost:3000/list

# Fetch a seeded JSON emoticon
curl "http://localhost:3000/json?seed=5"

# Fetch all emoticons as JSON array
curl http://localhost:3000/json/list

# Fetch version endpoint
curl http://localhost:3000/version
# { "version": "<current version>" }

# Fetch Prometheus metrics
curl http://localhost:3000/metrics
```