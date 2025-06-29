# Summary
Add a new CLI flag --serve that starts an HTTP server exposing core library functions over REST endpoints. This allows programmatic access to list-sources, fetch-source, transform-to-owl, and query-owl operations via HTTP without invoking the CLI directly.

# Functional Requirements

- In src/lib/main.js:
  - Detect --serve in the entrypoint before other flags and ignore other CLI flags when provided.
  - Parse optional --port <number> argument; default to port 3000 if not supplied.
  - Start an HTTP server on the configured port that handles requests:
    - GET /sources
      - Respond 200 with JSON array returned by getSupportedDataSources().
    - GET /fetch?url=<url>
      - If url parameter is missing: respond 400 with `{ error: "Missing url" }`.
      - If url not in supportedDataSources: respond 404 with `{ error: "Unsupported url" }`.
      - Otherwise, call fetchSource(url) and respond 200 with the fetched JSON or 500 on errors.
    - GET /transform?url=<url>&baseUri=<uri>
      - Validate url similarly; fetch data and call transformToOwl(data, { baseUri }).
      - Respond 200 with OWL JSON or appropriate error codes for missing or unsupported url.
    - GET /query?file=<path>&expr=<expression>
      - Validate both parameters; if missing, respond 400 with `{ error: "Missing parameters" }`.
      - Read the file with fs/promises.readFile, parse JSON, and call queryOntology(parsed, expression).
      - Respond 200 with filtered results or 500 on file or parse errors.
  - Handle SIGINT to gracefully shut down the server.

# CLI Usage

```bash
npm run start -- --serve [--port 8080]
```

# Testing

- In tests/unit/main.test.js:
  - Start the server on port 0 (random port) in a test and send HTTP requests using http.get.
  - Mock getSupportedDataSources, fetchSource, transformToOwl, and queryOntology to return sample data.
  - Assert correct status codes and response bodies for each endpoint.
