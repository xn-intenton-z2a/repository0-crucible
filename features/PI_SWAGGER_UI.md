# Overview

Add a Swagger UI endpoint that serves interactive API documentation for all existing HTTP routes. Users can explore and test the /health, /pi, and /benchmark endpoints visually in their browser.

# Implementation

1. Dependencies
   - Add swagger-ui-express to package.json dependencies.
   - Use js-yaml to serialize OpenAPI spec if needed.

2. Express Setup
   - In src/lib/main.js, import swaggerUi from swagger-ui-express and buildOpenApiSpec helper that constructs the OpenAPI spec using existing zod schemas and ALGORITHMS array.
   - Within createApp, after defining routes, mount swaggerUi.serve and swaggerUi.setup(openapiSpec) at path /docs.
   - Add a new GET /openapi.json route that responds with the raw OpenAPI JSON spec.

3. CLI Flag
   - Introduce --serve-docs alias for --serve to automatically enable the /docs endpoint when the server starts.

# Testing

- Unit tests in tests/unit/swagger-ui.test.js
  • Send GET request to /docs and expect HTML containing SwaggerUIBundle script references.
  • Send GET request to /openapi.json and assert JSON includes openapi, info, and paths for /health, /pi, and /benchmark.
  • Simulate server start without --serve-docs and verify /docs returns 404.

# Documentation

- Update README.md:
  • Document the /docs endpoint under HTTP API section.
  • Describe the /openapi.json route and how to access the interactive docs.
  • Provide example browser URL to view the Swagger UI and curl command to fetch the raw spec.