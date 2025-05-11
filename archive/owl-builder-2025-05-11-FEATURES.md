features/OPERATION_TIMEOUT.md
# features/OPERATION_TIMEOUT.md
# Operation Timeout Feature

## Overview

Enable users to guard against runaway operations by specifying a maximum execution duration for any CLI command or HTTP-bound task. When the specified timeout elapses, the operation is aborted gracefully with a clear error message.

## Functional Requirements

- Update the CLI parser in `src/lib/main.js` to accept a new flag `--timeout <ms>` parsed as an integer ≥ 1. Reject invalid values with a descriptive error and exit code 1.
- Before dispatching any operation, if `timeout` is provided:
  - Create an AbortController instance and start a timer using `setTimeout` that calls `controller.abort()` after the specified milliseconds.
  - Pass `controller.signal` into all core functions and workflows:
    - `calculatePi` and `calculatePiParallel`
    - `benchmarkPi`
    - `visualizePiDigits` and `visualizePiDigitsText`
    - `visualizePiConvergence` and `visualizePiConvergenceText`
    - `exportPi`
    - `searchPi`
    - `extractPiHex` and `extractPiDecimal`
    - `startHttpServer` for HTTP requests
  - Wrap each function invocation in a `Promise.race` between the normal operation and a promise that rejects when `signal.aborted` with an `OperationTimedOutError`.
- On abort:
  - Clear the timeout timer to prevent leaks.
  - Print an error message “Operation timed out after <timeout> ms” to stderr.
  - Exit the process with a non-zero status code.
- On successful completion before timeout, clear the timer and proceed normally.

## CLI Interface

- New flag:
  --timeout <ms>    Maximum execution time in milliseconds (integer ≥ 1). Unlimited by default.
- Validation:
  - Non-integer or less than 1 should produce a descriptive parser error and exit code 1.
- Example usages:
  node src/lib/main.js --digits 10000 --timeout 5000
  node src/lib/main.js --benchmark --min-digits 100 --max-digits 500 --timeout 10000
  node src/lib/main.js --serve --port 8080 --timeout 15000

## Dependencies

- Use the built-in `AbortController`, `setTimeout`, and `clearTimeout` from Node.js. No external dependencies required.

## Testing

- Unit tests (`tests/unit/main.test.js`):
  - Stub a long-running operation (e.g., a promise that never resolves) and verify that supplying a small `--timeout` causes the CLI to abort, print the timeout error message, and exit with a non-zero status.
  - Test that missing or invalid `--timeout` values are rejected by the parser.
- CLI integration tests (`tests/e2e/cli.test.js`):
  - Invoke the CLI with a slow command (such as `--benchmark` over a large range) and `--timeout 1`, and assert immediate exit with the timeout message.
  - Confirm that commands complete normally when `--timeout` is not set or set to a sufficiently large value.features/PI_NGRAM_DISTRIBUTION.md
# features/PI_NGRAM_DISTRIBUTION.md
# PI N-gram Distribution Feature

## Overview

Compute and output the frequency distribution of all contiguous n-gram substrings of π digits for a specified length. This supports in-depth pattern analysis and exploration of recurring sequences in π digits.

## Functional Requirements

- Add function countPiNgrams(options) in src/lib/main.js
  - options.digits: positive integer specifying total number of digits to compute (including integer part and fraction; minimum 1, default 1000)
  - options.algorithm: one of machin, gauss-legendre, or chudnovsky (default machin)
  - options.ngramLength: positive integer length of substrings to count (minimum 1, default 2)
- Compute π as a string using calculatePi with sufficient precision
- Remove the decimal point and build all contiguous substrings of length options.ngramLength
- Count occurrences of each unique n-gram and assemble a plain object mapping substring to count
- Return the count object

## CLI Interface

- Extend src/lib/main.js to accept new flags:
  --ngram-length <n>        Length of digit substrings to count (integer ≥ 1; default 2)
  --distribution-ngram-json   Output n-gram distribution as JSON
- When --ngram-length is provided:
  - Parse digits, algorithm, and ngram-length from flags
  - Invoke countPiNgrams with the parsed options
  - Print the JSON string of the returned count object to stdout and exit
  - On invalid values (non-integer or <1), print descriptive error and exit non-zero
- Update CLI help text to document the new flags and defaults

## Dependencies

- No new external dependencies; use built-in string handling and object utilities

## Testing

- Unit Tests in tests/unit/main.test.js:
  - Mock calculatePi to return a fixed sequence (e.g., "1231234") for a small digit count
  - Verify countPiNgrams returns correct counts for substrings of specified length
  - Test invalid ngramLength values produce thrown descriptive errors
- CLI Tests in tests/e2e/cli.test.js:
  - Invoke CLI with --digits 7 --algorithm machin --ngram-length 2 --distribution-ngram-json and assert correct JSON output
  - Test missing or invalid ngram-length flags result in descriptive errors and non-zero exit codesfeatures/PI_ASCII_DISTRIBUTION.md
# features/PI_ASCII_DISTRIBUTION.md
# PI ASCII Distribution Feature

## Overview
Provide a lightweight, text-based bar chart of digit frequencies in the computed value of π directly in the console. This feature complements the existing PNG distribution chart by offering an immediate, dependency-free visualization in any terminal or CI environment.

## Functional Requirements

- Add function visualizePiDigitsText(options) in src/lib/main.js
  - options.digits: positive integer (minimum 1, default 1000)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.width: positive integer specifying maximum bar width in characters (minimum 10, default 50)
- Compute π using calculatePi with the specified digits and algorithm
- Remove the decimal point and count occurrences of each digit 0 through 9
- Determine the maximum frequency among digits to scale bar lengths
- For each digit from 0 to 9, construct a console line:
  - `<digit> | <bar> <count>`
  - Bar is a repeated character (e.g., `#`) proportional to frequency relative to max, scaled to options.width
- Return a single string consisting of 10 lines separated by newlines

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --ascii-distribution (boolean) to activate ASCII chart output
  --ascii-width <n> to set the maximum bar width
- When --ascii-distribution is provided:
  - Parse digits, algorithm, ascii-width from flags
  - Invoke visualizePiDigitsText with parsed options and print the returned string to stdout
  - Exit after printing
- Update CLI help output to document the new flags and defaults

## Dependencies

- No new external dependencies required; use built-in string operations

## Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return a known digit sequence for a small digit count
  - Verify visualizePiDigitsText returns correctly formatted lines, bar lengths, and counts
  - Test scaling behavior with varying width settings
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 20 --algorithm machin --ascii-distribution and assert the output contains 10 lines with expected counts and proportional bars
  - Test invalid ascii-width values (zero or non-integer) result in descriptive errorsfeatures/PI_EXPORT.md
# features/PI_EXPORT.md
# PI Export Feature

## Overview
Provide users the ability to save the computed value of π directly to a file, with optional gzip compression support for large outputs. This facilitates further analysis or sharing, and ensures efficient storage when handling very large digit lengths.

## Functional Requirements

- Enhance the existing exportPi(options) function in src/lib/main.js:
  - options.digits: positive integer specifying the number of fractional decimal places (minimum 1, default 100).
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin).
  - options.output: string path to the output file (required).
  - options.compress: boolean indicating whether to gzip-compress the output (default false).
- Compute piValue by calling calculatePi(options.digits, options.algorithm).
- Format the output string: a decimal string with exactly options.digits fractional digits (truncate extras).
- If options.compress is true or the output filename ends with .gz:
  - Use zlib.promises.gzip to compress the UTF-8 string.
  - Write the resulting Buffer to the specified file; otherwise write the plain string.
- Perform atomic file writes using fs/promises:
  - Write to a temporary file in the same directory.
  - Rename the temporary file to the target path to avoid partial writes.
- Validate inputs with descriptive errors: digits ≥ 1, supported algorithm, output path provided, and correct boolean for compress.

## CLI Interface

- Extend the CLI in src/lib/main.js to accept new flags:
  --export <path>         Path to the output file
  --gzip                  Enable gzip compression (alias for --compress)
  --compress              Enable gzip compression
- Behavior:
  - When --export is provided, parse digits, algorithm, export path, and compress flags.
  - Determine compression by the presence of compress flag or a .gz extension on the export path.
  - Invoke exportPi with the parsed options.
  - On success, print a confirmation message indicating file path and compression status, then exit with code 0.
  - On error, print a descriptive error to stderr and exit with a non-zero code.
- Update CLI help output to document the new flags and defaults.

## Dependencies

- Use built-in zlib module (import { gzip } from 'zlib').
- Use built-in fs/promises; no new external dependencies required.

## Testing

- Unit Tests in tests/unit/main.test.js:
  - Mock fs/promises and zlib.promises.gzip:
    - Verify that invoking exportPi with compress=false writes the plain file content.
    - Verify that invoking exportPi with compress=true or .gz extension calls gzip and writes compressed data.
  - Test validation error scenarios: missing output path, invalid digits, unsupported algorithm, invalid compress type.
- CLI Integration Tests in tests/e2e/cli.test.js:
  - Invoke CLI with --digits 10 --algorithm machin --export pi.txt --compress and assert:
    - pi.txt exists with plain content beginning with '3.1415926535...'.
  - Invoke CLI with --digits 10 --algorithm machin --export pi.txt.gz and assert:
    - pi.txt.gz exists and its first two bytes are 0x1f and 0x8b (gzip signature).
  - Test that missing output path or invalid gzip flag usage produces descriptive errors and non-zero exit codes.features/HTTP_CORS_SUPPORT.md
# features/HTTP_CORS_SUPPORT.md
# HTTP CORS Support Feature

## Overview
Enable Cross-Origin Resource Sharing (CORS) for the HTTP API server to permit web clients from other domains to access π endpoints securely.

