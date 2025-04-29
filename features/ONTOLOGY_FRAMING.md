# Description

Enable users to apply JSON-LD framing to an existing OWL JSON-LD ontology document, producing a structured, filtered output that matches a provided frame. This feature simplifies extraction of specific node shapes or views from large ontologies.

# Programmatic API

Export async function frameOntology({ inputPath, framePath, outputPath } = {})

- Read and parse the JSON-LD document from inputPath
- Read and parse the JSON-LD frame object from framePath
- Invoke jsonld.frame(document, frame) to produce a framed result
- If outputPath is provided, ensure its directory exists, write framed result to outputPath with two-space indentation
- Return the framed JSON-LD object

# CLI Support

Extend main(args) in src/lib/main.js to support flag --frame <inputPath> <framePath> [outputPath]

- Validate that inputPath and framePath are provided
- Invoke frameOntology({ inputPath, framePath, outputPath })
- On success, if outputPath was provided, log the output file path to stdout; otherwise pretty-print the result via console.log(JSON.stringify(result, null, 2))
- On missing or invalid arguments or file errors, output an error message via console.error and return without throwing

# HTTP Endpoints

Under --serve mode in src/lib/main.js server logic:

GET /frame?input=<inputPath>&frame=<framePath>

- Read and parse document and frame from the provided file paths
- Stream the framed JSON-LD object as application/json
- Respond with HTTP 200 and the framed result body
- On file or framing errors respond with HTTP 500 and a plain-text error message

POST /frame

- Read buffered JSON body { inputPath: string, frame: object }
- Validate presence of inputPath and frame
- Invoke jsonld.frame on the loaded document and provided frame object
- Respond 200 application/json with framed result; on errors 400 or 500 plain-text

# Testing

- Unit tests for frameOntology:
  - Mock fs to simulate reading valid ontology and frame files
  - Verify that jsonld.frame is called with correct arguments
  - Test both writing to outputPath and returning object when no outputPath
  - Simulate invalid JSON or missing files and assert errors are handled gracefully

- CLI tests for --frame flag:
  - Missing parameters logs error and does not throw
  - Valid invocation prints framed JSON when no outputPath
  - Valid invocation writes file when outputPath provided and logs file path

- HTTP integration tests under serve:
  - GET /frame returns status 200 and correct framed JSON
  - GET /frame with missing query parameters returns 400
  - POST /frame with valid body returns 200 and framed JSON
  - POST /frame with invalid JSON body returns 400

# Documentation Updates

- Update docs/FEATURES.md to add the Frame Ontology feature under Ontology Processing
- Update docs/USAGE.md and README.md with CLI examples for --frame and sample JSON-LD framing
- Add a JSON-LD frame example file in docs/examples for user reference