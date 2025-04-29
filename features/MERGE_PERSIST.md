# Description
Provide a pipeline step to persist enhanced OWL JSON-LD snapshots with timestamped filenames under a configurable persistence directory, enabling reproducible ontology versioning and audit history.

# Programmatic API
- Export async function mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
- Invoke buildEnhanced with dataDir, intermediateDir and outDir set to persistenceDir
- Read persistenceDir/enhanced.json to confirm the enhanced ontology document exists
- Ensure persistenceDir exists on disk, creating it if necessary
- Generate a UTC timestamp in basic format YYYYMMDDThhmmssZ
- Write a snapshot file named enhanced-<timestamp>.json with two-space indentation into persistenceDir
- Log the snapshot filename via console.log
- Return an object { snapshotFile: string, count: number } reflecting the written snapshot and node count

# CLI Support
- Extend main(args) in src/lib/main.js to support flag --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  - Invoke mergePersist with defaults or provided paths
  - On success output the snapshotFile to stdout
  - On missing or invalid paths output an error message via console.error and return without throwing

# HTTP Endpoints
Under --serve mode in src/lib/main.js server logic:
- GET /merge-persist
  - Stream console.log output of mergePersist as text/plain
  - Respond with HTTP 200 and include each log line in the response body
  - On error respond with HTTP 500 and a plain-text error message

# Testing
- Unit tests for mergePersist:
  - Mock buildEnhanced to simulate an enhanced.json in persistenceDir
  - Verify creation of enhanced-<timestamp>.json file and correct return object
- CLI tests for --merge-persist:
  - Default invocation, custom paths, error logging on invalid parameters
- HTTP integration tests for GET /merge-persist:
  - On success return status 200 with expected log lines
  - On failure return status 500 with plain-text error message

# Documentation Updates
- Update docs/FEATURES.md to describe the --merge-persist flag and /merge-persist endpoint under ONTOLOGY_PIPELINE
- Update docs/USAGE.md and README.md with examples of merge-persist usage and sample timestamped snapshot names