## Functional Requirements
- Add "cors" package to dependencies in package.json.
- In startHttpServer in src/lib/main.js, import cors from 'cors'.
- Accept a new CLI flag --cors (boolean) to enable CORS middleware.
- Optionally accept --cors-origin <string> to set Access-Control-Allow-Origin header (default '*').
- When --cors is provided before starting the server, apply cors({ origin: corsOrigin }) as a global middleware before defining routes.
- Ensure that CORS headers Access-Control-Allow-Methods and Access-Control-Allow-Headers are set to allow common HTTP methods (GET, POST) and headers (Content-Type).
- Update CLI help output to document --cors and --cors-origin flags.

## Testing
- Unit Tests in tests/unit/http.test.js:
  - Start startHttpServer with CORS enabled and a custom origin, issue a request with an Origin header, and assert response includes Access-Control-Allow-Origin with expected value.
  - Test default origin when --cors without --cors-origin.
  - Verify no CORS headers when --cors is not provided.
- CLI E2E Tests in tests/e2e/http.test.js:
  - Spawn the server with --serve --cors --cors-origin http://example.com, send HTTP request with Origin header http://example.com, and assert header present.
  - Ensure preflight OPTIONS requests receive correct CORS response.
features/PROMETHEUS_METRICS.md
# features/PROMETHEUS_METRICS.md
# HTTP Prometheus Metrics Feature

## Overview

Enable the HTTP API server to expose operational metrics in Prometheus format. This feature provides a `/metrics` endpoint using the prom-client library and records request counters and duration histograms for key routes, allowing users to monitor performance and reliability.

## Functional Requirements

- Add dependency `prom-client` to package.json.
- In `startHttpServer` in `src/lib/main.js`, import prom-client:
  - const client = require('prom-client') or import * as client from 'prom-client'.
- Initialize a default registry: e.g., `const register = new client.Registry()`.
- Enable default metrics: `client.collectDefaultMetrics({ register })`.
- Define HTTP metrics:
  - A counter `http_requests_total` labeled by method and route.
  - A histogram `http_request_duration_seconds` labeled by method and route, with suitable buckets.
- Add middleware before routes:
  - On each request, start a timer: `const end = histogram.startTimer({ method: req.method, route: req.route ? req.route.path : req.path })`.
  - On response finish, call `end()` and increment `http_requests_total` with same labels.
- Register GET `/metrics` endpoint:
  - Respond with content type `register.contentType` (e.g., 'text/plain; version=0.0.4').
  - Return `await register.metrics()` in the response body.
- Ensure `/metrics` is mounted before the 404 fallback handler.

## Testing

- **Unit Tests** (`tests/unit/http.test.js`):
  - Mock an Express app and verify middleware invocation increments counters and records durations.
  - Start `startHttpServer({ port: 0 })` and perform a GET `/metrics` request:
    - Assert status `200`, `Content-Type` header matches Prometheus format.
    - Assert the body contains lines starting with `# HELP http_requests_total` and sample metrics entries.
- **Integration Tests** (`tests/e2e/http.test.js`):
  - Launch the HTTP server on an ephemeral port.
  - Issue a sequence of API requests (e.g., GET `/pi`), then GET `/metrics`:
    - Verify that `http_requests_total{method="GET",route="/pi"}` and `http_request_duration_seconds` are present and non-zero.
  - Confirm that metrics update correctly after each request.features/PI_STATISTICAL_TESTS.md
# features/PI_STATISTICAL_TESTS.md
# PI Statistical Tests Feature

## Overview

Enable users to perform a suite of statistical randomness tests on the computed digits of π. This feature helps assess the uniformity and independence of digit sequences through established test methods.

## Functional Requirements

- Add function testPiRandomness(options) in src/lib/main.js
  - options.digits: positive integer specifying total digits (including integer part; minimum 1; default 1000)
  - options.algorithm: one of machin, gauss-legendre, or chudnovsky (default machin)
  - options.tests: array of strings indicating which tests to run (supported values chi-squared, runs, serial-correlation; default all)
  - options.pValueThreshold: number between 0 and 1 (default 0.05)
- Compute π as a continuous digit string by calling calculatePi
- For each requested test:
  - Chi-squared frequency test: count occurrences of digits 0–9, compute chi-squared statistic against uniform expected frequency, compute p-value using chi-square distribution
  - Runs test: map digits to above or below the median digit value, count runs, compute test statistic and p-value using normal approximation
  - Serial correlation test: compute correlation coefficient between each digit and its successor, compute test statistic and p-value
- Assemble results into an object mapping each test name to an object containing statistic, pValue, and pass (boolean indicating pValue >= pValueThreshold)
- Return the assembled results object

## CLI Interface

- Update src/lib/main.js to accept flags:
  --randomness-tests <list>   Comma separated list of tests (chi-squared,runs,serial-correlation)
  --randomness-output <format>  Output format text or json (default text)
  --randomness-pvalue <n>     P-value threshold for pass criteria (0 < n < 1; default 0.05)
- When --randomness-tests is provided:
  - Parse digits, algorithm, randomness-tests, randomness-output, and randomness-pvalue
  - Invoke testPiRandomness with parsed options
  - If randomness-output is json, print JSON string of results to stdout
  - Otherwise, print each test name, statistic, pValue, and pass status in human-readable lines
  - Exit with status code 0 on success, non-zero on invalid inputs
- Update CLI help to document new randomness flags

## Dependencies

- No new external dependencies; use built-in Math functions and an approximate implementation for p-value calculations

## Testing

- Unit Tests in tests/unit/main.test.js:
  - Mock calculatePi to return fixed sequences with known properties and verify each test function computes correct statistic and pValue
  - Verify invalid test names or p-value thresholds produce descriptive errors
- CLI Integration Tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 20 --randomness-tests chi-squared,runs --randomness-output json and assert JSON contains expected keys and value types
  - Test text output format produces readable lines for each test
  - Test invalid flags or unsupported test names yield descriptive errors and non-zero exit codefeatures/SCRIPT_MODE.md
# features/SCRIPT_MODE.md
# Overview

Provide a scripting mode that loads a JSON or YAML script defining a sequence of commands to execute, allowing batch operations of π calculations, exports, benchmarks, and visualizations in a single invocation.

# Functional Requirements

- In src/lib/main.js, add support for a new `--script <path>` flag. When provided, the CLI enters scripting mode and ignores standalone flags.
- Read the file at the given path using fs/promises. Detect JSON or YAML based on file extension and parse using `JSON.parse` or `js-yaml`.
- Define a script schema: an object with a top-level `commands` array. Each entry is an object:
  - `command`: string, one of `pi`, `export`, `convergence`, `distribution`, `benchmark`, `search`
  - `options`: object with fields matching existing CLI flags for the command.
- Validate the script structure and each command entry. Reject unrecognized commands or missing `commands` array with a descriptive error.
- Iterate through `commands` sequentially. For each entry:
  - Dispatch to the corresponding library function: 
    - `pi` → `calculatePi` and print to stdout
    - `export` → `exportPi` and write to file
    - `convergence` → `visualizePiConvergence` and write PNG
    - `distribution` → `visualizePiDigits` and write PNG
    - `benchmark` → `benchmarkPi` and output CSV or chart
    - `search` → `searchPi` and print JSON
  - Pass the `options` object directly as function arguments.
- On any command error, abort execution, print error message to stderr, and exit with a non-zero code.

# CLI Interface

- `--script <path>`: Path to a JSON or YAML script file defining batch commands.
- Example usage:
  node src/lib/main.js --script jobs.yaml

# Dependencies

- Add `js-yaml` to `package.json` if not already present.
- Import `fs/promises` and `js-yaml` in `src/lib/main.js`.
- No additional new dependencies.

# Testing

- Unit tests in `tests/unit/main.test.js`:
  - Mock `fs/promises` to supply sample JSON and YAML scripts, verify parsing and command dispatch.
  - Test invalid script file path or invalid schema triggers descriptive errors.
- CLI tests in `tests/e2e/cli.test.js`:
  - Create a temporary YAML script file with a mix of `pi`, `distribution`, and `export` commands. Invoke CLI with `--script` and assert expected stdout and files created.
  - Test unsupported command name leads to exit code non-zero and error message.features/PI_CONVERGENCE.md
# features/PI_CONVERGENCE.md
# PI Convergence Visualization Feature

## Overview

This feature generates a line chart in PNG format illustrating how the approximation error of π decreases as computation precision increases. It helps users visualize convergence behavior of different algorithms.

## Functional Requirements

- Add function visualizePiConvergence(options) in src/lib/main.js
  - options.digits: positive integer for the maximum number of decimal places (minimum 10, default 1000)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.iterations: positive integer number of sample points (minimum 2, default 10)
  - options.output: string path to the PNG output file (required)
- Compute finalPi by calling calculatePi(options.digits, options.algorithm)
- For each sample index i from 1 to options.iterations:
  - Compute sampleDigits = floor(options.digits * i / options.iterations)
  - Compute approx = calculatePi(sampleDigits, options.algorithm)
  - Compute error = absolute value of approx minus finalPi converted to a numeric or scientific string
- Build a QuickChart configuration for a line chart with:
  - labels: array of sampleDigits values
  - data: corresponding error values
  - chart title indicating algorithm and maximum digits
- Use QuickChart to render the chart and save the PNG file to options.output
- Validate inputs: digits ≥ 10, iterations ≥ 2, digits ≥ iterations, algorithm must be one of the supported values, output path must be provided

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --digits <n>
  --algorithm <machin|gauss-legendre|chudnovsky>
  --convergence-iterations <n>
  --convergence-output <file.png>
