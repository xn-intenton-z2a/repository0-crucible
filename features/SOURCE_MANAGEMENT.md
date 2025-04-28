# Description

Full data source lifecycle management including crawling public and custom sources to capture raw JSON data, merging persisted data, and exposing create, read, update, delete operations via CLI and HTTP.

# CLI Commands

- --list-sources              List merged public and custom sources as JSON
- --add-source <name> <url>   Add a custom data source and output merged list
- --remove-source <identifier> Remove a custom source by name or url and output merged list
- --update-source <identifier> <newName> <newUrl> Update a custom source and output merged list
- --refresh                   Fetch data from all configured sources and write raw JSON files
- --merge-persist, -m         Merge raw JSON files into a single persisted snapshot and write output

# HTTP Endpoints

## Sources Management
- GET /sources               Returns HTTP 200 with application/json body of merged sources
- POST /sources              Expects application/json { name, url }, returns 201 and updated sources or 400 on invalid input
- DELETE /sources/:identifier Removes matching custom source, returns 200 and updated sources
- PUT /sources/:identifier   Expects application/json { name, url }, returns 200 and updated sources or 400 on invalid input

## Refresh and Merge Endpoints
- GET /refresh               Streams console.log output from refreshSources on HTTP 200 text/plain
- GET /merge-persist         Streams console.log output from mergePersist on HTTP 200 text/plain

# Implementation

Implement functions `refreshSources()` and `mergePersist()` in `src/lib/main.js` to fetch and store data and to merge stored files. Extend `main()` to handle `--refresh` and `--merge-persist` flags. In serve mode, wire HTTP endpoints to call these functions and stream log lines.

# Testing

Add unit tests for:
- refreshSources success and error behaviors, file creation and error logging
- mergePersist logic for array and object merging, missing directories, error cases
- CLI flag tests for --refresh and --merge-persist invoking respective functions
Add HTTP integration tests for GET /refresh and GET /merge-persist verifying status 200, content-type text/plain, and streamed log lines including summary.

# Documentation Updates

Update docs/FEATURES.md, docs/USAGE.md, and README.md to remove separate HTTP_SOURCE_MANAGEMENT entry, merge all source management details under this feature, and include examples for CLI and HTTP invocations.