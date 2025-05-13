# Overview

Provide interactive API documentation for all π calculation and related endpoints via a Swagger UI interface. This feature enables developers to explore request parameters, responses, and error schemas in a user-friendly web page, improving discoverability and adoption of the HTTP API.

# Implementation

1. Dependencies
   • Add swagger-ui-express and zod-to-openapi to package.json dependencies.
   • Import swaggerUi from swagger-ui-express and { generateOpenApiDocument } from zod-to-openapi.

2. OpenAPI Document Generation
   • Use existing Zod schemas (ApiParamsSchema, CLIOptionsSchema) to build OpenAPI parameter and response definitions.
   • Call generateOpenApiDocument on a root Zod object mapping paths to operation definitions.
   • Produce an OpenAPI JSON at runtime available via `/openapi.json`.

3. Swagger UI Serve
   • In createApp(), mount swaggerUi.serve and swaggerUi.setup with the generated OpenAPI JSON.
   • Expose GET `/docs` for the interactive Swagger UI and GET `/openapi.json` for raw spec.
   • Ensure `/docs` is served without authentication at the root of the API.

4. Integration
   • Update Express middleware chain so the documentation routes appear before rate limiting and monitoring middleware.
   • Ensure rate limiter and metrics do not block or pollute the documentation endpoints.

# Testing

1. Unit Tests (tests/unit/server.test.js)
   • GET `/openapi.json` returns 200, JSON content matching OpenAPI `paths` and `components.schemas` including `/pi` and parameters digits, algorithm, samples.
   • GET `/docs` returns 200, HTML content including `<title>Swagger UI` and references to the Swagger UI bundle.

2. Validation
   • Run Swagger UI in a browser or HTTP client to verify interactive documentation loads and endpoints can be tried directly from the UI.

# Documentation

1. README.md
   • Under **Features**, add **API Documentation** with brief description and link to `/docs`.

2. docs/USAGE.md
   • Under **REST Endpoints**, document **GET /docs** and **GET /openapi.json** with examples:
     
   curl http://localhost:3000/docs
   curl http://localhost:3000/openapi.json
