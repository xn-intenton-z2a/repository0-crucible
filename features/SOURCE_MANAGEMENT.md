# Description
Unified management of public and custom data sources including listing, refreshing, and merging persisted JSON data via both CLI and HTTP endpoints.

# Implementation

## Core Functionality
- **listSources(configPath?)**: Read and merge default PUBLIC_DATA_SOURCES with optional custom `data-sources.json`. Return an array of `{ name, url }`.
- **refreshSources({ dataDir }?)**: Fetch each public data source and write raw JSON captures into `data/` directory. For each fetched file, log `written <filename>`. Return `{ count, files }`.
- **mergePersist({ dataDir, outFile }?)**: Combine all JSON files in `dataDir` into a single merged JSON artifact. Steps:
  1. Determine `dataDir` (default `data`) and ensure it exists, else log error and return `{ count: 0, file: null }`.
  2. Read all `.json` files in `dataDir`, excluding the target `outFile` if present.
  3. For each input file:
     - Parse JSON content. If value is an array, append elements to a merge list.
     - If value is an object, push the object into the merge list.
     - On parse error or unsupported type, log a warning and skip.
  4. Write the merged list as pretty-printed JSON to `outFile` (default `data/persisted.json`).
  5. Log `written <basename(outFile)>` and a summary line `Merged <count> entries from <fileCount> files into <outFile>`.
  6. Return `{ count: <entriesCount>, file: <basename(outFile)> }`.

## CLI Support
- In `main(args)`, detect:
  - `--list-sources`: call `listSources()` and output JSON.
  - `--refresh`: call `await refreshSources()` and stream each `written <file>` line.
  - `--merge-persist` or `-m`: call `mergePersist()` and stream each `written` or warning line, then summary.

## HTTP Server Support
- Under `--serve` mode, extend request handler:
  - GET `/sources`: 200 JSON of `listSources()`.
  - GET `/refresh`: 200 text; override `console.log` to stream messages from `await refreshSources()`.
  - GET `/merge-persist`: 200 text; override both `console.log` and `console.error` to stream messages and warnings from `mergePersist()`, then restore and end response.

# Testing
- **Unit tests for mergePersist():**
  - Mock `fs.existsSync`, `fs.readdirSync`, `fs.readFileSync`, `fs.writeFileSync`, spies for `console.log` and `console.error`.
  - Verify behavior when `dataDir` is missing, when input files contain arrays or objects, and when parse errors occur.
  - Assert returned `{ count, file }` matches expectations and correct log messages.
- **CLI tests:**
  - Spy on `mergePersist()` to confirm invocation when flags `--merge-persist` or `-m` are passed to `main()`.
  - Confirm `listSources()` and `refreshSources()` remain unaffected.
- **HTTP integration tests:**
  - Start server via `main(["--serve"])` on ephemeral port.
  - Issue GET `/merge-persist` and verify status `200`, header `text/plain`, response body contains `written <file>` lines, warnings if any, and final summary.

# Documentation Updates
- Update `docs/FEATURES.md` under Features to describe the merge-persist option with description and output sample.
- Update `docs/USAGE.md` and `README.md` under Usage and Features to include:
  - **Merge Persist (`--merge-persist`, `-m`)**: Usage examples, description of merging behavior, sample logs, and summary.
