features/TIMEOUT_CONTROL.md
# features/TIMEOUT_CONTROL.md
# Overview

This feature adds execution timeouts to long-running π computations and related operations. Users can specify a maximum time limit for CLI commands and HTTP API endpoints to prevent unresponsive or runaway tasks. When the timeout is reached, the operation is aborted and an appropriate error is returned.

# CLI Interface

--timeout <seconds>
    Abort the π computation, digit extraction, or benchmark run if it exceeds the specified number of seconds. Accepts a positive integer or float. By default no timeout is applied.

# HTTP API

For endpoints that perform computation (/calculate, /digits, /benchmark, /stream):
  timeout: number (optional)
    Query parameter specifying the maximum number of seconds allowed for the operation. If exceeded, the server aborts the computation and responds with status code 503 and a JSON error message.

# Implementation

- In src/lib/main.js, parse the new --timeout flag for CLI commands and extract the timeout query parameter in HTTP handlers.
- Wrap each computational function (chudnovskyPi, bbpDigit loop for extraction, benchmarkPi, digit stream, etc.) in a Promise.race against a timeout promise:
    • Create a controller that rejects after timeout seconds with a custom TimeoutError.
    • When the timeout triggers, abort any in-progress computation (where supported) or ignore further callbacks.
- Ensure that for CLI:
    • On timeout, log an error message to stderr indicating the operation timed out, and exit with status code 2.
- For HTTP API:
    • Catch the TimeoutError in each route handler.
    • Respond with status code 503 Service Unavailable, Content-Type application/json, and a body { error: "Operation timed out after X seconds" }.
- No additional dependencies are required; rely on built-in setTimeout and Promise rejection.

# Testing

- Add unit tests in tests/unit/main.test.js:
    • Simulate a long-running mock chudnovskyPi and invoke main with --timeout 0.01; verify process exits with code 2 and stderr contains timeout message.
    • Test that without --timeout, the same mock completes normally.
    • For HTTP handlers, start the server on a random port and send GET /calculate?digits=...&timeout=0; verify 503 status and JSON error response.
    • Simulate a successful request with timeout greater than execution time and verify correct response.

# Documentation

- Update README.md under Features:
    • Document the --timeout flag and the timeout query parameter.
    • Show example CLI usage:
        node src/lib/main.js --calculate-pi 100000 --timeout 60
    • Show example HTTP usage:
        curl http://localhost:3000/calculate?digits=1000&timeout=5
features/RAMANUJAN_ALGORITHM.md
# features/RAMANUJAN_ALGORITHM.md
# Overview
This feature adds support for computing π using the Ramanujan series algorithm as an alternative to the existing Chudnovsky method. Users gain access to a second high-precision formula for π that demonstrates exploration of novel algorithms.

# CLI Interface
Add a new option to the calculate-pi command:
--algorithm <chudnovsky|ramanujan>
    Select the π algorithm to use for computation. Supported values are chudnovsky (default) or ramanujan.
The calculate-pi command behavior remains unchanged when using the default chudnovsky algorithm.

# HTTP API
Extend the GET /calculate endpoint:
  Query parameters:
    digits: number (required) - number of π digits to compute
    algorithm: chudnovsky|ramanujan (optional, default: chudnovsky)
    format: json|text (optional, default: json)
When algorithm=ramanujan, the server invokes the Ramanujan implementation instead of the Chudnovsky method. Responses follow the same format conventions as existing implementations.

# Implementation
- In src/lib/main.js:
  • Extend the CLI parser or argument handling logic to accept and validate the --algorithm flag for calculate-pi, defaulting to chudnovsky.
  • In the HTTP /calculate handler, extract the algorithm query parameter and dispatch to the corresponding function.
  • Implement a new async function ramanujanPi(digits: number): Promise<string> that:
      - Uses Decimal from decimal.js with precision set to digits plus guard digits.
      - Applies the Ramanujan series:
          1/pi = (2 * sqrt(2) / 9801) * Σ_{k=0..N} ( (factorial(4k) * (1103 + 26390*k)) / (factorial(k)^4 * 396^(4k)) )
      - Iterates until the term magnitude is below 10^(–digits - 1), sums terms, inverts to compute π, and returns the concatenated digit string excluding the decimal point.
      - Implements factorial using Decimal or BigInt loops.
  • Handle invalid digit values or algorithm names by returning errors: exit with status code 1 for CLI and status 400 for HTTP.

# Testing
- In tests/unit/main.test.js:
  • Add unit tests for ramanujanPi: verify known prefixes for ramanujanPi(1) and ramanujanPi(5).
  • Test CLI invocation: simulate main(["--calculate-pi", "5", "--algorithm", "ramanujan"]) and verify stdout contains correct digits and exit code 0.
  • Test HTTP API: start the server, send GET /calculate?digits=3&algorithm=ramanujan, and verify status 200, Content-Type application/json, and payload matches expected π prefix.
  • Verify invalid algorithm parameter (e.g., algorithm=unknown) yields exit code 1 in CLI and HTTP 400 with JSON error.

# Documentation
- Update README.md under Features:
  • Document the new --algorithm flag for calculate-pi and its supported values.
  • Provide example CLI usage:
      node src/lib/main.js --calculate-pi 1000 --algorithm ramanujan
  • Provide example HTTP usage:
      curl "http://localhost:3000/calculate?digits=500&algorithm=ramanujan&format=text"
features/PROGRESS_BAR.md
# features/PROGRESS_BAR.md
# Overview

This feature adds a dynamic progress bar to the CLI tool, providing real-time visual feedback on the percentage of π digits computed. It enhances user experience when calculating large digit counts by indicating computation progress.

# CLI Interface

--show-progress
    Enable a progress bar displaying completed digits versus target in the terminal.
--no-progress
    Disable progress bar (default when output is piped or redirected).

# Implementation

- Add a dependency on "cli-progress".
- In src/lib/main.js, when handling the --calculate-pi or --benchmark-pi flags, detect the --show-progress flag:
  • Initialize a cli-progress single bar instance with total equal to target digit count.
  • Pass a progress callback into the chudnovskyPi or benchmarkPi functions that reports computed digit or algorithm progress; update the bar on each callback invocation.
  • On completion or error, stop and clear the progress bar.
- Ensure that if stdout is not a TTY or --no-progress is specified, progress bar initialization is skipped.
- Maintain existing output behavior and exit codes.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock an algorithm function that invokes the progress callback in known increments.
  • Verify that enabling --show-progress produces progress updates to stdout matching expected percentages.
  • Verify that --no-progress or piped output suppresses progress bar output.

# Documentation

- Update README.md under Features to describe the --show-progress and --no-progress flags with example usage:

Example:

node src/lib/main.js --calculate-pi 10000 --show-progress
features/CONFIG_FILE.md
# features/CONFIG_FILE.md
# Overview

This feature enables users to load default command options from a project-level configuration file in YAML or JSON format. It simplifies repeated invocations by allowing users to specify common flags and settings in a single file, reducing CLI verbosity and improving workflow efficiency.

