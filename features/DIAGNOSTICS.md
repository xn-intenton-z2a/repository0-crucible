# Description
Extend diagnostics output to include comprehensive system and file metrics for improved monitoring and debugging. Diagnostics should provide environment details, health checks of data sources, and counts and listings of project JSON files.

# Implementation
1. In generateDiagnostics():
   - Collect existing data (version, nodeVersion, platform, arch, cwd, uptimeSeconds, memoryUsage, publicDataSources, commands, healthChecks).
   - Determine data directory at project root (data/) and intermediate directory (intermediate/).
   - If directories exist, read their contents and collect:
     - dataFilesCount: number of files ending in .json in data/
     - dataFiles: sorted list of filenames in data/
     - intermediateFilesCount: number of files ending in .json in intermediate/
     - intermediateFiles: sorted list of filenames in intermediate/
   - If directories do not exist, default counts to 0 and lists to empty arrays.
   - Include these file metrics in the returned diagnostics object.
2. In CLI handler for --diagnostics:
   - Call generateDiagnostics() and output JSON.stringify(info, null, 2) to console.log.
   - Ensure process returns without throwing.
3. In HTTP server under /diagnostics:
   - On GET /diagnostics, respond with status 200 and Content-Type application/json.
   - End response with JSON.stringify(info, null, 2).

# CLI Usage
To display enhanced diagnostics:

node src/lib/main.js --diagnostics

Example output is a pretty-printed JSON document including version, nodeVersion, platform, arch, cwd, uptimeSeconds, memoryUsage, publicDataSources, commands, healthChecks, dataFilesCount, dataFiles, intermediateFilesCount, and intermediateFiles.

# HTTP Usage
When running with --serve, send:

GET /diagnostics

The server responds with a 200 JSON content containing the same diagnostics object.

# Testing
- Update unit tests for generateDiagnostics() to verify presence and correct types of:
  • version, nodeVersion, platform, arch, cwd
  • uptimeSeconds (number)
  • memoryUsage object with numeric rss, heapTotal, heapUsed, external, arrayBuffers
  • publicDataSources array matching PUBLIC_DATA_SOURCES
  • commands array containing known CLI flags
  • healthChecks array with objects per source including name, url, statusCode, latencyMs, reachable
  • dataFilesCount and intermediateFilesCount numbers
  • dataFiles and intermediateFiles sorted arrays
- HTTP integration tests for GET /diagnostics to verify status 200, Content-Type application/json, and body contains file metric fields and health check entries.

# Documentation Updates
- Update docs/FEATURES.md to describe new file metrics fields under Diagnostics.
- Update docs/USAGE.md and README.md under Diagnostics to show example output including dataFilesCount, dataFiles, intermediateFilesCount, and intermediateFiles.