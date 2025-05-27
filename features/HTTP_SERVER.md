# Summary
Add a new CLI flag --serve to start an HTTP server exposing core library functions over REST endpoints, enabling programmatic access without direct CLI invocation.

# Functional Requirements

1. In src/lib/main.js:
   - Import `http` and `url` from Node.js.
   - Extend `main(args)` to detect `--serve` flag:
     - Parse optional `--port <number>`, default to 3000.
     - When `--serve` is present, ignore other flags and start an HTTP server on the configured port.
   - Implement request routing:
     - GET /sources: return `getSupportedDataSources()` JSON with status 200.
     - GET /fetch?url=<url>: validate `url`, fetch data via `fetchSource()`, return JSON or appropriate error status (400, 404, 500).
     - GET /transform?url=<url>&baseUri=<uri>: validate, fetch, transform via `transformToOwl()`, return OWL JSON or error.
     - GET /query?file=<path>&expr=<expression>: read file, parse JSON, call `queryOntology()`, return matching items or error.
   - Handle SIGINT to gracefully shut down the server.

2. Testing:
   - In tests/unit/main.test.js:
     - Start server on a dynamic port and perform HTTP requests using `http.get`.
     - Mock or spy on `getSupportedDataSources`, `fetchSource`, `transformToOwl`, and `queryOntology`.
     - Assert correct status codes and response bodies for valid and invalid requests.

3. Documentation:
   - Update README.md under **Features** with **HTTP Server** section describing `--serve`, default port, and endpoints.
   - Add example curl commands under **Usage**.
   - Create docs/HTTP_SERVER.md mirroring details with complete endpoint descriptions and sample responses.