# CLI Interface

--config <path>
    Specify a custom path to a configuration file (YAML or JSON).

Configuration file search order (if --config is not provided):
  • ./pi-config.yaml
  • ./pi-config.yml
  • ./pi-config.json

Settings supported in the config file mirror all global CLI flags and command-specific options (e.g., calculate-pi, extract-digit, serve, threads, cache-dir). Any flags provided on the command line override settings from the file.

# Implementation

- Add a dependency on js-yaml (already present) and import fs and path in src/lib/main.js.
- At the start of the main(args) function:
  • Determine config file path from --config or by scanning the project root in the search order.
  • If a file is found, read its contents and parse using js-yaml if extension is .yaml/.yml or JSON otherwise.
  • Validate the parsed object against a Zod schema that mirrors supported CLI options and commands, providing clear errors on invalid types or values.
  • Merge the validated config object into the arguments list, ensuring that any flags explicitly passed in args take precedence.
- Proceed with existing CLI parsing and command dispatch logic, now seeded with defaults from the config file.
- Ensure no changes to existing commands or flags are omitted; this feature augments argument sourcing only.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Create a temporary YAML config file specifying a default calculate-pi setting and verify main(args) uses it when --calculate-pi is not on the CLI.
  • Verify that passing --calculate-pi on the command line overrides the same setting in the config file.
  • Test invalid config formats or types produce a descriptive error and nonzero exit code.
  • Test --config <path> loading of a JSON config file with mixed settings.

# Documentation

- Update README.md under Features:
  • Describe the --config flag and the default search order.
  • Show example config file contents alongside the equivalent CLI invocation.
  • Explain override behavior when both config and flags are used.features/RATE_LIMITING.md
# features/RATE_LIMITING.md
# Overview

This feature introduces a configurable rate limiting mechanism for the HTTP API server to prevent clients from making excessive requests. It enforces per-IP request quotas over a sliding time window, improving server reliability and guarding against abuse.

# CLI Interface

--rate-limit <number>
    Maximum allowed HTTP requests per client IP in each time window. Accepts a positive integer. Default is 100.

--rate-limit-window <seconds>
    Length of the time window in seconds for rate limit counting. Accepts a positive integer. Default is 60.

--no-rate-limit
    Disable rate limiting entirely, allowing unlimited requests.

# HTTP API

When the server is started with --serve and rate limiting is enabled:
  • Each incoming request is tracked by client IP.  
  • If a client exceeds the specified rate-limit within the configured window, the server responds with status code 429 Too Many Requests and a JSON body { error: "Rate limit exceeded: X requests per Y seconds" } where X and Y reflect configured values.
  • Rate limiting applies to all API endpoints (/calculate, /digits, /benchmark, /stream, /metrics, /algorithms).

# Implementation

- In src/lib/main.js:
  • Parse the --rate-limit, --rate-limit-window, and --no-rate-limit flags at startup.
  • When starting the HTTP server, if rate limiting is enabled, create an in-memory Map that tracks for each client IP: count of requests and timestamp of window start.
  • For each request:
    1. Determine client IP from request.socket.remoteAddress.
    2. If the window has expired for that IP, reset count and timestamp.
    3. Increment the request count.  
    4. If the count exceeds the configured limit, immediately respond with 429 and do not forward to handlers.
    5. Otherwise, pass the request to the existing route handlers.
  • Ensure that entries in the Map are cleaned up after the window expires to avoid memory growth.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock requests from the same IP and simulate multiple calls to the server handler within a single window; verify that after exceeding the limit the response status is 429 with the correct JSON error.
  • Simulate requests spaced beyond the rate-limit-window boundary and verify that counts reset and requests are accepted again.
  • Test that --no-rate-limit disables enforcement even after many requests.
  • Verify that other endpoints and functionality behave as expected when rate limiting is active and when disabled.

# Documentation

- Update README.md under Features to describe the new flags --rate-limit, --rate-limit-window, and --no-rate-limit.
- Provide example commands:
    node src/lib/main.js --serve --rate-limit 50 --rate-limit-window 30
    curl http://localhost:3000/calculate?digits=1000
- Explain the 429 response and how to adjust limits for production use.features/PROMETHEUS_METRICS.md
# features/PROMETHEUS_METRICS.md
# Overview
This feature adds a Prometheus-compatible metrics endpoint to the existing HTTP API server, exposing application and algorithm performance metrics in plain text format suitable for scraping by Prometheus or other monitoring systems.

# CLI Interface
When the server is started with --serve, a new endpoint GET /metrics is available:

GET /metrics  
  Returns current application metrics in Prometheus exposition format.

# Implementation
- Add a dependency on prom-client for metrics collection.
- In src/lib/main.js, import prom-client and create a Registry instance.
- Define and register metrics:
  • Counter calculation_requests_total with label algorithm for count of calculation requests.
  • Histogram calculation_duration_seconds recording latencies of pi computations.
  • Counter cache_hits_total and cache_misses_total for caching behavior.
  • Gauge active_requests for current in-flight requests.
- Instrument existing handlers (calculate, extract-digit, benchmark, list-algorithms, diagnostics) to update these metrics appropriately.
- In the HTTP server setup, add a route handler for GET /metrics:
  • Set response header Content-Type: text/plain; version=0.0.4; charset=utf-8
  • Write registry.metrics() output and end with status code 200.
- Ensure metrics endpoint does not trigger any computation logic and is accessible without query parameters.

# Testing
- Add unit tests in tests/unit/main.test.js:
  • Start the HTTP server with a random available port.
  • Invoke GET /metrics and verify status code 200 and Content-Type header.
  • Check that response body contains expected metric names (calculation_requests_total, calculation_duration_seconds).
  • Simulate a calculation request then request /metrics again and verify counter increments.
- Mock prom-client regulators if needed to avoid real registry state across tests.

# Documentation
- Update README.md under Features:
  • Document the /metrics endpoint and its purpose.
  • Provide example usage:  
    curl http://localhost:3000/metrics
  • Note dependency on prom-client and how to enable metrics in production environments.
features/VERBOSITY_CONTROL.md
# features/VERBOSITY_CONTROL.md
# Overview

This feature introduces configurable logging verbosity for both the CLI tool and the HTTP API server. Users can enable detailed debug output or suppress non-error messages to improve troubleshooting and reduce noise during operations.

# CLI Interface

--verbose
    Enable detailed logging, including debug and info messages.

--quiet
    Suppress all non-error output, showing only warnings and errors.

# Environment Variables

LOG_LEVEL
    Set default log level (debug, info, warn, error). CLI flags override this environment setting.

# Implementation

