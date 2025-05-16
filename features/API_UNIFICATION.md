# Overview

Combine REST and GraphQL interfaces under a single cohesive API layer. Provide machine-readable OpenAPI documentation, interactive Swagger UI, server-sent events, security via API key authentication and rate limiting, and a fully featured GraphQL endpoint with GraphiQL explorer. This unified feature ensures consistent validation, documentation, and security across all API surfaces for π calculation, convergence data, and benchmarking.

# Implementation

1. Dependencies
   • Add or verify in package.json: graphql, express-graphql, swagger-ui-express, express-rate-limit.  
   • Reuse existing express, zod, chart.js, decimal.js, canvas.

2. API Key Authentication Middleware
   • Implement a middleware that reads valid keys from env var API_KEYS.  
   • Extract X-API-KEY from header, query, or cookie; validate against allow list; respond 401 JSON error on missing or invalid key.  
   • Apply globally to all REST and GraphQL routes.

3. Rate Limiting Middleware
   • Configure express-rate-limit using env vars RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX_REQUESTS.  
   • Attach to all routes before authentication to cap request rates and return HTTP 429 with JSON on limit exceeded.

4. OpenAPI Specification and Swagger UI
   • In createApp(), construct an openapiSpec object describing all REST endpoints (/pi, /pi/data, /pi/chart, /pi/stream, /benchmark, /dashboard, /metrics, /healthz, /ready) with parameters, schemas, security schemes, SSE definitions.  
   • Serve JSON at GET /openapi.json and Swagger UI at GET /docs using swagger-ui-express.

5. GraphQL Endpoint
   • Define GraphQL schema with types PiResult, DataPoint, BenchmarkRecord, and input types PiParamsInput and BenchmarkParamsInput.  
   • Implement resolvers that reuse existing Zod schemas and calculation/benchmark logic.  
   • Mount express-graphql middleware at /graphql with graphiql enabled, protected by the same auth and rate limit middleware.

# Testing

1. Unit Tests in tests/unit/server.test.js
   • Test GET /openapi.json returns valid OpenAPI JSON and appropriate security schemes.  
   • Test GET /docs serves HTML containing Swagger UI assets.  
   • Test GET /pi/stream SSE frames, including event: end.  
   • Test authentication middleware: missing key yields 401, invalid key yields 401, valid key allows access.  
   • Test rate limiting: simulate exceeding window returns 429 with JSON message.  
   • Test GraphQL POST /graphql: simple pi query, piData query, and benchmark query return expected JSON shape.  
   • Test GraphiQL playground loads at GET /graphql.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add sections for **GET /openapi.json**, **GET /docs**, **SSE at /pi/stream**, and **POST /graphql** with example queries.  
   • Document API_KEYS, rate limiting vars, and authentication flow with curl samples.

2. README.md
   • Under **Features**, update **API Enhancements** to describe unified REST and GraphQL APIs, interactive docs, SSE, rate limiting, and API key security.  
   • Provide examples for calling REST endpoints and GraphQL queries via curl.