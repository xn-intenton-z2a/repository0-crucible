# Description
Provide a unified ontology build pipeline that covers data capture, intermediate artifact creation, enhanced ontology assembly, and timestamped persistence of enhanced snapshots. This feature replaces and supersedes the separate merge-persist feature, offering a cohesive, reproducible workflow for OWL JSON-LD ontology generation and versioning.

# Programmatic API
Export the following asynchronous functions from src/lib/main.js:

• buildIntermediate({ dataDir = "data", intermediateDir = "intermediate" } = {})
  • Remove and recreate intermediateDir
  • Read JSON files from dataDir and convert each to an OWL JSON-LD artifact with @context and @graph
  • Write each artifact to intermediateDir with two-space indentation
  • Log written filenames and return { count, files }

• buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {})
  • Invoke refreshSources() to fetch and persist raw data
  • Invoke buildIntermediate({ dataDir, intermediateDir })
  • Read and merge @graph entries from all intermediate artifacts
  • Ensure outDir exists and write enhanced.json with two-space indentation
  • Return { refreshed, intermediate, enhanced: { file: "enhanced.json", count } }

• mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
  • Call buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir })
  • Confirm persistenceDir/enhanced.json exists
  • Create a UTC timestamp in YYYYMMDDThhmmssZ format
  • Write a snapshot file named enhanced-<timestamp>.json in persistenceDir with two-space indentation
  • Log the snapshot filename and return { snapshotFile, count }

# CLI Support
Extend main(args) in src/lib/main.js to support the following flags:

• --build-intermediate [dataDir] [intermediateDir]
  • Invoke buildIntermediate() with optional positional arguments
  • On missing or invalid paths, log an error and return without throwing
  • On success stream each log line to stdout

• --build-enhanced, -be [dataDir] [intermediateDir] [outDir]
  • Invoke buildEnhanced() with parsed arguments
  • Validate directory parameters, log errors on invalid input
  • On success, stream each log line including written enhanced.json and node count

• --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  • Invoke mergePersist() with parsed arguments
  • On success, console.log the snapshot filename and return cleanly
  • On invalid paths or errors, log an error and return without throwing

# HTTP Endpoints
Under --serve mode in src/lib/main.js server logic add GET handlers:

• GET /build-intermediate
  • Respond with HTTP 200 and content-type text/plain
  • Override console.log to stream each intermediate write and summary
  • Invoke buildIntermediate() and end response
  • On error respond with HTTP 500 and plain-text error

• GET /build-enhanced
  • Respond with HTTP 200 and content-type text/plain
  • Override console.log to stream refresh, intermediate writes, enhanced writes, and summary line
  • Invoke buildEnhanced() and end response
  • On error respond with HTTP 500 and plain-text error

• GET /merge-persist
  • Respond with HTTP 200 and content-type text/plain
  • Override console.log to stream mergePersist logs including timestamped snapshot writes
  • Invoke mergePersist() and end response
  • On error respond with HTTP 500 and plain-text error

# Testing
- Unit tests for buildIntermediate, buildEnhanced, and mergePersist functions:
  • Mock file system and mainModule.refreshSources to verify file writes, return values, and error handling
- CLI tests for --build-intermediate, --build-enhanced, and --merge-persist flags:
  • Missing parameters log errors without throwing
  • Valid invocations call the correct functions with parsed arguments
  • Successful executions stream expected log output
- HTTP integration tests under --serve:
  • GET /build-intermediate returns status 200, text/plain, and expected log lines
  • GET /build-enhanced returns status 200, text/plain, and expected log lines including summary
  • GET /merge-persist returns status 200, text/plain, and expected timestamped snapshot lines
  • Endpoints return HTTP 500 with plain-text error messages on failures

# Documentation Updates
- Update docs/FEATURES.md to remove separate merge-persist entry and describe the unified build pipeline and new /merge-persist endpoint under Ontology Pipeline
- Update docs/USAGE.md and README.md with CLI examples for all three flags: --build-intermediate, --build-enhanced, --merge-persist
- Add examples of HTTP invocations for /build-intermediate, /build-enhanced, and /merge-persist with sample outputs