- Add dependency on yargs in the dependencies file to support parsing of verbosity flags.
- In src/lib/main.js:
  • Parse the --verbose and --quiet flags early in the argument parsing stage alongside LOG_LEVEL environment variable.
  • Define a logger utility with methods debug, info, warn, and error that filter messages based on the selected log level.
  • Replace direct console.log calls in command handlers and HTTP route logic with appropriate logger methods.
  • In HTTP server setup under --serve, log incoming requests and errors using logger.info and logger.error respecting verbosity settings.
- Ensure that --verbose sets the log level to debug, --quiet sets the log level to error, and in the absence of flags the LOG_LEVEL environment variable determines default behavior.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Simulate invocation of main with --verbose and capture output; verify that debug and info messages appear.
  • Simulate invocation with --quiet and capture output; verify that info messages are suppressed and only warnings/errors appear.
  • Test that setting LOG_LEVEL to warn results in the expected suppression of info messages, and that CLI flags override the environment variable.
  • Mock the logger utility to isolate and validate its filtering logic without executing full command handlers.

# Documentation

- Update README.md under Features:
  • Document the --verbose and --quiet flags, and the LOG_LEVEL environment variable.
  • Provide example commands showing verbose and quiet modes with sample output.
  • Explain how verbosity affects both CLI and HTTP API logging.features/CHUDNOVSKY_ALGORITHM.md
# features/CHUDNOVSKY_ALGORITHM.md
# Overview

Implement the high-performance Chudnovsky algorithm for π calculation using the binary splitting technique. This enhances speed and memory efficiency for large digit targets while preserving accuracy.

# CLI Interface

--calculate-pi <digits>
    Compute π to the specified number of digits using the binary splitting Chudnovsky algorithm. Digits must be a positive integer.
--output <path>
    Optional file path to write the computed digits; defaults to stdout.

# HTTP API

GET /calculate
    Query parameters:
      digits: number (required) - number of π digits to compute
      format: json|text (optional, default: json)
    Behavior:
      Invoke the binary splitting Chudnovsky computation and respond with:
        • application/json: { pi: string, digits: number } when format=json
        • text/plain: raw digit string when format=text

# Implementation

• Add dependency on decimal.js and import Decimal in src/lib/main.js.
• Implement recursive function binarySplitChudnovsky(a: number, b: number): { P: Decimal, Q: Decimal, T: Decimal } that computes Chudnovsky series segments by:
    1. Base case when b - a = 1: compute P, Q, T for term a.
    2. Recursive split at midpoint m = floor((a + b) / 2). Compute left = binarySplitChudnovsky(a, m), right = binarySplitChudnovsky(m, b).
    3. Combine:
         P = left.P.mul(right.P)
         Q = left.Q.mul(right.Q)
         T = right.Q.mul(left.T).add(left.P.mul(right.T))
• In chudnovskyPi(digits: number):
    1. Determine series length N = ceil(digits / 14.181647) + guard
    2. Call binarySplitChudnovsky(0, N) to get { P, Q, T }.
    3. Compute constant term: C = Decimal(426880).mul(Decimal(10005).sqrt()).
    4. π = C.mul(Q).div(T).toFixed(digits).
• Update CLI handler:
    – Parse and validate digits as positive integer.
    – Call chudnovskyPi and write or print the result.
    – Exit with code 0 on success, 1 on invalid input.
• Update HTTP /calculate handler:
    – Parse and validate query parameters.
    – Call chudnovskyPi and serialize response based on format.
    – Respond with 400 for invalid parameters and 500 for errors.

# Testing

• Add unit tests in tests/unit/main.test.js:
    – Verify chudnovskyPi(1) and chudnovskyPi(5) return known π prefixes.
    – Test invalid digit counts (zero, negative, noninteger) throw errors.
    – Compare result and performance of binary splitting against a small naive implementation for medium digit counts.
• Simulate CLI invocation:
    main(["--calculate-pi","5"]) and verify stdout and exit code.
• Simulate HTTP API:
    Start server, send GET /calculate?digits=3&format=text, verify status 200 and raw digits.

# Documentation

• Update README.md under Features:
    – Document the performance benefits and new binary splitting algorithm.
    – Provide example CLI usage:
        node src/lib/main.js --calculate-pi 10000 --output pi.txt
    – Provide example HTTP usage:
        curl "http://localhost:3000/calculate?digits=500&format=json"features/PI_CALCULATION.md
# features/PI_CALCULATION.md
# Overview

This feature provides a unified interface for π calculation by introducing two flags: --digits to specify the number of digits and --algorithm to select the computation method. The default algorithm is Chudnovsky. It replaces the older calculate-pi subcommand, simplifying the CLI and HTTP API surfaces.

# CLI Interface

--digits <number>
    Required positive integer specifying how many digits of π to compute.
--algorithm <chudnovsky|ramanujan>
    Select the π computation algorithm. Supported values are chudnovsky (default) and ramanujan.
--output <path>
    Optional file path to write the result. If omitted, output is written to stdout.

# HTTP API

GET /calculate
    Query parameters:
      digits: number (required) – number of π digits to compute
      algorithm: chudnovsky|ramanujan (optional, default: chudnovsky)
      format: json|text (optional, default: json)
    Responses:
      200 JSON: { pi: string, digits: number, algorithm: string } when format=json
      200 text/plain: raw digit string when format=text
      400 Bad Request: JSON { error: string } for invalid parameters
      500 Internal Server Error: JSON { error: string } for computation failures

# Implementation

- In src/lib/main.js, parse the --digits and --algorithm flags for CLI and extract the same parameters in the HTTP handler.
- Validate that digits is a positive integer and algorithm is one of the supported values; on invalid input, exit CLI with code 1 or respond HTTP 400.
- Default algorithm = chudnovsky. Dispatch:
    • chudnovskyPi(digits) for chudnovsky
    • ramanujanPi(digits) for ramanujan
- Ensure that chudnovskyPi and ramanujanPi are available and properly imported from their modules.
- For the CLI:
    • On success, write digits to stdout or output file and exit code 0.
    • On failure, write error to stderr and exit code 1.
- For HTTP:
    • On success, serialize response based on format and respond with status 200.
    • On validation error, respond with status 400 and JSON error message.
    • On internal error, respond with status 500 and JSON error message.

# Testing

- In tests/unit/main.test.js, add tests to:
    • Invoke main(["--digits","5"]) and verify stdout contains the first 5 digits of π and exit code 0.
    • Invoke main with invalid digits (zero, negative, noninteger) and expect exit code 1 and stderr error message.
    • Invoke main(["--digits","5","--algorithm","ramanujan"]) and verify output matches ramanujan algorithm prefix.
    • Start HTTP server on a random port and send GET /calculate?digits=3&algorithm=ramanujan&format=text; verify 200 status and correct payload.
    • Send GET /calculate?digits=abc and verify 400 status with JSON error.

# Documentation

- Update README.md under Features:
    • Document the new --digits and --algorithm flags and the HTTP /calculate endpoint.
    • Provide example CLI usage:
        node src/lib/main.js --digits 1000 --algorithm ramanujan
    • Provide example HTTP usage:
        curl "http://localhost:3000/calculate?digits=100&algorithm=chudnovsky&format=text"
