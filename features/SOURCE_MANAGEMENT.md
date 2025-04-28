# Description

Enhance the existing source management feature by fully implementing the refreshSources functionality. This addition delivers core value by fetching JSON from all configured public and custom data sources, archiving the raw captures, and enabling automated downstream processing.

# Programmatic API

Export async function refreshSources(options?) where options may include dataDir (default "data") and configPath (default "data-sources.json"). Implementation:

1. Call listSources(configPath) to obtain merged array of PUBLIC_DATA_SOURCES and custom entries.
2. Ensure the dataDir folder exists on disk via fs.mkdirSync(dataDir, { recursive: true }).
3. For each source in the merged list:
   - Derive a safe filename slug by normalizing name to lowercase, replacing non-alphanumeric with hyphens, and appending ".json".
   - Perform a fetch GET to the source URL.
   - On success, parse the response body as JSON.
   - Write the JSON content to dataDir/<slug>.json with two-space indentation via fs.writeFileSync.
   - Log console.log(`fetched <slug>.json`).
   - Add <slug>.json to a list of written files.
   - On error, log console.error with the error message and continue to next source.
4. After processing all sources, return an object { count: <number of files written>, files: <array of written filenames> }.

# CLI Support

Add a new flag --refresh in main(args):

- When invoked with --refresh and no additional parameters, call refreshSources() with default options.
- For custom directories, allow --refresh <dataDir> <configPath>.
- On completion, after individual fetch logs, log a summary: `Fetched <count> sources into <dataDir>/`.
- Ensure errors are caught and printed via console.error without throwing.

# HTTP Endpoints

Under --serve mode, support GET /refresh:

- Respond with HTTP 200 and Content-Type text/plain.
- Temporarily override console.log so each fetchSources log line is streamed to the HTTP response.
- Invoke refreshSources() and stream all log lines.
- After completion, restore console.log and end the response.
- On error, respond with HTTP 500 and plain-text error message.

# Testing

- Unit tests for refreshSources:
  • Mock listSources to return a set of URLs and names.
  • Spy on fs.mkdirSync, fetch, fs.writeFileSync, and console.log/console.error.
  • Verify files are written with correct filenames and content.
  • Assert returned object contains correct count and files array.
- CLI tests:
  • Invoke main(["--refresh"]) and spy on refreshSources to ensure correct calls with default and custom args.
  • Simulate fetch errors and verify console.error calls.
- HTTP integration tests for GET /refresh:
  • Start server with --serve on random port.
  • Issue GET /refresh and capture streamed response lines.
  • Assert status code 200, content-type text/plain, presence of fetched <slug> messages.
  • Simulate a fetch failure to verify HTTP 500 and plain-text error body.

# Documentation Updates

- Update docs/FEATURES.md to describe the --refresh flag under Sources Management, including CLI usage and HTTP /refresh.
- Update docs/USAGE.md and README.md with example CLI invocation of --refresh and sample output, plus example HTTP request to GET /refresh.