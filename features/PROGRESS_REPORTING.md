# Overview
Add real-time progress reporting for long-running π calculations to improve user feedback in both CLI and HTTP API modes.

# CLI Progress Reporting
Introduce two new flags to the CLI:
--progress             Enable progress reporting during π calculation
--progress-interval n  Emit progress updates at every n percent of work completed (integer between 1 and 100, default 5)
When enabled, the CLI displays an updating single-line indicator showing “X% complete” at each interval. This works in both text and PNG output modes by passing a progress callback into the calculation engine and using readline to overwrite the same console line.

# HTTP API Progress Reporting
Add a Server-Sent Events endpoint at GET /pi/stream that accepts the same query parameters as GET /pi. When a client connects:
- Set response headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive
- During calculation, emit `progress` events with JSON payload { percentComplete: number } at each configured interval
- After completion, emit a final `result` event with JSON payload { pi: string, pngBase64?: string } and then close the stream

# Implementation Details
1. Algorithm Hooks
   Extend calculatePi and each underlying method to accept an optional onProgress(percent: number) callback. Within iterative loops, compute percentComplete based on iteration or convergence and invoke onProgress when percent crosses each interval threshold.

2. CLI Integration
   - In src/lib/main.js, parse --progress and --progress-interval flags. Validate interval is integer 1–100.
   - When --progress is set, pass a callback to calculatePi that uses readline to write and overwrite “X% complete”. Clear the line and output the final pi or PNG confirmation after calculation ends.

3. HTTP Server Integration
   - In server mode (--serve), register route GET /pi/stream on the Express app.
   - On connection, configure SSE headers and flush intervals.
   - Call calculatePi with onProgress callback that writes lines:
       event: progress
data: { "percentComplete": <n> }

     and after finish:
       event: result
data: { "pi": "3.14…", "pngBase64": "…" }

   - End the stream after the result event.

4. Configuration Defaults
   Default progress interval is 5 percent. Invalid interval values should throw a descriptive error.

# Tests
- Unit tests for onProgress callbacks in calculatePiMachin, calculatePiNilakantha, calculatePiChudnovsky, calculatePiGaussLegendre to verify events at expected percent thresholds.
- CLI tests in tests/unit/main.test.js: mock a fast pi function, run main() with --progress and --progress-interval 10, capture console output, and assert that progress lines and final output appear correctly.
- End-to-end API tests in tests/e2e/http.progress.test.js: use supertest to connect to /pi/stream, parse SSE events, assert that a series of progress events in increasing order arrives followed by a result event with correct payload.

# Documentation
- Update README.md under Features with:
  ### Progress Reporting
  node src/lib/main.js --digits 1000 --progress
  node src/lib/main.js --digits 1000 --progress --progress-interval 10
  curl http://localhost:3000/pi/stream?digits=500&method=machin

- Update docs/USAGE.md:
  - Document CLI flags --progress and --progress-interval with descriptions and examples
  - Document SSE endpoint /pi/stream, event formats, and sample client usage