features/GAUSS_LEGENDRE_ALGORITHM.md
# features/GAUSS_LEGENDRE_ALGORITHM.md
# Overview

This feature adds support for computing π using the Gauss–Legendre algorithm as an alternative high-precision iterative method. Users can select this algorithm to explore its convergence characteristics and compare performance against existing methods.

# CLI Interface

--algorithm <chudnovsky|ramanujan|gauss-legendre>
    Select the π computation algorithm. Supported values are chudnovsky (default), ramanujan, or gauss-legendre. When set to gauss-legendre, the tool uses the Gauss–Legendre method.

# HTTP API

Extend GET /calculate endpoint:
  Query parameter:
    algorithm: chudnovsky|ramanujan|gauss-legendre (optional, default: chudnovsky)
  When algorithm=gauss-legendre, invoke the new Gauss–Legendre implementation. Responses follow existing format conventions.

# Implementation

- In src/lib/main.js:
  • Import or define async function gaussLegendrePi(digits: number): Promise<string>:
    1. Configure Decimal precision to digits plus guard digits.
    2. Initialize Decimal variables:
       a = Decimal(1)
       b = Decimal(1).dividedBy(Decimal(2).sqrt())
       t = Decimal(1).dividedBy(4)
       p = Decimal(1)
    3. Loop until |a - b| < 10^(−digits):
       aNext = a.plus(b).dividedBy(2)
       bNext = a.times(b).sqrt()
       tNext = t.minus(p.times(a.minus(aNext).pow(2)))
       pNext = p.times(2)
       a, b, t, p = aNext, bNext, tNext, pNext
    4. Compute pi = (a.plus(b)).pow(2).dividedBy(t.times(4)).toFixed(digits)
    5. Return the digit string.

  • Extend CLI argument validation to accept gauss-legendre and dispatch to gaussLegendrePi.
  • In HTTP handler for /calculate, extract algorithm parameter and route to gaussLegendrePi when selected.
  • On invalid algorithm value, exit CLI with code 1 or respond HTTP 400 with JSON error.

# Testing

- In tests/unit/main.test.js:
  • Unit tests for gaussLegendrePi:
    - Verify known prefixes: gaussLegendrePi(1) starts with "3"; gaussLegendrePi(5) starts with "3.1415".
  • CLI tests:
    - Simulate main(["--calculate-pi","5","--algorithm","gauss-legendre"]) and assert stdout contains correct digits and exit code 0.
    - Test invalid algorithm yields exit code 1 and descriptive stderr.
  • HTTP tests:
    - Start server on random port and send GET /calculate?digits=5&algorithm=gauss-legendre&format=json. Verify 200 status and JSON { pi: "3.1415", digits: 5, algorithm: "gauss-legendre" }.
    - Send algorithm=unknown and verify HTTP 400 with JSON error.

# Documentation

- Update README.md under Features:
  • Add gauss-legendre to the list of supported algorithms for --algorithm flag and HTTP API.
  • Provide example CLI usage:
      node src/lib/main.js --calculate-pi 1000 --algorithm gauss-legendre
  • Provide example HTTP usage:
      curl "http://localhost:3000/calculate?digits=500&algorithm=gauss-legendre&format=text"features/DIGIT_RANGE_EXTRACTION.md
# features/DIGIT_RANGE_EXTRACTION.md
# Overview

This feature adds the ability to extract a contiguous range of π digits between two zero-based positions without computing all preceding digits by leveraging the existing BBP digit extraction formula.

# CLI Interface

--extract-range <start>-<end>
    Specify a zero-based inclusive range of digits to extract, for example 100-200.

--start <start> --end <end>
    Alternatively specify start and end positions separately.

--base <decimal|hex>
    Optional numeric base for extraction (default: hex).

--output <path>
    Optional file path to write the extracted digit sequence.

# HTTP API

GET /digits
    Query Parameters:
      start: number (required) - starting zero-based index.
      end: number (required) - ending zero-based index.
      base: decimal|hex (optional, default: hex).
    Returns JSON with fields:
      digits: string of extracted digits
      start: number
      end: number
      base: string

# Implementation

- Extend src/lib/main.js to detect --extract-range or --start and --end flags in the CLI parser.
- Validate that start and end are non-negative integers and end >= start; exit with an error on invalid input.
- For each index i from start to end inclusive, invoke the existing bbpDigit(i, base) function and append the result to a buffer.
- Write the final digit sequence to stdout or to the specified output file when --output is provided.
- In the HTTP server logic under --serve, add a route handler for GET /digits that:
  • Parses and validates query parameters.
  • Performs digit extraction as above.
  • Responds with status code 200, Content-Type application/json, and the JSON payload.
- Ensure descriptive error handling and nonzero exit codes for invalid CLI or HTTP inputs.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Invoke main with ["--extract-range","5-10"] and verify stdout contains the correct digit sequence.
  • Test --start 0 --end 0 extracts the first digit of π.
  • Verify invalid ranges (start > end, negative values, non-integer inputs) produce descriptive errors and nonzero exit codes.
  • Test --output writes the expected sequence to a temporary file.
  • Start the HTTP server with --serve and perform GET /digits?start=10&end=15; verify status code 200, application/json response, and payload fields.

# Documentation

- Update README.md under Features:
  • Document the --extract-range, --start, --end, --base, and --output flags with example usage.
  • Provide example CLI commands and expected output.
  • Document the GET /digits endpoint with example curl requests and sample JSON response.
features/PI_HTTP_API.md
# features/PI_HTTP_API.md
# Overview

Add an HTTP API server to expose π calculation and benchmarking endpoints.

# CLI Interface

--serve  
Start the HTTP API server on the specified port (default: 3000).

--port <number>  
Optional port number for the HTTP server.

# Implementation

- Extend src/lib/main.js to detect the --serve flag and start an HTTP server using the built-in http module.  
- Expose GET /calculate endpoint accepting digits and algorithm query parameters.  
- Expose GET /benchmark endpoint accepting digits and algorithms query parameters, returning performance metrics.  
- Support response formats JSON and CSV based on a format query parameter or Accept header.  
- Leverage existing calculate and benchmark functions for core logic.  
- Ensure proper error handling and graceful shutdown of the server.

# Testing

- Add unit tests in tests/unit/main.test.js to verify server startup and shutdown.  
- Use HTTP requests to test /calculate and /benchmark endpoints with valid and invalid parameters.  
- Verify response status codes, content types, and payload correctness.

# Documentation

- Update README.md to document the HTTP API endpoints with example curl commands.  
- Include notes on configuring port and format options.features/BENCHMARK_REPORT.md
# features/BENCHMARK_REPORT.md
# Overview

This feature extends the benchmark visualizer by generating a formatted report summarizing benchmark results and embedding performance charts. The report can be produced in markdown or HTML format to support easy sharing, archival, and integration into documentation.

# CLI Interface

