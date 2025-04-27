# Description
Unified management of public and custom data sources including listing, refreshing, and merging persisted JSON data via both CLI and HTTP endpoints.

# Implementation

## CLI Support

- Detect the `--list-sources` flag in `main(args)` and invoke `listSources()`, outputting JSON via `console.log`.
- Detect the `--refresh` flag in `main(args)` and call `await refreshSources()`, streaming each `written <file>` line via `console.log`.
- Detect the `--merge-persist` or `-m` flag in `main(args)` and call `mergePersist()`, streaming progress and summary via `console.log` and `console.error` as appropriate.

## HTTP Server Support

- In the `--serve` mode request handler, add:
  - `GET /sources`: Respond with status 200, header `Content-Type: application/json`, body `JSON.stringify(listSources(), null, 2)`.
  - `GET /refresh`: Respond with status 200, header `Content-Type: text/plain`. Override `console.log` to write each message line to the response, call `await refreshSources()`, restore `console.log`, then `res.end()`.
  - `GET /merge-persist`: Respond with status 200, header `Content-Type: text/plain`. Override both `console.log` and `console.error` to stream messages and warnings to the response, call `mergePersist()`, restore console methods, then `res.end()`.

# CLI Usage

To list sources:

    node src/lib/main.js --list-sources

To refresh data sources:

    node src/lib/main.js --refresh

To merge persisted data:

    node src/lib/main.js --merge-persist
    node src/lib/main.js -m

# HTTP Usage

When running the server with `--serve`, use HTTP requests:

    GET /sources
    GET /refresh
    GET /merge-persist

# Testing

- **Unit tests for CLI flags:**
  - Spy on `console.log` or `console.error` to verify correct invocation of `listSources()`, `refreshSources()`, and `mergePersist()`, and that progress lines are streamed.
  - Ensure missing or invalid flags do not trigger unintended commands.

- **HTTP integration tests:**
  - Start the server via `main(["--serve"])` on an ephemeral port.
  - Issue `GET /sources` and verify status 200, `Content-Type: application/json`, and JSON array of sources.
  - Issue `GET /refresh` and verify status 200, `Content-Type: text/plain`, and that the response body contains lines `written <file>` and summary `Refreshed X sources into data/`.
  - Issue `GET /merge-persist` and verify status 200, `Content-Type: text/plain`, and that the response body streams both progress and error lines when errors are mocked.

# Documentation Updates

- Update `docs/FEATURES.md` to describe the `--refresh` and `--merge-persist` CLI options and `/refresh` and `/merge-persist` endpoints with example logs and summary messages.
- Update `docs/USAGE.md` and `README.md` under Features and Usage to list refresh and merge-persist commands and corresponding HTTP endpoints, including sample invocations and output.