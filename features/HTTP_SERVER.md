# Summary
Add a --serve flag to run an HTTP server exposing core library functions (list-sources, fetch-source, transform-to-owl, query-owl) as REST endpoints.

# Functional Requirements

In src/lib/main.js:

- Detect --serve before other flags in main(args).
- Parse optional --port <number>; default port 3000.
- When --serve is present, ignore other flags and start an HTTP server.
- Routing:
  - GET /sources: respond 200 with JSON array from getSupportedDataSources().
  - GET /fetch?url=<url>: validate url param; 400 if missing, 404 if unsupported. On valid, call fetchSource(url) and respond 200 with JSON or 500 on fetch error.
  - GET /transform?url=<url>&baseUri=<uri>: same validation, fetch data, call transformToOwl(data,{baseUri}), respond 200 with OWL JSON or appropriate error status.
  - GET /query?file=<path>&expr=<expression>: validate both params; 400 on missing. Read and parse file, call queryOntology(parsed,expr), respond 200 with results or 500 on errors.
- Handle SIGINT to shut down gracefully.

# Testing

- In tests/unit/main.test.js:
  - Start server on ephemeral port (0) and test each endpoint using http.get.
  - Mock getSupportedDataSources, fetchSource, transformToOwl, queryOntology to return sample data.
  - Verify correct status codes, response bodies, and error handling.

# Documentation

- Update README.md under Features: add HTTP Server section explaining --serve, default port, and endpoints.
- Under Usage: show example curl commands for each endpoint.
- Create docs/HTTP_SERVER.md mirroring details with examples and sample responses.