# Description
Consolidate enhanced ontology generation and timestamped persistence into a unified pipeline. Provide both building and persistent versioned snapshots of the enhanced ontology document for historical tracking and downstream reuse.

# Programmatic API
Export async function buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {}) that:
1. Invokes refreshSources() to update local JSON captures.
2. Calls buildIntermediate({ dataDir, outDir: intermediateDir }) to produce OWL JSON-LD intermediate artifacts.
3. Reads all .json files in intermediateDir, parses each for an @graph array, and concatenates entries into a single enhanced document.
4. Ensures outDir exists and writes enhanced.json with two-space indentation.
5. Returns { refreshed, intermediate, enhanced: { file: "enhanced.json", count } } where count is total nodes in @graph.

Export async function mergePersist({ dataDir, intermediateDir, persistenceDir = "ontologies" } = {}) that:
1. Calls buildEnhanced({ dataDir, intermediateDir, outDir: persistenceDir }) to regenerate enhanced.json in a temp location.
2. Reads persistenceDir/enhanced.json and parses its JSON content.
3. Ensures persistenceDir exists using fs.mkdirSync({ recursive: true }).
4. Derives a UTC timestamp in ISO basic format (YYYYMMDDThhmmssZ).
5. Constructs snapshot filename enhanced-<timestamp>.json and writes the enhanced document with two-space indentation.
6. Logs "persisted <snapshotFilename>" and returns { snapshotFile, count }.

# CLI Support
- Add flag --build-enhanced (alias -be) in main(args) to invoke buildEnhanced() with default or provided paths.
- Add flag --merge-persist in main(args) to invoke mergePersist() and print its console.log output without throwing errors.

# HTTP Endpoints
Under --serve mode, handle:
- GET /build-enhanced: respond 200 text/plain, temporarily override console.log to stream log lines from buildEnhanced() to the client, then restore console.log and end response.
- GET /merge-persist: respond 200 text/plain, override console.log to stream each persisted message from mergePersist(), then restore console.log and end response.

# Testing
- Unit tests for buildEnhanced(): mock refreshSources and buildIntermediate, spy on fs and console methods, verify directory creation, file writes, return value, and log output.
- Unit tests for mergePersist(): mock buildEnhanced to write a known enhanced.json, spy on fs.mkdirSync and fs.writeFileSync, spy on console.log for the persisted message and returned count.
- CLI tests: spy on both buildEnhanced and mergePersist to ensure main(["--build-enhanced"]) and main(["--merge-persist"]) invoke appropriate functions with default and custom arguments.
- HTTP integration tests: start server with --serve, issue GET /build-enhanced and GET /merge-persist, verify status codes, content types, streamed lines including snapshot messages, and correct snapshot file naming.

# Documentation Updates
Update docs/FEATURES.md, docs/USAGE.md, and README.md to reflect the combined Build Enhanced and Merge Persist feature under Ontology Management. Include example CLI invocations and HTTP requests for both endpoints, sample outputs, and description of timestamped snapshot filenames.