- When --convergence-output is provided, invoke visualizePiConvergence with parsed flags and exit after writing the PNG file
- Update CLI help output to document the convergence flags and defaults

## Dependencies

- Add quickchart-js to package.json dependencies
- Import QuickChart from quickchart-js in src/lib/main.js

## Testing

- Add unit tests in tests/unit/main.test.js to mock QuickChart:
  - Verify chart configuration matches sample labels and error data for a small precision range
  - Confirm file writing behavior writes a PNG to the specified path
- Add CLI tests in tests/e2e/cli.test.js to invoke the CLI with convergence flags and assert that the PNG file is created and contains expected chart data
features/PI_CALCULATION.md
# features/PI_CALCULATION.md
# PI Calculation Feature

## Overview
This feature provides arbitrary precision computation of π using Decimal.js with support for three algorithms: Machin, Gauss-Legendre, and Chudnovsky. It delivers accurate results to a specified number of decimal places and allows users to choose the most appropriate algorithm for performance or precision needs.

## Functional Requirements

- Export function `calculatePi(digits, algorithm)` in `src/lib/main.js`:
  - `digits`: positive integer between 1 and 1e6 (default 100).
  - `algorithm`: string, one of `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`).
  - Validate inputs and throw descriptive errors on invalid values.
  - Configure Decimal with precision = `digits + 5` and rounding mode ROUND_DOWN.
  - Implement Machin series as existing, using nested arctan series expansion.
  - Implement Gauss-Legendre algorithm as existing.
  - Implement Chudnovsky algorithm:
    - Compute constant C = 426880 × sqrt(10005).
    - Initialize sum = 0.
    - For k from 0 until the term drops below 1e-(digits+2):
      - Calculate numerator = factorial(6k) × (545140134k + 13591409).
      - Calculate denominator = factorial(3k) × (factorial(k)³) × (640320^(3k)).
      - Compute term = numerator / denominator and accumulate in sum.
    - Compute π = C / sum.
  - Return a Decimal instance representing π.

## CLI Interface

- Extend `main` in `src/lib/main.js` to accept flags:
  - `--digits <n>`
  - `--algorithm <machin|gauss-legendre|chudnovsky>`
  - `--threads <n>` (for parallel fallback)
  - `--help`
- Parse and validate flags, then:
  - If `threads > 1`, call `calculatePiParallel`, else call `calculatePi`.
  - Print result using `toFixed(digits, Decimal.ROUND_DOWN)`.
  - Exit with status code 0 on success, non-zero on errors.
- Update help output to list `chudnovsky` as supported algorithm.

## Dependencies

- Require `decimal.js`; no new dependencies needed.

## Testing

- Unit tests in `tests/unit/main.test.js`:
  - Verify `calculatePi(5, 'chudnovsky')` returns `3.14159`.
  - Verify `calculatePi(10, 'chudnovsky')` returns `3.1415926535`.
  - Confirm that `calculatePi` for all three algorithms matches known prefixes.
  - Test invalid algorithm values including `chudnovskyx` to throw errors.
- CLI tests in `tests/e2e/cli.test.js`:
  - Invoke CLI with `--digits 10 --algorithm chudnovsky` and assert stdout matches expected prefix.
  - Confirm that `--algorithm unknown` exits with error status and descriptive message.features/PI_DIGIT_DISTRIBUTION.md
# features/PI_DIGIT_DISTRIBUTION.md
# PI Digit Distribution Visualization Feature

## Overview
Provide a function visualizePiDigits in src/lib/main.js that generates a bar chart of digit frequencies in the computed value of π as a PNG image using QuickChart. This visualization helps users understand the distribution of numeric digits in π for any desired precision.

## Functional Requirements

- Implement function visualizePiDigits(options) in src/lib/main.js:
  - options.digits: positive integer, default 1000
  - options.algorithm: machin, gauss-legendre, or chudnovsky, default machin
  - options.output: string path to the PNG output file (required)
- Compute π using calculatePi with the specified digits and algorithm
- Remove the decimal point from the π string and count occurrences of each digit from 0 through 9
- Construct a QuickChart configuration for a bar chart:
  - labels: strings "0" through "9"
  - data: corresponding frequency counts
  - chart title indicating digits and algorithm
- Use QuickChart from quickchart-js to render the chart and save the PNG file to options.output
- Validate inputs: digits ≥ 1, algorithm supported, output path provided and writable

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --digits <n>
  --algorithm <machin|gauss-legendre|chudnovsky>
  --chart-output <file.png>
- When --chart-output is provided:
  - Parse digits, algorithm, and chart-output path
  - Invoke visualizePiDigits with parsed options
  - On success, print a confirmation message and exit
  - On error, print descriptive error and exit with non-zero code
- Update CLI help output to document the new chart flags and defaults

## Dependencies

- Ensure quickchart-js is listed in package.json dependencies
- Import QuickChart from quickchart-js in src/lib/main.js

## Testing

- Unit tests in tests/unit/main.test.js:
  - Mock QuickChart to verify the configuration matches expected labels and data for a small digit set
  - Stub fs/promises to confirm file writing to the specified output path
- CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 10 --algorithm machin --chart-output dist.png and assert:
    - Exit status is zero
    - A file named dist.png exists
    - The file begins with the PNG signature (bytes 89 50 4E 47 0D 0A 1A 0A)
  - Invoke the CLI with --digits 20 --algorithm chudnovsky --chart-output sample.png and verify similar PNG file properties
  - Test invalid chart-output scenarios (missing extension or unwritable directory) produce a descriptive error and non-zero exit codefeatures/SVG_CHART_OUTPUT.md
# features/SVG_CHART_OUTPUT.md
# SVG Chart Output Feature

## Overview

Enable the CLI chart commands and programmatic chart functions to emit vector-based SVG files in addition to PNG. SVG outputs provide scalable, high-fidelity graphics suitable for embedding in documents or web pages.

## Functional Requirements

- Update chart-rendering functions in `src/lib/main.js` (visualizePiDigits, visualizePiConvergence, compareAlgorithms, and any benchmark chart output logic):
  - Accept a new option `format` with allowed values `png` and `svg` (default `png`).
  - Infer format automatically from output file extension: `.svg` implies `svg`, otherwise default to `png` or overridden by `format` option.
  - When `format` is `svg`:
    - Configure QuickChart to render SVG (e.g., use `chart.getSvg()` or `QuickChart.getUrl({format:'svg'})` and fetch the SVG content).
    - Write the SVG string to the specified output file path without binary encoding.
  - When `format` is `png`, retain existing PNG behavior.

## CLI Interface

- Introduce a `--format <png|svg>` flag on all chart-related CLI commands:
  - `--chart-output <file>` (existing) and now optionally `--format svg`.
  - Example: `node src/lib/main.js --digits 1000 --chart-output dist.svg --format svg`.
- CLI parsing should validate the `format` flag, default to `png` if omitted, and ensure the output file extension matches the requested format.
- Print descriptive errors and exit non-zero if format is invalid or mismatched with file extension.

## Dependencies

- No new npm dependencies required. QuickChart-js supports SVG rendering out of the box.

## Testing

- Unit Tests (`tests/unit/main.test.js`):
  - Mock QuickChart to return a simple SVG string when format is `svg` and verify that `visualizePiDigits` and other chart functions write the expected SVG content to disk.
  - Test format inference from `.svg` extension without explicit `format` flag.
  - Confirm invalid `format` values are rejected with descriptive errors.

- CLI E2E Tests (`tests/e2e/cli.test.js`):
  - Invoke the CLI with `--chart-output sample.svg --format svg` and assert:
    - Exit code is zero.
    - `sample.svg` exists and its contents start with `<svg`.
  - Verify that specifying `--format png` with a `.svg` extension produces an error.
  - Confirm PNG outputs remain unchanged when `--format png` or default behavior is used.features/PI_JSON_OUTPUT.md
# features/PI_JSON_OUTPUT.md
# PI JSON Output Feature

## Overview

Enable machine-readable JSON output for π calculations in the CLI to simplify integration with other tools and scripts.

## Functional Requirements

- Update the CLI parser in src/lib/main.js to accept a new boolean flag --json.
- When --json is provided and not in HTTP serve or script mode:
  - After computing π (via calculatePi or calculatePiParallel), construct an object with a single key pi and the computed string value.
  - Print JSON.stringify({ pi: piString }) to stdout followed by a newline.
  - Exit with status code 0 on success.
- When --json is not provided, retain existing behavior of printing the plain π string.
- If --json is combined with --serve, print a descriptive error to stderr and exit with non-zero code.

## CLI Interface

- New flag:
  --json           Output π as JSON with key pi instead of plain text
- Usage examples:
  node src/lib/main.js --digits 10 --json
  node src/lib/main.js --digits 5 --algorithm chudnovsky --json

## Implementation Details

- In the main function of src/lib/main.js, extend the flag parsing loop to detect --json and set a boolean.
- After computing or awaiting the π value, check the json flag:
  - If true, serialize the result as JSON and print to stdout.
  - Otherwise, print using console.log(piString).
- Ensure process.exit codes: 0 on success, non-zero on validation or incompatible flag usage.

## Testing

### Unit Tests (tests/unit/main.test.js)

- Add tests to simulate calling the main logic with --digits 4 --json and verify stdout is exactly {"pi":"3.1415"}\n and exit code 0.
- Verify normal output remains unchanged when --json is absent.
- Test that combining --json with --serve produces an error and exit code non-zero.

### CLI Integration Tests (tests/e2e/cli.test.js)

- Spawn the CLI with --digits 3 --json and assert stdout matches JSON with key pi and correct value, and exit code 0.
- Confirm that node src/lib/main.js --serve --json exits with an error and descriptive message.features/HTTP_DIGIT_SEARCH.md
# features/HTTP_DIGIT_SEARCH.md
# HTTP Digit Search Feature

