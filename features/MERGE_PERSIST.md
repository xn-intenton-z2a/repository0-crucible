# Description

Implement snapshot persistence for enhanced OWL JSON-LD ontologies. After building the enhanced ontology, automatically create a timestamped snapshot in a configurable persistence directory, enabling historical versioning and audit.

# Programmatic API

Export async function mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
- Invoke buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir }) to ensure the latest enhanced ontology is generated
- Read the file persistenceDir/enhanced.json to confirm content
- Ensure persistenceDir exists on disk
- Create a UTC timestamp in basic format YYYYMMDDThhmmssZ
- Write snapshot file named enhanced-<timestamp>.json in persistenceDir with two-space JSON indentation
- Log written snapshot filename via console.log
- Return an object { snapshotFile: string, count: number } reflecting the new file and number of nodes

# CLI Support

Extend main(args) in src/lib/main.js to support flag --merge-persist [dataDir] [intermediateDir] [persistenceDir]
- Accept optional positional arguments for dataDir, intermediateDir, persistenceDir
- Validate provided paths exist or can be created; on invalid paths log an error via console.error and return without throwing
- Invoke mergePersist with parsed arguments
- On success, console.log the snapshot filename and exit cleanly

# HTTP Endpoints

Under --serve mode in src/lib/main.js server logic:

GET /merge-persist
- Respond with HTTP 200 and content-type text/plain
- Override console.log to stream each log line into the response body
- Invoke mergePersist() asynchronously
- On completion, end response
- On error, respond with HTTP 500 and plain-text error message

# Testing

- Unit tests for mergePersist:
  - Mock buildEnhanced to generate enhanced.json with known graph count
  - Verify that mergePersist writes a file matching pattern enhanced-<timestamp>.json and returns correct snapshotFile and count
  - Simulate file system errors (permission denied, missing persistenceDir) and assert errors are thrown or handled gracefully
- CLI tests for --merge-persist:
  - Default invocation calls mergePersist() without args
  - Custom dataDir, intermediateDir, persistenceDir arguments call mergePersist with correct params
  - Missing or uncreatable directories log errors and exit without throwing
- HTTP integration tests under serve:
  - GET /merge-persist returns status 200, content-type text/plain, and includes the written snapshot filename line
  - On mergePersist failure endpoint returns status 500 with plain-text error message

# Documentation Updates

- Update docs/FEATURES.md to describe --merge-persist flag and /merge-persist endpoint under Ontology Pipeline section
- Update docs/USAGE.md and README.md with examples of invoking --merge-persist and expected output including timestamped snapshot filename