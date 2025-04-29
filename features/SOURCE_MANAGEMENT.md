# Description

Provide a comprehensive source management subsystem for configuring and retrieving public data sources, plus on-demand data capture into the local data directory. This feature unifies listing, adding, removing, and updating data sources, and implements a refresh command to fetch JSON from each source and persist it to disk.

# Programmatic API

Export the following async functions from src/lib/main.js:

• listSources(configPath = "data-sources.json")
  • Return the built-in PUBLIC_DATA_SOURCES merged with any custom entries in configPath
  • On missing configPath return PUBLIC_DATA_SOURCES
  • On invalid JSON or structure log an error via console.error and fall back to defaults

• addSource({ name, url }, configPath = "data-sources.json")
  • Validate name is nonempty string and url is a valid URL
  • Read or initialize custom list from configPath
  • Prevent duplicates by name or URL
  • Append new entry and write back JSON.stringify(custom, null, 2)
  • Return [...PUBLIC_DATA_SOURCES, ...custom]

• removeSource(identifier, configPath = "data-sources.json")
  • Read existing custom list or return PUBLIC_DATA_SOURCES if configPath is missing or invalid
  • Filter out any entry whose name or url matches identifier
  • If removal occurred write updated list to configPath
  • Return merged array

• updateSource({ identifier, name, url }, configPath = "data-sources.json")
  • Ensure configPath exists and contains a valid array
  • Find entry matching identifier by name or url
  • Validate new name and url and replace the item
  • Write updated custom list to configPath
  • Return merged array

• refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {})
  • Ensure dataDir exists or create it
  • Invoke listSources(configPath) to get all sources
  • For each source slugify name for a safe filename
  • Fetch JSON via HTTP GET, parse to JSON; on error console.error and continue
  • Write each successful JSON to dataDir/<slug>.json with two-space indentation
  • Log each "written <slug>.json" via console.log and return { count, files }

# CLI Support

Extend main(args) in src/lib/main.js to support:

• --list-sources
  • Print JSON.stringify(listSources(), null, 2) via console.log

• --add-source <name> <url>
  • Validate arguments and invoke addSource
  • On error console.error and return
  • On success console.log merged list

• --remove-source <identifier>
  • Validate argument and invoke removeSource
  • On success console.log merged list

• --update-source <identifier> <newName> <newUrl>
  • Validate arguments and invoke updateSource
  • On success console.log merged list

• --refresh [dataDir] [configPath]
  • Invoke refreshSources with provided or default paths
  • Stream each console.log line to stdout
  • Return summary object without throwing

# HTTP Endpoints

Under --serve mode in src/lib/main.js HTTP server logic add:

• GET /sources
  • Respond 200 application/json with JSON.stringify(listSources(), null, 2)

• POST /sources
  • Read buffered JSON body { name, url }
  • On missing or invalid fields respond 400 plain-text error
  • Invoke addSource and respond 201 application/json with merged list

• DELETE /sources/:identifier
  • Decode identifier
  • Invoke removeSource and respond 200 application/json with merged list

• PUT /sources/:identifier
  • Decode identifier, read JSON body { name, url }
  • On invalid input respond 400
  • Invoke updateSource and respond 200 application/json with merged list

• GET /refresh
  • Respond 200 text/plain
  • Override console.log to stream each line into the response
  • Invoke refreshSources and end response
  • On error respond 500 plain-text error message

# Testing

- Unit tests for listSources, addSource, removeSource, updateSource covering valid and error scenarios
- Unit tests for refreshSources mocking HTTP and fs to simulate writes and errors, asserting returned { count, files }
- CLI tests for each flag validating correct invocation, error logging, and successful output
- HTTP integration tests under --serve for /sources CRUD endpoints and /refresh endpoint verifying status codes, content-types, response bodies, and error cases

# Documentation Updates

- Update docs/FEATURES.md under Sources Management to describe all CLI flags and HTTP endpoints
- Update docs/USAGE.md and README.md with example invocations for --list-sources, --add-source, --remove-source, --update-source, and --refresh and sample outputs