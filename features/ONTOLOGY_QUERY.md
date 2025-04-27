# Description
Add a new CLI command to query OWL JSON-LD artifacts by filtering individuals based on property values. Users can extract subsets of any ontology file without running the HTTP server.

# Implementation
1. Detect --query or -q flag in main CLI arguments.  If present expect a filter parameter in the form property=value and an optional --file flag pointing to a JSON-LD file.
2. Parse arguments:
   - property and value from the filter parameter split on '='.  If missing or malformed, output a plain-text error and exit with code 1.
   - file path default to ontologies/enhanced-ontology.json if not provided.
3. Validate file existence using fs.existsSync.  On missing file, log an error to console.error and exit without throwing.
4. Read and parse the JSON-LD file using fs.readFileSync and JSON.parse.
5. Extract @context and @graph array.  Filter the @graph entries where entry[property] strictly equals value.
6. Construct result document with the original @context and the filtered @graph.
7. Output the resulting JSON-LD document using console.log with two-space pretty printing.
8. Return without error.

# Testing
- Add unit tests in tests/unit/main.query.test.js:
  • Mock fs.existsSync to simulate missing and existing files.
  • Mock fs.readFileSync to return a sample JSON-LD document with @context and @graph array.
  • Verify that providing a valid filter and file results in console.log called with expected JSON-LD output containing only matching entries.
  • Test missing filter parameter yields console.error and no exception.
  • Test malformed filter (no '=') yields console.error.
  • Test missing file yields console.error.

# Documentation Updates
Update docs/FEATURES.md, docs/USAGE.md, and README.md to describe the new --query flag, usage examples, the default file path, and sample output of filtered JSON-LD.