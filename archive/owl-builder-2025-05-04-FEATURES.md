features/API_INTERFACE.md
# features/API_INTERFACE.md
# Overview
Extend the existing API interface feature to include version reporting across CLI, HTTP, and programmatic APIs.

# CLI Behavior
• Introduce flag --version, alias -v to output the tool version from package.json and exit immediately.
• Version command takes precedence over any other flags and does not generate faces or start the server.

# HTTP API
• Add endpoint GET /version
  • On success respond status 200 with JSON body containing field version with the current version string (read from package.json).

# Programmatic API
• Export function getVersion() returning the current version string from package.json.

# Implementation Details
1. Import version from package.json at the top of src/lib/main.js.
2. In main(), before processing help or other flags, detect --version or -v in args. If present, console.log(version) and return.
3. Update createApp() to add a route handler for GET /version that responds with res.json({ version }).
4. Export getVersion() alongside generateFaces and listCategories, reading the imported version constant.
5. Update README.md, docs/USAGE.md, and docs/README.md to document the new CLI flag, HTTP endpoint, and programmatic function.

# Testing
• Add unit tests for getVersion(): expect it to return the exact version from package.json.
• Add CLI tests invoking main with --version and -v, capturing console output to match version string and ensuring process does not exit with error.
• Add HTTP tests for GET /version: expect status 200 and JSON response { version } matching package.json.version.features/STREAM_MODE.md
# features/STREAM_MODE.md
# Overview
Add continuous streaming capability for face expressions across CLI, HTTP, and programmatic APIs to support ongoing emotive feedback.

# CLI Behavior
• Introduce --stream, -w (boolean) to enable continuous output mode.
• Introduce --interval, -I (integer milliseconds, default: 1000) to set time between outputs.
• When stream mode is active: at each interval generate faces according to count, category, seed, and unique flags and print in text or JSON depending on json flag. Loop indefinitely until process termination.

# HTTP API
• Add GET /stream endpoint serving server-sent events (SSE) with Content-Type text/event-stream.
• Accept query parameters: count, category, seed, unique, interval.
• On connection, send an event named face every interval with data as JSON payload containing faces, category, count, seed, and timestamp.
• Clean up interval timer on client disconnect.

# Programmatic API
• Export async generator generateFacesStream(options) that yields an object { faces, category, count, seed, timestamp } every interval based on options: count, category, seed, config, unique, interval.
• Allows consumers to iterate over face events until manually stopped.

# Implementation Details
1. Extend OptionsSchema to include interval: z.coerce.number().int().min(1).default(1000).
2. Update parseOptions to capture --stream/-w and --interval/-I and include stream flag in returned options.
3. In main(), detect stream flag and set up setInterval to call generateFacesCore and output accordingly.
4. In createApp(), implement /stream handler that sets headers for SSE, parses options via OptionsSchema.pick including interval, sets up interval to write event: data: JSON.stringify(result) and send event: face. Remove timer on close.
5. Implement generateFacesStream as async function* that loops with setTimeout or for-await sleep to yield results of generateFacesCore with options including interval.

# Testing
• Unit tests for parseOptions recognizing stream and interval flags and default values.
• Tests for generateFacesStream: verify that it yields correct events and respects interval option by mocking timer.
• HTTP tests for /stream: verify response headers, first event chunk format, and clean disconnect.
• CLI integration tests: run main with --stream and --interval in a subprocess, capture initial outputs, then terminate.

# Documentation
• Update README.md and docs/USAGE.md to describe new flags --stream/-w and --interval/-I in CLI section.
• Document HTTP SSE usage under Streaming section with example curl command.
• Update API reference to document generateFacesStream usage and options.
