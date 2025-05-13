# Overview

Provide an interactive Swagger UI and a machine-readable OpenAPI specification for all HTTP API endpoints. Developers and users can explore supported routes, parameters, responses, and example payloads. This feature improves discoverability and integration with tooling for both CLI server mode and third-party clients.

# Implementation

1. Dependencies
   • Add swagger-ui-express and swagger-jsdoc to package.json dependencies.  

2. OpenAPI Definition
   • Create a JSDoc or inline JavaScript object defining OpenAPI info: title, version, description, servers.  
   • Define paths for GET /pi, GET /pi/data, GET /pi/chart, GET /dashboard, GET /benchmark, GET /pi/stream.  
   • For each operation specify parameters, schemas for request and response, content types, and examples.  

3. Middleware Setup in createApp()
   • Import swaggerUi from swagger-ui-express and swaggerJsdoc from swagger-jsdoc.  
   • Configure swaggerJsdoc with options pointing at source file comments or an inline spec object.  
   • Generate the OpenAPI specification object at server startup.  
   • Mount a JSON endpoint: app.get('/openapi.json', (req,res) => res.json(openapiSpec)).  
   • Mount Swagger UI: app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec)).  

4. Error Handling
   • On spec generation errors log a warning and fall back to a minimal spec.  
   • Serve 404 if /docs or /openapi.json requests fail for any reason.

# Testing

1. Unit Tests (tests/unit/server.test.js)
   • GET /openapi.json returns status 200, content-type application/json, and top-level property openapi equal to "3.0.0".  
   • The JSON body has a paths object containing keys for /pi and /benchmark.  
   • GET /docs responds with status 301 or 200 and serves HTML containing swagger-ui assets.  

2. Integration Tests (optional)
   • Use supertest to GET /docs and assert presence of <title>Swagger UI and a script tag for swagger-ui-bundle.  

# Documentation

1. docs/USAGE.md
   • Under REST Endpoints add entries for **GET /openapi.json** and **GET /docs** with examples.  

2. README.md
   • Under Features add **API Documentation** describing automatic OpenAPI generation, JSON spec endpoint, and interactive Swagger UI.  

