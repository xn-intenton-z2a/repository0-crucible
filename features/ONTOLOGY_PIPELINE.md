# Description

Provide a unified build pipeline for creating OWL JSON-LD ontologies from captured data. This feature consolidates the intermediate artifact generation, enhanced ontology assembly, and timestamped persistence of snapshots into a single, coherent workflow that can be invoked via programmatic API, CLI flags, or HTTP endpoints.

# Programmatic API

Export the following async functions from src/lib/main.js:

• buildIntermediate({ dataDir = "data", intermediateDir = "intermediate" } = {})
  • Remove and recreate the intermediateDir
  • Read each .json file from dataDir
  • Transform array or results.bindings or @graph structures into JSON-LD OWL with @context and @graph
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

Extend main(args) in src/lib/main.js to handle:

• --build-intermediate [dataDir] [intermediateDir]
  • Invoke buildIntermediate with defaults or provided dirs

• --build-enhanced, -be [dataDir] [intermediateDir] [outDir]
  • Invoke buildEnhanced with defaults or provided paths

• --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  • Invoke mergePersist and log the persisted snapshot filename

All CLI handlers must log errors via console.error on missing parameters or execution failures and return without throwing.

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

Add or update unit tests in tests/unit for each API function:

• buildIntermediate: simulate dataDir contents and fs methods, assert writes and return value
• buildEnhanced: mock refreshSources and buildIntermediate, verify enhanced.json content and return shape
• mergePersist: mock buildEnhanced, simulate existing enhanced.json file, assert snapshot naming and return data

Add CLI tests for --build-intermediate, --build-enhanced, --merge-persist covering default and custom arguments, missing parameter errors, and console.log outputs.

Add HTTP integration tests under serve mode:

• GET /build-intermediate returns status 200, content-type text/plain, and artifact lines
• GET /build-enhanced returns status 200 and pipeline messages
• GET /merge-persist returns status 200 and snapshot line matching ISO basic timestamp pattern

# Documentation Updates

Update docs/FEATURES.md to replace separate Build Intermediate and Build Enhanced entries with the new Ontology Pipeline feature. Update docs/USAGE.md and README.md to include example invocations for all three CLI flags and HTTP endpoints, sample outputs, and description of timestamped snapshots.