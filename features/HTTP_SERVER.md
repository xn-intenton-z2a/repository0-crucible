# Summary
Add a new CLI flag --serve that starts an HTTP server exposing core library functions over REST endpoints. This allows programmatic access to list-sources, fetch-source, transform-to-owl, and query-owl operations via HTTP without invoking the CLI directly.

# Functional Requirements

In src/lib/main.js:

- Detect --serve before processing other flags in main(args).
- Parse optional --port <number> argument; default to port 3000 if not provided.
- When --serve is present, ignore other CLI flags and start an HTTP server on the configured port.
- Implement request routing:
  - GET /sources
    - Respond 200 with JSON array returned by getSupportedDataSources().
  - GET /fetch?url=<url>
    - Validate url parameter; if missing respond 400 with { error: "Missing url" }.
    - If url is not supported respond 404 with { error: "Unsupported url" }.
    - Otherwise call fetchSource(url) and respond 200 with the fetched JSON or 500 on errors.
  - GET /transform?url=<url>&baseUri=<uri>
    - Validate url; on missing or invalid respond 400/404.
    - Fetch data and call transformToOwl(data, { baseUri }), respond 200 with OWL JSON or appropriate error.
  - GET /query?file=<path>&expr=<expression>
    - Validate file and expr parameters; if missing respond 400 with { error: "Missing parameters" }.
    - Read the file, parse JSON, call queryOntology(parsed, expression).
    - Respond 200 with results or 500 on file or parse errors.
- Handle SIGINT to gracefully shut down the server.

# CLI Usage

```bash
npm run start -- --serve [--port <number>]
```

# Testing

In tests/unit/main.test.js:
- Start the server on an ephemeral port (0) in a test and perform HTTP requests using http.get.
- Mock getSupportedDataSources, fetchSource, transformToOwl, and queryOntology to return sample data.
- Assert correct status codes and response bodies for valid and invalid requests.