## Overview

Add a REST endpoint to search for numeric substrings within π digits via the HTTP API. This enables clients to locate patterns in π without downloading or processing the entire digit sequence.

## Endpoint: GET /search

- Query parameters:
  - pattern (string, required): one or more numeric characters to find in π digits.
  - digits (integer, optional): total number of digits to compute (including integer part; minimum 1; default 1001 to represent 1 integer digit + 1000 fractional digits).
  - algorithm (string, optional): one of machin, gauss-legendre, or chudnovsky (default machin).
  - all (boolean, optional): if true, return all match positions; if false or omitted, return only the first occurrence.
- Validation:
  - pattern must consist solely of digits and length ≤ digits.
  - digits must be an integer ≥ 1 and ≤ 1e6.
  - algorithm must be one of the supported values.
  - all, if provided, must parse to a boolean.
- Behavior:
  - On valid request, call existing searchPi(pattern, {digits, algorithm, all}).
  - If all=false, respond 200 with JSON { position: <number or null> }.
  - If all=true, respond 200 with JSON { positions: [<number>] }.
  - On invalid input, respond 400 with JSON { error: <message> }.
- Response headers:
  - Content-Type: application/json

## Implementation in src/lib/main.js

- Register a new route:
  app.get("/search", async (req, res) => { ... })
- Extract and parse req.query parameters.
- Perform validation and return 400 on failure.
- Invoke searchPi and send its result via res.json.

## Testing

- Unit tests in tests/unit/http.test.js:
  - Mock searchPi to return known values; test valid and invalid patterns and parameters.
  - Confirm 400 responses on invalid pattern, digits, or algorithm.
- CLI E2E tests in tests/e2e/http.test.js:
  - Start server on ephemeral port.
  - Issue GET /search?pattern=314&digits=10; expect { position: 1 } and status 200.
  - Issue GET /search?pattern=14&digits=10&all=true; expect { positions: [2, ...] }.
  - Test missing or invalid params yield 400 and descriptive error.features/PI_STREAMING.md
# features/PI_STREAMING.md
# PI Streaming Feature

## Overview
Add a Server-Sent Events (SSE) endpoint to stream π digits in real time, enabling clients to receive an ongoing sequence of digits as they are computed. Supports algorithm choice, digit limit, and graceful termination.

## HTTP Streaming Endpoint
- Extend startHttpServer to register GET /pi/stream
- Accept query parameters:
  - digits (integer, default 1000)
  - algorithm (machin, gauss-legendre, chudnovsky, default machin)
- Set response headers:
  - Content-Type: text/event-stream
  - Cache-Control: no-cache
  - Connection: keep-alive
- Initiate SSE by sending an initial comment or event
- Compute π iteratively in chunks (e.g. blocks of 100 digits) using calculatePi or a streaming variant
- After computing each chunk, send an SSE message containing the next block of digits
- On completion or client disconnect, send event: end and close connection
- On error, send event: error with descriptive message and close

## CLI Interface
- Introduce --stream flag in src/lib/main.js
- Flags:
  - --digits <n>
  - --algorithm <name>
  - --stream (boolean)
  - --port <n> for HTTP server
- When --stream is provided, start HTTP server and enable /pi/stream endpoint. Do not exit immediately

## Dependencies
- Use built-in express import; no new dependencies required
- Leverage AbortController to handle client disconnects and cancel computation if supported

## Testing
- Add integration tests in tests/unit/main.test.js or tests/e2e/http.test.js
  - Start server on ephemeral port
  - Issue HTTP GET to /pi/stream?digits=100&algorithm=machin
  - Read SSE events and accumulate data until end event
  - Assert sequence of SSE lines matches expected digit chunks
  - Test error handling for invalid parameters and abrupt client disconnectfeatures/PI_CACHE.md
# features/PI_CACHE.md
# PI Cache Feature

## Overview

Introduce persistent caching of π computation results to dramatically speed up repeated calculations for identical digit and algorithm combinations. Cache entries are stored in a local JSON file with safe, atomic writes and file locking to prevent corruption under concurrent access.

## Functional Requirements

- Extend `calculatePi` in `src/lib/main.js` to accept two optional parameters:
  - `useCache` (boolean, default false)
  - `cacheFile` (string, default ".pi_cache.json")
- When `useCache` is true:
  - Acquire a shared lock on `cacheFile` using `proper-lockfile`.
  - Read and parse the JSON cache file, or initialize an empty object if missing.
  - Generate a key of the form `<algorithm>|<digits>`.
  - If the key exists, return a `Decimal` instance from the cached string without recomputing.
  - If the key is absent:
    - Release the shared lock.
    - Compute π normally.
    - Acquire an exclusive lock on `cacheFile`.
    - Reload the cache file to merge concurrent updates.
    - Insert the new entry keyed by `<algorithm>|<digits>` with the string value of π.
    - Atomically write the updated JSON to a temporary file and rename to `cacheFile`.
    - Release the lock and return the computed `Decimal`.
  - Ensure locks are always released even on errors.

## CLI Interface

- In `src/lib/main.js`, extend the CLI parser to accept flags:
  - `--use-cache` (boolean) to enable caching
  - `--cache-file <path>` to specify a custom cache file
- When `--use-cache` is provided, pass `useCache=true` and `cacheFile` to `calculatePi` or `calculatePiParallel`.
- Display a log message when a cached result is served or when a new entry is cached.
- Update the help output to document the new flags and defaults.

## Dependencies

- Add `proper-lockfile` to `package.json` dependencies.
- Import `lockfile` from `proper-lockfile` and `fs/promises` in `src/lib/main.js`.

## Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Mock file system and `proper-lockfile` to simulate cache hits and misses.
  - Verify that `calculatePi` returns cached values when present and avoids computation.
  - Confirm that on cache miss, the new result is written to the cache file atomically.
  - Test error scenarios: corrupted cache file, lock acquisition failure.
- **CLI Tests** in `tests/e2e/cli.test.js`:
  - Invoke the CLI with `--digits 10 --algorithm machin --use-cache` and assert that a cache file is created.
  - Re-run with the same flags and assert that the output is served from cache (e.g., by observing a log message).features/PI_DIGIT_EXTRACTION.md
# features/PI_DIGIT_EXTRACTION.md
# PI Digit Extraction Feature

## Overview
Add the ability to extract a specific block of hexadecimal digits of π at an arbitrary position using the Bailey–Borwein–Plouffe BBP algorithm without computing all preceding digits. This enables random access to π digits for analysis or verification tasks.

## Functional Requirements
- Function extractPiHex(position, count) in src/lib/main.js
  - position: non-negative integer specifying the zero-based index of the first hexadecimal digit to extract (minimum 0)
  - count: positive integer number of hex digits to return (default 1)
  - Compute digits using the BBP series formula in base 16
  - Return a lowercase hexadecimal string without prefix
- Validate inputs: position ≥ 0, count ≥ 1

## CLI Interface
- Extend src/lib/main.js to accept flags
  --extract-position <n>
  --extract-count <n>
- When --extract-position is provided, invoke extractPiHex with parsed flags and print the hex string to stdout
- Update CLI help output to document the extraction flags and defaults

## Dependencies
- No new external dependencies; implement BBP formula using built-in BigInt and numeric operations

## Testing
- Add unit tests in tests/unit/main.test.js to verify extractPiHex:
  - extractPiHex(0, 4) returns 243f
  - extractPiHex(1, 3) returns 43f
- Test validation rejects negative position and count less than 1
- Add CLI tests in tests/e2e/cli.test.js to invoke the CLI with extraction flags and assert correct stdout outputfeatures/PERFORMANCE_BENCHMARK.md
# features/PERFORMANCE_BENCHMARK.md
# Performance Benchmark Feature

## Overview
Introduce benchmarking capabilities for Pi calculation across a range of digit lengths. Users can measure execution time of different algorithms and generate CSV reports or PNG visualizations of performance metrics.

## Functional Requirements

- Add a `benchmarkPi(options)` function in `src/lib/main.js`:
  - `options.minDigits` (integer): starting digit count (minimum 1, default 100).
  - `options.maxDigits` (integer): ending digit count (required, ≥ minDigits).
  - `options.step` (integer): increment step between digit counts (default equals minDigits).
  - `options.algorithm` (string): `machin` or `gauss-legendre` (default `machin`).
  - Return an array of objects `{ digits, timeMs }` for each run.

- In CLI (`src/lib/main.js`):
  - Support `--benchmark` flag to activate benchmarking mode.
  - Accept flags: `--min-digits <n>`, `--max-digits <n>`, `--step <n>`, `--algorithm <machin|gauss-legendre>`.
  - Output modes:
    - `--output-csv`: print CSV lines `digits,timeMs` to stdout.
    - `--output-chart <file.png>`: generate and save a PNG chart of performance using QuickChart.
  - Validate inputs and exit with error on invalid ranges.

## CLI Interface

- Example: `node src/lib/main.js --benchmark --min-digits 100 --max-digits 1000 --step 100 --algorithm gauss-legendre --output-csv`
- Example: `node src/lib/main.js --benchmark --max-digits 500 --step 100 --output-chart performance.png`

## Dependencies

- Add `quickchart-js` to `package.json` dependencies.
- Import `QuickChart` to generate charts when `--output-chart` is provided.

## Testing

- Unit tests in `tests/unit/main.test.js`:
  - Verify `benchmarkPi` returns correct array length and structure based on inputs.
  - Test CSV output format for a small range.
  - Mock `QuickChart` to assert chart URL creation and file writing logic for `--output-chart`.