--report-file <path>
    Specify a path to generate a benchmark report. Supported extensions are .md for markdown and .html for HTML. When provided, the tool generates the report after completing benchmark and chart creation.

# Implementation

- In src/lib/main.js, enhance the benchmarkPi handler to parse a report-file option from arguments.
- After collecting benchmark results and generating the performance chart, load an EJS template matching the report-file extension.
- The template includes sections for:
  • Title and timestamp of the benchmark run
  • A summary table listing algorithm names, digit counts, execution times, and memory usage
  • Embedded chart reference using markdown image syntax or an HTML img tag pointing to the chart-file path
  • A raw JSON appendix of full benchmark data
- Render the template with EJS and write the output to the specified report-file path.
- Validate that the extension is supported and that the output directory exists or can be created; exit with an error if validation fails.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock benchmark results and chart generation, invoke main with --benchmark-pi, --chart-file, and --report-file flags, and verify the report-file is created with expected sections and image references.
  • Test unsupported file extensions produce a descriptive error and nonzero exit code.
  • Verify that if chart-file is not provided, the report omits the image section gracefully.
  • Use temporary file paths to avoid side effects on the repository.

# Documentation

- Update README.md under Features to document the --report-file flag, supported extensions, and usage examples.
- Provide a sample command demonstrating report generation and include an excerpt from a generated markdown report.features/LIST_ALGORITHMS.md
# features/LIST_ALGORITHMS.md
# Overview

This feature adds the ability for users to discover all supported π calculation and extraction algorithms available in the CLI tool and HTTP API. It helps users understand which algorithms they can invoke and provides descriptions for each.

# CLI Interface

--list-algorithms
    Print a table or JSON list of all available algorithms and their descriptions to stdout.

# HTTP API

GET /algorithms
    Return a JSON array of objects, each with fields:
    - name: algorithm identifier string
    - description: brief human-readable description
    Support Accept: application/json; return JSON by default.

# Implementation

- Define a constant `ALGORITHMS` in src/lib/main.js as an array of `{ name, description }` entries for each supported algorithm (e.g., chudnovsky, bbp).
- Extend `main(args)` to detect the `--list-algorithms` flag:
  - If present, format and print the algorithm list to stdout (plain table or JSON based on an optional `--json` flag).
  - Do not perform any numeric calculation when this flag is used.
- In the HTTP server logic (triggered by `--serve`), add a new route handler for GET /algorithms:
  - Respond with the JSON representation of `ALGORITHMS`.
  - Set `Content-Type: application/json` and appropriate status codes.
- Update package.json scripts if needed (no changes required unless adding a shorthand).

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Verify that invoking `main(["--list-algorithms"])` writes all algorithm names and descriptions and exits cleanly.
  - Verify that `main(["--list-algorithms", "--json"])` outputs valid JSON array matching `ALGORITHMS`.
- Add HTTP integration tests:
  - Start the server with `--serve` and request GET /algorithms.
  - Verify status code 200, content-type application/json, and payload matches `ALGORITHMS`.

# Documentation

- Update README.md to include a new section under Features:
  - Describe the `--list-algorithms` flag and example usage.
  - Document the GET /algorithms endpoint with example curl commands.
features/PI_CACHE.md
# features/PI_CACHE.md
# Overview

This feature adds a persistent caching layer for π calculation and benchmarking results to avoid redundant computation and improve performance, and provides management tools for cache entries including time-to-live (TTL) expiration and manual cleanup.

# CLI Interface

--cache-dir <path>
    Specify directory to read and write cache files (default: ~/.pi_cache)
--no-cache
    Disable cache lookup and writing for this run
--cache-ttl <seconds>
    Maximum age in seconds for cache entries before they are considered stale and eligible for removal. Accepts a positive integer or float.
--clear-cache
    Remove cache entries older than the configured TTL. If no TTL is specified, this deletes all cache files in the cache directory. When this flag is provided, the tool performs cleanup and exits without performing π computations.

# Implementation

- In src/lib/main.js:
  • Parse the new --cache-ttl and --clear-cache flags alongside the existing --cache-dir and --no-cache flags.
  • If --clear-cache is present:
      1. Determine the cache directory path (apply defaults if --cache-dir not provided).
      2. Read all files in the cache directory. If the directory does not exist, report "Cache directory not found" and exit with code 0.
      3. For each file:
         - If --cache-ttl is provided, use fs.stat to get the file's mtime. If (now - mtime) >= cacheTTL seconds, delete the file.
         - If --cache-ttl is not provided, delete every file.
      4. After cleanup, log a summary: number of files scanned and number of files deleted, then exit with status code 0.
  • On normal execution (when --clear-cache is absent) and cache enabled:
      - Before computing π or benchmarks, check for existing cache files named by algorithm and digit count.
      - If found and not expired (file age < cacheTTL if TTL set), load and return its contents.
      - After successful computation, write or overwrite the cache file with the result and timestamp.
      - Honor --no-cache by skipping both reads and writes.
- No additional dependencies are required; use built-in fs and path modules and JavaScript timers.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Setup: create a temporary directory and multiple dummy cache files with controlled mtimes using fs.utimesSync.
  • Test --clear-cache only: run main with ["--clear-cache","--cache-dir",tempDir]; verify that all files are deleted and the exit code is 0.
  • Test --clear-cache with TTL: run main with ["--clear-cache","--cache-dir",tempDir,"--cache-ttl",5]; set one file's mtime more than 5 seconds in the past and another newer; verify only the old file is deleted.
  • Test no --clear-cache: verify cache read/write behavior remains as before, including TTL-based expiry when reading stale entries.
  • Test that --no-cache bypasses cleanup and no files are deleted.

# Documentation

- Update README.md under Features to describe the new --cache-ttl and --clear-cache flags with example usage:

Example:
  node src/lib/main.js --cache-dir ./cache --cache-ttl 3600 --clear-cache

- Explain that --clear-cache performs cleanup and exits, and that --cache-ttl controls entry expiration when both cleaning and normal cache lookups occur.
features/WEBSOCKET_STREAM.md
# features/WEBSOCKET_STREAM.md
# Overview
This feature adds a WebSocket endpoint for streaming π digits in real time alongside the existing HTTP API. Clients can connect to the WebSocket server to receive digit blocks or progress events as JSON messages, providing an event-driven interface for live computation feedback and alternative consumption patterns.

# CLI Interface
--serve
    Enables both HTTP and WebSocket servers when provided. No additional flag is required to activate WebSocket support.
--ws-path <path>
    Set the WebSocket route (default: "/ws").
--ws-port <number>
    Optional port for the WebSocket server; defaults to the HTTP server port when omitted.

# HTTP API
WebSocket Endpoint
    Connect to ws://<host>:<port><ws-path>?digits=<number>&algorithm=<chudnovsky|ramanujan>
    Query parameters:
      digits: number (required) – number of π digits to compute
      algorithm: chudnovsky|ramanujan (optional, default: chudnovsky)
    Messages sent as JSON strings with fields:
      type: "data" | "end" | "error"
      payload: for "data", a string of digit characters; for "error", an error description; "end" has no payload.

