# Description
Consolidate full lifecycle management of public and custom data sources, including listing, adding, removing, updating, and refreshing. Ensure consistency across CLI, programmatic API, and HTTP server modes.

# Implementation
- listSources(configPath): read or initialize data-sources.json; validate structure; return merged array of default and custom sources.
- addSource({name,url}, configPath): validate name and URL; load existing custom sources; prevent duplicates; append and write back; return merged list.
- removeSource(identifier, configPath): load custom sources; filter by name or URL; write updated list if changed; return merged list.
- updateSource({identifier,name,url}, configPath): load and validate config; locate source by name or URL; update entry; write back; return merged list.
- refreshSources({dataDir="data",configPath="data-sources.json"}):
  1. Ensure dataDir exists (mkdirSync recursive).
  2. Load sources via listSources(configPath).
  3. For each source:
     - HTTP GET source.url via fetch; on error or non-200 status log console.error and skip.
     - Parse JSON response; on error log console.error and skip.
     - Derive slug from source name by lowercasing and replacing non-alphanumeric with dashes.
     - Write pretty-printed JSON to dataDir/<slug>.json.
     - Log console.log(`written ${slug}.json`).
  4. After all, log console.log(`Fetched ${count} sources into ${dataDir}/`).
  5. Return {count,files}.

# CLI Support
- --list-sources: invoke listSources and log JSON array.
- --add-source <name> <url>: validate and invoke addSource; log JSON array or error.
- --remove-source <identifier>: invoke removeSource; log JSON array.
- --update-source <identifier> <newName> <newUrl>: invoke updateSource; log JSON array or error.
- --refresh: invoke refreshSources and exit without throwing, logging each line and summary.

# HTTP Endpoints
- GET /sources: respond 200 application/json with merged sources.
- POST /sources: parse JSON body {name,url}; validate; addSource; respond 201 with updated list or 400 error.
- DELETE /sources/:identifier: removeSource; respond 200 with updated list.
- PUT /sources/:identifier: parse JSON body {name,url}; validate; updateSource; respond 200 with updated list or 400 error.
- GET /refresh: respond 200 text/plain; override console.log to stream each line from refreshSources; end after complete.

# Testing
- Unit tests for listSources, addSource, removeSource, updateSource: mock fs operations and console; verify behavior on valid, duplicate, invalid, missing files.
- Unit tests for refreshSources: mock fs.existsSync, mkdirSync, writeFileSync, fetch, console.log, console.error; test directory creation, fetch failures, invalid JSON, successful writes and return value.
- CLI tests: spy on each handler (--list-sources, --add-source, --remove-source, --update-source, --refresh) to confirm invocation and error handling.
- HTTP integration tests: start server with --serve; verify /sources GET, POST, DELETE, PUT; verify /refresh streams lines and summary; status codes, content types, and bodies match expected.

# Documentation Updates
- Update docs/FEATURES.md and docs/USAGE.md to include --refresh under Sources Management with example invocation, sample output, and describe HTTP GET /refresh.
- Update README.md under Features and Usage sections to document refresh behavior.