features/HTTP_RATE_LIMITING.md
# features/HTTP_RATE_LIMITING.md
# HTTP Rate Limiting Feature

## Overview
Implement request rate limiting for the HTTP API server to protect against abuse and ensure fair usage. This feature applies rate-limiting middleware to all endpoints and provides configurable limits via CLI flags.

## Functional Requirements
- Add dependency "express-rate-limit" to package.json.
- In src/lib/main.js, import rateLimit from 'express-rate-limit'.
- Accept new CLI flags:
  --rate-limit         Enable rate limiting middleware (boolean; default false).
  --rate-limit-window <ms>    Time window in milliseconds for rate limiting (integer ≥ 1000; default 60000).
  --rate-limit-max <n>        Maximum number of requests per window (integer ≥ 1; default 60).
- When --rate-limit is provided:
  - Before registering routes in startHttpServer, apply rateLimit({ windowMs, max, message }) as a global middleware.
  - Default response on limit exceeded: HTTP 429 with JSON { error: 'Too many requests, please try again later.' }.
- Validate CLI inputs and exit with a descriptive error for invalid values.

## CLI Interface
- Flags:
  --rate-limit
  --rate-limit-window <ms>
  --rate-limit-max <n>
- Example:
  node src/lib/main.js --serve --port 3000 --rate-limit --rate-limit-window 60000 --rate-limit-max 100

## Dependencies
- Add "express-rate-limit" to dependencies in package.json.

## Testing
- Unit tests in tests/unit/http.test.js:
  - Mock express app and verify rateLimit middleware is applied when enabled.
  - Test invalid flag values produce descriptive errors and exit non-zero.
- CLI e2e tests in tests/e2e/http.test.js:
  - Start server with rate limiting enabled and a low max (e.g., max=2) and issue 3 rapid requests to any endpoint, asserting the third responds with 429 and correct JSON error.
  - Confirm normal behavior when --rate-limit is not provided or when under the limit.features/CLI_SCHEMA_VALIDATION.md
# features/CLI_SCHEMA_VALIDATION.md
# CLI Schema Validation Feature

## Overview

Leverage zod to define and enforce a unified schema for all CLI flags, replacing manual argument parsing with structured validation. This ensures robust error messages, consistent default handling, and easier maintenance as the set of flags grows.

## Functional Requirements

- In `src/lib/main.js`:
  - Import zod: `import { z } from 'zod'`.
  - Define a Zod schema `CliOptionsSchema` describing all supported flags:
    - digits: coerce.number().int().min(1).max(1e6).default(100)
    - algorithm: z.enum(["machin","gauss-legendre","chudnovsky"]).default("machin")
    - threads: coerce.number().int().min(1).default(1)
    - serve: z.boolean().optional().default(false)
    - port: coerce.number().int().min(0).default(3000)
    - help: z.boolean().optional().default(false)
    - timeout: coerce.number().int().min(1).optional()
    - Any additional flags (e.g. script, export, json) included as needed.
  - Before command dispatch, parse `inputArgs` against `CliOptionsSchema` using `schema.parse()` or `safeParse()`.
  - On parse success, destructure an `options` object; on failure, catch `ZodError`, print human-readable error messages to stderr, and exit with code 1.
  - Use the validated `options` to control program flow (compute π, start server, etc.) without further manual checks.

## CLI Interface

- All existing flags (`--digits`, `--algorithm`, `--threads`, `--serve`, `--port`, `--help`, etc.) are defined in the schema with constraints.
- Invalid values automatically produce descriptive Zod validation errors.
- Example:
  node src/lib/main.js --digits abc
  // Error: digits must be a number, received string 'abc'.

## Implementation Details

- Replace the manual `for` loop that shifts through `inputArgs` with a one-time `schema.parse()` call.
- Use zod coercion helpers (`z.coerce.number()`) to convert numeric strings to numbers.
- Leverage default values in the schema so no additional merging logic is required.
- Maintain backward compatibility by matching existing default values and flag names.

## Testing

- **Unit Tests** (`tests/unit/main.test.js`):
  - Test that providing valid flags yields the expected `options` object when parsing.
  - Simulate invalid flags (e.g., `--digits 0`, `--algorithm invalid`) and assert that `schema.parse()` throws with clear Zod errors.
- **CLI Integration Tests** (`tests/e2e/cli.test.js`):
  - Run the CLI with valid and invalid flags, check exit codes and error messages.
  - Confirm that behavior matches current semantics for successful commands.features/PUBLIC_API_EXPORTS.md
# features/PUBLIC_API_EXPORTS.md
# Public API Exports

## Overview
Expose all core library functions directly from the main module, enabling programmatic use of pi operations without CLI or HTTP server boundaries. This change turns the package into a fully featured API library for integration in custom scripts and applications.

## Functional Requirements
- In `src/lib/main.js`, after existing exports, add named exports for each utility function:
  - `calculatePi`
  - `calculatePiParallel`
  - `startHttpServer`
  - `countPiNgrams`
  - `visualizePiDigits`
  - `visualizePiDigitsText`
  - `visualizePiConvergence`
  - `visualizePiConvergenceText`
  - `exportPi`
  - `searchPi`
  - `extractPiHex`
  - `extractPiDecimal`
  - `benchmarkPi`
  - `compareAlgorithms`
  - `estimatePiMonteCarlo`
  - `computePiContinuedFraction`
  - `countPiDigitsJson`
  - `generateHtmlReport`
- Ensure each function is imported or defined in the module and then re-exported by name.

## Documentation Updates
- In `README.md`, under "Features", add a section titled "Programmatic API" listing each exported function with a one-line description.
- Provide example usage demonstrating named imports and basic calls:
  import { calculatePi, searchPi, exportPi } from '@xn-intenton-z2a/repository0-crucible';

## Testing
- Add unit tests in `tests/unit/main.test.js` that import each function:
  - Call `searchPi` on a known input and verify output structure.
  - Call `countPiNgrams` with stubbed `calculatePi` to confirm correct mapping.
  - Import `exportPi` and mock `fs/promises` to verify file writing behavior.
- Ensure tests cover both success and error scenarios for each exported function.features/ALGORITHM_COMPARISON.md
# features/ALGORITHM_COMPARISON.md
# Algorithm Comparison Feature

## Overview
Enable direct visual comparison of convergence error across multiple π calculation algorithms by generating a combined line chart in PNG format.

## Functional Requirements
- Add function compareAlgorithms(options) in src/lib/main.js
  - options.digits: positive integer for maximum decimal places (minimum 10, default 1000)
  - options.algorithms: list of algorithm names; available values machin, gauss-legendre, chudnovsky; at least two required
  - options.iterations: positive integer number of sample points (minimum 2, default 10)
  - options.output: string path to the PNG output file (required)
- Compute final π for each algorithm using calculatePi(options.digits, algorithm)
- For each sample index i from 1 to options.iterations:
  - Calculate sampleDigits = floor(options.digits * i / options.iterations)
  - For each algorithm, compute approx = calculatePi(sampleDigits, algorithm)
  - Compute error = absolute value of approx minus the final π for that algorithm
- Build a QuickChart configuration for a multi-line chart:
  - labels: array of sampleDigits values
  - datasets: one series per algorithm with label set to algorithm name and data set to the corresponding error values
- Use QuickChart to render the chart and save the PNG file to options.output
- Validate inputs: digits ≥ 10, iterations ≥ 2, iterations ≤ digits, at least two algorithms, algorithms supported, output path provided

## CLI Interface
- Extend src/lib/main.js to accept flags:
  --compare-algorithms <alg1,alg2,...> to specify algorithms
  --compare-iterations <n> to set sample points
  --compare-output <file.png> to set output path
  --digits <n> to set maximum digits
- When --compare-algorithms is provided:
  - Parse algorithms list, digits, compare-iterations, compare-output from flags
  - Invoke compareAlgorithms with parsed options and exit after writing the PNG file
- Update CLI help output to document new compare flags and defaults

## Dependencies
- Add quickchart-js to package.json if not already present
- Import QuickChart from quickchart-js in src/lib/main.js

## Testing
- Unit tests in tests/unit/main.test.js:
  - Mock QuickChart to verify chart configuration includes correct labels and multiple datasets for each algorithm
  - Test input validation rejects unsupported algorithm names, insufficient algorithms, or invalid numeric values
- CLI tests in tests/e2e/cli.test.js:
  - Invoke CLI with --compare-algorithms machin,gauss-legendre --digits 20 --compare-iterations 5 --compare-output compare.png and assert PNG file is created and contains expected chart datafeatures/REPL_MODE.md
# features/REPL_MODE.md
# Overview

Provide an interactive Read–Eval–Print Loop (REPL) mode for the CLI tool, allowing users to enter Pi commands and options at a prompt rather than via one-off flags. This empowers exploratory workflows and quick experimentation without restarting the process for each command.

# Functional Requirements

- In `src/lib/main.js`, add support for a `--repl` flag. When provided:
  - Ignore standalone flags and enter interactive mode.
  - Initialize a readline interface with a prompt string, e.g., `π> `.
  - Support the following commands with arguments separated by spaces:
    - `help`: Display available commands and usage examples.
    - `pi [digits] [algorithm]`: Compute π to `digits` places using the specified `algorithm` (defaults: 100, machin).
    - `export <path> [digits] [algorithm] [format] [base]`: Invoke `exportPi` to write π to a file.
    - `convergence <output> [digits] [algorithm] [iterations]`: Invoke `visualizePiConvergence`.
    - `distribution <output> [digits] [algorithm]`: Invoke `visualizePiDigits`.
    - `benchmark <min> <max> <step> [algorithm] [mode]`: Invoke `benchmarkPi`, where `mode` is `csv` or `chart`.
    - `search <pattern> [digits] [algorithm] [--all]`: Invoke `searchPi`.
    - `extractHex <position> <count>`: Invoke `extractPiHex`.
    - `extractDecimal <position> <count> [algorithm]`: Invoke `extractPiDecimal`.
    - `exit` or `quit`: Exit the REPL session.
  - Parse and validate arguments for each command; print descriptive errors on invalid input.
  - Dispatch each command to the existing library functions and print or save results accordingly.
  - Continue prompting after each command until `exit` or `quit`.
  - Handle `SIGINT` (Ctrl+C) by asking for confirmation to exit or clearing the current input line.

