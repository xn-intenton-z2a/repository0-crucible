features/JSONLD_PROCESSING.md
# features/JSONLD_PROCESSING.md
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
- Update docs/USAGE.md and README.md with flatten examples and sample outputsfeatures/ONTOLOGY_FRAMING.md
# features/ONTOLOGY_FRAMING.md
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
- Add a JSON-LD frame example file in docs/examples for user referencefeatures/SPARQL_QUERIES.md
# features/SPARQL_QUERIES.md
# Description
Provide unified SPARQL capabilities for querying ontology artifacts, including arbitrary queries and a preset capital-cities ontology generation, across CLI, programmatic API, and HTTP server modes.

# CLI Support
- Add flag `--query <file> <sparqlQuery>` (alias `-q`) to execute a SPARQL SELECT or ASK query on a local JSON-LD OWL artifact. On success output SPARQL JSON results via `console.log(JSON.stringify(..., null, 2))`; on missing arguments log an error and return without throwing; on engine or file errors log the error message.
- Add flag `--capital-cities` (alias `-cc`) to run a predefined SPARQL query against the default or specified endpoint and output an OWL-compatible JSON-LD document containing country and capital individuals with `@context` and `@graph`.

# Programmatic API
- Export `sparqlQuery(filePath: string, queryString: string): Promise<object>` that reads and parses the specified file, runs the query via Comunica `QueryEngine`, and returns standard SPARQL JSON for bindings or boolean results.
- Export `getCapitalCities(endpoint?: string): Promise<object>` that constructs and submits the fixed `SELECT ?country ?capital` query, parses the response, and returns a JSON-LD ontology document.

# HTTP Server Endpoints
- GET `/query?file=<file>&sparql=<query>` responds with status 200 and `application/json` body containing SPARQL JSON results; missing parameters return 400 plain-text error; query errors return 500 with error message.
- GET `/capital-cities` responds with status 200 and `application/json` containing the OWL JSON-LD capital cities document; fetch or parse errors return 500 plain-text error.

# Testing
- Unit tests for CLI handlers: missing args, successful query logging, error logging for both flags.
- Unit tests for `sparqlQuery` covering file read errors, JSON parse errors, SELECT results binding conversion, ASK boolean conversion, and error propagation.
- Unit tests for `getCapitalCities` covering successful fetch and JSON parsing, and error codes `QUERY_ERROR` and `INVALID_JSON` on failure.
- HTTP integration tests for `/query` and `/capital-cities` verifying status codes, content types, response bodies for success and error cases.

# Documentation Updates
- Update docs/FEATURES.md to merge entries for SPARQL query and capital-cities under a single SPARQL Queries feature, including CLI flags, HTTP endpoints, programmatic API signatures, example invocations, and sample outputs.features/SOURCE_MANAGEMENT.md
# features/SOURCE_MANAGEMENT.md
# Description
Provide a comprehensive source management subsystem that includes listing, adding, removing, updating public data source configurations, and fetching data on demand into the local data directory.

# Programmatic API

• listSources(configPath = "data-sources.json")
  • Return the built-in PUBLIC_DATA_SOURCES merged with custom entries in configPath
  • On missing or invalid file return defaults and log a warning for invalid structure

• addSource({ name, url }, configPath = "data-sources.json")
  • Validate that name is a nonempty string and url is a valid HTTP or HTTPS URL
  • Read existing custom list or start empty, prevent duplicates by name or url
  • Append new entry, write JSON with two-space indentation to configPath, return merged array

• removeSource(identifier, configPath = "data-sources.json")
  • Read existing custom list or return defaults if file missing or invalid
  • Filter out entries matching name or url equal to identifier
  • If modified write updated JSON to configPath, return merged array

• updateSource({ identifier, name, url }, configPath = "data-sources.json")
  • Ensure configPath exists and contains a valid JSON array
  • Find entry by identifier matching existing name or url
  • Validate new name and url, update entry in array, write back with two-space indentation, return merged array

• refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {})
  • Ensure dataDir exists or create it
  • Retrieve merged sources via listSources(configPath)
  • For each source:
    • Slugify source.name to a safe filename
    • Perform HTTP GET request to source.url
    • On fetch or parse error log to console.error and continue
    • Write JSON response body to dataDir/<slug>.json with two-space indentation
    • Log successful writes via console.log
  • Return an object { count: number of successful writes, files: array of filenames }

# CLI Support

• --list-sources
  • Invoke listSources and output JSON to console.log

• --add-source <name> <url>
  • Validate arguments, call addSource, on success output merged list via console.log, on error console.error

• --remove-source <identifier>
  • Validate argument, call removeSource, output merged list via console.log

• --update-source <identifier> <newName> <newUrl>
  • Validate arguments, call updateSource, on success console.log merged list, on error console.error

• --refresh [dataDir] [configPath]
  • Invoke refreshSources with default or positional args
  • Stream each console.log line to stdout
  • Return summary object without throwing on errors

# HTTP Endpoints

• GET /sources
  • Respond HTTP 200 application/json with listSources()

• POST /sources
  • Read buffered JSON body { name, url }, validate fields, call addSource
  • Respond HTTP 201 application/json with merged list or HTTP 400 plain-text on invalid input

• DELETE /sources/:identifier
  • Decode identifier, call removeSource, respond HTTP 200 application/json with merged list

• PUT /sources/:identifier
  • Decode identifier, read JSON body { name, url }, validate, call updateSource
  • Respond HTTP 200 application/json with merged list or HTTP 400 plain-text on invalid input

• GET /refresh
  • Respond HTTP 200 text/plain
  • Override console.log to stream each written line
  • Invoke refreshSources and end response on success
  • On error respond HTTP 500 plain-text with error message

# Testing

- Unit tests for listSources, addSource, removeSource, updateSource:
  • Valid and error cases for configuration file presence, structure, and input validation

- Unit tests for refreshSources:
  • Mock HTTP fetch and fs operations to simulate successful writes and errors
  • Verify console.log calls for each file written and console.error on failures
  • Assert returned count and files array

- CLI tests for --refresh flag:
  • Missing parameters or directory errors should log error without throwing
  • Successful invocation should call refreshSources with correct args and stream log lines

- HTTP integration tests for GET /refresh:
  • Returns status 200 text/plain with streamed lines and ends cleanly
  • On fetch errors returns status 500 with plain-text error message

# Documentation Updates

- Update docs/FEATURES.md to describe the refreshSources behavior under Sources Management, including CLI flag --refresh and HTTP GET /refresh examples
- Update docs/USAGE.md and README.md to add usage examples for the refresh command and sample outputsfeatures/DIAGNOSTICS.md
# features/DIAGNOSTICS.md
# Description
Extend diagnostics output to include comprehensive system and file metrics for improved monitoring and debugging. Diagnostics should provide environment details, health checks of data sources, and counts and listings of project JSON files.

# Implementation
1. In generateDiagnostics():
   - Collect existing data (version, nodeVersion, platform, arch, cwd, uptimeSeconds, memoryUsage, publicDataSources, commands, healthChecks).
   - Determine data directory at project root (data/) and intermediate directory (intermediate/).
   - If directories exist, read their contents and collect:
     - dataFilesCount: number of files ending in .json in data/
     - dataFiles: sorted list of filenames in data/
     - intermediateFilesCount: number of files ending in .json in intermediate/
     - intermediateFiles: sorted list of filenames in intermediate/
   - If directories do not exist, default counts to 0 and lists to empty arrays.
   - Include these file metrics in the returned diagnostics object.
2. In CLI handler for --diagnostics:
   - Call generateDiagnostics() and output JSON.stringify(info, null, 2) to console.log.
   - Ensure process returns without throwing.
3. In HTTP server under /diagnostics:
   - On GET /diagnostics, respond with status 200 and Content-Type application/json.
   - End response with JSON.stringify(info, null, 2).

# CLI Usage
To display enhanced diagnostics:

