# Description
Provide a unified build pipeline for creating OWL JSON-LD ontologies from captured data, including intermediate artifact generation, enhanced ontology assembly, and timestamped persistence of snapshots under a persistence directory. The pipeline can be invoked via programmatic API, CLI flags, or HTTP endpoints to support reproducible ontology versioning, archive management, and snapshot auditing.

# Programmatic API
Export the following async functions from src/lib/main.js:

• buildIntermediate({ dataDir = "data", intermediateDir = "intermediate" } = {})
  • Remove and recreate intermediateDir
  • Read .json files from dataDir
  • Transform array, results.bindings, or @graph structures into JSON-LD OWL with @context and @graph
  • Write each artifact as <name>-intermediate.json into intermediateDir
  • Log writes via console.log and return { count, files: string[] }

• buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {})
  • Invoke refreshSources() to fetch raw data
  • Call buildIntermediate({ dataDir, intermediateDir })
  • Read all JSON artifacts from intermediateDir and concatenate their @graph entries
  • Ensure outDir exists, write enhanced.json with two-space indentation
  • Return { refreshed, intermediate, enhanced: { file: "enhanced.json", count } }

• mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
  • Call buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir })
  • Read persistenceDir/enhanced.json to confirm latest enhanced ontology
  • Ensure persistenceDir exists on disk
  • Create a UTC timestamp in basic format YYYYMMDDThhmmssZ
  • Write a snapshot file named enhanced-<YYYYMMDDThhmmssZ>.json with two-space indentation
  • Log written snapshot filename via console.log
  • Return { snapshotFile: string, count }

# CLI Support
Extend main(args) in src/lib/main.js:

• --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  • Invoke mergePersist with defaults or provided paths
  • On success log written <snapshotFile>
  • On missing or invalid paths log errors via console.error and return without throwing

# HTTP Server Endpoints
Under serve mode add GET handler in src/lib/main.js server logic:

• GET /merge-persist
  • Stream console.log output of mergePersist as text/plain
  • Respond with 200 and each log line as part of the response
  • On error respond with 500 and plain-text error message

# Testing
Add or update unit tests in tests/unit:

• mergePersist: mock buildEnhanced to simulate enhanced.json in persistenceDir
  • Verify creation of snapshot file with pattern enhanced-<YYYYMMDDThhmmssZ>.json
  • Assert return value includes correct snapshotFile and count matching graph size

Add CLI tests for --merge-persist covering:
• Default invocation with no paths, calls mergePersist()
• Custom dataDir, intermediateDir and persistenceDir arguments
• Error logging on invalid or missing parameters

Add HTTP integration tests under serve mode:
• GET /merge-persist returns status 200, content-type text/plain
• Response body contains a line matching written enhanced-<ISO basic UTC timestamp>.json
• On mergePersist failure endpoint returns status 500 with plain-text error message

# Documentation Updates
Update docs/FEATURES.md to describe --merge-persist flag and /merge-persist endpoint under Ontology Pipeline
Update docs/USAGE.md and README.md with examples of merge-persist usage and sample timestamped snapshot names