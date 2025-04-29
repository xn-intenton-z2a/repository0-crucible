# Description

Export JSON-LD OWL artifacts to widely used RDF serializations for interoperability and downstream processing. Enable users to convert JSON-LD documents into Turtle, N-Triples, or retain JSON-LD output.

# Programmatic API

Export async function exportRdf(filePath: string, format: "turtle" | "ntriples" | "jsonld"): Promise<string> that:
1. Reads and parses the file at filePath as JSON-LD
2. If format is jsonld, returns JSON.stringify(parsed, null, 2)
3. Otherwise invokes jsonld.toRDF(parsed, { format: "application/n-quads" }) to obtain quads in N-Quads format
4. Uses N3.Writer configured with format option to serialize quads into:
   - Turtle when format is turtle
   - N-Triples when format is ntriples
5. Resolves with the serialization string or throws an error for unsupported formats or conversion failures

# CLI Support

Add flag --export <file> <format> (alias -e):
1. Validate presence of file and format arguments; on missing log error and return without throwing
2. Call exportRdf(file, format) and output the returned serialization string via console.log
3. On error catch and log error.message without exiting with an exception

# HTTP Server Endpoints

GET /export?file=<path>&format=<format>
1. If either query parameter is missing respond with 400 and plain-text error Missing required parameters: file and format
2. Call exportRdf with provided parameters
3. On success respond with 200 and content-type based on format:
   - text/turtle for turtle
   - application/n-triples for ntriples
   - application/ld+json for jsonld
   and send the serialization string as the response body
4. On error respond with 500 and plain-text error.error message

# Testing

- Unit tests for exportRdf:
  • Simulate file read failures and invalid JSON errors
  • Assert rejection for unsupported formats
  • Provide a sample JSON-LD document and verify correct serialization outputs for each supported format
- CLI tests for --export flag:
  • Invoke main with insufficient arguments to assert error logging
  • Spy on exportRdf to simulate successful and failing conversions and assert console.log or console.error calls
- HTTP integration tests for GET /export:
  • Missing params respond 400 and error message
  • Successful conversions yield correct status, content-type, and body for turtle, ntriples, and jsonld
  • Simulate conversion error to assert status 500 and error message body

# Documentation Updates

- Update docs/FEATURES.md under Ontology Management to describe RDF Serialization feature, include CLI flag, programmatic API signature, HTTP endpoint, and example invocations for each format
- Update docs/USAGE.md and README.md to show example commands for exporting an OWL JSON-LD artifact to Turtle and N-Triples

# Dependencies File Updates

- Add dependency "n3" to package.json under dependencies to enable RDF writing