# Implementation
- Add dependency on "ws" in package.json and import WebSocketServer from "ws" in src/lib/main.js.
- Within the --serve logic, instantiate a WebSocketServer bound to the HTTP server or its own port based on --ws-port.
- On client connection:
    1. Parse and validate query parameters (digits and algorithm).
    2. Begin the chosen π computation as an async generator or emitter of digit blocks.
    3. On each block, send JSON.stringify({ type: "data", payload: block }) over the socket.
    4. Handle computation errors by sending { type: "error", payload: message } and closing the connection.
    5. Upon completion, send { type: "end" } and close the socket gracefully.

# Testing
- Add tests in tests/unit/main.test.js:
    • Start the server on a dynamic port with --serve.
    • Use a WebSocket client (from "ws" in test code) to connect to ws://localhost:<port>/ws?digits=10&algorithm=chudnovsky.
    • Collect and assert the sequence of JSON messages: multiple "data" messages whose concatenated payload equals the first 10 digits of π, followed by an "end" message.
    • Test invalid parameters (e.g., missing digits or unsupported algorithm) result in an immediate "error" message and connection closure.

# Documentation
- Update README.md under Features to document:
    • The new WebSocket endpoint including ws-path and ws-port flags.
    • Example server startup: node src/lib/main.js --serve --ws-path /digits --ws-port 8080.
    • Example client usage using native WebSocket or ws package.features/PI_DIGIT_STREAM.md
# features/PI_DIGIT_STREAM.md
# Overview
This feature streams π digits incrementally as they are computed, allowing clients to receive digit groups in real time without buffering the entire result in memory.

# CLI Interface
--calculate-pi <digits>  Compute π to the specified digit count and stream each block of digits to stdout as it is produced.
--stream                  Alias for --calculate-pi with streaming enabled.

# HTTP API
GET /stream
  Query Parameters:
    digits: number (required) - Number of digits to compute.
  Behavior:
    Responds with chunked transfer encoding, sending digit blocks as they become available.

# Implementation
- In src/lib/main.js, detect the --stream flag or the --calculate-pi flag when combined with --stream.
- Refactor the chudnovskyPi function to support an async iterable interface or EventEmitter that emits digit blocks at intervals.
- In the CLI handler, subscribe to the digit stream and write each chunk to stdout immediately, ensuring flushing between writes.
- In the HTTP server setup under --serve, add a route handler for GET /stream that:
  • Sets response headers Transfer-Encoding: chunked and Content-Type: text/plain
  • Listens to the digit stream, writing each chunk to the response as it arrives
  • Ends the response once the stream completes
- Use Node.js built-in stream and async iteration; no additional dependencies are required.

# Testing
- Add unit tests in tests/unit/main.test.js that:
  • Mock a chudnovskyPi implementation yielding known digit blocks
  • Verify CLI invocation with --stream writes each block to stdout in the correct order
  • Start the HTTP server and request GET /stream?digits=N; assert that response is chunked and contains all expected blocks
  • Simulate an error during streaming and verify the server responds with a 500 status and closes the connection gracefully

# Documentation
- Update README.md under Features to document the --stream flag and the /stream endpoint with example usage:
    node src/lib/main.js --calculate-pi 1000000 --stream
    curl http://localhost:3000/stream?digits=1000000features/CLI_PARSER.md
# features/CLI_PARSER.md
# Overview

Integrate a robust command-line interface using yargs for parsing arguments and Zod for structured validation. This feature unifies all core operations under named commands and options, ensures consistent error handling, and lays the foundation for both CLI and HTTP behaviors.

# Commands and Options

Define discrete commands with dedicated flags:

- calculate-pi <digits>
    Compute π to the specified number of digits.
- extract-digit <position>
    Extract a single hexadecimal or decimal digit at the zero-based index.
- extract-range <start>-<end>
    Extract a contiguous range of digits.
- benchmark-pi <digits>
    Benchmark one or more π algorithms on a digit count.
- list-algorithms
    List all supported calculation and extraction algorithms.
- diagnostics
    Output environment and runtime diagnostics.
- serve
    Start the HTTP and WebSocket API server.
- openapi
    Generate and output the OpenAPI 3 spec.

Global options supported across commands:

--config <path>           Load defaults from YAML/JSON config file.
--cache-dir <path>        Directory for caching results.
--no-cache                Disable cache lookups and writes.
--cache-ttl <seconds>     TTL for cache entries.
--clear-cache             Purge cache and exit.
--threads <number>        Use worker threads for parallel computation.
--no-threads              Disable worker threads.
--verify-digits <count>   Number of random positions to spot-check.
--no-verify               Disable spot-check after calculation.
--timeout <seconds>       Abort long-running operations.
--rate-limit <num>        Max HTTP requests per client per window.
--rate-limit-window <sec> Window size in seconds for rate limiting.
--no-rate-limit           Disable rate limiting.
--ws-path <path>          Custom WebSocket route.
--ws-port <number>        Custom WebSocket port.
--verbose                 Enable debug and info logging.
--quiet                   Suppress non-error output.

# Validation

Use Zod schemas for each command and HTTP route:

- Define schemas: calculateSchema, extractDigitSchema, extractRangeSchema, benchmarkSchema, serveSchema, openapiSchema, diagnosticsSchema, rateLimitSchema, wsSchema, etc.
- After parsing via yargs, validate argv against the corresponding Zod schema. On failure, print detailed issues to stderr and exit code 1.
- In HTTP handlers, coerce and validate req.query or req.body with Zod. On failure, respond with status 400 and a JSON { error: ["message1",...] }.

# Implementation

- Add dependencies on yargs and zod in package.json.
- In src/lib/main.js:
  • Import yargs and Zod and any schema modules.
  • Define commands via yargs.command with name, description, builder, and handler.
  • Register all global options via yargs.option or within an .option group.
  • Use yargs.middleware to:
    – Load configuration from file using js-yaml and merge with CLI flags.
    – Initialize logging based on --verbose, --quiet, and LOG_LEVEL.
  • In each command handler:
    – Validate parsed arguments via Zod schema.parse or parseAsync.
    – Invoke the matching core function (e.g., chudnovskyPi, bbpDigitExtraction, benchmarkPi, startServer, generateOpenApi, printDiagnostics).
    – Handle ZodError and runtime exceptions to emit clear CLI error messages.
  • At the end of main, call yargs.parseAsync(args) to dispatch commands.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Verify `node src/lib/main.js --help` prints usage for all commands and exits with code 0.
  • Test each command with valid arguments invokes the intended handler and exits code 0 or starts the server.
  • Simulate invalid invocations (missing required flags, invalid types) and assert exit code 1 and descriptive error output.
  • Mock Zod schemas to trigger validation failures and confirm error formatting.
  • For HTTP validation, start server and send requests with bad query params; assert status 400 and JSON error array.

