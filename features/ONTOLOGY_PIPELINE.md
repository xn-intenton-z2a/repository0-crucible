# Description

Provide a unified ontology build pipeline covering source refresh, intermediate artifact creation, enhanced ontology assembly, and timestamped persistence of enhanced snapshots. This feature offers a cohesive, reproducible workflow for OWL JSON-LD ontology generation, versioning, and archival.

# Programmatic API

Export the following asynchronous functions from src/lib/main.js

• buildIntermediate({ dataDir = "data", intermediateDir = "intermediate" } = {})
  • Remove and recreate intermediateDir
  • Read JSON files from dataDir and convert each to an OWL JSON-LD artifact with @context and @graph
  • Write each artifact to intermediateDir with two-space indentation
  • Return an object { count, files }

• buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {})
  • Invoke refreshSources() to fetch and persist raw data
  • Invoke buildIntermediate({ dataDir, intermediateDir })
  • Merge @graph entries from all intermediate artifacts
  • Ensure outDir exists and write enhanced.json with two-space indentation
  • Return an object { refreshed, intermediate, enhanced: { file: "enhanced.json", count } }

• mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
  • Call buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir })
  • Confirm persistenceDir exists
  • Generate a UTC timestamp in YYYYMMDDThhmmssZ format
  • Write a snapshot file named enhanced-<timestamp>.json in persistenceDir with two-space indentation
  • Return an object { snapshotFile, count }

# CLI Support

Extend main(args) in src/lib/main.js to support flag --merge-persist [dataDir] [intermediateDir] [persistenceDir]

• Validate positional arguments as optional
• Invoke mergePersist with parsed paths
• On success console.log snapshot filename and node count
• On missing or invalid arguments console.error an error message and return without throwing

# HTTP Endpoints

Under --serve mode in src/lib/main.js server logic add handler:

• GET /merge-persist
  • Respond HTTP 200 text/plain streaming each mergePersist log line
  • On success end response after streaming snapshot filename
  • On failure respond HTTP 500 plain-text with error message

# Testing

• Unit tests for mergePersist
  • Mock buildEnhanced to verify timestamped snapshot write and return values
  • Test behavior when persistenceDir missing or unwriteable
• CLI tests for --merge-persist flag
  • Missing arguments logs error without throwing
  • Successful invocation logs snapshot filename and count
• HTTP integration tests under --serve for GET /merge-persist
  • Returns status 200 text/plain with correct snapshot line
  • On error returns status 500 plain-text error message

# Documentation Updates

• Update docs/FEATURES.md to describe merge-persist endpoint and CLI flag under Ontology Pipeline
• Update docs/USAGE.md and README.md with CLI and HTTP examples for merge-persist and timestamped snapshot generation