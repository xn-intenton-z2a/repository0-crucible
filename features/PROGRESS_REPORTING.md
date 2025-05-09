# Overview
Add real-time progress reporting to both CLI and HTTP server modes to improve user feedback during long-running π calculations.

# CLI Progress Reporting
Introduce a new flag --progress and optional --progress-interval in src/lib/main.js. When enabled, the CLI will display a live progress indicator showing the percentage of completion or terms processed. Progress updates occur at configurable intervals (default every 5%). Use readline to update a single-line console output without cluttering logs.

# HTTP Progress Reporting
Add a Server-Sent Events (SSE) endpoint GET /pi/stream in the HTTP server. Accept the same query parameters as GET /pi. Respond with Content-Type: text/event-stream. Emit `progress` SSE events carrying JSON payloads `{ percentComplete: number }` as the calculation proceeds, followed by a final `result` event carrying the full π string (for text format) or base64-encoded PNG data (for image format).

# Implementation Details
1. Algorithm Hooks
   • Update calculatePi and each underlying method (Chudnovsky, Gauss-Legendre, Machin, Nilakantha) to accept an optional onProgress(percent: number) callback.  
   • Within iterative loops, compute percentComplete based on iteration count or convergence criterion and invoke onProgress at defined milestones.

2. CLI Integration
   • Parse `--progress` and `--progress-interval <n>` flags in main().  
   • When `--progress` is present, pass a callback that writes a carriage-returned line with `X% complete` at each update.  
   • Ensure the indicator clears or advances appropriately when the calculation finishes or errors.

3. HTTP Server Integration
   • In server mode (when `--serve` is set), register a new Express route `/pi/stream`.  
   • On connection, set headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.  
   • Call calculatePi with an onProgress callback that writes lines prefixed with `event: progress\ndata: ${JSON.stringify({percentComplete})}\n\n`.  
   • After completion, send `event: result\ndata: ${JSON.stringify({pi: piStr, pngBase64: base64Data})}\n\n` and end the stream.

4. Configuration
   • `--progress-interval <n>`: integer 1–100, defines percent step between progress events. Default: 5.
   • Validate interval values and throw errors for invalid inputs.

# Tests
- Create unit tests in `tests/unit/progress.test.js`: stub onProgress to verify callback invocations at expected percent thresholds.  
- Extend CLI tests in `tests/unit/main.test.js`: mock a fast algorithm to simulate progress updates and verify console output for `--progress`.  
- Add end-to-end tests in `tests/e2e/http.progress.test.js` using supertest: connect to `/pi/stream`, parse received SSE events, assert that multiple `progress` events appear in increasing order and a final `result` event contains correct payload.

# Documentation
- Update `README.md` under Features with a “Progress Reporting” section including examples:

  node src/lib/main.js --digits 1000 --progress
  node src/lib/main.js --digits 1000 --progress --progress-interval 10
  curl http://localhost:3000/pi/stream?digits=500&method=machin

- Update `docs/USAGE.md` to document new CLI flags (`--progress`, `--progress-interval`) and the `/pi/stream` SSE endpoint, including event formats and sample client usage.