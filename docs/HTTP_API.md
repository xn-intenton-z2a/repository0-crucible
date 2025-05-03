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
  - Exposes the following counters:
    - `emoticon_requests_total`: Counter of all HTTP GET requests served (excluding errors)
    - `emoticon_requests_root_total`: Counter of root requests (GET /)
    - `emoticon_requests_list_total`: Counter of plain-text list requests (GET /list)
    - `emoticon_requests_json_total`: Counter of JSON requests (GET /json endpoints, including GET /json?list and GET /json/list)
    - `emoticon_requests_seeded_total`: Counter of seeded JSON requests (GET /json?seed=<n>)
    - `emoticon_requests_errors_total`: Counter of requests resulting in non-2xx status codes or invalid inputs

- **Any other path**
  - Responds with status 404.
  - If `Accept: application/json` header is present, returns `{ "error": "Not Found" }`.
  - Otherwise returns plain text `Not Found`
