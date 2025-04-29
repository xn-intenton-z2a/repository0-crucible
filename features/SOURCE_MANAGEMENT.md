# Description
Provide a comprehensive source management subsystem that includes listing, adding, removing, updating public data source configurations, and fetching data on demand into the local data directory.

# Programmatic API

• listSources(configPath = "data-sources.json")
  • Return the built-in PUBLIC_DATA_SOURCES merged with custom entries in configPath
  • On missing or invalid file return defaults and log a warning for invalid structure

• addSource({ name, url }, configPath = "data-sources.json")
  • Validate that name is a nonempty string and url is a valid HTTP or HTTPS URL
  • Read existing custom list or start empty, prevent duplicates by name or url
  • Append new entry, write JSON with two-space indentation to configPath, return merged array

• removeSource(identifier, configPath = "data-sources.json")
  • Read existing custom list or return defaults if file missing or invalid
  • Filter out entries matching name or url equal to identifier
  • If modified write updated JSON to configPath, return merged array

• updateSource({ identifier, name, url }, configPath = "data-sources.json")
  • Ensure configPath exists and contains a valid JSON array
  • Find entry by identifier matching existing name or url
  • Validate new name and url, update entry in array, write back with two-space indentation, return merged array

• refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {})
  • Ensure dataDir exists or create it
  • Retrieve merged sources via listSources(configPath)
  • For each source:
    • Slugify source.name to a safe filename
    • Perform HTTP GET request to source.url
    • On fetch or parse error log to console.error and continue
    • Write JSON response body to dataDir/<slug>.json with two-space indentation
    • Log successful writes via console.log
  • Return an object { count: number of successful writes, files: array of filenames }

# CLI Support

• --list-sources
  • Invoke listSources and output JSON to console.log

• --add-source <name> <url>
  • Validate arguments, call addSource, on success output merged list via console.log, on error console.error

• --remove-source <identifier>
  • Validate argument, call removeSource, output merged list via console.log

• --update-source <identifier> <newName> <newUrl>
  • Validate arguments, call updateSource, on success console.log merged list, on error console.error

• --refresh [dataDir] [configPath]
  • Invoke refreshSources with default or positional args
  • Stream each console.log line to stdout
  • Return summary object without throwing on errors

# HTTP Endpoints

• GET /sources
  • Respond HTTP 200 application/json with listSources()

• POST /sources
  • Read buffered JSON body { name, url }, validate fields, call addSource
  • Respond HTTP 201 application/json with merged list or HTTP 400 plain-text on invalid input

• DELETE /sources/:identifier
  • Decode identifier, call removeSource, respond HTTP 200 application/json with merged list

• PUT /sources/:identifier
  • Decode identifier, read JSON body { name, url }, validate, call updateSource
  • Respond HTTP 200 application/json with merged list or HTTP 400 plain-text on invalid input

• GET /refresh
  • Respond HTTP 200 text/plain
  • Override console.log to stream each written line
  • Invoke refreshSources and end response on success
  • On error respond HTTP 500 plain-text with error message

# Testing

- Unit tests for listSources, addSource, removeSource, updateSource:
  • Valid and error cases for configuration file presence, structure, and input validation

- Unit tests for refreshSources:
  • Mock HTTP fetch and fs operations to simulate successful writes and errors
  • Verify console.log calls for each file written and console.error on failures
  • Assert returned count and files array

- CLI tests for --refresh flag:
  • Missing parameters or directory errors should log error without throwing
  • Successful invocation should call refreshSources with correct args and stream log lines

- HTTP integration tests for GET /refresh:
  • Returns status 200 text/plain with streamed lines and ends cleanly
  • On fetch errors returns status 500 with plain-text error message

# Documentation Updates

- Update docs/FEATURES.md to describe the refreshSources behavior under Sources Management, including CLI flag --refresh and HTTP GET /refresh examples
- Update docs/USAGE.md and README.md to add usage examples for the refresh command and sample outputs