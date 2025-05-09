features/CLI_OPTION_INTEGRATION.md
# features/CLI_OPTION_INTEGRATION.md
# Overview

Introduce comprehensive parsing and handling of advanced CLI options in the main entrypoint to enable text formatting, caching, and progress reporting features seamlessly. This feature ensures all flags (--group-size, --line-length, --no-cache, --cache-file, --progress, --progress-interval) are recognized, validated, and wired into the existing calculatePi, formatPiString, and caching modules.

# CLI Flag Parsing

Update `src/lib/main.js` to:

• Recognize new flags:
  – `--group-size <n>`: integer ≥1
  – `--line-length <n>`: integer ≥1
  – `--no-cache`: boolean to disable caching
  – `--cache-file <path>`: path to JSON cache file
  – `--progress`: boolean to enable progress reporting
  – `--progress-interval <n>`: percent interval 1–100

• Validate each value and throw descriptive errors on invalid input:
  – "Invalid --group-size. Must be integer ≥1"
  – "Invalid --line-length. Must be integer ≥1"
  – "Invalid --progress-interval. Must be integer between 1 and 100"

# Integration in Main

1. After parsing standard flags, collect advanced options into an `options` object.
2. When invoking calculatePi:
   - Pass caching options (`cacheEnabled`, `cacheFilePath`) into the wrapper in `pi.js`.
   - Attach an onProgress callback if `--progress` is set, using `--progress-interval` to throttle updates via `readline`.
3. After receiving the raw π string (`piStr`):
   - If format is `text`, call `formatPiString(piStr, groupSize, lineLength)` to produce the final output.
   - Print the formatted output to console.
4. Ensure PNG and HTTP server modes ignore formatting flags but respect caching and progress callbacks.

# Testing

• Extend `tests/unit/main.test.js`:
  - Tests for invalid `--group-size`, `--line-length`, `--no-cache`, `--cache-file`, `--progress-interval` values.
  - Test that `main` with combined flags (`--digits 50 --group-size 5 --line-length 10`) produces formatted console output via spy on `console.log`.
  - Test that `--no-cache` disables cache reads/writes by stubbing filesystem.
  - Test that `--progress` and `--progress-interval` cause console writes at expected intervals using a fake fast calculation.

# Documentation

• Update **README.md** under Key Features to document new CLI integration, listing all flags with descriptions and examples:
  - node src/lib/main.js --digits 200 --group-size 4 --line-length 20 --no-cache --cache-file mycache.json --progress --progress-interval 10

• Update **docs/USAGE.md** under "CLI Options" to include new flags, validations, and combined usage scenarios.features/PI_CALCULATION.md
# features/PI_CALCULATION.md
# Overview
Enhance the existing pi calculation feature by rendering the exact digit characters into the output PNG rather than producing a blank image. When the CLI is invoked with `--format=png`, the tool will produce a monochrome image where each digit of π (including the leading "3" and decimal point) is drawn as text in a consistent, monospaced font.

# CLI Usage
Existing flags remain unchanged. When `--format=png` is selected, the output file will now contain a rendered image of the π digits:

--digits <n>       Number of decimal places (1 to 10000), default 100
--method <name>    Calculation method: chudnovsky, gauss-legendre, machin, nilakantha; default chudnovsky
--format png       Output format png (text mode unchanged)
--output <path>    File path for generated PNG (required)

# Implementation Details

## Font and Layout
- Use pureimage to draw text. Register or decode a bundled monospaced TTF font (e.g., SourceCodePro) loaded from node_modules/pureimage/fonts.  
- Set font size so that each character occupies a fixed width (charWidth) and fixed height (charHeight).
- Compute image width = charWidth * (number of characters in piStr), height = charHeight + padding.
- Initialize a white background canvas, set fill style to black for text.

