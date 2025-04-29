# Description
Provide a comprehensive source management subsystem that includes listing, adding, removing, updating public data source configurations, and fetching data on demand into the local data directory.

# Programmatic API
• listSources(configPath = "data-sources.json")
  • Return built-in PUBLIC_DATA_SOURCES merged with custom entries in configPath
  • On missing or invalid file return defaults with a console.error for invalid structure

• addSource({ name, url }, configPath = "data-sources.json")
  • Validate name is nonempty and url is a valid HTTP/HTTPS URL
  • Read existing custom list or start empty
  • Prevent duplicates by name or url
  • Append new entry, write back JSON with two-space indentation, return merged array

• removeSource(identifier, configPath = "data-sources.json")
  • Read existing custom list or return defaults if file missing/invalid
  • Filter out entries matching name or url equal to identifier
  • If filtered differs, write updated list, return merged array

• updateSource({ identifier, name, url }, configPath = "data-sources.json")
  • Ensure configPath exists and is valid JSON array
  • Find entry by identifier matching name or url
  • Validate new name and url, update entry, write back JSON, return merged array

• refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {})
  • Ensure dataDir exists or create it
  • Retrieve merged sources via listSources(configPath)
  • For each source:
    • Slugify source.name to generate a safe filename
    • Perform HTTP GET request to source.url
    • On fetch or parse error log to console.error and continue
    • Write JSON response to dataDir/<slug>.json with two-space indentation
    • Log successful writes via console.log
  • Return object { count: number of successful writes, files: array of filenames }

# CLI Support
• --list-sources
  • Invoke listSources and output JSON via console.log

• --add-source <name> <url>
  • Validate arguments, call addSource, on success console.log merged list, on error console.error

• --remove-source <identifier>
  • Validate argument, call removeSource, console.log merged list

• --update-source <identifier> <newName> <newUrl>
  • Validate arguments, call updateSource, on success console.log merged list, on error console.error

• --refresh [dataDir] [configPath]
  • Invoke refreshSources with defaults or positional args
  • Stream each console.log line to stdout
  • Return summary object without throwing on errors

# HTTP Endpoints
Under --serve mode implement:
• GET /sources
  • Respond HTTP 200 application/json with JSON.stringify(listSources(), null, 2)

• POST /sources
  • Read buffered JSON body { name, url }
  • Validate fields, call addSource, respond 201 application/json or 400 plain-text error

• DELETE /sources/:identifier
  • Decode identifier, call removeSource, respond 200 application/json

• PUT /sources/:identifier
  • Decode identifier, read JSON body { name, url }
  • Validate, call updateSource, respond 200 application/json or 400 plain-text error

• GET /refresh
  • Respond HTTP 200 text/plain
  • Override console.log to stream each written line
  • Invoke refreshSources and end response on success
  • On error respond HTTP 500 plain-text error

# Testing
• Unit tests for listSources, addSource, removeSource, updateSource covering valid, duplicate and error cases
• Unit tests for refreshSources mocking HTTP fetch and fs:
  • Simulate successful fetch and write operations; verify returned count, files array, and console.log calls
  • Simulate fetch and parse errors; verify console.error calls and continuation behavior
• CLI tests for --refresh flag:
  • Missing or invalid parameters should log errors without throwing
  • Successful invocation should call refreshSources and stream expected log lines
• HTTP integration tests under --serve for GET /refresh:
  • Returns status 200 text/plain with streamed lines and ends cleanly
  • On errors returns HTTP 500 with plain-text error message

# Documentation Updates
• Update docs/FEATURES.md to describe the refreshSources behavior under Sources Management, including CLI and HTTP /refresh examples
• Update docs/USAGE.md and README.md to add usage examples for the refresh command and sample outputs