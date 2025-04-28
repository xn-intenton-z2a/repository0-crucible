# Description
Manage the crawling of all configured data sources. When invoked, fetch JSON from each public or custom source and store the responses as raw data files in the project data directory to support downstream ontology construction.

# Implementation
- In main.js implement async function refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {}):
   1. Ensure the data directory exists; if not, create it with fs.mkdirSync using recursive option.
   2. Call listSources(configPath) to retrieve merged default and custom sources.
   3. Initialize count = 0 and files = [] array.
   4. For each source in the list:
      - Perform HTTP GET on source.url using global fetch.
      - On HTTP or network error log console.error(`Failed to fetch ${source.name}: ${error message or status}`) and continue to next source.
      - On success attempt to parse response as JSON; on parse error log console.error(`Invalid JSON from ${source.name}: ${error message}`) and continue.
      - Derive a safe slug by lowercasing the source.name and replacing non-alphanumeric characters with dashes.
      - Write the parsed JSON to file dataDir/<slug>.json with fs.writeFileSync and pretty printing.
      - Log console.log(`written ${slug}.json`).
      - Increment count and push slug.json into files.
   5. After all sources processed, log console.log(`Fetched ${count} sources into ${dataDir}/`).
   6. Return object { count, files }.

# CLI Support
- In main(args) detect `--refresh` flag:
   - When present call refreshSources() and exit without throwing.

# HTTP Endpoint
- Under serve mode handle GET /refresh:
   - Respond with status 200 and Content-Type text/plain.
   - Temporarily override console.log to stream each log line to the HTTP response with a newline.
   - Invoke refreshSources() and restore console.log.
   - End the response when complete.

# Testing
- Add unit tests tests/unit/main.refresh-sources-function.test.js:
   • Mock fs.existsSync, fs.mkdirSync, global fetch, fs.writeFileSync, console.log, console.error.
   • Test behavior when data directory does not exist and is created.
   • Test handling of fetch failures and JSON parse errors with console.error calls.
   • Test successful fetch writes files and returns correct summary.
- Add CLI tests tests/unit/main.refresh-cli.test.js:
   • Spy on refreshSources to confirm invocation when using `--refresh`.
- Add HTTP integration test tests/unit/main.refresh-http.test.js:
   • Start server with `--serve`, issue GET /refresh, verify status 200, header text/plain, body contains written lines and final summary.

# Documentation Updates
- Update docs/FEATURES.md and docs/USAGE.md to include the `--refresh` option under Sources Management with example invocation and sample output.