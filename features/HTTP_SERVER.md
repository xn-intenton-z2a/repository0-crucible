# Summary
Add a new CLI flag --serve that starts an HTTP server exposing core library functions over REST endpoints. This allows users and applications to access list-sources, fetch-source, transform-to-owl, and query-owl operations via HTTP without invoking the CLI directly.

# Functional Requirements

- In src/lib/main.js:
  - Detect the --serve flag in the main(args) entrypoint before other flags.
  - Parse an optional --port <number> argument; default to 3000 if not provided.
  - When --serve is present, ignore other CLI flags and start an HTTP server on the configured port.
  - Implement routing:
    - GET /sources: respond 200 with JSON array from getSupportedDataSources().
    - GET /fetch?url=<url>: validate url query parameter; if missing, respond 400 with error JSON; if not supported, 404; otherwise fetchSource(url) and respond 200 with JSON or 500 on errors.
    - GET /transform?url=<url>&baseUri=<uri>: validate params; on missing or unsupported url, respond 400 or 404; otherwise fetch data and call transformToOwl(data, { baseUri }); respond 200 with OWL JSON or 500 on errors.
    - GET /query?file=<path>&expr=<expression>: validate file and expr parameters; if missing, respond 400; read and parse file, call queryOntology(parsed, expr); respond 200 with JSON results or 500 on errors.
  - Handle SIGINT to gracefully shut down the server.

# HTTP API Endpoints

- GET /sources
- GET /fetch?url=<url>
- GET /transform?url=<url>&baseUri=<uri>
- GET /query?file=<path>&expr=<expression>

# Testing

- Start the server on an ephemeral port and use http.get to request each endpoint.
- Mock getSupportedDataSources, fetchSource, transformToOwl, queryOntology to return sample data.
- Assert correct status codes, response bodies, and error handling.