# CLI Interface

- Add `--repl` flag to the CLI parser in `src/lib/main.js`.
- Update the help output to document `--repl` and note that other flags are ignored when in REPL mode.

# Dependencies

- Use Node's built-in `readline` module; no new external dependencies required.

# Testing

- Add unit tests in `tests/unit/main.test.js` or a new `tests/unit/repl.test.js`:
  - Mock the `readline` interface to supply a sequence of commands and verify correct function calls and outputs.
  - Test error handling for unknown commands and invalid arguments.
  - Simulate `SIGINT` to confirm graceful handling.
- Add CLI tests in `tests/e2e/cli.test.js`:
  - Spawn the CLI with `--repl`, feed commands via stdin, and assert expected stdout lines and file creation when using export or chart commands.
  - Ensure `exit` or `quit` closes the process with exit code 0.
features/PI_DECIMAL_EXTRACTION.md
# features/PI_DECIMAL_EXTRACTION.md
# PI Decimal Extraction Feature

# Overview
Add the ability to extract a block of decimal digits of π at an arbitrary position using the existing calculatePi function. This feature supports programmatic and CLI access to retrieve continuous digits without the hexadecimal limitation of the BBP algorithm.

# Functional Requirements
- Add function extractPiDecimal(position, count, algorithm) in src/lib/main.js
  - position: non-negative integer specifying the zero-based index into the continuous digit string of π (including the integer part and fractional digits)
  - count: positive integer number of decimal digits to return
  - algorithm: machin or gauss-legendre (default machin)
- Validate inputs: position >= 0, count >= 1, algorithm must be supported
- Internally compute digitsNeeded = position + count
- Call calculatePi(digitsNeeded, algorithm) to obtain a Decimal instance of π
- Convert the result to a plain string with fixed digitsNeeded decimal places, then remove the decimal point
- Return the substring of length count starting at index position

# CLI Interface
- Extend src/lib/main.js to accept flags
  --extract-decimal-position <n>
  --extract-decimal-count <n>
  --algorithm <machin|gauss-legendre>
- When --extract-decimal-position is provided:
  - Parse and validate position, count, and algorithm
  - Invoke extractPiDecimal and print the resulting digits string to stdout
  - Exit with code zero on success or non-zero on invalid inputs
- Update CLI help output to document the new flags and defaults

# Dependencies
- No new dependencies required; reuse Decimal.js and the existing calculatePi function

# Testing
- Add unit tests in tests/unit/main.test.js:
  - extractPiDecimal(0, 5) returns the first five digits including the integer part and fractional part as continuous string
  - extractPiDecimal(1, 4) returns the four digits immediately following the first digit
  - Validation rejects negative position or count less than 1
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --extract-decimal-position 0 --extract-decimal-count 4 and assert stdout matches expected prefix of π
  - Test invalid combinations exit with non-zero status and descriptive error messagesfeatures/PI_CONFIG.md
# features/PI_CONFIG.md
# PI Configuration Feature

## Overview
Provide users the ability to define default settings for the CLI and programmatic API through a configuration file. This streamlines repeated use by loading preferences for options such as digits, algorithm, caching, threading, and output instead of specifying flags each time.

## Functional Requirements

- Integrate cosmiconfig to search for configuration under the name repository0-crucible with the following file patterns:
  - .repository0-cruciblerc.json
  - .repository0-cruciblerc.yaml
  - .repository0-cruciblerc.js
  - repository0-crucible.config.js
- In the main entry point (src/lib/main.js) before parsing CLI flags, load configuration:
  - If --config-file is provided, load that file directly
  - Otherwise use cosmiconfig default search paths starting at the current working directory and falling back to the user home directory
- Merge loaded configuration with CLI arguments:
  - Configuration values provide defaults for flags: digits, algorithm, useCache, cacheFile, threads, progress, serve, port, chartOutput, benchmark, minDigits, maxDigits, step, outputCsv, outputChart, diagnostics
  - CLI flags take precedence over configuration values
- Validate the merged settings using the existing zod schema in the CLI router

## CLI Interface

- New flag --config-file <path> to specify a custom configuration file path
- Document available configuration keys and default search locations in CLI help output

## Dependencies

- Add cosmiconfig to package.json dependencies
- Import cosmiconfig in src/lib/main.js to perform configuration file discovery and loading

## Testing

- Unit tests in tests/unit/main.test.js should mock cosmiconfig to simulate:
  1. Configuration file found and loaded correctly
  2. Configuration keys mapping to merged settings
  3. CLI flags overriding configuration values
- CLI tests in tests/e2e/cli.test.js should:
  1. Create temporary configuration file with specific defaults
  2. Invoke node src/lib/main.js without flags and assert defaults are applied from config
  3. Invoke with flags that override configuration and assert CLI values take effectfeatures/CLI_PROGRESS.md
# features/CLI_PROGRESS.md
# CLI Progress Bar Feature

# Overview
Add a live console progress bar to long-running π computations and benchmarking operations to keep users informed of progress and estimated completion.

# Functional Requirements

- Extend `calculatePi` and `benchmarkPi` functions to accept a `progress` boolean option.
- When `progress` is true:
  - For `calculatePi`, display a progress bar reflecting the percentage of algorithm iterations completed.
  - For `benchmarkPi`, display a progress bar showing progress through digit steps and total runs.
  - Ensure the progress bar starts before heavy computation, updates at regular intervals, and stops cleanly on completion or error.
- Do not display progress when `progress` is false or unspecified.

# CLI Interface

- Add a `--progress` flag to the CLI in `src/lib/main.js`.
- Example: `node src/lib/main.js --digits 1000 --algorithm machin --progress`
- Example: `node src/lib/main.js --benchmark --min-digits 100 --max-digits 500 --step 100 --progress`

# Dependencies

- Add `cli-progress` to `package.json` dependencies.

# Testing

- Mock the console output in unit tests to verify the progress bar is initialized, updated, and terminated without errors when `progress` is enabled.
- Ensure `calculatePi` and `benchmarkPi` still produce correct results when `progress` is true or false.
features/DIAGNOSTICS.md
# features/DIAGNOSTICS.md
# DIAGNOSTICS Feature

## Overview
Capture detailed runtime diagnostics for pi computations, benchmarking, chart generation, and HTTP operations. Provide insights into execution time, memory usage, and event-loop utilization to help users and developers analyze performance characteristics of the tool.

## Functional Requirements
- Integrate Node.js perf_hooks and process APIs to measure key metrics:
  - Record high-resolution start and end times for parsing inputs, core computation, and output phases.
  - Capture memoryUsage metrics (heapUsed, heapTotal, rss) before and after main operations.
  - Use performance.eventLoopUtilization() to collect event-loop idle and active durations.
- Wrap library functions (calculatePi, benchmarkPi, visualizePiDigits, startHttpServer) when diagnostics is enabled:
  - Begin diagnostics before the core action and stop after completion or error.
  - Aggregate timing and memory metrics into a diagnostics report object.
- Format the diagnostics report as JSON and output it to stderr after the primary CLI output or HTTP response.

## CLI Interface
- Add a `--diagnostics` boolean flag to src/lib/main.js CLI router (zod schema).
- When `--diagnostics` is present:
  - Enable diagnostics collection for the invoked command path.
  - After the command completes, print a JSON diagnostics report to stderr containing:
    - totalTimeMs
    - parseTimeMs
    - computeTimeMs
    - outputTimeMs
    - memoryBefore and memoryAfter (heapUsed, heapTotal, rss)
    - eventLoopUtilization
- Example invocation:
  node src/lib/main.js --digits 1000 --algorithm chudnovsky --diagnostics

## Testing
- Unit tests in tests/unit/main.test.js:
  - Mock `perf_hooks.performance` and `process.memoryUsage` to simulate metrics.
  - Verify that `--diagnostics` triggers a JSON report on stderr with the expected fields.
  - Confirm no diagnostics output when the flag is absent.
- CLI integration tests:
  - Invoke the CLI with `--diagnostics` and sample flags, assert stderr JSON validity and presence of metric keys.

## Dependencies
- Use built-in Node.js modules (`perf_hooks`, `process`). No new external dependencies required.features/HTTP_API_ENHANCEMENT.md
# features/HTTP_API_ENHANCEMENT.md
# HTTP API Enhancement Feature

## Overview
Extend the existing HTTP server to support REST endpoints for digit distribution, convergence visualization, and performance benchmarking. Clients can retrieve PNG charts or JSON metrics directly via HTTP without writing local files.

## Endpoints

### GET /distribution
- Query parameters:
  - digits (integer, required): total number of π digits (including integer part), minimum 1, maximum 1e6.
  - algorithm (string, optional): machin, gauss-legendre, or chudnovsky; default machin.
  - format (string, optional): json or png; default json if not requesting an image endpoint.
- Behavior:
  - Compute π to the requested precision, count digit frequencies.
  - If format=json, respond with application/json and body { "0":count0, …, "9":count9 }.
  - If format=png (or path ends with .png), use QuickChart to render a bar chart and respond image/png.

