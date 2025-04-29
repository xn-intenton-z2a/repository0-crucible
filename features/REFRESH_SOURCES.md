# Description
Implement data refresh functionality to crawl configured public data sources via HTTP and persist raw JSON files into the local data directory, enabling automated data capture for the ontology pipeline.

# Programmatic API
Export async function refreshSources({ dataDir = 'data', configPath = 'data-sources.json' } = {})
- Ensure dataDir exists on disk, creating it if necessary
- Invoke listSources(configPath) to retrieve merged default and custom sources
- For each source in the list:
  - Slugify the source name to a lowercase, hyphen-separated filename
  - Perform HTTP GET to fetch JSON data from the source URL
  - On fetch or parse errors, log an error via console.error and skip that source
  - Write the fetched JSON to dataDir/<slug>.json with two-space indentation
  - Log each success via console.log with the filename
- Return an object { count: number, files: string[] } summarizing the number of successful writes and their filenames

# CLI Support
Extend main(args) to support flag --refresh [dataDir] [configPath]
- Parse optional positional arguments for dataDir and configPath
- Invoke refreshSources with the provided or default values
- Stream each console.log line to stdout
- On missing or invalid arguments, output a plain-text error via console.error and return without throwing

# HTTP Endpoints
Under --serve mode in src/lib/main.js server logic:
- GET /refresh
  - Respond with HTTP 200 and content-type text/plain
  - Replace console.log to write each logged line into the response stream
  - Invoke refreshSources and end the response on completion
  - On errors respond with HTTP 500 and a plain-text error message

# Testing
- Unit tests for refreshSources:
  - Mock listSources to return a sample list, fs to simulate directories, and fetch to simulate responses and failures
  - Verify correct JSON files are written, console.log calls, and return values
- CLI tests for --refresh:
  - Default invocation with no args, custom dataDir and configPath, and error logging on invalid inputs
- HTTP integration tests for GET /refresh:
  - On success return status 200 with text/plain lines matching written filenames
  - On failure return status 500 with plain-text error message

# Documentation Updates
- Update docs/FEATURES.md to include the --refresh flag and GET /refresh endpoint under Sources Management
- Update docs/USAGE.md and README.md with examples of using --refresh and sample outputs