# Description

Implement full lifecycle refresh of configured data sources by fetching their APIs and storing raw JSON captures in the data directory, including a programmatic API, CLI flag, and HTTP endpoint.

# Programmatic API

Export an async function `refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {})` that:
1. Ensures the target data directory exists, creating it via `fs.mkdirSync(dataDir, { recursive: true })`.
2. Calls `listSources(configPath)` to obtain the merged list of public and custom sources.
3. Iterates each source:
   - Performs an HTTP GET fetch to `source.url`.
   - On network or non-200 status, logs an error and skips that source.
   - Parses the JSON response; on parse failure logs an error and skips.
   - Derives a slug from `source.name` by lowercasing and replacing non-alphanumeric characters with dashes.
   - Writes the raw JSON response to `dataDir/<slug>.json` with pretty printing via `fs.writeFileSync`.
   - Logs `console.log(`written ${slug}.json`)` for each successfully written file.
4. After processing all sources logs a summary: `console.log(`Fetched ${count} sources into ${dataDir}/`)` and returns an object `{ count, files }` where `files` is the array of written filenames.

# CLI Support

- In `main(args)`, add a `--refresh` case.
- When invoked, call `refreshSources()` and log its output lines, then return without throwing errors.

# HTTP Server Endpoint

- Under `--serve`, handle `GET /refresh`:
  - Respond with HTTP 200 and `Content-Type: text/plain`.
  - Temporarily override `console.log` so each log line from `refreshSources()` is streamed to the response with newline separators.
  - After completion, restore `console.log` and end the response.

# Testing

- Unit tests for `refreshSources()`:
  • Mock `fs.existsSync`, `mkdirSync`, `writeFileSync`, `fetch` (successful and failing), and `console.log`/`console.error`.
  • Verify directory creation, file writes, correct file naming, skip logic on errors, and returned `{ count, files }`.
- CLI tests:
  • Spy on `refreshSources` to confirm `main(["--refresh"])` invokes it with default options.
- HTTP integration tests:
  • Start the server with `--serve` in a temp directory, mock example sources and fetch behavior.
  • Issue `GET /refresh`, expect status 200 `text/plain`, response body containing lines for each `written <slug>.json` and the summary line.

# Documentation Updates

- Update `docs/FEATURES.md` to include the Refresh Sources feature under Sources Management with its CLI and HTTP usage.
- Update `docs/USAGE.md` and `README.md` to document the `--refresh` flag and `/refresh` endpoint, include example invocations, sample outputs, and description of file storage.