# HTTP_API Feature

## Overview
Provide an HTTP server mode for the emoticon CLI that exposes endpoints for random emoticon selection, deterministic seeding, and full list retrieval over HTTP. This feature enables integration of the emoticon service into web-based workflows, dashboards, and monitoring systems.

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
```
