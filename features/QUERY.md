# Description
Consolidate and implement the ability to query OWL JSON-LD artifacts by filtering individuals on a property value, exposing both a CLI command and an HTTP REST endpoint in a single unified feature.

# Implementation
1. CLI Support
   - Detect `--query` or `-q` flag in main CLI arguments.
   - Expect a filter parameter in the form property=value and an optional `--file` flag pointing to a JSON-LD file (default ontologies/enhanced-ontology.json).
   - On missing or malformed filter, output a plain-text error via console.error and exit with code 1.
   - For valid input, parse the JSON-LD file, extract `@context` and the `@graph` array, filter entries where entry[property] strictly equals value, construct a result document and output via console.log with two-space indentation.

2. HTTP Support (under `--serve`)
   - Add a new route for GET `/query` in the HTTP server.
   - Accept query parameters:
     • `file`: relative path to a JSON-LD file (default ontologies/enhanced-ontology.json)
     • `filter`: string in the format property=value
   - Validate parameters:
     • If `file` does not exist, respond with 404 and a plain-text error
     • If `filter` is missing or malformed, respond with 400 and a plain-text message
   - Read and parse the specified file, extract `@context` and `@graph`, apply the filter, build the response document and respond with status 200, `Content-Type: application/json`, and the JSON-stringified response (two-space indentation).
   - On JSON parse errors or other exceptions, respond with 500 and a plain-text error message.

3. Shared Logic
   - Extract filter by splitting on `=` into property and value
   - Use fs.existsSync and fs.readFileSync for file operations, JSON.parse for parsing
   - Build and pretty-print output consistently across CLI and HTTP

# Testing
- Add unit tests in `tests/unit/main.query.test.js`:
  • Mock fs.existsSync and fs.readFileSync to simulate file presence and content
  • Verify CLI invocation with valid filter and file yields expected console.log output of filtered JSON-LD
  • Verify missing or malformed filter yields console.error and exit without exception
  • Verify missing file yields console.error

- Add integration tests for HTTP in `tests/unit/main.serve.query.test.js`:
  • Issue GET `/query` without parameters and expect 400
  • Issue GET `/query?file=<invalid>&filter=prop=val` and expect 404
  • Create a sample ontology file with known `@graph` entries, GET `/query?file=<path>&filter=prop=value` and expect JSON with only matching entries
  • Verify correct status codes, Content-Type and error paths (malformed filter, parse error)

# Documentation Updates
- Update `docs/FEATURES.md` and `docs/USAGE.md` to describe the new query CLI flag and HTTP `/query` endpoint, including invocation examples and sample output
- Update `README.md` under Features and Usage sections to include the unified query feature with examples