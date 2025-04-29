# Description
Provide a unified build pipeline for creating OWL JSON-LD ontologies from captured data, including intermediate artifact generation, enhanced ontology assembly, and timestamped persistence of snapshots. The pipeline can be invoked via API, CLI flags, or HTTP endpoints to support reproducible ontology versioning.

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

• mergePersist({ dataDir, intermediateDir, persistenceDir = "ontologies" } = {})
  • Call buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir })
  • Read persistenceDir/enhanced.json
  • Ensure persistenceDir exists
  • Create UTC timestamped filename enhanced-<YYYYMMDDThhmmssZ>.json
  • Write snapshot file and return { snapshotFile, count }

# CLI Support
Extend main(args) in src/lib/main.js:

• --build-intermediate [dataDir] [intermediateDir]
  • Invoke buildIntermediate with defaults or provided paths

• --build-enhanced, -be [dataDir] [intermediateDir] [outDir]
  • Invoke buildEnhanced with defaults or provided paths

• --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  • Invoke mergePersist and log the persisted snapshot filename

All handlers must log errors via console.error and return without throwing.

# HTTP Server Endpoints
Under serve mode add GET handlers:

• GET /build-intermediate
  • Stream console.log output of buildIntermediate as text/plain

• GET /build-enhanced
  • Stream console.log output of buildIntermediate and buildEnhanced as text/plain

• GET /merge-persist
  • Stream console.log output of mergePersist, sending each line as text/plain

Error conditions should respond with 500 and plain-text error messages.

# Testing
Add or update unit tests in tests/unit:

• buildIntermediate: simulate dataDir contents, assert writes and return value
• buildEnhanced: mock refreshSources and buildIntermediate, verify enhanced.json
• mergePersist: mock buildEnhanced, simulate enhanced.json, assert timestamped filename and return data

Add CLI tests for --merge-persist covering default and custom arguments, error logging on missing params

Add HTTP integration tests under serve mode:

• GET /merge-persist returns status 200, content-type text/plain, and snapshot line matching ISO basic timestamp pattern

# Documentation Updates
Update docs/FEATURES.md to describe --merge-persist flag and /merge-persist endpoint under Ontology Pipeline.
Update docs/USAGE.md and README.md with examples of merge-persist usage and sample timestamped snapshot names.