## Rendering Pipeline
- In `src/lib/main.js`, replace the blank-image branch with:
  1. Call a new helper `renderPiAsPng(piStr: string, outputPath: string)`.
  2. In the helper:
     - Load and register the monospaced font.
     - Measure text metrics for single characters to determine dimensions.
     - Create an image with computed width/height.
     - Draw each character of `piStr` at offset = index * charWidth, y baseline = charHeight.
     - Encode PNG to disk via pureimage.

## Tests
- In `tests/unit/main.test.js` or a new `tests/unit/pngRender.test.js`, stub or use pureimage to decode a small generated PNG for `piStr = "3.14"` and assert that specific pixel coordinates are not all white (e.g., pixel at coordinate of the digit "3" has non-white RGBA).
- Verify the file exists and the rendered image width and height match expected dimensions for small digit counts.

# Documentation
- Update README.md under Features to show example:
  node src/lib/main.js --digits 50 --format png --output pi_digits.png
- In docs/USAGE.md, add a PNG Rendering section that describes the embedded font, image dimensions, and shows sample output description.
features/PROGRESS_REPORTING.md
# features/PROGRESS_REPORTING.md
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
  - Document SSE endpoint /pi/stream, event formats, and sample client usagefeatures/PI_CACHE.md
# features/PI_CACHE.md
# Overview
Introduce a transparent caching layer for π calculation results to avoid repeated heavy computations. Caching is enabled by default, storing results by method and digit count in-memory and persisting them to disk. Users can disable caching or specify a custom cache file per invocation.

# CLI Usage
--no-cache
    Disable cache lookup and persistence for this run.
--cache-file <path>
    Specify a custom path for the cache file. Defaults to .pi_cache.json in the working directory.

# Implementation Details

## Cache Store
- On startup in src/lib/pi.js, read cache data from the cache file (default path or from CLI flag). If the file is missing or invalid JSON, initialize an empty cache Map keyed by "method:digits".
- Use an in-memory Map to track cached π strings.
- After computing a missing entry, store it in memory and atomically write the full cache object back to disk by writing to a temporary file and renaming it.

## calculatePi Wrapper
- Extend the existing calculatePi signature to accept an options object: calculatePi(digits, method, {cacheEnabled = true, cacheFilePath}).
- When cacheEnabled is true, before computing, check the in-memory Map and return the cached string if available.
- When cacheEnabled is false, skip lookup and do not persist results.

## CLI Integration in main.js
- Parse new flags --no-cache and --cache-file in src/lib/main.js, validating inputs:
    • --no-cache sets cacheEnabled to false.
    • --cache-file <path> sets cacheFilePath to the supplied path.
- Pass cacheEnabled and cacheFilePath into calculatePi when invoking it.

# Tests
- Add tests in tests/unit/cache.test.js:
    • Stub fs.readFileSync and fs.writeFileSync to simulate existing cache and ensure proper reads and writes.
    • Verify that on a cache miss, calculatePi writes a new entry and returns correct value.
    • Verify that on subsequent calls with identical parameters, calculatePi returns from memory without invoking the algorithm or writing to disk.
    • Verify that supplying --no-cache always computes fresh results and never writes to disk.
    • Verify that supplying --cache-file uses the custom file path for both reading and writing.

# Documentation
- Update README.md under Features to document caching usage, including examples of disabling the cache and specifying a custom cache file.
- Update docs/USAGE.md under a new "Caching" section to describe default cache location, CLI flags, and behaviors.features/TEXT_FORMATTING.md
# features/TEXT_FORMATTING.md
# Overview

Provide users with advanced text formatting options for π output in CLI mode. Introduce two flags:
--group-size to insert spaces between groups of digits, and --line-length to wrap lines after a specified length. Improves readability in terminals or text files.

# CLI Flag Parsing

In `src/lib/main.js`:

• Recognize and validate two new flags:
  – `--group-size <n>`: integer ≥1. Error if invalid: "Invalid --group-size. Must be integer ≥1"
  – `--line-length <n>`: integer ≥1. Error if invalid: "Invalid --line-length. Must be integer ≥1"

