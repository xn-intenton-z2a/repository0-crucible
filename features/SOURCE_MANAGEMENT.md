# Description
Extend the existing source management subsystem by fully implementing the refreshSources function to retrieve data on demand from all configured sources and persist the results as JSON files into the local data directory. This ensures that users can synchronize and update local data snapshots with a single CLI command or HTTP request.

# Programmatic API

Export an asynchronous function refreshSources({ dataDir = "data", configPath = "data-sources.json" } = {}) from src/lib/main.js

- Ensure dataDir exists, creating it with fs.mkdirSync and recursive option.
- Load merged sources via listSources(configPath).
- Iterate over each source entry:
  • Slugify the source.name to a safe filename (lowercase, hyphens for spaces, remove invalid characters).
  • Perform an HTTP GET request to source.url with fetch and headers Accept application/json.
  • If fetch or JSON parsing fails, console.error the source name and error, and continue to next source.
  • On success write the JSON body to dataDir/<slug>.json with two-space indentation using fs.writeFileSync.
  • console.log a message for each successful write: written <slug>.json.
- Collect the filenames of successful writes and return an object { count: number of files written, files: array of filenames }.

# CLI Support

Extend main(args) in src/lib/main.js to support the flag --refresh [dataDir] [configPath]

- Parse optional positional arguments for dataDir and configPath.
- Invoke refreshSources with parsed arguments.
- Stream console.log output for each written file to the console.
- After completion, console.log a summary line: Refreshed <count> sources into <dataDir>/.
- On errors, console.error the error message and return without throwing.

# HTTP Endpoints

Under --serve mode in src/lib/main.js server logic add handler:

GET /refresh

- Respond with status 200 and Content-Type text/plain.
- Override console.log to write each line to the response as it occurs.
- Invoke refreshSources() and stream each written line.
- After completion, write a summary line and end the response.
- If refreshSources throws, respond with status 500 and plain-text error message, and end the response.

# Testing

- Unit tests for refreshSources:
  • Mock fs and fetch to simulate success and failure scenarios.
  • Verify directory creation, slugification of names, correct invocation of fetch with headers, and writing of files.
  • Simulate fetch or parsing errors and assert console.error was called and iteration continued.
  • Assert returned object includes accurate count and filenames.

- CLI tests for --refresh flag:
  • Invoke main(["--refresh"]), main(["--refresh", "d" ]), and with both args.
  • Mock refreshSources to capture arguments and simulate log lines.
  • Assert main calls refreshSources with correct parameters, streams console.log output, and prints summary line.
  • Verify on simulated error console.error is called and exit without throwing.

- HTTP integration tests under --serve for GET /refresh:
  • On success, assert status 200, Content-Type text/plain, body includes each written line and summary.
  • On refreshSources throwing, assert status 500 and body equals the error message.

# Documentation Updates

- Update docs/FEATURES.md under Sources Management to describe the CLI --refresh flag and GET /refresh endpoint, including usage examples and summary format.
- Update docs/USAGE.md to add examples:
  • CLI: node src/lib/main.js --refresh
  • CLI with custom paths: node src/lib/main.js --refresh data custom-config.json
  • HTTP: curl http://localhost:3000/refresh
- Update README.md to include Refresh Sources in the Features list and show example CLI and HTTP invocations.