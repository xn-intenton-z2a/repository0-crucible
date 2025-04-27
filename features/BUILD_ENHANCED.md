# Description
Implement a CLI command and HTTP endpoint to merge intermediate OWL JSON-LD artifacts into a single enhanced ontology document, and expose a programmatic API for the same.

# Implementation
1. Programmatic API
   - Export a function `buildEnhanced({ intermediateDir, outDir } = {})` in `src/lib/main.js`.
   - If `intermediateDir` does not exist, log an error via `console.error("Error: intermediate/ directory not found")` and return `{ count: 0, files: [] }`.
   - Read all files ending in `.json` in `intermediateDir`.
   - For each file, parse JSON content; if it contains `"@graph"` array, collect its entries; if parsing fails, log a warning via `console.error` and skip.
   - Construct a merged document:
     - `@context`: { "@vocab": "http://www.w3.org/2002/07/owl#" }
     - `@graph`: concatenation of all collected entries
   - Ensure `ontologies/` directory exists under `outDir` (default project root) via `fs.mkdirSync(..., { recursive: true })`.
   - Write merged document to `ontologies/enhanced-ontology.json` with two-space indentation via `fs.writeFileSync`.
   - Log `console.log("written enhanced-ontology.json")` and return `{ count, files: ["enhanced-ontology.json"] }`.

2. CLI Support
   - In `main(args)`, detect `--build-enhanced` or `-be` flag.
   - When present, call `buildEnhanced()` with default paths and exit without error.

3. HTTP Endpoint
   - Under `--serve` mode, add handling for `GET /build-enhanced`:
     - Respond with status `200` and header `Content-Type: text/plain`.
     - Override `console.log` temporarily so each log line emitted by `buildEnhanced()` is written to the response stream with a newline.
     - After `buildEnhanced()` completes, restore `console.log` and end the response.
   - On missing directory or errors, still stream error or warning lines and end with HTTP `200`.

# CLI Usage
To generate the enhanced ontology:

node src/lib/main.js --build-enhanced
node src/lib/main.js -be

# HTTP Usage
When running the server with `--serve`, send a GET request:

GET /build-enhanced

This streams lines:

written <name>-intermediate.json
...
written enhanced-ontology.json

# Programmatic API

```js
import { buildEnhanced } from 'owl-builder';
const { count, files } = buildEnhanced({ intermediateDir: 'intermediate', outDir: process.cwd() });
console.log(`Merged into enhanced-ontology.json`, files);
```

# Testing
- Unit tests for `buildEnhanced()`:
  • Mock `fs.existsSync`, `fs.readdirSync`, `fs.readFileSync`, `fs.mkdirSync`, `fs.writeFileSync` and spies for `console.log` and `console.error`.
  • Verify behavior when `intermediateDir` is missing, empty, contains valid JSON-LD with `@graph`, and when files fail to parse.
- CLI tests in `tests/unit/main.build.enhanced.test.js`:
  • Mock `buildEnhanced` and spy on `console.log` to verify invocation when using `--build-enhanced` and `-be` flags.
  • Ensure `main()` returns without throwing.
- HTTP integration tests in `tests/unit/main.serve.build.enhanced.test.js`:
  • Start server on ephemeral port, create `intermediate/sample.json` artifacts, issue GET `/build-enhanced`, and verify status `200`, header `text/plain`, body contains lines for each file and `written enhanced-ontology.json`.

# Documentation Updates
- Update `docs/FEATURES.md`, `docs/USAGE.md`, and `README.md` to include the `--build-enhanced` option under Features and Usage, with example invocations and sample output.