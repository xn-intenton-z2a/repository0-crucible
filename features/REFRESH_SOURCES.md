# Description
Implement full support for refreshing configured data sources into the local data directory by invoking the existing refreshSources API. This feature enables users to fetch raw JSON captures from all public and custom data sources, log each fetch, and provide a clear summary of files written.

# Implementation
- In src/lib/main.js add CLI handling for the --refresh flag:
  1. When --refresh is passed, call refreshSources({ dataDir, configPath }) with optional positional args.
  2. Log each fetched filename using console.log as it is written by refreshSources.
  3. Capture and log errors without throwing.
- In the HTTP server handler under --serve, add a GET /refresh endpoint:
  1. Respond with status 200 and content-type text/plain.
  2. Temporarily override console.log to stream each log line to the response as refreshSources runs.
  3. Invoke refreshSources() and then restore console.log and end the response.
  4. On error respond with 500 and plain-text error message.

# CLI Support
- Extend getHelpText() to list the --refresh flag with description.
- In main(args) handle:
  • case "--refresh":
    – If no args, call refreshSources() with defaults.
    – If one or two args, call refreshSources({ dataDir: args[1], configPath: args[2] }).
    – Log each fetch and final summary from refreshSources without throwing.

# HTTP Server Endpoints
- GET /refresh
  • Respond 200 text/plain.
  • Override console.log to write each fetch line to the response.
  • Invoke refreshSources with default paths.
  • On success end response after streaming logs.
  • On fetch or write error respond 500 with error message.

# Testing
- Unit tests for the CLI:
  • Spy on refreshSources, call main(["--refresh"]), main(["--refresh","customData","customConfig"]), and verify correct arguments.
  • Mock console.log and ensure log calls match files written and summary.
- HTTP integration tests:
  • Start server via main(["--serve"]) on random port.
  • Issue GET /refresh, capture streamed response and status code.
  • Assert status 200, content-type text/plain, body contains each fetched filename and summary line.
  • Simulate refreshSources throwing to assert status 500 and error message.

# Documentation Updates
- Update docs/FEATURES.md under Sources Management to include the --refresh flag and HTTP /refresh endpoint and describe usage examples.
- Update docs/USAGE.md with CLI invocation example for --refresh and sample output.
- Update README.md to list the --refresh flag in the features list with a usage snippet.