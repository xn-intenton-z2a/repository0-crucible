# Description
Provide versioned persistence of enhanced ontology snapshots after building the ontology. This feature enables archival and historical tracking of ontology states by writing snapshot files with UTC timestamped filenames.

# Programmatic API
- Export async function mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
  1. Invoke buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir }) to regenerate enhanced.json in a temporary working context.
  2. Read the file persistenceDir/enhanced.json and parse its JSON content into an object.
  3. Ensure persistenceDir exists on disk by using fs.mkdirSync(persistenceDir, { recursive: true }).
  4. Generate a UTC timestamp in ISO basic format: YYYYMMDDThhmmssZ.
  5. Construct a snapshot filename: enhanced-<timestamp>.json.
  6. Write the parsed enhanced document into persistenceDir/<snapshotFilename> with two-space indentation.
  7. Log console.log(`persisted <snapshotFilename>`).
  8. Return an object { snapshotFile: <snapshotFilename>, count: <number of nodes in @graph> }.

# CLI Support
- Add flag --merge-persist in main(args) switch.
  - Invoke mergePersist() with defaults or destructured args.
  - On success, the function logs the persisted filename and returns without throwing.
  - On error, log console.error(error.message) and return gracefully.

# HTTP Server Endpoints
- GET /merge-persist
  - Respond with status 200 and Content-Type: text/plain.
  - Temporarily override console.log to stream each log line to the HTTP response.
  - Invoke mergePersist({}) and stream the persisted messages.
  - Restore console.log and end the response once complete.
  - On error, respond with 500 and plain-text error message.

# Testing
- Unit tests for mergePersist:
  - Mock buildEnhanced to write a known enhanced.json content.
  - Spy on fs methods: mkdirSync, readFileSync, writeFileSync.
  - Verify snapshot filename pattern matches ISO basic format.
  - Verify console.log is called with persisted message.
  - Assert returned object contains correct snapshotFile and count.
- CLI tests:
  - Spy on mergePersist and ensure main(["--merge-persist"]) invokes it with no arguments.
  - Simulate custom args if CLI supports parameters (optional).
- HTTP integration tests:
  - Start server with --serve.
  - Issue GET /merge-persist and capture streamed response.
  - Assert status code 200 and Content-Type text/plain.
  - Assert response contains persisted <snapshotFilename> and correct count.

# Documentation Updates
- Update docs/FEATURES.md under Ontology Management to include merge-persist feature and describe CLI and HTTP usage.
- Update docs/USAGE.md with example CLI invocation and sample output.
- Update README.md to list --merge-persist flag and usage example.