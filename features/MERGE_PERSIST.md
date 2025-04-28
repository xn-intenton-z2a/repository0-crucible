# Description
Implement a utility that reads all JSON files in a project data directory, merges their content into a single persisted JSON artifact, and exposes this behavior via the programmatic API, CLI command, and HTTP endpoint. This supports combining raw source captures into a unified representation for downstream ontology processing.

# Programmatic API
- Export a function `mergePersist({ dataDir = "data", outFile = "data/persisted.json" } = {})` in `src/lib/main.js`.
- Ensure that `dataDir` exists or create it; if missing, log an error using `console.error("Error: data directory not found")` and return `{ count: 0, file: null }` without throwing.
- Read all `.json` files in `dataDir`. For each file:
  - Parse its JSON. If the top-level value is an array, concatenate elements into a combined array. If it is an object, merge keys and array properties; on structural or parse errors, log `console.error("Skipping <filename>: <reason>")` and continue.
- Write the merged result to `outFile` (creating parent directories with `fs.mkdirSync(path.dirname(outFile), { recursive: true })`) using `fs.writeFileSync(outFile, JSON.stringify(merged, null, 2), "utf8")`.
- Log `console.log("written <outFile>")` followed by `console.log("Merged <count> files into <outFile>")`.
- Return an object `{ count: numberOfFilesMerged, file: outFile }`.

# CLI Support
- Detect flags `--merge-persist` (alias `-m`) in `main(args)`.
- When invoked, call `mergePersist()` with default or provided paths and return without throwing.
- On success print write lines and summary via `console.log`.

# HTTP Server Endpoints
- Under `--serve` mode, handle `GET /merge-persist`:
  - Respond with status 200 and header `Content-Type: text/plain`.
  - Temporarily override `console.log` to stream each log line from `mergePersist()` to the HTTP response with a newline.
  - After completion, restore `console.log` and end the response.
  - Errors during merging still stream via `console.log` and yield HTTP 200 termination.

# Testing
- **Unit Tests for `mergePersist()`**:
  - Mock `fs.existsSync`, `fs.readdirSync`, `fs.readFileSync`, `fs.mkdirSync`, `fs.writeFileSync`, and spies on `console.log`, `console.error`.
  - Test missing directory yields count 0 and no throw.
  - Test merging of array inputs, object inputs, and skipping invalid files.
  - Verify write calls and returned summary.
- **CLI Tests** in `tests/unit/main.merge-persist-cli.test.js`:
  - Mock `mergePersist` and spy on `console.log` to verify invocation when using `--merge-persist` and `-m`.
  - Ensure `main()` returns without throwing.
- **HTTP Integration Tests** in `tests/unit/main.serve.merge-persist.test.js`:
  - Start server with `--serve` on ephemeral port, create a sample `data` directory with JSON files.
  - Issue GET `/merge-persist` and verify status 200, `text/plain` header, streamed lines including file writes and summary.

# Documentation Updates
- Update `docs/FEATURES.md` to describe the merge-persist feature under Source Management:
  - Include CLI syntax, HTTP endpoint, programmatic API signature, example invocation, and sample output.
- Update `docs/USAGE.md` and `README.md`:
  - Add a section for the `--merge-persist` flag and HTTP GET `/merge-persist`, with examples and expected outputs.
