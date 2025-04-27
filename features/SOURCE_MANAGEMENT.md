# Source Management

## Description
Unified management of public and custom data sources including listing, adding, removing, refreshing raw JSON captures, and merging persisted JSON data. This feature enables users to maintain up-to-date local snapshots of data sources and to consolidate those snapshots into a single persistence file.

## Implementation

1. listSources(configPath?)
   - Read custom data sources from configPath (default "data-sources.json").
   - Merge with PUBLIC_DATA_SOURCES constant.
   - On missing or invalid config, log an error and return PUBLIC_DATA_SOURCES.

2. addSource({ name, url }, configPath?)
   - Validate name is non-empty string and url is a valid URL.
   - Read existing custom sources or start from empty array.
   - Prevent duplicates by name or url.
   - Append new source, write back to configPath with JSON formatting.
   - Return merged list of sources.

3. removeSource(identifier, configPath?)
   - Read existing custom sources or fall back to PUBLIC_DATA_SOURCES if missing.
   - Remove any source matching identifier by name or url.
   - Write updated list if changed.
   - Return merged list of sources.

4. refreshSources({ dataDir }?)
   - Determine target data directory (default "data"), ensure it exists via fs.mkdirSync.
   - Use listSources() to retrieve all data sources.
   - For each source:
     • Construct a safe filename by slugifying the source name or host part of URL.
     • Perform HTTP GET fetch of source.url and parse as JSON.
     • On success write to dataDir/<slug>.json with two-space indentation.
     • Log console.log written <slug>.json.
     • On fetch or parse error log console.error "Error fetching <name>: <message>".
   - Return { count: numberOfFilesWritten, files: [filenames] }.

5. mergePersist({ dataDir, outFile }?)
   - Determine dataDir (default "data") and outFile (default "data/persisted.json").
   - Ensure dataDir exists, read all .json files.
   - For each file:
     • Parse JSON; if array merge elements into result array.
     • If object treat top-level values or array properties as entries.
     • On parse or structure error log console.error "Skipping <file>: <reason>".
   - Write merged array to outFile with two-space indentation.
   - Log console.log written <outFile> and console.log Merged <count> files into <outFile>.
   - Return { count: filesMerged, file: outFile }.

## CLI Support
- --list-sources: outputs JSON of listSources().
- --add-source <name> <url>: invokes addSource and outputs merged list.
- --remove-source <identifier>: invokes removeSource and outputs merged list.
- --refresh: invokes refreshSources(), streams each written filename line.
- --merge-persist or -m: invokes mergePersist(), streams write messages and summary.

All commands should return without throwing errors and use console.log for standard messages and console.error for failures.

## HTTP Server Support
Under --serve mode, extend request handler:
- GET /sources → 200 application/json, body = JSON.stringify(listSources(),null,2).
- GET /refresh → 200 text/plain, override console.log to stream each message from refreshSources(), end response after completion.
- GET /merge-persist → 200 text/plain, override console.log to stream each message from mergePersist(), end response after completion.

Errors in streaming should still return status 200 with streamed error messages.

## Testing
- Unit tests for refreshSources():
  • Mock fs.mkdirSync, fetch, writeFileSync to simulate multiple sources and errors.
  • Spy on console.log and console.error to confirm messages.
  • Verify returned count and files arrays.

- Unit tests for mergePersist():
  • Mock fs.existsSync, readdirSync, readFileSync, writeFileSync to simulate dataDir with valid arrays, objects, and invalid files.
  • Verify merged output structure, write calls, and summary return value.
  • Spy on console.error for skipped files.

- CLI tests:
  • Mock refreshSources and mergePersist and spy on console.log to verify invocation when using --refresh, --merge-persist, and -m flags.
  • Ensure main() returns without throwing.

- HTTP integration tests:
  • Start server via main(["--serve"]) on ephemeral port.
  • Send GET requests to /refresh and /merge-persist.
  • Verify status 200, Content-Type text/plain, and body contains streamed write and summary lines.

## Documentation Updates
- Update docs/FEATURES.md to detail refresh and merge-persist under Source Management.
- Update docs/USAGE.md and README.md under Sources section to include examples for --refresh, GET /refresh, --merge-persist, and GET /merge-persist, showing sample commands and outputs.