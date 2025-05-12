# Overview

Provide an OpenAPI 3.0 specification endpoint and interactive Swagger UI for the existing HTTP API. This feature improves API discoverability, enables clients to explore parameters and responses in a standard format, and serves documentation directly from the application.

# Implementation

1. Add swagger-ui-express dependency to package.json via npm install swagger-ui-express.
2. In src/lib/main.js import swaggerUi from 'swagger-ui-express'.
3. Define an openapiSpec object with the following structure
   - openapi version set to 3.0.0
   - info section containing title, version, and description
   - servers array pointing to baseUrl or default server
   - paths object listing /pi, /pi/data, /pi/chart with their parameters, methods, and response schemas including content types application/json and image/png
4. In createApp function
   - Add app.get('/openapi.json', (req, res) => res.json(openapiSpec))
   - Mount Swagger UI middleware: app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec))
5. Ensure CORS or headers allow static assets and JSON retrieval as needed

# Testing

1. Add unit tests in tests/unit/server.test.js
   - GET /openapi.json should return status 200 and JSON body with openapi property "3.0.0" and expected paths keys
   - GET /docs should return status 200 and HTML containing Swagger UI title or reference to openapi.json
2. Use supertest to verify endpoints and content types

# Documentation

1. Update docs/USAGE.md to include a new section **API Documentation** describing how to access /openapi.json and /docs routes with examples
2. Update README.md under Features to list API Documentation and show example commands for CLI and HTTP access