# Description

Provide a comprehensive source management subsystem for configuring and retrieving public data sources, plus on-demand data capture into the local data directory. This feature unifies listing, adding, removing, and updating data sources, and implements a refresh command to fetch JSON from each source and persist it to disk.

# Programmatic API

Export the following async functions from src/lib/main.js:

• listSources(configPath = "data-sources.json")
  • Return the built-in PUBLIC_DATA_SOURCES merged with any custom entries in data-sources.json
  • On missing or invalid structure fall back to defaults and log an error

• addSource({ name, url }, configPath = "data-sources.json")
  • Validate name is a nonempty string and url is a valid URL
  • Read or initialize custom list, prevent duplicates, append and write back JSON
  • Return merged array of default and custom sources

• removeSource(identifier, configPath = "data-sources.json")
  • Read existing custom list or return defaults on missing/invalid
  • Filter out entries matching name or URL, write updated list if changed
  • Return merged array

• updateSource({ identifier, name, url }, configPath = "data-sources.json")
  • Ensure config file exists and valid
  • Find entry by identifier, validate new fields, replace entry, write back
  • Return merged array

• refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {})
  • Ensure data directory exists or create it
  • Invoke listSources(configPath) to retrieve all sources
  • For each source:
    • Slugify the source name into a safe filename
    • Perform HTTP GET to source.url, parse JSON response; on fetch or parse error log via console.error and continue
    • Write each successful JSON to dataDir/<slug>.json with two-space indentation
    • Log each write as "written <slug>.json" via console.log
  • Return an object { count: number of successful writes, files: array of written filenames }

# CLI Support

• --list-sources
  • Invoke listSources and console.log(JSON.stringify(sources, null, 2))

• --add-source <name> <url>
  • Validate arguments, invoke addSource or console.error on failure, console.log merged list on success

• --remove-source <identifier>
  • Validate argument, invoke removeSource, console.log merged list

• --update-source <identifier> <newName> <newUrl>
  • Validate arguments, invoke updateSource or console.error, console.log merged list

• --refresh [dataDir] [configPath]
  • Invoke refreshSources with provided or default paths
  • Stream console.log output to stdout
  • Return summary object without throwing

# HTTP Endpoints

Under --serve mode in src/lib/main.js server logic:

GET /sources
  • Respond with HTTP 200 application/json and JSON.stringify(listSources(), null, 2)

POST /sources
  • Read JSON body { name, url }, validate, invoke addSource, respond 201 application/json or 400 on invalid

DELETE /sources/:identifier
  • Decode identifier, invoke removeSource, respond 200 application/json

PUT /sources/:identifier
  • Decode identifier and JSON body { name, url }, validate, invoke updateSource, respond 200 application/json or 400 on invalid

GET /refresh
  • Respond with HTTP 200 text/plain
  • Override console.log to stream each written line
  • Invoke refreshSources and end response, or respond 500 plain-text on error

# Testing

- Unit tests for listSources, addSource, removeSource, updateSource covering valid and error scenarios
- Unit tests for refreshSources mocking HTTP fetch and fs:
  • Simulate successful fetch and write operations, verify returned count and files array and console.log calls
  • Simulate fetch errors and invalid JSON bodies and verify console.error calls and continuing behavior

- CLI tests for --refresh flag:
  • Missing or invalid parameters should log errors without throwing
  • Successful invocation should call refreshSources and stream expected log lines

- HTTP integration tests under --serve for GET /refresh:
  • Returns status 200 text/plain with streamed lines and ends cleanly
  • On errors returns HTTP 500 with plain-text error message

# Documentation Updates

- Update docs/FEATURES.md to describe the refreshSources behavior under Sources Management, including CLI and HTTP /refresh examples
- Update docs/USAGE.md and README.md to add usage examples for the refresh command and sample outputs