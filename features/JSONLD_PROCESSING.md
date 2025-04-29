# Description
Enable users to perform JSON-LD compaction, expansion, and flattening on OWL JSON-LD ontology documents. This feature leverages the jsonld library to transform documents between different forms, making ontologies easier to integrate with various contexts and consumer applications.

# Programmatic API

Export the following asynchronous functions from src/lib/main.js:

compactDocument({ inputPath, contextPath, outputPath } = {})
  • Read and parse the JSON-LD document from inputPath
  • Read and parse the JSON-LD context object from contextPath
  • Invoke jsonld.compact(document, context) to produce a compacted result
  • If outputPath is provided, ensure its directory exists, write compacted result to outputPath with two-space indentation
  • Return the compacted JSON-LD object

expandDocument({ inputPath, outputPath } = {})
  • Read and parse the JSON-LD document from inputPath
  • Invoke jsonld.expand(document) to produce an expanded result
  • If outputPath is provided, ensure its directory exists, write expanded result to outputPath with two-space indentation
  • Return the expanded JSON-LD array

flattenDocument({ inputPath, contextPath, outputPath } = {})
  • Read and parse the JSON-LD document from inputPath
  • Optionally read and parse a context object from contextPath if provided
  • Invoke jsonld.flatten(document, context) if context provided, otherwise jsonld.flatten(document) to produce a flat result
  • If outputPath is provided, ensure its directory exists, write flattened result to outputPath with two-space indentation
  • Return the flattened JSON-LD object

# CLI Support

Extend main(args) in src/lib/main.js to support the following flags:

--compact <inputPath> <contextPath> [outputPath]
  • Validate that inputPath and contextPath are provided
  • Invoke compactDocument and on success, if outputPath was provided, console.log the output file path; otherwise pretty-print the result via console.log(JSON.stringify(result, null, 2))
  • On missing or invalid arguments or file errors, output an error message via console.error and return without throwing

--expand <inputPath> [outputPath]
  • Validate that inputPath is provided
  • Invoke expandDocument and handle output and errors as above

--flatten <inputPath> [contextPath] [outputPath]
  • Validate that inputPath is provided
  • Invoke flattenDocument with parsed arguments
  • On success, if outputPath was provided, console.log the output file path; otherwise pretty-print result via console.log(JSON.stringify(result, null, 2))
  • On errors, output an error message via console.error and return without throwing

# HTTP Endpoints

Under --serve mode in src/lib/main.js server logic add handlers:

GET /compact?input=<inputPath>&context=<contextPath>
  • Read and parse document and context files
  • Invoke jsonld.compact
  • Respond HTTP 200 with application/json body containing compacted result
  • On missing parameters return 400 plain-text; on errors return 500 plain-text

POST /compact
  • Read buffered JSON body { inputPath: string, context: object }
  • Validate presence of inputPath and context
  • Invoke jsonld.compact
  • Respond 200 with application/json result or 400/500 on error

GET /expand?input=<inputPath>
  • Read and parse document file
  • Invoke jsonld.expand
  • Respond 200 JSON or 400/500 on error

POST /expand
  • Read buffered JSON body { inputPath: string }
  • Validate presence of inputPath
  • Invoke jsonld.expand
  • Respond 200 JSON or 400/500 on error

GET /flatten?input=<inputPath>&context=<contextPath>
  • Read and parse input and optional context files
  • Invoke jsonld.flatten
  • Respond 200 with application/json body containing flattened result
  • On missing input parameter return 400; on errors return 500

POST /flatten
  • Read buffered JSON body { inputPath: string, context?: object }
  • Validate presence of inputPath
  • Invoke jsonld.flatten with optional context
  • Respond 200 JSON or 400/500 on error

# Testing

- Unit tests for compactDocument, expandDocument, and flattenDocument:
  • Mock fs to simulate reading valid JSON-LD and context files
  • Mock jsonld.compact, jsonld.expand, and jsonld.flatten to verify correct invocation and returned values
  • Test writing to outputPath and returning object/array when no outputPath
  • Simulate invalid JSON, missing files, and assert errors are handled gracefully

- CLI tests for --compact, --expand, and --flatten flags:
  • Missing parameters logs error and does not throw
  • Valid invocation prints JSON when no outputPath
  • Valid invocation writes file when outputPath provided and logs file path

- HTTP integration tests under --serve for /compact, /expand, and /flatten:
  • GET /flatten returns status 200 and correct JSON
  • GET /flatten with missing query parameters returns 400
  • POST /flatten with valid body returns 200 and flattened JSON
  • Endpoints return 500 with plain-text on failures

# Documentation Updates

- Update docs/FEATURES.md to describe flatten capabilities alongside compaction and expansion, including CLI flags, API signatures, and HTTP endpoints
- Update docs/USAGE.md and README.md with flatten examples and sample outputs