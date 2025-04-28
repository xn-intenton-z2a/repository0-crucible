# Description
Manage the full lifecycle of public and custom data sources, including listing, adding, removing, and updating sources; crawling each configured source to fetch raw JSON data; and writing each response into the data directory for downstream processing. This ensures a unified capture of external data for ontology construction.

# Implementation

## Programmatic API
- listSources(configPath) remains unchanged: read or initialize data-sources.json, validate structure, return merged array of default and custom sources.
- refreshSources({ dataDir = 'data', configPath = 'data-sources.json' } = {})
  - Ensure the dataDir exists; if not, create it via fs.mkdirSync with recursive true.
  - Read configured sources via listSources(configPath).
  - For each source:
    - Perform HTTP GET on source.url.
    - On HTTP error or non-200 status, log console.error(`Failed to fetch <name>: <message or status>`), skip writing.
    - On success, parse response JSON; on parse error log console.error(`Invalid JSON from <name>: <error>`), skip writing.
    - Determine a safe slug for the source (e.g., lowercase name with non-alphanumeric replaced by dash).
    - Write response JSON to dataDir/<slug>.json with pretty printing.
    - Log console.log(`written <slug>.json`).
  - After processing all sources, log console.log(`Fetched <count> sources into ${dataDir}/`).
  - Return { count, files } where files is an array of written filenames.

# CLI Support
- In main(args), detect --refresh flag.
- When invoked:
  - Call refreshSources() with default or provided config.
  - Exit without throwing; errors logged.

# HTTP Endpoints
- Under --serve mode, handle GET /refresh:
  - Respond with status 200 and Content-Type text/plain.
  - Temporarily override console.log to stream each log line to the response.
  - Invoke refreshSources() and restore console.log after completion.
  - End the response once all logs are streamed.

# Testing
- Unit tests for refreshSources:
  - Mock fs.existsSync, mkdirSync, readFileSync, writeFileSync, fetch, console.log, console.error.
  - Verify behavior when dataDir missing, config file missing, fetch failures, invalid JSON, and success cases.
  - Assert correct file writes, log lines, and returned summary.
- CLI tests:
  - Spy on refreshSources to confirm invocation for --refresh flag.
- HTTP integration tests:
  - Start server via main(["--serve"]) and issue GET /refresh.
  - Verify status 200, header text/plain, streamed log lines, including final summary line.

# Documentation Updates
- Update docs/FEATURES.md and docs/USAGE.md to include the --refresh option under features and usage, showing example invocations and sample output.
- Update README.md under Features section and CLI examples to document refresh behavior.