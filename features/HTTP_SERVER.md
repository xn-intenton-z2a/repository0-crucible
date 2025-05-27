# Summary
Add a new CLI flag --serve that starts an HTTP server exposing the library’s core functions over REST endpoints. This allows users and applications to access list-sources, fetch-source, transform-to-owl, and query-owl operations via HTTP without invoking the CLI directly.

# Functional Requirements

- In src/lib/main.js:
  - Import the built-in http and url modules.
  - Detect the --serve flag in the main(args) entrypoint:
    - Parse an optional --port <number> argument; default to port 3000 if not provided.
    - Create an HTTP server that listens on the configured port and handles incoming requests.
  - Implement request routing for the following paths:
    - GET /sources
      - Return JSON array from getSupportedDataSources() with status 200.
    - GET /fetch
      - Require a query parameter url; if missing, respond with status 400 and error message.
      - Validate url is in supportedDataSources; if not, status 404 and error message.
      - Call fetchSource(url), return parsed JSON with status 200 or status 500 on fetch errors.
    - GET /transform
      - Require url query parameter; optional baseUri parameter.
      - Validate url; on error respond 400 or 404.
      - Fetch data and call transformToOwl(data, { baseUri }), return OWL JSON with status 200.
    - GET /query
      - Require file and expr query parameters; read the file path, parse JSON, call queryOntology(parsed, expr).
      - Return matching items as JSON with status 200 or status 400 on missing parameters or invalid expressions.
  - Ensure that when --serve is provided, no other CLI flags are processed and the server remains running.
  - Handle SIGINT to gracefully shut down the server.

# HTTP API Endpoints

- GET /sources
  - Response 200 with JSON array of source URLs.

- GET /fetch?url=<url>
  - Response 200 with JSON data from the requested source.
  - Response 400 if url parameter missing or invalid.
  - Response 404 if url not supported.

- GET /transform?url=<url>&baseUri=<uri>
  - Response 200 with OWL JSON representation.
  - Response 400/404 on missing or unsupported url.

- GET /query?file=<path>&expr=<expression>
  - Response 200 with array of items matching the expression.
  - Response 400 on missing query parameters or invalid expression.

# Testing

- In tests/unit/main.test.js:
  - Add integration tests that start the server on a random port (e.g., 0) and then perform HTTP requests against each endpoint using http.get.
  - Assert correct status codes and response bodies for valid and invalid inputs.
  - Use spies or mocks for fetchSource, transformToOwl, and queryOntology to simulate behavior.

# Documentation

- Update README.md:
  - Under **Features**, add **HTTP Server** describing the --serve flag and available endpoints.
  - Under **Usage**, include example commands to start the server and curl samples for each endpoint.
- Create docs/HTTP_SERVER.md with full specification, endpoint descriptions, example requests, and sample responses.