# Description

Enhance source management by providing full programmatic, CLI and HTTP support for custom data sources and data refresh. Enable listing, adding, removing and updating of configured sources, and implement fetching raw data captures from all sources for downstream processing.

# Programmatic API

- Export async function listSources(configPath = data-sources.json)
  • Merge built in PUBLIC_DATA_SOURCES with custom entries read from configPath
  • On missing or invalid config fall back to defaults and log a warning
  • Return array of source objects with name and url

- Export async function addSource(source, configPath = data-sources.json)
  • Validate source name and url format
  • Prevent duplicates by name or url
  • Write updated array to configPath with two space indentation
  • Return merged list of sources

- Export async function removeSource(identifier, configPath = data-sources.json)
  • Filter custom entries by name or url matching identifier
  • Write updated array when removal occurs
  • Return merged list of sources

- Export async function updateSource({ identifier, name, url }, configPath = data-sources.json)
  • Locate custom entry by name or url matching identifier
  • Validate new name and url
  • Replace entry and write updated array
  • Throw error when identifier not found or JSON invalid
  • Return merged list of sources

- Export async function refreshSources({ dataDir = data, configPath = data-sources.json } = {})
  • Ensure dataDir exists on disk
  • Use listSources to obtain array of sources
  • For each source fetch via HTTP GET and parse JSON
  • Write each response to dataDir with slug safe filenames and two space indentation
  • Log fetched filename on success or error message on failure
  • Return object with count of files written and array of filenames

# CLI Support

- Add flag --list-sources
  • Invoke listSources and print pretty JSON of returned list

- Add flag --add-source name url
  • Invoke addSource with provided arguments and print merged list
  • On validation or file error log error and exit gracefully

- Add flag --remove-source identifier
  • Invoke removeSource and print merged list
  • On error log message and exit gracefully

- Add flag --update-source identifier newName newUrl
  • Invoke updateSource with provided arguments and print merged list
  • On missing parameters or error log message and exit gracefully

- Add flag --refresh [dataDir] [configPath]
  • Invoke refreshSources with provided or default paths
  • Stream each log line to console
  • Print final summary line and exit without throwing

# HTTP Server Endpoints

Under serve mode support:

- GET /sources
  • Respond status 200 with application/json and merged list from listSources

- POST /sources
  • Read request body as JSON with name and url
  • On validation success invoke addSource and respond 201 with application/json list
  • On missing fields or invalid JSON respond 400 with plain text error message

- DELETE /sources/:identifier
  • Invoke removeSource with decoded identifier
  • Respond 200 with application/json updated list

- PUT /sources/:identifier
  • Read request body as JSON with name and url
  • On validation success invoke updateSource and respond 200 with application/json list
  • On error respond 400 with plain text error

- GET /refresh
  • Respond 200 with text/plain
  • Override console log to stream each fetch and summary line
  • Invoke refreshSources and end response
  • On error respond 500 with plain text error message

# Testing

- Add unit tests for listSources, addSource, removeSource, updateSource and refreshSources
  • Cover valid and invalid config JSON, validation errors, duplicate handling and fetch failures

- Add CLI tests for each flag
  • Test missing parameters error paths and successful console output

- Add HTTP integration tests for /sources endpoints and /refresh
  • Verify status codes, content types, request and response behaviors for success and error cases

# Documentation Updates

- Update docs/FEATURES.md to describe source management feature under Sources Management
- Update docs/USAGE.md with examples for list, add, remove, update and refresh commands
- Update README.md to list new flags and HTTP endpoints with usage samples