# Description
Enhance source management by fully implementing refreshSources to fetch JSON from all configured public and custom data sources, archive raw captures, and enable automated downstream processing.

# Programmatic API
- Export async function refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {})
  1. Use listSources(configPath) to merge PUBLIC_DATA_SOURCES and custom entries.
  2. Ensure dataDir exists on disk via fs.mkdirSync(dataDir, { recursive: true }).
  3. For each source in the merged list:
     - Normalize source.name to a filename-safe slug: lowercase, replace non-alphanumeric with hyphens, append .json.
     - Perform fetch GET to source.url.
     - On success parse the response body as JSON; write JSON to dataDir/<slug> with two-space indentation via fs.writeFileSync.
     - Log console.log(`fetched <slug>`).
     - Collect <slug> in a list of written files.
     - On fetch or JSON errors log console.error with the error message and continue processing remaining sources.
  4. After all sources processed, return { count: <number of files written>, files: <array of written filenames> }.

# CLI Support
- Add flag --refresh in main(args) with optional positional parameters:
  - No args: refreshSources() with defaults.
  - One arg: dataDir only.
  - Two args: dataDir and configPath.
- On invocation:
  - Call refreshSources() with provided arguments.
  - Stream each fetch log to the console via console.log.
  - After completion, log summary: `Fetched <count> sources into <dataDir>/`.
  - Errors are caught and printed via console.error; main returns without throwing.

# HTTP Server Endpoints
Under --serve mode, support GET /refresh:
- Respond with status 200 and Content-Type text/plain.
- Temporarily override console.log to write each log line to the HTTP response, ending each with a newline.
- Invoke refreshSources() and stream logs as they occur.
- Restore console.log and end the response on completion.
- On any error, respond with status 500 and plain-text error message.

# Testing
- Unit tests for refreshSources:
  • Mock listSources to return multiple URLs and names.
  • Spy on fs.mkdirSync, fetch, fs.writeFileSync, and console.log/console.error.
  • Verify files are written with expected slugs and content.
  • Assert returned object contains correct count and files array.
- CLI tests:
  • Invoke main(["--refresh"]) and spy on refreshSources to assert calls with default and custom args.
  • Simulate fetch errors and verify console.error calls and summary behavior.
- HTTP integration tests for GET /refresh:
  • Start server with --serve on a random port.
  • Issue GET /refresh and capture streamed response lines.
  • Assert status code 200, content-type text/plain, presence of fetched <slug> messages and final summary.
  • Simulate a fetch failure to verify HTTP 500 and plain-text error body.

# Documentation Updates
- Update docs/FEATURES.md under Sources Management to describe --refresh flag, its CLI usage, and HTTP GET /refresh endpoint.
- Update docs/USAGE.md and README.md with example CLI invocation of --refresh, sample output, and example HTTP request to GET /refresh.