• After parsing existing flags (`--digits`, `--method`, `--format`), extract `groupSize` and `lineLength`. Only apply when `format` is `text`. Ignore in other modes.

# Formatting Helper

Implement `formatPiString(piStr: string, groupSize?: number, lineLength?: number): string` in `src/lib/main.js` or a dedicated module:

1. Split `piStr` into `integerPart` and `fractionalPart` around the decimal point.
2. If `groupSize` is provided:
   - Break `fractionalPart` into groups of `groupSize` characters.
   - Join groups with single spaces.
   - Reassemble as `integerPart + '.' + grouped fractional part`.
3. If `lineLength` is provided:
   - Break the full string (including spaces) into substrings of length `lineLength`.
   - Join substrings with newline characters.
4. Return the formatted string.

# Integration in main()

After computing `piStr`:

```
if (format === 'text') {
  const outputStr = formatPiString(piStr, groupSize, lineLength)
  console.log(outputStr)
}
``` 

Ensure PNG, benchmark, and server modes ignore these flags.

# Tests

Create or extend `tests/unit/textFormatting.test.js` to cover:

• Grouping only: given a sample π string, assert spaces inserted every groupSize digits.
• Wrapping only: given a sample π string, assert newline breaks at lineLength boundaries.
• Combined grouping and wrapping: ensure wrapping counts inserted spaces.
• Error conditions: non-integer, zero, or negative values for flags throw descriptive errors.
• Direct unit tests of `formatPiString` isolating formatting logic.

# Documentation

Update documentation in two places:

- **README.md**, under "Text Formatting": describe both flags with usage examples.
- **docs/USAGE.md**, under "CLI Options": add lines for:
  --group-size <n>    Insert a space every _n_ digits (integer ≥1)
  --line-length <n>   Wrap output into lines of length _n_ (integer ≥1)

Include example commands demonstrating grouping, wrapping, and combined use.features/HTTP_SERVER.md
# features/HTTP_SERVER.md
# Overview
Enhance and consolidate the existing HTTP server mode to include a health check endpoint alongside π generation, benchmarking, and Server-Sent Events (SSE) streaming for real-time progress. This feature enables monitoring, client integrations, and robust API usage.

# Endpoints

## GET /health
- Description: Provide service health and version information.
- Response:
  - Status: 200 OK
  - Content-Type: application/json
  - Payload: { "status": "ok", "uptime": <seconds>, "version": "<semver>" }

