# Description
Provide a pipeline step to persist enhanced OWL JSON-LD snapshots with timestamped filenames under a configurable persistence directory, enabling reproducible ontology versioning and audit history.

# Programmatic API
Export async function mergePersist({ dataDir = "data", intermediateDir = "intermediate", persistenceDir = "ontologies" } = {})
• Invoke buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir })
• Read persistenceDir/enhanced.json to confirm the enhanced ontology
• Ensure persistenceDir exists on disk
• Generate a UTC timestamp in basic format YYYYMMDDThhmmssZ
• Write snapshot file named enhanced-<YYYYMMDDThhmmssZ>.json with two-space indentation under persistenceDir
• Log the written snapshot filename via console.log
• Return an object { snapshotFile: string, count: number }

# CLI Support
Extend main(args) in src/lib/main.js:
• Add flag --merge-persist [dataDir] [intermediateDir] [persistenceDir]
  • Invoke mergePersist with defaults or provided paths
  • On success console.log the snapshotFile
  • On missing or invalid paths console.error an error message and return without throwing

# HTTP Server Endpoints
Under --serve mode in src/lib/main.js HTTP server logic:
• GET /merge-persist
  • Stream console.log output of mergePersist as text/plain
  • Respond with HTTP 200 and each log line in the response body
  • On error respond with HTTP 500 and a plain-text error message

# Testing
• Unit tests for mergePersist: mock buildEnhanced to simulate persistenceDir/enhanced.json; verify creation of enhanced-<timestamp>.json and correct return value
• CLI tests for --merge-persist covering default invocation, custom paths, and error logging on invalid parameters
• HTTP integration tests for GET /merge-persist returning status 200 with expected log lines and status 500 on failure