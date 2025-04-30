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