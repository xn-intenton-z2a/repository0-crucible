# Overview

Secure all HTTP and GraphQL endpoints by validating an API key provided in request headers. This feature prevents unauthorized access and abuse by allowing only requests with keys configured via environment variables.

# Implementation

1. Configuration
   • Introduce an environment variable API_KEYS that holds a comma separated list of valid API keys.
   • Document default behavior when API_KEYS is unset (no authentication enforced) or empty (reject all requests).

2. Middleware
   • In createApp(), before registering any routes, insert a middleware that:
     - Reads the header X-API-KEY from incoming requests.
     - Splits API_KEYS by comma and trims whitespace to form an allow list.
     - If X-API-KEY is missing or not in the allow list, responds with status 401 and JSON body { error: "Unauthorized" }.
     - Otherwise calls next() to continue processing.

3. Route Protection
   • Apply this middleware globally to all routes under /pi, /pi/data, /pi/chart, /benchmark, /openapi.json, /docs, /metrics, /healthz, and /ready.

# Testing

1. Unit Tests in tests/unit/server.test.js
   • Test that GET /pi without X-API-KEY returns 401 and JSON { error: "Unauthorized" } when API_KEYS is set.
   • Test that GET /pi with invalid X-API-KEY returns 401.
   • Test that GET /pi with a valid X-API-KEY proceeds and returns the expected response.
   • Repeat for /pi/data, /pi/chart, and /benchmark.
   • Simulate API_KEYS unset and verify requests proceed without authentication.

# Documentation

1. docs/USAGE.md
   • Under REST Endpoints, add a note on requiring X-API-KEY header when API_KEYS is configured.
   • Document example:
     curl -H "X-API-KEY: my-secret-key" http://localhost:3000/pi

2. README.md
   • Under Features, add API Key Authentication describing the purpose and how to configure API_KEYS.
   • Provide sample environment variable definition and curl invocation.