node src/lib/main.js --diagnostics

Example output is a pretty-printed JSON document including version, nodeVersion, platform, arch, cwd, uptimeSeconds, memoryUsage, publicDataSources, commands, healthChecks, dataFilesCount, dataFiles, intermediateFilesCount, and intermediateFiles.

# HTTP Usage
When running with --serve, send:

GET /diagnostics

The server responds with a 200 JSON content containing the same diagnostics object.

# Testing
- Update unit tests for generateDiagnostics() to verify presence and correct types of:
  • version, nodeVersion, platform, arch, cwd
  • uptimeSeconds (number)
  • memoryUsage object with numeric rss, heapTotal, heapUsed, external, arrayBuffers
  • publicDataSources array matching PUBLIC_DATA_SOURCES
  • commands array containing known CLI flags
  • healthChecks array with objects per source including name, url, statusCode, latencyMs, reachable
  • dataFilesCount and intermediateFilesCount numbers
  • dataFiles and intermediateFiles sorted arrays
- HTTP integration tests for GET /diagnostics to verify status 200, Content-Type application/json, and body contains file metric fields and health check entries.

# Documentation Updates
- Update docs/FEATURES.md to describe new file metrics fields under Diagnostics.
- Update docs/USAGE.md and README.md under Diagnostics to show example output including dataFilesCount, dataFiles, intermediateFilesCount, and intermediateFiles.features/ONTOLOGY_PIPELINE.md
# features/ONTOLOGY_PIPELINE.md
# Description

Enhance the existing ontology build pipeline by adding full support for timestamped snapshot persistence. This update ensures reproducible, versioned snapshots of enhanced OWL JSON-LD ontologies are stored automatically to a configurable directory.

# Programmatic API

Export an asynchronous function mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {}) from src/lib/main.js

- Invoke buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir }) to assemble the enhanced document
- Ensure persistenceDir exists (fs.mkdirSync with recursive)
- Generate a UTC timestamp in YYYYMMDDThhmmssZ format
- Construct a filename snapshot-<timestamp>.json
- Write the enhanced JSON-LD document to persistenceDir/<filename> with two-space indentation
- Return an object { snapshotFile: filename, count: number of nodes in @graph }

# CLI Support

Extend main(args) in src/lib/main.js to support flag --merge-persist [dataDir] [intermediateDir] [persistenceDir]

- Parse optional positional arguments in order
- Validate each path argument as a nonempty string if provided
- On invocation, call mergePersist with parsed paths
- On success console.log(`Snapshot written to <persistenceDir>/<snapshotFile> with <count> nodes`)
- On errors console.error(error.message) and return without throwing

# HTTP Endpoints

Under --serve mode add handler:

GET /merge-persist

- Respond with HTTP 200 and text/plain Content-Type
- Override console.log to stream each log line as it occurs
- Invoke mergePersist()
- After completion, console.log summary and end response
- On failure write HTTP 500 plain-text with error.message and end

# Testing

- Unit tests for mergePersist:
  - Mock buildEnhanced to supply a known enhanced document and count
  - Verify fs.mkdirSync creates persistenceDir, fs.writeFileSync writes correct filename and content
  - Simulate write errors and assert error propagation informs the caller

- CLI tests for --merge-persist flag:
  - Invoke main(["--merge-persist"]) with no args, one, two, three args and assert mergePersist was called with correct parameters
  - Mock console.log and console.error to capture messages for success and failure

- HTTP integration tests under --serve for GET /merge-persist:
  - On success, assert status 200, Content-Type text/plain, body includes each log line and summary
  - On mergePersist throwing, assert status 500 and response body equals error.message

# Documentation Updates

- Update docs/FEATURES.md under Ontology Pipeline to describe the merge-persist feature, CLI flag, HTTP endpoint, and snapshot naming convention
- Update docs/USAGE.md with examples:
  - CLI: node src/lib/main.js --merge-persist
  - HTTP: curl http://localhost:3000/merge-persist
- Update README.md under Features to include Merge Persist entry with usage examples