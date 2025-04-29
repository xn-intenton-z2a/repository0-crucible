# Description

Enable users to perform JSON-LD compaction and expansion on OWL JSON-LD ontology documents. This feature leverages the existing jsonld library to transform documents between full and compact forms, making ontologies easier to integrate with different contexts and consumer applications.

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

# CLI Support

Extend main(args) in src/lib/main.js to support the following flags:

--compact <inputPath> <contextPath> [outputPath]
  • Validate that inputPath and contextPath are provided
  • Invoke compactDocument({ inputPath, contextPath, outputPath })
  • On success, if outputPath was provided, log the output file path to stdout; otherwise pretty-print the result via console.log(JSON.stringify(result, null, 2))
  • On missing or invalid arguments or file errors, output an error message via console.error and return without throwing

--expand <inputPath> [outputPath]
  • Validate that inputPath is provided
  • Invoke expandDocument({ inputPath, outputPath })
  • On success, if outputPath was provided, log the output file path to stdout; otherwise pretty-print the result via console.log(JSON.stringify(result, null, 2))
  • On errors, output an error message and return without throwing

# HTTP Endpoints

Under --serve mode in src/lib/main.js server logic:

GET /compact?input=<inputPath>&context=<contextPath>
  • Read and parse document and context files
  • Invoke jsonld.compact(document, context)
  • Respond with HTTP 200 and application/json body containing compacted result
  • On file or compaction errors respond with HTTP 500 and plain-text error message

POST /compact
  • Read buffered JSON body { inputPath: string, context: object }
  • Validate presence of inputPath and context
  • Invoke jsonld.compact
  • Respond with HTTP 200 application/json with compacted result; on errors respond 400 or 500 with plain-text

GET /expand?input=<inputPath>
  • Read and parse document file
  • Invoke jsonld.expand on the loaded document
  • Respond HTTP 200 application/json with expanded array; on errors respond HTTP 500 plain-text

POST /expand
  • Read buffered JSON body { inputPath: string }
  • Validate presence of inputPath
  • Invoke jsonld.expand
  • Respond with HTTP 200 application/json with expanded result; on errors respond 400 or 500 plain-text

# Testing

- Unit tests for compactDocument and expandDocument:
  • Mock fs to simulate reading valid JSON-LD and context files
  • Mock jsonld.compact and jsonld.expand to verify correct invocation and returned values
  • Test writing to outputPath and returning object/array when no outputPath
  • Simulate invalid JSON, missing files, and assert errors are handled gracefully

- CLI tests for --compact and --expand flags:
  • Missing parameters logs error and does not throw
  • Valid invocation prints JSON when no outputPath
  • Valid invocation writes file when outputPath provided and logs file path

- HTTP integration tests under serve:
  • GET /compact returns status 200 and correct JSON
  • GET /compact with missing query parameters returns 400
  • POST /compact with valid body returns 200 and compacted JSON
  • GET /expand returns status 200 and expanded JSON array
  • POST /expand with valid body returns 200 and expanded JSON
  • Endpoints return HTTP 500 with plain-text error messages on failures

# Documentation Updates

- Update docs/FEATURES.md to describe JSON-LD compaction and expansion features with CLI flags, programmatic API signatures, HTTP endpoints, and examples
- Update docs/USAGE.md and README.md with compact and expand examples and sample outputs