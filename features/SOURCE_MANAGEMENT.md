# Description
Unified management of public and custom data sources including listing, refreshing, and merging persisted JSON data via both CLI and HTTP endpoints.

# Implementation

Extend the central CLI entrypoint and HTTP server in `src/lib/main.js` to support the following workflows, leveraging the existing `mergePersist` utility:

1. List Sources CLI
   - Detect the `--list-sources` flag in `main(args)`.
   - Invoke `listSources()` and output the result via `console.log(JSON.stringify(sources, null, 2))`.
   - Exit without error.

2. Refresh Sources CLI
   - Detect the `--refresh` flag in `main(args)`.
   - Call `await refreshSources()` and rely on its existing console logs.
   - Exit without error.

3. Merge Persist CLI
   - Detect the `--merge-persist` or `-m` flag in `main(args)`.
   - Call `const result = mergePersist()`.
   - The `mergePersist` function will log progress and return `{ count, file }`.
   - Exit without error.

4. List Sources HTTP
   - In the HTTP request handler under `--serve`, add a `GET /sources` route.
   - Respond with status `200` and header `Content-Type: application/json`.
   - Write `JSON.stringify(listSources(), null, 2)` to the response.
   - End the response.

5. Refresh Sources HTTP
   - Add `GET /refresh` route.
   - Respond with status `200` and header `Content-Type: text/plain`.
   - Override `console.log` so each line is written to the response with a trailing newline.
   - Call `await refreshSources()`, restore `console.log`, and end the response.

6. Merge Persist HTTP
   - Add `GET /merge-persist` route.
   - Respond with status `200` and header `Content-Type: text/plain`.
   - Override both `console.log` and `console.error` to stream messages and warnings to the response.
   - Call `mergePersist()`, restore console methods, and end the response.

# CLI Usage

node src/lib/main.js --list-sources
node src/lib/main.js --refresh
node src/lib/main.js --merge-persist  

# HTTP Usage

GET /sources  
GET /refresh  
GET /merge-persist

# Testing

- **Unit tests for CLI flags:**
  • Spy on `console.log` when invoking `main(["--merge-persist"])` to verify `mergePersist` is called and logs appear.
  • Verify that missing or invalid flags do not trigger merge logic.

- **HTTP integration tests:**
  • Start the server via `main(["--serve"])` on an ephemeral port.
  • Issue `GET /merge-persist` and verify status `200`, header `text/plain`, and that the response body streams the merge lines and summary.
  • Test error scenarios by mocking `mergePersist` to throw or log errors and verify that error lines are streamed.

# Documentation Updates

- Update `docs/FEATURES.md` to describe the `--merge-persist` CLI option and the `/merge-persist` endpoint with example logs and summary.
- Update `docs/USAGE.md` to include examples for `merge-persist` under both CLI and HTTP sections.
- Update `README.md` under Features and Usage to list the merge-persist command, its script alias, and sample output.