### GET /convergence
- Query parameters:
  - digits (integer, required): maximum decimal places, minimum 10, maximum 1e6.
  - algorithm (string, optional): machin, gauss-legendre, or chudnovsky; default machin.
  - iterations (integer, optional): number of sample points, minimum 2, default 10.
  - format (string, optional): json or png; default json.
- Behavior:
  - Compute approximation error at sample precisions.
  - If format=json, return application/json with { labels:[...], errors:[...] }.
  - If png, render a line chart via QuickChart and respond image/png.

### GET /benchmark
- Query parameters:
  - minDigits (integer, required): starting digit count, minimum 1.
  - maxDigits (integer, required): ending digit count, must be ≥ minDigits.
  - step (integer, optional): step increment, minimum 1, default = minDigits.
  - algorithm (string, optional): machin or gauss-legendre; default machin.
  - chart (boolean, optional): if true, return a PNG chart; otherwise JSON.
- Behavior:
  - Run benchmarkPi to measure time for each digit count.
  - If chart=true, generate line chart via QuickChart and respond image/png.
  - Otherwise respond with application/json and array of { digits, timeMs }.

## Implementation
- In `src/lib/main.js`, import QuickChart from quickchart-js.
- Register new routes before the 404 handler in `startHttpServer`:
  - Use `express.json()` and `express.urlencoded()` for request parsing.
  - Validate query parameters; return 400 JSON { error: msg } on invalid.
  - Invoke existing library functions: `countPiDigitsJson`, `visualizePiConvergence`, and `benchmarkPi` or inline logic.
  - For PNG responses, call QuickChart to render to a Buffer and `res.type('image/png').send(buffer)`.
  - For JSON responses, use `res.json(...)`.

## Testing
- **Unit Tests** (`tests/unit/http.test.js`):
  - Mock QuickChart.render or QuickChart.getUrl and stub compute functions to test:
    - Valid and invalid parameters return correct status, headers, and body shape.
    - JSON endpoints return expected numeric data.
    - PNG endpoints return a Buffer starting with PNG signature.
- **E2E Tests** (`tests/e2e/http.test.js`):
  - Start server on ephemeral port.
  - Issue GET requests to `/distribution`, `/convergence`, and `/benchmark` with and without chart flag.
  - Assert JSON responses for metrics and image responses for charts.
  - Test error cases: invalid digits ranges or algorithms produce HTTP 400 and JSON error.

## Dependencies
- Add or confirm `quickchart-js` in `package.json` dependencies.
- No other new dependencies required.features/PI_ASCII_CONVERGENCE.md
# features/PI_ASCII_CONVERGENCE.md
# PI ASCII Convergence Feature

## Overview
Provide a lightweight, text-based line chart of the convergence error of π approximations directly in the console. This complements the PNG convergence chart by offering an immediate, dependency-free visualization in any terminal or CI environment.

## Functional Requirements

- Add function visualizePiConvergenceText(options) in src/lib/main.js
  - options.digits: positive integer (minimum 10, default 1000)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.iterations: positive integer number of sample points (minimum 2, default 10)
  - options.width: positive integer specifying maximum chart width in characters (minimum 10, default 50)
- Compute convergence data by calculating π samples at increasing precision and measuring absolute error relative to final π
- Scale error values to the maximum error to determine line height positions in characters
- Construct an ASCII chart with rows representing normalized error thresholds and columns for each sample point, using a character (e.g., `*`) to mark error values
- Return a multiline string representing the chart, including axis labels or annotations for clarity

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --ascii-convergence (boolean) to activate ASCII convergence chart
  --ascii-convergence-width <n> to set maximum chart width
- When --ascii-convergence is provided:
  - Parse digits, algorithm, iterations, and ascii-convergence-width from flags
  - Invoke visualizePiConvergenceText with parsed options and print the returned string to stdout
  - Exit after printing
- Update CLI help output to document the new flags and defaults

## Dependencies

- No new external dependencies; use built-in string and console operations

## Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return known approximations and error values for small digits and iterations
  - Verify visualizePiConvergenceText returns correctly formatted ASCII chart lines with expected markers and scaling
  - Test varying width settings and minimal inputs
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke CLI with --digits 20 --algorithm machin --iterations 5 --ascii-convergence and assert output contains expected number of lines and markers
  - Test invalid ascii-convergence-width values result in descriptive errorsfeatures/MONTE_CARLO_ESTIMATION.md
# features/MONTE_CARLO_ESTIMATION.md
# Overview

Provide a statistical approximation of π using the Monte Carlo method by sampling random points inside the unit square and estimating the ratio that falls within the unit circle.

# Functional Requirements

- Implement function estimatePiMonteCarlo(options) in src/lib/main.js
  - options.samples: positive integer number of random points to sample (minimum 1, default 1000000)
- For each sample generate random x and y between 0 and 1 using Math.random
- Count how many points satisfy x² + y² ≤ 1
- Compute estimate = 4 × (count inside circle) / samples
- Return the estimate as a number

# CLI Interface

- Add flag --monte-carlo-samples <n> to src/lib/main.js
- When --monte-carlo-samples is provided:
  - Parse samples, validate integer ≥ 1
  - Invoke estimatePiMonteCarlo and print the estimate to stdout with default number formatting
  - Exit after printing the estimate

# Dependencies

- No new external dependencies required; use built-in Math.random

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Stub Math.random to produce a known sequence and verify estimate for small sample counts
  - Test default sample count behavior and validation of invalid sample values
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --monte-carlo-samples 100 and stub random to check printed estimate
  - Test invalid sample flag exits with descriptive errorfeatures/HEALTH_CHECK.md
# features/HEALTH_CHECK.md
# Health Check Feature

## Overview
Provide a lightweight readiness and liveness endpoint for the HTTP API server to support monitoring and deployment probes. This endpoint allows clients and orchestration systems to verify that the service is running and healthy without invoking expensive π computations.

## Functional Requirements

- In `startHttpServer` within `src/lib/main.js`, register a new route GET `/health` before any other routes:
  - Respond with status code `200` and a JSON object:
    {
      "status": "ok",
      "uptime": <number>,
      "timestamp": "<ISO 8601 string>"
    }
  - `uptime` must be obtained from `process.uptime()` (in seconds, as a number).
  - `timestamp` must be `new Date().toISOString()`.
  - Set `Content-Type` header to `application/json`.

## Testing

- **Unit Tests** (`tests/unit/http.test.js`):
  - After starting the server on an ephemeral port, issue a GET request to `/health`:
    - Assert status `200`.
    - Assert `Content-Type` is `application/json`.
    - Assert response JSON has keys `status`, `uptime`, and `timestamp`.
    - Assert `status` is the string "ok".
    - Assert `uptime` is a non-negative number.
    - Assert `timestamp` is a valid ISO 8601 string.

- **Integration Tests** (`tests/e2e/http.test.js`):
  - Start the server with `--serve --port 0`, then GET `/health`:
    - Verify `200` and JSON structure as above.
    - Ensure unexpected routes (e.g., `/healthz`) still return `404` JSON error as before.

## Documentation Changes

- Update `README.md` under the **HTTP API** section to document the new `/health` endpoint.
- In `docs/HTTP_API.md`, add a **GET /health** section with description, response schema, and examples.
features/SWAGGER_UI.md
# features/SWAGGER_UI.md
# Swagger UI Documentation Feature

## Overview
Enable interactive API exploration by integrating Swagger UI and providing an OpenAPI specification for the existing HTTP endpoints. This empowers developers and integrators to discover, understand, and test the RESTful π operations directly in a browser without external tooling.

## Functional Requirements

- Add `swagger-ui-express` to `package.json` dependencies and install it.
- In `src/lib/main.js`, import `{ serve, setup }` from `swagger-ui-express` and construct an OpenAPI spec object:
  - `openapi` version `3.0.0`.
  - `info`: include `title`, `version` (read from `package.json`), and a brief `description` matching the mission.
  - `servers`: list one server with URL `http://localhost:{port}` and description `Local server`.
  - `paths`: document `/pi`, `/distribution`, `/convergence`, and `/benchmark`:
    - For each path, define `get` operation with `summary`, `description`, `parameters` (query parameters with names, types, required flags, descriptions, constraints), and `responses` for `200` and `400` or `500` status codes with media types.
- Mount the Swagger UI middleware in `startHttpServer` before the fallback handler:
  - Serve the raw OpenAPI JSON at `/docs.json` with `res.json(spec)`.
  - Serve the Swagger UI at `/docs`, using `app.use('/docs', serve, setup(spec))`.
- Ensure the generated documentation stays in sync with any changes to endpoint parameters by referencing the same validation logic or zod schemas where applicable.

## Dependencies

- `swagger-ui-express`: for serving the Swagger UI assets and middleware.

## Testing

- **Unit Tests**:
  - Request `GET /docs.json` and assert status `200`, `Content-Type: application/json`, and that the JSON has an `openapi` key and correct `paths` entries.
  - Mock `express` routes to verify that `serve` and `setup` are called with the spec.
- **Integration Tests**:
  - Start the server on an ephemeral port and issue `GET /docs`:
    - Assert status `200`, `Content-Type: text/html`.
    - Confirm the response body contains `Swagger UI` initialization script and references `/docs.json`.
features/PI_CONTINUED_FRACTION.md
# features/PI_CONTINUED_FRACTION.md
# Overview
Compute and output the continued fraction representation and rational convergents of π to support analysis of best rational approximations.

# Functional Requirements
- Implement function computePiContinuedFraction(options) in src/lib/main.js
  - options.digits: positive integer specifying decimal precision for π calculation (minimum 10, default 100)
  - options.depth: positive integer specifying number of continued fraction terms to generate (minimum 1, default 10)
  - options.maxDenominator: positive integer specifying maximum allowed denominator for convergent approximations (optional)
