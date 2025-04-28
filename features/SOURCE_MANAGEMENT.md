# Description
Unified management of public and custom data sources, raw JSON captures, and persisted data combining. Users can list, add, remove, and refresh data sources to update raw JSON files, and merge raw JSON files into a single persisted file for further ontology processing.

# Implementation
1. Extend listSources, addSource, and removeSource as existing.  
2. Implement refreshSources({ dataDir }):  
   - Determine dataDir (default "data"). Ensure directory exists or create it.  
   - Retrieve sources via listSources().  
   - For each source perform HTTP GET fetch(source.url).  
   - Parse JSON response. On success write to dataDir/<slug>.json with two-space indentation and record filename. On error log console.error("Error fetching <name>: <message>").  
   - Return a summary object { count: numberOfFilesWritten, files: [filenames] }.
3. Implement mergePersist({ dataDir, outFile }):  
   - Determine dataDir (default "data") and outFile (default "data/persisted.json"). Ensure dataDir exists.  
   - Read all .json files in dataDir. For each file parse JSON; if array, merge elements; if object, merge top-level values or array properties. On parse or structure error log console.error("Skipping <file>: <reason>") and continue.  
   - Write merged results to outFile with two-space indentation. Log console.log("written <outFile>") and console.log("Merged <count> files into <outFile>").  
   - Return { count: filesMerged, file: outFile }.

# CLI Support
- --refresh: invoke refreshSources() and output each console.log write line and final summary as JSON.stringify(summary, null, 2).  
- --merge-persist or -m: invoke mergePersist() and output each console.log line for writes and summary, return without throwing.

# HTTP Server Endpoints
- GET /refresh:  
  - Respond 200 text/plain. Override console.log to stream each message from refreshSources() followed by newline, end response after completion.  
- GET /merge-persist:  
  - Respond 200 text/plain. Override console.log to stream write and summary messages from mergePersist(), end response after completion.

# Testing
- Unit tests for refreshSources:  
  • Mock fs.mkdirSync, fetch, writeFileSync to simulate multiple sources and errors.  
  • Spy on console.log and console.error to confirm messages.  
  • Verify returned summary count and files.  
- Unit tests for mergePersist:  
  • Mock fs.existsSync, readdirSync, readFileSync, writeFileSync to simulate dataDir with valid arrays, objects, and invalid files.  
  • Spy on console.error for skipped files.  
  • Verify merged output, write calls, and summary return value.  
- CLI tests:  
  • Mock refreshSources and mergePersist and spy on console.log to verify invocation when using --refresh and --merge-persist flags.  
  • Ensure main() returns without throwing.  
- HTTP integration tests:  
  • Start server via main(["--serve"]) on ephemeral port.  
  • Send GET requests to /refresh and /merge-persist.  
  • Verify status 200, Content-Type text/plain, and body contains streamed lines and summary.

# Documentation Updates
- Update docs/FEATURES.md to include refresh and merge-persist under Source Management with CLI and HTTP examples.  
- Update docs/USAGE.md and README.md to show example invocations and sample outputs for --refresh, --merge-persist, GET /refresh, and GET /merge-persist.