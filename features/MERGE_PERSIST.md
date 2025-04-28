# Description
Persist enhanced ontology snapshots with timestamped versioning. This feature extends the full ontology pipeline by saving each merged enhanced document into a dedicated directory for historical tracking and reuse.

# Programmatic API
Export an async function mergePersist({ dataDir = "data", intermediateDir = "intermediate", enhancedDir = "enhanced", outDir = "ontologies" } = {}) that:
1. Calls buildEnhanced({ dataDir, intermediateDir, outDir: enhancedDir }) to generate the enhanced JSON-LD document.
2. Reads the generated file enhancedDir/enhanced.json and parses its JSON content.
3. Ensures the target output directory exists using fs.mkdirSync(outDir, { recursive: true }).
4. Derives a timestamp string in ISO basic format without separators (YYYYMMDDThhmmssZ) based on the current UTC time.
5. Constructs a snapshot filename: enhanced-<timestamp>.json.
6. Writes the enhanced document content into outDir/<snapshotFilename> with two-space indentation.
7. Logs a message console.log(`persisted ${snapshotFilename}`) and returns an object { snapshotFile: snapshotFilename, count } where count is the number of nodes in the @graph array.

# CLI Support
Add a new flag --merge-persist in main(args):
- When invoked, call mergePersist() and allow its console.log messages to print to standard output.
- Return without throwing errors.

# HTTP Endpoint
Under --serve mode, handle GET /merge-persist:
- Respond with HTTP 200 and Content-Type text/plain.
- Temporarily override console.log so each line from mergePersist() is streamed to the response with newline separators.
- After completion, restore console.log and end the response.

# Testing
- Unit tests for mergePersist():
  • Mock buildEnhanced to return a known enhanced.json and graph count.
  • Spy on fs.mkdirSync and fs.writeFileSync to verify directory creation and correct file writes.
  • Spy on console.log to confirm the persisted message.
- CLI tests:
  • Spy on mergePersist to ensure main(['--merge-persist']) invokes it with default options.
- HTTP integration tests:
  • Start server with --serve and a mocked mergePersist implementation that logs a known line.
  • Issue GET /merge-persist and verify HTTP 200, text/plain, and presence of the persisted log line.

# Documentation Updates
- Update docs/FEATURES.md to add the Merge Persist feature under Ontology Management, including CLI and HTTP usage.
- Update docs/USAGE.md and README.md to document the --merge-persist flag and GET /merge-persist endpoint, with example invocations, sample outputs, and description of timestamped snapshots.