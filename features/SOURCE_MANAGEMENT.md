# Description

Implement full data source lifecycle management including crawling public and custom sources to capture raw JSON data and merging persisted data into a single snapshot. This feature realizes the mission to crawl open public data sources, store raw JSON in a data directory, and persist a merged view for downstream ontology processing.

# Implementation

1. refreshSources({ dataDir } = {})
   - Determine dataDir default to "data" and ensure directory exists or create.
   - Load configured sources via listSources().
   - For each source:
     - Perform HTTP GET to source URL.
     - On successful response parse JSON body and write to dataDir/<slug>.json with two-space indentation.
     - Report success by collecting filename in an array.
     - On HTTP or parse error log console.error with source name, URL, and error message and continue.
   - Return object { count: numberOfFilesWritten, files: [filenames] }.

2. mergePersist({ dataDir, outFile } = {})
   - Determine dataDir default "data" and outFile default "data/persisted.json".
   - Ensure dataDir exists or log console.error and return { count: 0, file: null }.
   - Read all .json files in dataDir, parse each:
     - If content is an array, concatenate elements into a merged array.
     - If content is an object, merge top-level keys; for array-valued keys concatenate arrays.
     - On parse or structure error log console.error with filename and reason and skip file.
   - Write merged result to outFile with two-space indentation.
   - Return { count: numberOfItemsMerged, file: outFile }.

# CLI Support

- --refresh: invoke refreshSources() and console.log JSON.stringify(summary, null, 2).
- --merge-persist or -m: invoke mergePersist() and console.log JSON.stringify(summary, null, 2).
- Both commands return without throwing on error.

# HTTP Endpoints

Under --serve mode:
- GET /refresh
  - Stream each console.log line from refreshSources() to response as plain-text lines.
  - After processing end response with status 200.

- GET /merge-persist
  - Stream each console.log line from mergePersist() to response as plain-text lines.
  - After processing end response with status 200.

# Testing

- Unit tests for refreshSources:
  • Mock fs.mkdirSync, fs.existsSync, http fetch, writeFileSync, console spies.
  • Test directory creation, successful fetch and write, error logging, returned summary.

- Unit tests for mergePersist:
  • Mock fs.existsSync, readdirSync, readFileSync, writeFileSync, console spies.
  • Test missing dataDir, parse errors, array and object merging logic, returned summary.

- CLI tests:
  • Spy on refreshSources and mergePersist for --refresh and --merge-persist flags in main().

- HTTP integration tests:
  • Start server, issue GET /refresh and GET /merge-persist and verify status 200, content-type text/plain, and streamed lines including summary.

# Documentation Updates

- Update docs/FEATURES.md under Source Management to describe refresh and merge-persist CLI commands, HTTP endpoints, expected outputs.
- Update docs/USAGE.md and README.md to include examples for --refresh and --merge-persist and corresponding curl commands for HTTP.