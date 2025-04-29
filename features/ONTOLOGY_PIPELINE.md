# Description
Provide a unified build pipeline for creating OWL JSON-LD ontologies from captured data, including intermediate artifact generation, enhanced ontology assembly, and timestamped persistence of snapshots. The pipeline can be invoked via programmatic API, CLI flags, or HTTP endpoints to support reproducible ontology versioning and archive management.

# Programmatic API
Export the following async functions from src/lib/main.js:

• buildIntermediate({ dataDir = "data", intermediateDir = "intermediate" } = {})
  • Remove and recreate intermediateDir
  • Read .json files from dataDir
  • Transform array, results.bindings, or @graph structures into JSON-LD OWL with @context and @graph
  • Write each artifact as <name>-intermediate.json into intermediateDir
  • Return { count, files: string[] }

• buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {})
  • Invoke refreshSources() to fetch raw data
  • Call buildIntermediate({ dataDir, intermediateDir })
  • Read all JSON artifacts from intermediateDir and concatenate their @graph entries
  • Ensure outDir exists, write enhanced.json with two-space indentation
  • Return { refreshed, intermediate, enhanced: { file: "enhanced.json", count } }

• mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
  • Call buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir })
  • Read persistenceDir/enhanced.json to confirm latest enhanced ontology
  • Ensure persistenceDir exists
  • Create a UTC timestamp in basic format YYYYMMDDThhmmssZ
  • Write a snapshot file named enhanced-<YYYYMMDDThhmmssZ>.json with two-space indentation
  • Return { snapshotFile: string, count }

# CLI Support
Extend main(args) in src/lib/main.js:

• --build-intermediate [dataDir] [intermediateDir]
  • Invoke buildIntermediate with defaults or provided paths

• --build-enhanced, -be [dataDir] [intermediateDir] [outDir]
  • Invoke buildEnhanced with defaults or provided paths

• --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  • Invoke mergePersist and log the persisted snapshot filename: written <snapshotFile>
  • On missing or invalid paths log errors via console.error and return without throwing

All handlers must log errors via console.error and return without throwing.

# HTTP Server Endpoints
Under serve mode add GET handlers in src/lib/main.js server logic:

• GET /build-intermediate
  • Stream console.log output of buildIntermediate as text/plain

• GET /build-enhanced
  • Stream console.log output of buildIntermediate and buildEnhanced as text/plain

• GET /merge-persist
  • Stream console.log output of mergePersist, sending each line as text/plain

Error conditions should respond with 500 and plain-text error messages.

# Testing
Add or update unit tests in tests/unit:

• buildIntermediate: existing tests verify file writes and return value
• buildEnhanced: existing tests verify enhanced.json creation and return value
• mergePersist:
  • Mock buildEnhanced to simulate enhanced.json
  • Verify timestamped file creation in persistenceDir
  • Assert return value includes correct snapshotFile and count

Add CLI tests for --merge-persist covering:

• Default invocation with no paths, calls mergePersist()
• Custom dataDir, intermediateDir and persistenceDir arguments
• Error logging on invalid or missing parameters

Add HTTP integration tests under serve mode:

• GET /merge-persist returns status 200, content-type text/plain
• Response body contains a line matching written enhanced-<ISO basic UTC timestamp>.json
• On mergePersist failure endpoint returns status 500 with plain-text error message

# Documentation Updates

Update docs/FEATURES.md to describe --merge-persist flag and /merge-persist endpoint under Ontology Pipeline.
Update docs/USAGE.md and README.md with examples of merge-persist usage and sample timestamped snapshot names.