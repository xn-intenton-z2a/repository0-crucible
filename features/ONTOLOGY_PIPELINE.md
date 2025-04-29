# Description
Provide a unified ontology build pipeline covering source refresh, intermediate artifact creation, enhanced ontology assembly, and timestamped persistence of enhanced snapshots. This feature offers a cohesive, reproducible workflow for OWL JSON-LD ontology generation, versioning, and archival.

# Programmatic API
Export the following asynchronous functions from src/lib/main.js:

• buildIntermediate({ dataDir = "data", intermediateDir = "intermediate" } = {})
  • Remove and recreate intermediateDir
  • Read JSON files from dataDir and convert each to an OWL JSON-LD artifact with @context and @graph
  • Write each artifact to intermediateDir with two-space indentation
  • Return { count, files }

• buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {})
  • Invoke refreshSources() to fetch and persist raw data
  • Invoke buildIntermediate({ dataDir, intermediateDir })
  • Merge @graph entries from all intermediate artifacts
  • Ensure outDir exists and write enhanced.json with two-space indentation
  • Return { refreshed, intermediate, enhanced: { file: "enhanced.json", count } }

• mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
  • Call buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir })
  • Confirm persistenceDir/enhanced.json exists
  • Generate a UTC timestamp in YYYYMMDDThhmmssZ format
  • Write a snapshot file named enhanced-<timestamp>.json in persistenceDir with two-space indentation
  • Return { snapshotFile, count }

# CLI Support
Extend main(args) in src/lib/main.js to support the following flags:

• --build-intermediate [dataDir] [intermediateDir]
  • Invoke buildIntermediate with parsed paths
  • Log errors on invalid input, stream progress lines on success

• --build-enhanced, -be [dataDir] [intermediateDir] [outDir]
  • Invoke buildEnhanced with parsed paths
  • Stream logs per step and summary on success

• --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  • Invoke mergePersist with parsed paths
  • On success console.log the snapshot filename and node count
  • On invalid input or errors log a plain-text error without throwing

# HTTP Endpoints
Under --serve mode in src/lib/main.js server logic add handlers:

• GET /build-intermediate
  • Respond HTTP 200 text/plain streaming each buildIntermediate log line

• GET /build-enhanced
  • Respond HTTP 200 text/plain streaming refresh, intermediate, and enhanced write logs

• GET /merge-persist
  • Respond HTTP 200 text/plain streaming mergePersist logs including snapshot filename

Error handling: return HTTP 500 with plain-text error message on failures.

# Testing
- Unit tests for mergePersist:
  • Mock buildEnhanced to verify timestamped snapshot write and return values
  • Test behavior when persistenceDir missing or unwriteable
- CLI tests for --merge-persist flag:
  • Missing arguments logs error without throwing
  • Successful invocation writes snapshot file and logs filename
- HTTP integration tests under --serve:
  • GET /merge-persist returns status 200, text/plain with correct snapshot line
  • Endpoint returns HTTP 500 with error text on failure

# Documentation Updates
- Update docs/FEATURES.md to describe the merge-persist endpoint and CLI flag under Ontology Pipeline
- Update docs/USAGE.md and README.md with CLI and HTTP examples for --merge-persist and timestamped snapshot generation