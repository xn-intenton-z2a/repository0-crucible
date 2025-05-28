# Summary
Add a new CLI flag --serve that starts an HTTP server exposing core library functions over REST endpoints. This enables programmatic access to list-sources, fetch-source, transform-to-owl, and query-owl operations via HTTP without invoking the CLI directly.

# Functional Requirements

- In src/lib/main.js:
  - Detect the --serve flag in the entrypoint before other flags.
  - Parse an optional --port <number> argument; default to 3000 if not provided.
  - When --serve is present, start an HTTP server listening on the configured port.
  - Implement request routing:
    - GET /sources
      - Respond 200 with JSON array from getSupportedDataSources().
    - GET /fetch?url=<url>
      - Validate url query parameter; if missing respond 400 with error JSON.
      - If url not in supportedDataSources respond 404 with error JSON.
      - Call fetchSource(url) and respond 200 with parsed JSON or status 500 on fetch errors.
    - GET /transform?url=<url>&baseUri=<uri>
      - Validate url; on missing or invalid respond 400/404.
      - Fetch data and call transformToOwl(data, { baseUri }), respond 200 with OWL JSON.
    - GET /query?file=<path>&expr=<expression>
      - Validate file and expr parameters; respond 400 on missing.
      - Read file, parse JSON, call queryOntology(parsed, expr).
      - Respond 200 with JSON array of results or 500 on errors.
  - Handle SIGINT to gracefully shut down the server.

# CLI Usage

```
npm run start -- --serve [--port <number>]
```

# Testing

- In tests/unit/main.test.js:
  - Start the server on an ephemeral port (e.g., 0) and perform HTTP requests using http.get.
  - Mock getSupportedDataSources, fetchSource, transformToOwl, and queryOntology to return sample data.
  - Assert correct status codes, response bodies, and error handling for each endpoint.
