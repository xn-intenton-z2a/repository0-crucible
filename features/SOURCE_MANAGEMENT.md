# Description
Unified management of public and custom data sources including listing, refreshing, and merging persisted JSON data via both CLI and HTTP endpoints.

# Implementation

1. List Sources CLI
   - Detect --list-sources flag in main and invoke listSources(configPath)
   - Output JSON string of sources with console.log(JSON.stringify(sources, null, 2)) and exit without error

2. List Sources HTTP
   - Add GET /sources route in HTTP server
   - Respond with status 200 and Content-Type application/json
   - Write JSON.stringify(listSources(), null, 2) to response and end

3. Refresh Sources CLI
   - Detect --refresh flag in main
   - Call await refreshSources()
   - Exit without error

4. Refresh Sources HTTP
   - Add GET /refresh route
   - Respond with status 200 and Content-Type text/plain
   - Override console.log to stream each log line with a newline
   - Call await refreshSources(), restore console.log, and end response

5. Merge Persist Function
   - Implement mergePersist({ dataDir = path.join(process.cwd(), 'data'), outFile = path.join(process.cwd(), 'data', 'merged.json') } = {})
   - If dataDir does not exist, log error via console.error and return { count: 0, file: null }
   - Read all .json files in dataDir, parse each, collect objects into an array
   - Write the array to outFile with two-space indentation via fs.writeFileSync
   - Log Merged <count> files into <outFile> and return { count, file }

6. Merge Persist CLI
   - Detect --merge-persist or -m flag in main
   - Call mergePersist(), ensure console.log lines are emitted, then exit without error

7. Merge Persist HTTP
   - Add GET /merge-persist route
   - Respond with status 200 and Content-Type text/plain
   - Override console.log and console.error to stream logs and errors with newlines
   - Call mergePersist(), restore console methods, and end response

# CLI Usage

node src/lib/main.js --list-sources
node src/lib/main.js --refresh
node src/lib/main.js --merge-persist

# HTTP Usage

GET /sources
GET /refresh
GET /merge-persist

# Testing

- Unit tests for listSources CLI: spy on console.log when calling main(["--list-sources"]) and verify output equals JSON.stringify(PUBLIC_DATA_SOURCES, null, 2) or merged custom sources
- HTTP integration test for GET /sources: start server, send GET /sources, expect status 200, header application/json, body contains JSON array of sources
- Refresh Sources CLI and HTTP tests already exist and should be maintained
- Unit tests for mergePersist function: mock fs.existsSync, readdirSync, readFileSync, writeFileSync, spy on console.log and console.error; verify behavior when dataDir missing, empty, and normal cases
- CLI tests for main(["--merge-persist"]): spy on mergePersist and console.log, verify logs and exit
- HTTP integration tests for GET /merge-persist: setup data directory with sample JSON files, send GET /merge-persist, expect status 200, header text/plain, body streams merge lines and summary

# Documentation Updates

Update docs/FEATURES.md, docs/USAGE.md, and README.md to include:
- list-sources command and endpoint
- merge-persist command and endpoint
- Example invocations and sample outputs
Ensure package.json scripts include list-sources and merge-persist entries if missing