## GET /pi
- Query parameters:
  - digits (integer 1–10000, default 100)
  - method (chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  - format (text|png, default text)
  - progressInterval (integer 1–100, default 5)
- Behavior:
  - Without progressInterval: return π result directly.
  - With progressInterval: upgrade to SSE stream.
    • Emit `progress` events with { percentComplete }.
    • Final event `result` with { pi, pngBase64? }.
- Responses:
  - text: Content-Type: text/plain, body = π string.
  - png: Content-Type: image/png, body = PNG buffer.

## GET /benchmark
- Query parameters:
  - digits (integer 1–10000, default 100)
  - methods (comma-separated list or omitted for all)
  - runs (integer ≥1, default 3)
  - progressInterval (integer 1–100, default 5)
- Behavior:
  - Without progressInterval: return JSON timings.
  - With progressInterval: SSE stream of per-run progress.
- Response:
  - JSON: Content-Type: application/json, body = [ { method, runs, averageTimeMs, minTimeMs, maxTimeMs } ]

# Implementation Details

1. CLI Integration
   - Parse --serve and --port flags. When --serve is set, start HTTP server on given port and skip CLI-only output.
   - Accept `--health-path` override if needed (optional).

2. Server Setup
   - Use Express for routing and Zod for request validation.
   - Implement /health route returning uptime and version from package.json.
   - Implement /pi and /benchmark routes per endpoint spec.
   - For SSE, set headers: Content-Type: text/event-stream; Cache-Control: no-cache; Connection: keep-alive. Flush after each event.
   - Reuse calculatePi, benchmarkPi, and renderPiAsPng helper for generation.

3. Utilities
   - Helper writeSSE(response, event, data) to format and send events.
   - Centralize Zod schemas for query parameters and validate on each request.

# Tests

- tests/unit/http.server.test.js
  • Verify GET /health returns 200 and valid JSON schema.
  • Test GET /pi returns correct text/plain and correct π string.
  • Test GET /pi?format=png returns image/png of expected dimensions.
  • Test GET /pi?progressInterval=10 returns SSE stream with progress and result events.
  • Test GET /benchmark returns JSON array with correct structure.
  • Test GET /benchmark?progressInterval=20 returns SSE stream with progress followed by final JSON event.

# Documentation

1. README.md
   - Add "Health Endpoint" section under HTTP Server Mode with example:
     curl http://localhost:3000/health

2. docs/USAGE.md
   - Document /health endpoint, response schema, and example.
   - Update HTTP Server Examples to include health check.
   - Ensure progressInterval parameter and SSE usage examples are up to date.
features/CLI_BENCHMARK.md
# features/CLI_BENCHMARK.md
# Overview

Introduce a benchmarking mode into the CLI to measure and report performance of the π calculation algorithms. Users will be able to run timed benchmarks across one or all supported methods and receive structured results.

# CLI Usage

When the --benchmark flag is supplied, the CLI ignores --format and --output and enters benchmark mode.

--benchmark
    Enable performance benchmarking instead of computing π output.
--benchmark-runs <n>
    Number of times to invoke each method; must be integer ≥1. Default: 3.
--benchmark-json
    Output raw JSON array of BenchmarkResult objects. Without this flag, a human-readable table is printed.
--digits <n>
    Number of decimals to compute for each run (1 to 10000). Default: 100.
--method <name>
    A single method to benchmark (chudnovsky, gauss-legendre, machin, nilakantha). If omitted, all methods are benchmarked.

# Implementation Details

1. In src/lib/pi.js
   • Implement a new async function benchmarkPi(digits: number, runs: number, methods?: string[]): Promise<BenchmarkResult[]>.
     – For each method, call calculatePi(digits, method) runs times, measuring elapsed microseconds via high-resolution timer.
     – Compute averageTimeMs, minTimeMs, maxTimeMs for each method and return an array of { method, runs, averageTimeMs, minTimeMs, maxTimeMs }.
2. In src/lib/main.js
   • Parse --benchmark, --benchmark-runs, and --benchmark-json alongside existing flags.
   • When --benchmark is set:
     – Validate that benchmark-runs is an integer ≥1.
     – Determine target methods from --method or default to all.
     – Await benchmarkPi(digits, runs, methods).
     – If --benchmark-json, console.log JSON.stringify(results); else, render a table with headers Method | Runs | Avg ms | Min ms | Max ms.
     – Exit process after output.

# Testing

Unit tests in tests/unit/pi.test.js:
  • Test benchmarkPi with a stubbed calculatePi to simulate timing and verify returned structure contains correct runs and numeric timing fields.

Unit tests in tests/unit/main.test.js:
  • Validate parsing of --benchmark flags and error on invalid runs values.
  • Spy on console.log to verify JSON or table output is produced.

End-to-end test in tests/e2e/cli.test.js:
  • Run CLI with --benchmark, --digits 10, --benchmark-runs 2, --benchmark-json; parse stdout as JSON and assert array contains entries for expected methods with correct runs count.

# Documentation

README.md:
  • Under Features, add “CLI benchmarking mode” with example invocation:
      node src/lib/main.js --digits 500 --benchmark --benchmark-runs 5 --benchmark-json

docs/USAGE.md:
  • Document new flags, describe output JSON schema, and include sample JSON and table outputs.
