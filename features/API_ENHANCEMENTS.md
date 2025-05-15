# Overview

Consolidate and enhance HTTP API capabilities by providing comprehensive documentation, real-time feedback, secure access control, and request safeguards. This unified feature ensures machine-readable API specs, interactive docs, server-sent events, rate limiting, and API key authentication for robust and user-friendly π calculation services.

# Implementation

1. Dependencies
   • Add or verify `swagger-ui-express`, `express-rate-limit`, and no new dependencies for authentication (use built-in Node/Express).  
   • Ensure all required libraries (`express`, `zod`, etc.) remain at compatible versions.

2. OpenAPI Specification Endpoint
   • In `createApp()`, build `openapiSpec` object listing all endpoints (`/pi`, `/pi/data`, `/pi/chart`, `/pi/stream`, `/benchmark`, `/dashboard`, `/metrics`, `/healthz`, `/ready`).  
   • Include parameters, request/response schemas, SSE definitions, security schemes for API key.  
   • Register GET `/openapi.json` that returns `openapiSpec` as JSON.

3. Swagger UI Setup
   • In `createApp()`, import `swaggerUi` from `swagger-ui-express` and serve UI at `/docs` with `app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec))`.

4. Server-Sent Events Streaming Endpoint
   • In `createApp()`, ensure GET `/pi/stream` streams incremental π approximations with SSE headers and sends periodic `data: { index, approximation, error }` frames, ending with `event: end`.

5. Rate Limiting Middleware
   • Import `rateLimit` from `express-rate-limit`.  
   • Configure using environment variables (`RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`, etc.).  
   • Apply globally: `app.use(rateLimit(config))` before all routes to cap abuse.

6. API Key Authentication
   • Introduce environment variable `API_KEYS` holding comma-separated valid keys.  
   • In `createApp()`, before registering routes, insert middleware to:
     - Extract `X-API-KEY` header.  
     - Split and trim `API_KEYS` into an allow list.  
     - If header missing or invalid, respond with 401 and `{ error: "Unauthorized" }`.  
     - Otherwise, call `next()` to continue.
   • Secure all primary routes under `/pi`, `/pi/data`, `/pi/chart`, `/pi/stream`, `/benchmark`, `/openapi.json`, `/docs`, `/metrics`, `/healthz`, and `/ready`.

# Testing

1. Unit Tests in `tests/unit/server.test.js`:
   • Mock `express-rate-limit` to verify headers and HTTP 429 on limit exceeded.  
   • Simulate SSE connection to `/pi/stream`, assert SSE frame structure and `event: end`.  
   • Test GET `/openapi.json` returns valid OpenAPI JSON.  
   • Test GET `/docs` serves HTML containing Swagger assets.  
   • Test authentication middleware:
     - Without `X-API-KEY` when `API_KEYS` is set: status 401 and JSON error.  
     - With invalid key: status 401.  
     - With valid key: proceed to endpoint.

# Documentation

1. `docs/USAGE.md`:
   • Under **REST Endpoints**, add sections for **GET /openapi.json**, **GET /docs**, **SSE at /pi/stream**, and notes on **Authentication** and **Rate Limiting** with examples.  
   • Document `API_KEYS` env var usage and sample 401/429 responses.

2. `README.md`:
   • Under **Features**, update **API Enhancements** to describe machine-readable spec, interactive docs, SSE progress, rate limiting, and API key authentication.  
   • Provide `curl` examples for authenticated and unauthenticated requests, sample headers, and environment variable setup.