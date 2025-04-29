# Description

Enhance source management by fully implementing the refreshSources function to fetch raw data captures from all configured data sources and persist them as JSON files in the data directory. Provide CLI and HTTP endpoints for on-demand data refresh.

# Implementation

- In src/lib/main.js update refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {}) to:
  1. Ensure the dataDir exists, creating it if necessary.
  2. Call listSources(configPath) to obtain merged list of public and custom sources.
  3. For each source:
     a. Construct a safe filename by slugifying the source name or using host from URL.
     b. Perform HTTP GET to fetch JSON data from the source URL.
     c. Parse the response as JSON. On error log error.message and continue.
     d. Write the JSON to dataDir/<slug>.json with two-space indentation.
     e. Log each successful write via console.log with the filename.
  4. Return an object { count, files } summarizing how many files were written and their filenames.

# CLI Support

- Add flag --refresh [dataDir] [configPath] to main(args) in src/lib/main.js:
  • When invoked, call refreshSources with provided or default paths.
  • Stream each console.log line to output as text lines.
  • On invalid directory or URL errors, log error messages without throwing.
  • Return the summary object.

# HTTP Server Endpoint

- Under serve mode support GET /refresh:
  • Respond with status 200 and content-type text/plain.
  • Override console.log to stream each log line into the response.
  • Invoke refreshSources and then end the response.
  • On error respond with status 500 and plain-text error message.

# Testing

- Unit tests for refreshSources():
  • Mock fs and listSources to simulate a variety of sources and HTTP responses.
  • Verify creation of dataDir, correct writeFileSync calls with expected filenames and content.
  • Assert that returned summary object has correct count and filenames.
  • Simulate fetch failures and JSON parse errors to ensure errors are logged and do not halt execution.

- CLI tests for --refresh:
  • Invoke main(['--refresh']) with no args and spy on refreshSources to assert correct invocation.
  • Supply custom dataDir and configPath to verify parameter passing.
  • Simulate errors inside refreshSources to assert console.error is called and process does not crash.

- HTTP integration test for GET /refresh:
  • Start server in serve mode, issue GET /refresh, and verify status 200 and text/plain.
  • Body contains lines for each fetched file, matched by filename pattern.
  • Simulate a source fetch error to assert status 500 and plain-text error message.

# Documentation Updates

- Update docs/FEATURES.md under Sources Management to describe the --refresh flag and GET /refresh endpoint.
- Update docs/USAGE.md to include example CLI invocation of refresh and sample output lines.
- Update README.md to list the new --refresh flag and explain data refresh behavior.