- Internally calculate π at the specified precision using calculatePi
- Derive the continued fraction terms by iterating: a₀ = floor(pi), x = pi - a₀, then for each term aᵢ = floor(1/x), x = 1/x - aᵢ
- Collect the sequence of terms up to the specified depth or until denominator exceeds maxDenominator
- For each term index, compute the convergent rational approximation p/q and include numerator and denominator
- Return an object containing:
  - terms: array of integers (continued fraction terms)
  - convergents: array of objects { index:n, numerator:p, denominator:q }

# CLI Interface
- Extend src/lib/main.js to accept flags:
  --cf-digits <n>            Decimal precision for π calculation (minimum 10)
  --cf-depth <n>             Number of continued fraction terms (minimum 1)
  --cf-max-denominator <n>   Maximum denominator for convergents
  --cf-json                  Emit output as a JSON object instead of plain text
- When any --cf flag is provided:
  - Parse and validate cf-digits, cf-depth, cf-max-denominator, and cf-json
  - Invoke computePiContinuedFraction with parsed options
  - If cf-json is set, print the returned object as JSON to stdout
  - Otherwise, print a readable summary:
    Continued fraction terms: [a0, a1, …]
    Convergent 1: p1/q1
    Convergent 2: p2/q2
    …
  - Exit with code zero on success or non-zero on validation errors

# Dependencies
- No new external dependencies required; use existing Decimal.js and built-in operations

# Testing
- Unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return a known value to test term extraction
  - Verify computePiContinuedFraction returns correct terms and convergents for small depth values
  - Test validation rejects invalid cf-digits, cf-depth, and cf-max-denominator
- CLI tests in tests/e2e/cli.test.js:
  - Invoke CLI with --cf-depth 4 --cf-digits 20 and assert output contains expected terms
  - Test --cf-json emits valid JSON with terms and convergents
  - Test invalid flag combinations exit with non-zero code and descriptive errorfeatures/PI_DISTRIBUTION_JSON.md
# features/PI_DISTRIBUTION_JSON.md
# PI Distribution JSON Feature

## Overview
Provide a machine-readable JSON representation of the frequency distribution of π digits for programmatic consumption and automated analysis.

## Functional Requirements

- Add function countPiDigitsJson(options) in src/lib/main.js
  - options.digits: positive integer (minimum 1, default 1000)
  - options.algorithm: "machin", "gauss-legendre", or "chudnovsky" (default "machin")
- Compute π using calculatePi with the specified digits and algorithm
- Remove the decimal point and count occurrences of each digit from "0" through "9"
- Return a plain object mapping each digit string to its integer count

## CLI Interface

- Extend src/lib/main.js to accept a flag:
  --distribution-json (boolean) to activate JSON output of digit counts
- When --distribution-json is provided:
  - Parse digits and algorithm from flags
  - Invoke countPiDigitsJson with parsed options
  - Print the JSON-formatted count object to stdout
  - Exit after printing
- Update CLI help output to document the new flag and its defaults

## Dependencies

- No new external dependencies required; use built-in string and object operations

## Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return a known digit sequence for a small count
  - Verify countPiDigitsJson returns the correct count object
  - Test validation of invalid digits and unsupported algorithms
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 20 --algorithm machin --distribution-json
  - Assert output is valid JSON with keys "0" through "9" and correct counts
  - Test invalid flags yield descriptive errors and non-zero exit codesfeatures/PI_WORKER_THREADS.md
# features/PI_WORKER_THREADS.md
# Overview
Add support for parallelizing π computation using Node.js worker_threads. Distribute series term computations across multiple threads to improve performance on large digit counts.

# Functional Requirements
- Extend calculatePi to accept an optional parameter threads (integer ≥1, default 1).
- When threads >1:
  - Partition the series iteration range among the specified number of worker threads.
  - Spawn a Worker for each partition using the worker_threads module and pass algorithm, digits, start, and end indices.
  - Each Worker computes its partial sum and posts the result back to the main thread.
  - The main thread aggregates partial sums and finalizes π computation according to the chosen algorithm.
- Provide an async function calculatePiParallel(digits, algorithm, threads) returning a Decimal instance representing π.
- Validate threads parameter to be a positive integer not exceeding the number of logical CPU cores.

# CLI Interface
- Add flag --threads <n> to src/lib/main.js.
- When specified, invoke calculatePiParallel with the threads parameter; otherwise default to single-threaded calculatePi.
- Example invocation:
  node src/lib/main.js --digits 10000 --algorithm chudnovsky --threads 4
- On invalid thread values exit with code non-zero and descriptive error message.

# Dependencies
- Import worker_threads from 'worker_threads'.
- No new external npm dependencies required.

# Testing
- Add unit tests in tests/unit/main.test.js:
  - Verify calculatePiParallel(digits, algorithm, 1) matches calculatePi(digits, algorithm).
  - Test calculatePiParallel for threads=2 and threads=4 on small digit counts (e.g. digits=10) for each algorithm.
  - Mock Worker to simulate message passing and verify correct aggregation of partial sums.
- Add CLI tests to confirm --threads flag parsing and error handling for invalid thread counts.features/HTML_REPORT.md
# features/HTML_REPORT.md
# HTML Report Generation Feature

# Overview

Provide a single-file static HTML dashboard report that aggregates results from pi computations, visualizations, benchmarks, and searches. Users can generate an interactive HTML summary to review numeric outputs, PNG charts, and search or extraction results in one document.

# Functional Requirements

- Add function generateHtmlReport(options) in src/lib/main.js
  - options.script: path to a JSON or YAML script defining a sequence of commands (required)
  - options.output: path to the HTML output file (required)
  - options.inline: boolean indicating whether to embed PNG images as Base64 (default false)
- When invoked, parse the script file similar to script mode, collecting results for each command:
  - Numeric results (pi, search, extraction) as text
  - File paths of generated PNG charts and exported text files
  - CSV data for benchmarks
- Build an HTML document with sections for each command entry:
  - For numeric outputs, display a code block or paragraph
  - For PNG charts, include an image tag referencing the file or embed Base64 if inline
  - For CSV benchmark data, render a table
  - For exports, provide download links
- Write the assembled HTML string to the specified output file atomically

# CLI Interface

- Extend src/lib/main.js to accept flags:
  --script <path> to specify script file (JSON or YAML)
  --html-report <file.html> to specify report output path
  --inline-images to embed charts as Base64
- When --html-report is provided:
  - Parse --script, --inline-images, and --html-report
  - Invoke generateHtmlReport with parsed options and exit after writing HTML
- Update CLI help output to document new report flags

# Dependencies

- Use built-in fs and fs/promises for file operations
- Import js-yaml for script parsing (already present)
- Import ejs from ejs for templating the HTML layout (already present)

# Testing

- Add unit tests in tests/unit/main.test.js to mock script parsing and template rendering:
  - Supply a sample script with a few commands, stub command functions to return known results
  - Verify generateHtmlReport writes an HTML file containing expected sections
- Add CLI tests in tests/e2e/cli.test.js:
  - Create a temporary script file defining pi calculation and distribution commands
  - Invoke the CLI with --script and --html-report flags and assert the HTML file exists
  - Confirm the HTML contains numeric pi output and image tags or embedded data according to --inline-images
features/PI_DIGIT_SEARCH.md
# features/PI_DIGIT_SEARCH.md
# PI Digit Search Feature

## Overview
Add the ability to search for a numeric substring within the computed digits of π and retrieve its position or all occurrences. This feature enables users to find specific patterns in π digits without manual scanning.

## Functional Requirements

- Implement function `searchPi(pattern, options)` in `src/lib/main.js`:
  - `pattern`: string of one or more numeric characters to locate in π
  - `options.digits`: positive integer specifying the total number of digits to compute (minimum 1, default 1000)
  - `options.algorithm`: one of `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`)
  - `options.all`: boolean indicating whether to return all match positions (default `false`)
- Internally:
  - Compute π to `options.digits` using `calculatePi`
  - Convert the result to a continuous digit string by removing the decimal point
  - Validate `pattern` contains only digits and its length does not exceed `options.digits + 1` (including integer part)
  - Search the digit string for occurrences of `pattern`:
    - If `options.all` is false, return the 1-based index of the first match or `-1` if not found
    - If `options.all` is true, return an array of all 1-based match indices (empty array if none)
- Export `searchPi` so it can be used programmatically

## CLI Interface

- Extend `main` in `src/lib/main.js` to accept flags:
  - `--search <pattern>` to specify the digit substring to locate
  - `--digits <n>` to set how many π digits to compute
  - `--algorithm <machin|gauss-legendre|chudnovsky>` to choose the algorithm
  - `--all` to request all match positions
- When `--search` is provided:
  - Parse and validate `pattern`, `digits`, `algorithm`, and `all` flags
  - Invoke `searchPi({ pattern, digits, algorithm, all })`
  - Print JSON to stdout:
    - If `all` is false: `{ "position": <number|null> }`
    - If `all` is true: `{ "positions": [<numbers>] }`
  - Exit with code `0` on success or non-zero on validation errors

## Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Mock `calculatePi` to return a known digit string for a small digit count
  - Verify `searchPi('314', { digits: 10, algorithm: 'machin' })` returns correct index
  - Test with `all=true` returns an array of all match positions
  - Ensure invalid `pattern` (non-digits or too long) throws descriptive errors
- **CLI Integration Tests** in `tests/e2e/cli.test.js`:
  - Invoke the CLI with `--search 314 --digits 10` and assert stdout is JSON `{ "position": 1 }`
  - Invoke with `--search 14 --digits 10 --all` and assert JSON `{ "positions": [2,?] }`
  - Test invalid combinations produce non-zero exit codes and error messages