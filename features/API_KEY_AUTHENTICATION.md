# Overview

Require clients to present a valid API key before accessing protected HTTP endpoints. This ensures only authorized consumers can invoke π calculation, convergence data, chart generation, and dashboard features.

# Implementation

1. Dependencies
   • Add dotenv to dependencies to load environment variables.
2. Load API Key
   • On application startup, call dotenv.config() to read .env file.
   • Read process.env.API_KEY; if missing, log a warning but proceed without enforcing authentication.
3. Authentication Middleware
   • Create Express middleware `verifyApiKey`:
     - Extract key from header `X-API-KEY`, fallback to query param `api_key`.
     - Compare extracted key to the loaded API_KEY.
     - If missing or invalid, respond with status 401, set header `WWW-Authenticate: ApiKeyAuth`, and JSON `{ error: "Invalid or missing API key" }`.
     - Otherwise, call next().
4. Apply Middleware
   • In createApp(), insert `verifyApiKey` before handlers for `/pi`, `/pi/data`, `/pi/chart`, `/dashboard`, `/benchmark`, `/metrics`, `/healthz`, and `/ready` as needed.

# Testing

1. Add server tests in `tests/unit/server.test.js`:
   • When process.env.API_KEY is set to "secret123":
     - GET `/pi` without key should return 401, header `WWW-Authenticate` and JSON error.
     - GET `/pi?api_key=secret123` should return 200 and valid response body.
     - GET `/dashboard` without key returns 401, with correct headers.
   • Use vi to set process.env.API_KEY before createApp() in tests.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add a note that each request must include `X-API-KEY` header or `api_key` query parameter. Provide example:
     ```bash
     curl -H "X-API-KEY: secret123" http://localhost:3000/pi
     ```
2. README.md
   • Under **Features**, add **API Key Authentication** with a brief description and usage example.