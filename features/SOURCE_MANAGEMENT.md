# Description

Unified management of public and custom data sources including listing, adding, removing, refreshing raw JSON captures, and merging persisted JSON data. This feature enables users to maintain up-to-date local snapshots of data sources and to consolidate those snapshots into a single persistence file.

# Implementation

1. listSources(configPath?)
   - Read custom data sources from configPath (default "data-sources.json").
   - Merge with PUBLIC_DATA_SOURCES constant.
   - On missing or invalid config, log an error and return PUBLIC_DATA_SOURCES.

2. addSource({ name, url }, configPath?)
   - Validate name is non-empty string and url is valid URL.
   - Read existing custom sources or start from empty array.
   - Prevent duplicates by name or url.
   - Append new source, write back to configPath with JSON formatting.
   - Return merged list of sources.

3. removeSource(identifier, configPath?)
   - Read existing custom sources or return PUBLIC_DATA_SOURCES if missing.
   - Filter out any source matching identifier by name or url.
   - Write updated list if changed.
   - Return merged list.

4. refreshSources({ dataDir }?)
   - Determine target data directory (default "data"), ensure it exists via fs.mkdirSync.
   - Call listSources() to get full source list.
   - For each source:
     • Construct safe filename by slugifying source name or host part of URL.
     • Perform HTTP GET fetch of source.url.
     • Parse response as JSON, write to dataDir/<slug>.json with pretty printing.
     • Log console.log written <slug>.json on success.
     • On fetch or parse error, console.error that source name and error message.
   - Return { count, files } of successfully written files.

5. mergePersist({ dataDir, outFile }?)
   - Determine dataDir (default "data") and outFile (default "data/persisted.json").
   - Read all .json files in dataDir.
   - For each file, parse JSON; if array or object, merge entries into a single array.
   - Write merged array to outFile with pretty printing.
   - Log each write and summary message.
   - Return { count, file }.

# CLI Support

- --list-sources: output JSON of listSources().
- --add-source name url: invoke addSource, output merged list.
- --remove-source identifier: invoke removeSource, output updated list.
- --refresh: invoke refreshSources(), stream each written filename line.
- --merge-persist or -m: invoke mergePersist(), stream write messages and summary.

# HTTP Server Support

Under --serve mode, extend request handler:

- GET /sources → 200 application/json, body = JSON.stringify(listSources(),null,2).
- GET /refresh → 200 text/plain, override console.log to stream each message from refreshSources(), end response after completion.
- GET /merge-persist → 200 text/plain, override console.log and console.error to stream messages from mergePersist(), end response after completion.

# Testing

- Unit tests for listSources, addSource, removeSource:
  • Mock fs.existsSync, readFileSync, writeFileSync to simulate valid, missing, and invalid configs.
  • Verify return values, log messages, and error conditions.

- Unit tests for refreshSources():
  • Mock fs.mkdirSync and fetch to simulate multiple sources.
  • Verify that writeFileSync is called with correct paths and JSON content.
  • Spy on console.log and console.error to confirm messages.
  • Ensure returned count and files reflect successful writes.

- Unit tests for mergePersist():
  • Mock fs.readdirSync, readFileSync, writeFileSync to simulate data files with arrays and objects.
  • Verify merged output structure, write calls, and summary return value.

- HTTP integration tests:
  • Start server via main(["--serve"]) on ephemeral port.
  • Send GET requests to /refresh and /merge-persist.
  • Verify status 200, Content-Type text/plain, and body contains streamed write and summary lines.

# Documentation Updates

- Update docs/FEATURES.md to detail new fields under Source Management: refresh and merge-persist.
- Update docs/USAGE.md and README.md under Sources section to include examples for --refresh, GET /refresh, --merge-persist, and GET /merge-persist, showing sample commands and outputs.