# Documentation

- Update README.md under Features:
  • List available commands and global options with descriptions.
  • Provide example invocations for each command:
      node src/lib/main.js calculate-pi 1000 --verify-digits 5 --timeout 60
      node src/lib/main.js serve --rate-limit 50 --rate-limit-window 30
  • Describe validation behavior and error formats for both CLI and HTTP APIs.
  • Link to CONTRIBUTING.md for guidelines on extending or modifying command definitions.features/PARALLEL_COMPUTATION.md
# features/PARALLEL_COMPUTATION.md
# Overview

This feature introduces parallel computation for π digit calculations using Node.js worker_threads to leverage multicore processors. It divides the work across multiple threads, reducing total compute time for large digit counts while preserving result accuracy.

# CLI Interface

--threads <number>
    Specify the number of worker threads to use for π calculation (default: 1).
--no-threads
    Disable parallel execution and run computation on the main thread only.

# Implementation

- Import worker_threads from Node.js to enable parallel execution without additional dependencies.
- When handling --calculate-pi or --benchmark-pi: detect --threads and --no-threads flags.
  • If threads > 1, spawn the specified number of Worker instances, each assigned a range of series terms or digit blocks based on the Chudnovsky algorithm.
  • Each Worker computes its partial result and sends message to the main thread on completion.
  • The main thread collects partial results, merges them in correct sequence, and produces the final π digit string or benchmark metrics.
  • If threads <= 1 or --no-threads is present, execute existing single-threaded logic.
- Ensure proper error handling, thread cleanup, and graceful shutdown on signals or errors.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock the chudnovsky worker function to simulate parallel partial results; verify aggregated output matches single-threaded output.
  • Test invalid thread counts (zero, negative, non-integer) and expect process termination with nonzero status and descriptive error message.
  • Verify that --no-threads flag overrides --threads and runs on the main thread only.

# Documentation

- Update README.md under Features to document the --threads and --no-threads flags with example usage:
  node src/lib/main.js --calculate-pi 10000 --threads 4
- Include guidance on selecting an appropriate thread count based on available CPU cores and memory.features/PI_DIGIT_EXTRACTION.md
# features/PI_DIGIT_EXTRACTION.md
# Overview

This feature adds the ability to extract a single digit of π at an arbitrary position without computing all preceding digits by leveraging the Bailey–Borwein–Plouffe (BBP) formula. Users can request either hexadecimal or decimal digits at specific zero-based indices.

# CLI Interface

--extract-digit <position>   Specify the zero-based index of the digit to extract
--base <decimal|hex>         Optional numeric base for extraction (default: hex)
--output <path>              Optional file path to write the extracted digit

# Implementation

- Extend src/lib/main.js to detect the --extract-digit flag and parse position, base, and output options.
- Implement a bbpDigit function using the BBP formula:
  • Accepts a non-negative integer position and base specification.
  • Computes the position-th digit of π without full-series summation for preceding digits.
  • Supports hexadecimal digit extraction natively; for decimal, perform necessary base conversion from computed hex fractions.
- Handle invalid inputs:
  • Position must be a non-negative integer.
  • Base must be either "hex" or "decimal".
- When invoked, write the extracted digit to stdout or to the specified output file.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Verify bbpDigit returns known hexadecimal digits at positions 0, 1, 5, etc.
  • Verify decimal digit extraction for small positions by comparing against published values.
  • Test error cases for negative position and invalid base values.
  • Test --output flag writes correct digit to a temporary file.

# Documentation

- Update README.md to document the extract-digit command:
  • Describe flags, defaults, and examples of extracting hex and decimal digits.
  • Provide example commands:
    node src/lib/main.js --extract-digit 5 --base hex
    node src/lib/main.js --extract-digit 10 --base decimal --output digit.txt
features/PI_BENCHMARK_VISUALIZER.md
# features/PI_BENCHMARK_VISUALIZER.md
# Overview

This feature adds the ability to benchmark multiple π calculation algorithms and generate performance visualizations in PNG format.

# CLI Interface

--benchmark-pi <digits>  Specify number of digits of π to benchmark
--algorithms <list>      Optional comma-separated list of algorithms to test (default: chudnovsky)
--output-dir <path>      Directory to save benchmark results and visualizations
--chart-file <path>      Optional path to save the generated performance chart as PNG

# Implementation

- Add dependencies: chart.js-node-canvas and canvas for server-side chart generation
- Extend src/lib/main.js with a benchmarkPi function that:
  - Iterates over selected algorithms, invokes each with the specified digit count
  - Measures execution time and memory usage for each run
  - Collects results into a JSON summary
  - Generates a line chart displaying time vs algorithm and saves it as PNG
  - Writes the benchmark summary to a JSON file in the output directory

# Testing

- Add unit tests in tests/unit/main.test.js for:
  - benchmarkPi with a mock algorithm that completes instantly
  - Validating that results summary contains expected fields
  - Simulating chart generation using a temporary output path

# Documentation

- Update README.md under Features with the new benchmarking and visualization commands
- Provide examples of running benchmarks and viewing the generated chartfeatures/DIAGNOSTICS.md
# features/DIAGNOSTICS.md
# Overview

Add a diagnostics feature to the CLI tool that outputs detailed environment and runtime metrics. This helps users and developers inspect Node.js version, system resources, process usage, and algorithm performance baselines before or after π computations.

# CLI Interface

--diagnostics  
    Print a summary of system and process diagnostics and exit without performing π calculations.

--diagnostics --json  
    Output diagnostic data in structured JSON format instead of human-readable text.

# Implementation

- In src/lib/main.js, detect the --diagnostics flag early in argument parsing.  
- Import Node’s built-in os and process modules.  
- Collect fields:  
  • nodeVersion: process.version  
  • platform: process.platform  
  • arch: process.arch  
  • cpus: os.cpus().length  
  • totalMemory: os.totalmem()  
  • freeMemory: os.freemem()  
  • loadAverage: os.loadavg()  
  • processUptime: process.uptime()  
  • memoryUsage: process.memoryUsage()  
- If --json is provided, serialize an object with these fields to stdout.  
- Otherwise, format into aligned columns or labeled lines.  
- After printing diagnostics, exit with status code zero without invoking other flags.

# Testing

- Add unit tests in tests/unit/main.test.js:  
  • Invoke main with ["--diagnostics"] and capture stdout; verify presence of key labels (Node Version, Platform, Total Memory).  
  • Invoke main with ["--diagnostics","--json"] and parse stdout as JSON; verify it contains all expected properties.  
  • Ensure main exits cleanly without errors or side effects.

# Documentation

- Update README.md under Features to document the --diagnostics option.  
- Provide example commands:  
  node src/lib/main.js --diagnostics  
  node src/lib/main.js --diagnostics --json
features/OPENAPI_SPEC.md
# features/OPENAPI_SPEC.md
# Overview

