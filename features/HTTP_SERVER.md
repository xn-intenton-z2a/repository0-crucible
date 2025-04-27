# Description
Extend the existing HTTP server feature to expose a new REST endpoint for querying OWL JSON-LD artifacts by filtering individuals on specified property values. This enables users to interactively explore and retrieve subsets of an ontology without leaving the HTTP interface.

# Implementation
1. Under the --serve flag path in main, add a new route for GET /query
2. Parse query parameters:
   - file: relative path to a local JSON-LD file (default ontologies/enhanced-ontology.json)
   - filter: a string in the format property=value
3. Validate parameters:
   - If file does not exist, respond with 404 and a plain-text error
   - If filter is missing or not in property=value form, respond with 400 and a plain-text message
4. Read and parse the specified JSON-LD file using fs.readFileSync and JSON.parse
5. Extract the @context and @graph array from the document
6. Split filter into property and value, then filter @graph entries where entry[property] exactly matches value
7. Construct a response document with the original @context and the filtered @graph
8. Respond with status 200, Content-Type application/json, and the JSON-stringified response (two-space indentation)
9. On JSON parse errors or other exceptions, respond with 500 and a plain-text error message
10. Preserve all existing endpoints and behavior unchanged

# Testing
- Add unit or integration tests for the /query endpoint:
  • Verify GET /query without parameters returns 400
  • Verify GET /query?file=<invalid> returns 404
  • Create a sample ontology file in a test fixture directory with known @graph entries
  • Issue GET /query?file=<path>&filter=name=Alice and expect only entries where name equals Alice
  • Issue GET /query?file=<path>&filter=id=http://example.org/1 and expect a single matching entry
  • Verify Content-Type header is application/json and status codes match expectations
  • Test error paths: invalid JSON in file yields 500, missing file yields 404, invalid filter yields 400

# Documentation Updates
Update docs/FEATURES.md, docs/USAGE.md, and README.md to describe the new /query endpoint under the Serve feature. Include example curl commands and sample JSON responses.