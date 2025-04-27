# Description
Unified management of public and custom data sources including listing, refreshing, and merging persisted JSON data via both CLI and HTTP endpoints.

# Implementation

1. Core Functions
   - listSources(configPath?): merge default PUBLIC_DATA_SOURCES with optional custom data-sources.json into an array of { name, url }.
   - addSource({ name, url }, configPath?): validate inputs, prevent duplicates, persist custom sources, and return updated list.
   - removeSource(identifier, configPath?): remove by name or URL, persist updated list, and return merged list.
   - refreshSources({ dataDir }?): fetch each URL from listSources(), write raw JSON captures to dataDir (default "data"), log written <filename> for each capture, and return { count, files }.
   - mergePersist({ dataDir, outFile }?): read all .json files in dataDir (default "data"), merge array or object entries into a single array, write pretty-printed JSON to outFile (default "data/persisted.json"), log each write and summary, and return { count, file }.

2. CLI Support
   - --list-sources: invoke listSources() and output JSON.
   - --add-source <name> <url>: invoke addSource(), output merged list in JSON.
   - --remove-source <identifier>: invoke removeSource(), output updated list in JSON.
   - --refresh: await refreshSources(), stream each written <filename> line to console.log.
   - --merge-persist or -m: invoke mergePersist(), stream console.log and console.error messages, then output summary line.

3. HTTP Server Support
   Under --serve mode, extend the HTTP request handler to support:
   - GET /sources: 200 JSON response from listSources().
   - GET /refresh: 200 text/plain; override console.log to stream each message from await refreshSources(), then end response.
   - GET /merge-persist: 200 text/plain; override console.log and console.error to stream messages from mergePersist(), then end response.

# Testing

- Unit tests for refreshSources(): mock fetch and fs to simulate sources, verify returned { count, files } and that console.log was called with expected write messages.
- Unit tests for mergePersist(): mock fs for missing directory, multiple JSON files, parse errors, and verify log messages, return values, and error handling.
- CLI tests: verify main(["--refresh"]) calls refreshSources(), main(["--merge-persist"]) calls mergePersist() with correct flags and streams messages.
- HTTP integration tests: start server via main(["--serve"]); GET /refresh and GET /merge-persist return status 200, Content-Type text/plain, and contain streamed lines including file writes and summary.

# Documentation Updates

Update docs/FEATURES.md, docs/USAGE.md, and README.md to add sections for:

- Refresh Sources (`--refresh`, GET /refresh): description, CLI usage examples, sample output.
- Merge Persist (`--merge-persist`, `-m`, GET /merge-persist): description, CLI flags, sample logs, summary line.