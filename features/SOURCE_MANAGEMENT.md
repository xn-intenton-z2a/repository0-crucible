# Description
Unified management of public and custom data sources, enabling users to list, refresh, and merge persisted JSON data via both CLI and HTTP endpoints. This feature ensures that source data can be fetched, inspected, and combined in a single workflow.

# Implementation
1. CLI Support
   - In main(args), detect `--refresh` (alias `-r`). When present:
     1. Call `await refreshSources()` with an optional `data-sources.json` config path.
     2. Ensure console.log outputs each `written <filename>` line as returned by refreshSources.
     3. Exit without error after logging the summary `Refreshed <count> sources into data/`.
   - Detect `--merge-persist` (alias `-m`). When present:
     1. Implement a new function `mergePersist({ dataDir = 'data', outFile = 'data/merged.json' } = {})`:
        - If `dataDir` does not exist, log an error via `console.error("Error: data/ directory not found")` and return `{ count: 0, file: null }`.
        - Read all `.json` files in `dataDir`, parse each, collect objects into an array.
        - Write the array to `outFile` with two-space indentation via `fs.writeFileSync`.
        - Log `Merged <count> files into data/merged.json` and return `{ count, file: "merged.json" }`.
     2. In `main(args)`, when `--merge-persist` is present, call `mergePersist()`, ensure logs are emitted, then exit without error.

2. HTTP Server Support (under `--serve`)
   - Add route `GET /refresh`:
     - Respond with `200` and header `Content-Type: text/plain`.
     - Override `console.log` to stream each refresh line with a newline.
     - Call `await refreshSources()` then restore `console.log` and end response.
   - Add route `GET /merge-persist`:
     - Respond with `200` and header `Content-Type: text/plain`.
     - Override `console.log` and `console.error` to stream logs and errors line by line.
     - Call `mergePersist()` then restore console methods and end response.

# CLI Usage
node src/lib/main.js --refresh
node src/lib/main.js -r
node src/lib/main.js --merge-persist
node src/lib/main.js -m

# HTTP Usage
GET /refresh
  Streams lines:
  written <filename>.json
  …
  Refreshed X sources into data/
GET /merge-persist
  Streams lines:
  Merged X files into data/merged.json

# Testing
- **CLI unit tests**:
  • Spy on `console.log` and `refreshSources` when running `main(["--refresh"])`. Verify each `written <filename>` and summary line.
  • Spy on `console.log` and `mergePersist` when running `main(["--merge-persist"])`. Mock `fs` to simulate data files and verify `fs.writeFileSync` and log output.
- **HTTP integration tests**:
  • Start server on ephemeral port. Create a `data/` directory with sample JSON files.
  • Issue GET `/refresh`, verify `200`, `Content-Type: text/plain`, body contains `written` lines and summary.
  • Issue GET `/merge-persist`, verify `200`, `Content-Type: text/plain`, body contains merge summary line.

# Documentation Updates
- Update `docs/FEATURES.md` and `docs/USAGE.md` to include `--refresh` and `--merge-persist` under CLI and HTTP sections with examples.
- Update `README.md` Features list and Usage sections to reference the new commands.
- Add package.json scripts for `refresh` and `merge-persist` if missing.