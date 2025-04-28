# Description
Manage the full lifecycle of public and custom data sources, including listing, adding, removing, and updating sources, crawling configured sources to capture raw JSON data, and merging raw data into a single persisted snapshot for downstream processing. This feature provides consistent behavior across CLI, programmatic API, and HTTP server modes.

# CLI Commands
- --list-sources              List merged public and custom sources as JSON
- --add-source <name> <url>   Add a custom data source, validate inputs, prevent duplicates, and output the merged list as JSON
- --remove-source <identifier> Remove a custom data source by name or URL and output the updated list as JSON
- --update-source <identifier> <newName> <newUrl>  Update an existing custom source’s name or URL and output the merged list as JSON
- --refresh                   Fetch data from all configured sources, write each response to data/<slug>.json, log each write, and print a summary line
- --merge-persist, -m         Read all JSON files in data/, merge them into a single snapshot JSON (concatenating arrays and merging objects), write persisted.json at project root, log each step, and print a summary line

# HTTP Endpoints
- GET /sources               Return HTTP 200 with application/json body of merged default and custom data sources
- POST /sources              Expect application/json with fields name and url, add a custom data source, respond HTTP 201 with updated list or HTTP 400 on invalid input
- DELETE /sources/:identifier Remove a custom source by name or URL, respond HTTP 200 with updated list
- PUT /sources/:identifier   Expect application/json with fields name and url, update an existing custom source, respond HTTP 200 with updated list or HTTP 400 on invalid input
- GET /refresh               Stream console log output from fetching each source over HTTP 200 text/plain, end with a summary line
- GET /merge-persist         Stream console log output from merging data files over HTTP 200 text/plain, end with a summary line

# Implementation
Export the following functions in src/lib/main.js:
- listSources(configPath)   Read or initialize data-sources.json, validate structure, return merged array
- addSource(source, configPath)  Validate name and URL, update config file, return merged array
- removeSource(identifier, configPath)  Filter and update config file, return merged array
- updateSource({ identifier, name, url }, configPath)  Locate, validate, update entry, write config file, return merged array
- refreshSources(dataDir)   For each source from listSources, perform HTTP GET, parse JSON, write to data/<slug>.json, log write operations, return summary { count, files }
- mergePersist({ dataDir, outFile })   Read all JSON files in dataDir, for each parse content, merge arrays by concatenation and objects by deep merge, write combined document to outFile, log write operations, return summary { count, outFile }

Extend main() in src/lib/main.js to detect --refresh and --merge-persist (-m) flags and invoke the corresponding functions. In serve mode, handle GET /refresh and GET /merge-persist by temporarily overriding console.log to stream each log line to the HTTP response and ending with HTTP 200.

# Testing
- Unit tests for listSources, addSource, removeSource, and updateSource covering valid flows and error cases
- Unit tests for refreshSources mocking fetch and fs.writeFileSync to verify files written and summary returned
- Unit tests for mergePersist mocking fs.readdirSync, fs.readFileSync, fs.writeFileSync to verify merge logic and summary returned
- CLI tests for --refresh and --merge-persist flags to confirm correct function invocation and error handling
- HTTP integration tests for GET /refresh and GET /merge-persist verifying status 200, content-type text/plain, streamed log lines, and summary line

# Documentation Updates
Update docs/FEATURES.md, docs/USAGE.md, and README.md to describe the new refresh and merge-persist capabilities, include example invocations, sample outputs, and details on snapshot structure.