This feature generates an OpenAPI 3.0 specification document for all exposed HTTP API endpoints (calculate, digits, benchmark, metrics, algorithms). It provides a machine-readable contract that clients and tools can use for code generation, validation, and interactive API exploration.

# CLI Interface

--openapi
    Print the full OpenAPI JSON specification to stdout.

--openapi-output <path>
    Write the OpenAPI JSON specification to the specified file path.

# Implementation

- Add a dependency on swagger-jsdoc to package.json.
- In src/lib/main.js:
  • Import swaggerJsdoc from swagger-jsdoc.
  • Define a JSDoc-based configuration object with info (title, version, description from package.json), servers (e.g., http://localhost:{port}), and paths definitions matching each API route (/calculate, /digits, /benchmark, /metrics, /algorithms).
  • When parsing CLI args, detect --openapi and --openapi-output options before starting the HTTP server logic.
    - If --openapi is present (with or without --serve), invoke swaggerJsdoc(config) to generate the spec object.
    - Serialize the spec to JSON with 2-space indentation.
    - If --openapi-output is provided, write the JSON to the given file path, creating directories as needed.
    - Otherwise, write the JSON to stdout and exit with status code zero.
  • Ensure this logic does not start the HTTP server or perform any π computations when generating the spec.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Invoke main with ["--openapi"] and capture stdout; parse as JSON; assert openapi property equals "3.0.0" and paths object contains expected keys.
  • Invoke main with ["--openapi","--openapi-output","temp/openapi.json"] using a temporary directory; verify the file is created and contains valid OpenAPI JSON.
  • Test that combining --openapi with --serve does not start the HTTP server and exits immediately after printing spec.

# Documentation

- Update README.md under Features:
  • Document the --openapi and --openapi-output flags with example usages:
      node src/lib/main.js --openapi > openapi.json
      node src/lib/main.js --openapi --openapi-output api-spec.json
  • Explain how the generated OpenAPI document can be used with tools like Swagger UI or code generators.features/CLI_JSON_OUTPUT.md
# features/CLI_JSON_OUTPUT.md
# Overview

Introduce a global --json flag to the CLI tool to switch command outputs from human-readable text to structured JSON. This enhances scriptability and integration by providing machine-friendly responses for all operations.

# CLI Interface

--json, -j
    When provided, commands emit a JSON object on stdout instead of plain text. Applies globally to all commands, including calculate-pi, extract-digit, extract-range, benchmark-pi, diagnostics, list-algorithms, and serve-related outputs.

# Implementation

- In src/lib/main.js:
  • Extend the yargs setup to define a global boolean flag `json` (alias `j`, default: false).
  • In each command handler, inspect the `argv.json` property. If true, serialize the command’s result into a JSON object and write it to stdout:
    - calculate-pi: `{ pi: string, digits: number, algorithm: string }`
    - extract-digit: `{ digit: string, position: number, base: string }`
    - extract-range: `{ digits: string, start: number, end: number, base: string }`
    - benchmark-pi: `{ results: Array<{ algorithm: string, digits: number, durationMs: number, memoryBytes: number }> }`
    - diagnostics: raw diagnostics object as JSON
    - list-algorithms: `{ algorithms: Array<{ name: string, description: string }> }`
  • When `argv.json` is false, preserve existing human-readable text output.
  • No change to exit codes: 0 for success, nonzero for errors.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Simulate `main(["--calculate-pi","5","--json"])`; parse stdout as JSON and assert the presence and types of `pi`, `digits`, and `algorithm`.
  • Simulate `main(["--extract-digit","10","--base","hex","--json"])`; verify JSON has `digit`, `position`, and `base`.
  • Test that commands without `--json` still produce text output.

# Documentation

- Update README.md under Features:
  • Document the global `--json` (or `-j`) flag and its effect.
  • Show example CLI usage with `--json` and sample JSON responses.
features/HEALTH_CHECK.md
# features/HEALTH_CHECK.md
# Overview

This feature adds a health check endpoint to the HTTP API server for readiness and liveness monitoring. It provides a lightweight status response indicating server health, uptime, and application version.

# HTTP API

GET /health
    Returns a JSON object with the following fields
      status: string ("ok" when the server is running)
      uptime: number (seconds since server start, fractional precision)
      version: string (application version from package.json)
    Responds with status code 200 and Content-Type application/json.

# Implementation

- In src/lib/main.js, within the --serve HTTP server setup, register a route handler for GET /health before other routes.
- Import the version value from package.json.
- On each request to /health:
    1. Call process.uptime() to get the current uptime.
    2. Build the response object { status: "ok", uptime, version }.
    3. Set response header Content-Type to application/json.
    4. Write the JSON string and respond with status code 200.
- No additional dependencies are required.

# Testing

- Add unit tests in tests/unit/main.test.js:
    • Start the HTTP server on a random available port with --serve.
    • Send an HTTP GET request to /health.
    • Verify the response status code is 200.
    • Verify the Content-Type header is application/json.
    • Parse the response body as JSON and assert:
        – status equals "ok"
        – uptime is a number greater than or equal to zero
        – version matches the version field in package.json

# Documentation

- Update README.md under Features to describe the /health endpoint:
    • Explain its purpose for readiness and liveness checks.
    • Provide an example curl command:
        curl http://localhost:3000/health
    • Show a sample JSON response:
        { status: "ok", uptime: 12.34, version: "1.2.0-0" }features/VERIFY_DIGITS.md
# features/VERIFY_DIGITS.md
# Overview

This feature adds a verification step after computing pi digits to ensure accuracy by spot checking randomly selected positions using the BBP extraction formula. It helps detect any discrepancies in the computed result and increases user confidence in the correctness of large digit calculations.

# CLI Interface

--verify-digits <count>   Specify number of random digit positions to verify (default 10)
--no-verify               Disable verification step after pi calculation

# Implementation

- Extend src/lib/main.js to detect the --verify-digits and --no-verify flags during --calculate-pi handling
- After computing full pi digits:
  • If verification is enabled, generate <count> random zero-based positions in the range of computed digits
  • For each position, invoke the bbpDigit function to extract the digit independently
  • Compare the extracted digit to the corresponding character in the computed pi string
  • Collect any mismatches and report them
- If any mismatch is detected, print an error summary and exit with nonzero status; otherwise print a verification success message
- Ensure that error handling for invalid verify count (nonpositive integers) is performed before computation begins

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock pi calculation function to produce a known digit sequence and stub bbpDigit to return matching digits; verify that passing --verify-digits produces a success message
  • Simulate a mismatch by mocking bbpDigit to return an incorrect digit; verify that the process exits with error and reports the mismatch position
  • Test --no-verify suppresses any verification logic and still returns correct output for pi calculation

# Documentation

- Update README.md under Features to document:
  • New flags --verify-digits and --no-verify with example usage
  • Explanation of how spot checking works and why it is useful
  • Example command:
    node src/lib/main.js --calculate-pi 1000 --verify-digits 5