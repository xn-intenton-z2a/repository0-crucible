# Summary
Add a new CLI flag --serve that starts an HTTP server exposing core library functions over REST endpoints. This allows users and applications to access list-sources, fetch-source, transform-to-owl, and query-owl operations via HTTP without invoking the CLI directly.

# Functional Requirements

- In src/lib/main.js:
  - Detect the --serve flag in the main(args) entrypoint before other flags.
  - Parse an optional --port <number> argument; default to 3000 if not provided.
  - When --serve is present, start an HTTP server listening on the configured port.
  - Implement request routing:
    - GET /sources
      - Respond 200 with JSON array from getSupportedDataSources().
    - GET /fetch?url=<url>
      - Validate url query parameter; if missing respond 400 and error JSON.
      - If url not in supportedDataSources respond 404 and error JSON.
      - Call fetchSource(url) and respond 200 with fetched JSON or 500 on errors.
    - GET /transform?url=<url>&baseUri=<uri>
      - Validate url; on missing or invalid respond 400/404.
      - Fetch data and call transformToOwl(data, { baseUri }) and respond 200 with OWL JSON.
    - GET /query?file=<path>&expr=<expression>
      - Validate both parameters; if missing respond 400.
      - Read the file, parse JSON, call queryOntology(parsed, expr).
      - Respond 200 with JSON results or 500 on errors.
  - Handle SIGINT to gracefully shut down the server.

# API

- The same functions getSupportedDataSources(), fetchSource(), transformToOwl(), and queryOntology() remain exported.
- main(args) starts HTTP server when --serve is passed.

# CLI Usage

```bash
npm run start -- --serve [--port 8080]
```

# Testing

- In tests/unit/main.test.js:
  - Start server on port 0 (random) in a test and perform HTTP requests using built-in http.get.
  - Mock getSupportedDataSources, fetchSource, transformToOwl, and queryOntology to return sample data.
  - Assert correct status codes, endpoint paths, response bodies, and error handling.
