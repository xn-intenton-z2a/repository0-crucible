features/CONFIG_FILE.md
# features/CONFIG_FILE.md
# Overview

Add support for loading configuration values from a file or environment variables so users can define default CLI and server options without repeating flags on each invocation.

# Implementation Details

• At startup in src/lib/main.js, load environment variables from a .env file using dotenv.
• Search for a configuration file in the working directory named .pi-config.json, .pi-config.yaml or pi-config.yaml.
• Parse JSON files with JSON.parse and YAML files with js-yaml.load.
• Define supported configuration keys matching CLI flags and ENV variables: digits, format, output, algorithm, workers, cache, cacheFile, clearCache, analyze, outputPath, stream, chunkSize, serve, cors, progress, diagnostics, openapi.
• Merge values: defaults from code, then config file values, then environment variables PI_<KEY> (uppercase underscore), then CLI arguments override all.
• Validate merged options with existing Zod schemas or commander choices as appropriate.
• Ensure backward compatibility: if no config file or variables are present, behavior remains unchanged.

# Testing

• Unit tests in tests/unit/main.test.js that mock file system to supply a temporary config file and verify main reads config and applies defaults when CLI args are absent.
• Tests that environment variables like PI_DIGITS are read and override config file values.
• Test invalid config file content triggers a clear error and exit code 1.
• E2E tests in tests/e2e/cli.test.js that create a pi-config.yaml file, run the CLI without flags, and assert behavior matches config settings.

# Documentation

• Update README.md to introduce configuration support under a new section Configuration File and Environment Variables.
• Describe file naming options and supported fields, show sample .pi-config.yaml and sample .env examples.
• Provide examples:
  Create .pi-config.yaml in project root
    digits: 50
    format: json
  Then run CLI without flags:
    node src/lib/main.js
  Use environment variable to override:
    PI_DIGITS=100 node src/lib/main.jsfeatures/RATE_LIMITING.md
# features/RATE_LIMITING.md
# Overview

Add API rate limiting to the HTTP server mode to protect CPU-intensive endpoints from excessive or abusive usage. This prevents denial-of-service scenarios and helps manage resource consumption when multiple clients call the service rapidly.

# CLI Interface

Extend main(args) to accept the following flags alongside --serve and --cors:

--rate-limit-window-ms <ms>    Time window in milliseconds for request counting (default: 60000)
--rate-limit-max <n>           Maximum number of requests allowed per window per IP (default: 60)

When the server mode is active, these options configure a rate limiter that applies to all HTTP API routes.

# Implementation Details

In src/lib/main.js:
• Install and import express-rate-limit from the "express-rate-limit" package.
• After creating the Express app and applying CORS, construct a rate limiter:
  const limiter = rateLimit({
    windowMs: opts.rateLimitWindowMs,
    max: opts.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
  });
• Apply limiter as middleware on the app before defining routes: app.use(limiter).
• Parse the new flags in main (argv) and expose them in opts.rateLimitWindowMs and opts.rateLimitMax (default values if flags omitted).
• Ensure invalid values (non-integer, negative) result in an error message and exit code 1 on startup, preventing the server from starting.

# Testing

Add tests in tests/unit/main.test.js and tests/e2e/cli.test.js:
• Unit tests with supertest: configure server with a low max (e.g., 2 requests per window) and verify that a third request to /pi?digits=1 within the same window yields status 429 and an appropriate JSON error message.
• Test flag parsing: invoking CLI with --serve 0 --rate-limit-window-ms 1000 --rate-limit-max 1 starts the server and enforces a single request per second.
• Test invalid flag values: passing non-numeric or negative values for rate-limit flags triggers console.error and process.exit(1) without server startup.

# Documentation

Update README.md under HTTP API:
• Document the new --rate-limit-window-ms and --rate-limit-max flags and their defaults.
• Provide examples:
    node src/lib/main.js --serve 3000 --rate-limit-window-ms 60000 --rate-limit-max 100
    curl http://localhost:3000/pi?digits=10
    # After 100 requests: HTTP/1.1 429 Too Many Requests

• Note that the limiter uses IP-based counting and sends standard rate-limit headers.features/CLI_COMPLETION.md
# features/CLI_COMPLETION.md
# Overview

Add support for generating shell completion scripts for common shells directly from the CLI. This enables users to enable tab completion for flags and options without manual script writing, improving discoverability and efficiency when using the tool interactively.

# CLI Interface

Extend main(args) to accept the following flag:

--generate-completion <bash|zsh|fish>    Output a completion script for the specified shell to stdout and exit.

Behavior:
• When this flag is provided, bypass normal PI calculation or server startup and print a complete shell script that users can source or install in their shell’s completion directory.
• The script should register all CLI options including digits, algorithm, workers, format, output, serve, cors, rate-limit, stream, chunk-size, ws-port, ws-path, analyze, cache, diagnostics, progress, swagger-ui, graphql, etc.

# Implementation Details

• Add a new dependency, tabtab, to package.json to manage completion script generation.
• In src/lib/main.js before parsing other flags, detect --generate-completion. Use tabtab to generate the script:
  • Import tabtab from 'tabtab'.
  • Call tabtab.complete('pi-calculator', { name: 'pi-calculator' }, shell) to get script text.
  • Print the returned script to stdout and exit(0).
• Ensure version and description passed to tabtab match package.json metadata.
• Do not invoke any other logic when this flag is present.

# Testing

• Add unit tests in tests/unit/main.test.js:
  - Mock tabtab.complete to return a known script string. Invoke main(["--generate-completion","bash"]). Assert console.log is called with the script and process.exit(0).
  - Test invalid shell names (e.g., "foo") cause console.error with message "Unsupported shell 'foo'" and process.exit(1).
• E2E tests in tests/e2e/cli.test.js:
  - Run CLI with `node src/lib/main.js --generate-completion bash` and capture stdout. Assert it contains a line defining a completion function for the tool name.
  - Repeat for zsh and fish.

# Documentation

• Update README.md under a new "Shell Completion" section:
  - Describe the --generate-completion flag and supported shells.
  - Provide example:
        node src/lib/main.js --generate-completion bash > pi-completion.sh
        source pi-completion.sh
  - Note that scripts can be installed to /etc/bash_completion.d or ~/.config/fish/completions for permanent use.features/PROMETHEUS_METRICS.md
# features/PROMETHEUS_METRICS.md
# Overview

Add a Prometheus metrics endpoint to the HTTP server mode to expose operational and performance metrics in text format. This allows service operators to integrate monitoring and alerting using Prometheus or compatible tools.

# Implementation Details

• Add prom-client as a dependency in package.json.
• In src/lib/main.js during server setup when --serve is enabled:
  • Import { Registry, Counter, Histogram, collectDefaultMetrics } from 'prom-client'.
  • Instantiate a Registry and call collectDefaultMetrics({ register: registry }).
  • Create a Counter metric http_requests_total with labels method and route.
  • Create a Histogram metric pi_calculation_duration_seconds to observe durations of PI computations.
  • In middleware before each handler, increment http_requests_total with route and method.
  • Wrap calculatePi and related operations to record execution time via histogram.observe(duration).
  • Define GET /metrics route that sets content type to 'text/plain; version=0.0.4' and responds with registry.metrics().

# Testing

• Unit tests in tests/unit/main.test.js using supertest:
  - Start server with main(["--serve","0"]).
  - Perform sample requests such as GET /pi?digits=5 and then GET /metrics.
  - Assert /metrics responds status 200, content type includes text/plain, and body contains http_requests_total and pi_calculation_duration_seconds.
  - Test that multiple /pi requests increment the counter values (using regex on metrics output).
  - Test error routes increment http_requests_total with correct labels.

# Documentation

• Update README.md under HTTP API section to add a Metrics subsection:
  - Describe the metrics endpoint URL: /metrics.
  - Note default content type and Prometheus text format version.
  - Provide example:
      curl http://localhost:3000/metrics
  - List key metrics exposed: process metrics, http_requests_total, pi_calculation_duration_seconds.
features/GRACEFUL_SHUTDOWN.md
# features/GRACEFUL_SHUTDOWN.md
# Overview

Add support for graceful shutdown and cancellation in both CLI and HTTP server modes so that long-running π calculations, streaming, or benchmark operations can be aborted cleanly on user interrupt or system signals.

# CLI Behavior

• Listen for SIGINT and SIGTERM before dispatching any compute, stream, or benchmark operation.
• Create an AbortController and pass its signal to calculatePi, getPiStream, and benchmarkPi.
• On receiving a signal, invoke controller.abort(), print "Operation cancelled by user", and exit with code 130.
• Ensure that any partial output is cleaned up or flushed before exit.

# HTTP Server Behavior

• In --serve mode, listen for SIGINT and SIGTERM signals.
• On signal, stop accepting new connections via server.close(), close any WebSocketServer instances, and allow in-flight requests to complete or abort after a configurable timeout (default 5 seconds).
• After draining or on timeout, exit process with code 0.

# Implementation Details

• In src/lib/main.js, before parsing args, instantiate AbortController and attach listeners for process signals.
• Refactor calculatePi, getPiStream, and benchmarkPi functions to accept an optional AbortSignal and check signal.aborted in long loops or generator iterations, throwing an AbortError on cancellation.
• In CLI entrypoint, wrap compute or stream loops in a try/catch to handle AbortError: log the cancellation message and exit with code 130.
• In HTTP setup, capture the server instance returned by app.listen and on signal call server.close(), plus wsServer.close() if WebSocket is enabled, then set a timer to force exit after timeout.

# Testing

• Unit tests in tests/unit/main.test.js:
  - Mock an AbortSignal with aborted=true to verify calculatePi and getPiStream immediately throw AbortError.
  - Simulate signal handlers by invoking the registered callback and assert that main prints the cancellation message and calls process.exit(130).
• HTTP tests using supertest:
  - Start the server with --serve 0, send a request that triggers a delayed computation (e.g., large digits), programmatically emit SIGINT, and verify the server closes and the test exits without hanging.

# Documentation

• Update README.md with a new Graceful Shutdown section:
  - Describe how Ctrl+C or SIGTERM is handled in CLI and server modes.
  - Provide examples:
      # In CLI long run
      node src/lib/main.js --digits 100000 --stream
      # Press Ctrl+C to cancel
      Operation cancelled by user

      # In HTTP mode
      node src/lib/main.js --serve 3000
      # Press Ctrl+C, server shuts down gracefully
features/WEBSOCKET_API.md
# features/WEBSOCKET_API.md
# Overview

Introduce a WebSocket-based streaming API mode in addition to the existing HTTP endpoints. Clients can establish a WebSocket connection to request π digit generation and receive streamed chunks or the full result over a WebSocket, enabling real-time integration in browsers or services without HTTP polling.

# CLI Interface

Extend main(args) to accept the following flags alongside --serve:

--ws-port <port>         Port to serve WebSocket connections (defaults to same as HTTP server when serve is enabled)
--ws-path <path>         WebSocket URL path (default: /ws/pi)

Behavior:
• When --serve is enabled and --ws-port or --ws-path are provided (or defaults apply), the server will mount a WebSocket server on the given port and path.
• Clients open a WebSocket connection and send a JSON message { "digits": <n>, "chunkSize": <m> }, then receive streamed text messages of π digits in chunks of up to chunkSize. On completion, the connection closes.

# Implementation Details

• Add "ws" dependency in package.json.
• In src/lib/main.js, after starting the Express server when serve mode is active:
  – Import { WebSocketServer } from "ws".
  – Instantiate a WebSocketServer listening on the same HTTP server, filtering upgrade requests by opts.wsPath.
  – On each connection, attach 'message' listener. Parse incoming text as JSON. Validate with zod: digits (integer 1–1000), chunkSize (optional positive integer).
  – Call the existing getPiStream generator (or implement a simple async generator over calculatePi and slicing) to produce chunks.
  – For each chunk, call ws.send(chunk).
  – After streaming all digits, call ws.close().
  – On invalid request or error, send JSON error message and close with code 1008.
  – Handle client disconnects by aborting the generator loop.

# Testing

Add tests in tests/unit/main.test.js and a new tests/unit/ws.test.js:
• Unit: Mock getPiStream to yield known chunks. Create a WebSocketServer instance via main(["--serve","0","--ws-port","0"]). Use the ws client to connect to the wsPath. Send a valid JSON request, assert the sequence of 'message' events with expected chunks and final close event.
• Invalid request: send non-JSON or missing digits, expect server to send error JSON and close.
• CLI flag parsing: invoking main with invalid --ws-path or --ws-port values triggers console.error and exit code 1 before server startup.

# Documentation

• Update README.md under HTTP Server section to document the WebSocket API:
  – Describe --ws-port and --ws-path flags.
  – Provide example:
      node src/lib/main.js --serve 3000 --ws-path /ws/pi
      // In JS client:
      const ws = new WebSocket('ws://localhost:3000/ws/pi');
      ws.onopen = () => ws.send(JSON.stringify({ digits: 100, chunkSize: 50 }));
      ws.onmessage = event => console.log('chunk', event.data);
  – Note error handling and closure behavior.features/HTTP_ANALYSIS.md
# features/HTTP_ANALYSIS.md
# Overview

Add HTTP endpoints to expose π digit frequency analysis and chart generation over HTTP, complementing existing CLI analysis mode. Clients can request statistical summaries or visual charts of π digits directly via the HTTP API.

# HTTP Endpoints

Define new routes on the existing Express server:

GET /pi/analysis
  Query parameters:
    digits: integer number of decimal places (default 10)
    type: string one of frequency or chart (default frequency)
  Behavior:
    If type is frequency, respond with JSON containing counts and percentages of each digit 0 through 9 for the first requested digits.
    If type is chart, generate a PNG bar chart of digit frequency and respond with image data and content type image/png.

# Implementation Details

• In main.js server setup, extend the Express app under serving mode to handle /pi/analysis.  
• Use zod schemas to validate and coerce query parameters digits and type.  
• For frequency mode, call analyzePi(digits) logic from CLI code to compute counts and percentages. Respond with JSON { digits, counts, percentages }.  
• For chart mode, add quickchart-js to dependencies. Create a QuickChart instance configured as a bar chart with labels 0 through 9 and data equal to percentages. Call chart.toBinary() to obtain image buffer, set response type image/png, and send the buffer.  
• Handle validation errors by responding status 400 with JSON error message.  
• Ensure the server continues normal /pi and /benchmark routes alongside analysis.

# Testing

Add unit tests in tests/unit/main.test.js using supertest and vitest:
  • Start server with main(["--serve","0"]) and capture instance.  
  • Test GET /pi/analysis?digits=5&type=frequency returns status 200 and JSON body with counts summing to digits and correct percentages.  
  • Test GET /pi/analysis?digits=5&type=chart returns status 200, content type image/png, and non empty body.  
  • Test invalid query values produce status 400 and error JSON.  

Add e2e tests in tests/e2e/cli.test.js:
  • Use curl or supertest to GET analysis endpoints against a running server and assert correct behavior for both modes.

# Documentation

Update README.md:
  • Document the new /pi/analysis endpoint under HTTP API section.  
  • Provide examples:
    curl http://localhost:3000/pi/analysis?digits=50&type=frequency
    curl http://localhost:3000/pi/analysis?digits=50&type=chart > freq.png
  
Update package.json dependencies to include quickchart-js for chart mode.features/PI_CACHE.md
# features/PI_CACHE.md
# Overview
This feature introduces a caching layer for π calculation results in both CLI and HTTP server modes to avoid redundant computation and improve performance for repeated requests.

# CLI Interface
Extend main(args) to accept the following flags:
--cache <on|off>         Enable or disable caching of π results (default: on)
--cache-file <file>      Path to a JSON file used for persistent cache storage (default: .pi_cache.json)
--clear-cache            Clear the in-memory and persistent cache before proceeding

# HTTP API Integration
In HTTP server mode, cache is applied to the GET /pi route:
• Before computing π for a query parameter digits, check the in-memory cache for a stored result matching digits and any algorithm or worker options.
• If a cached value is found, return it immediately in the JSON response without invoking calculatePi.
• On a cache miss, compute π, store the result in both the in-memory cache and persistent cache file, then respond normally.
• Respect --cache and --clear-cache flags for controlling cache behavior in server mode.

# Implementation Details
• Maintain an in-memory Map keyed by a string of serialized options (digits, algorithm, workers) with computed π strings as values.
• On startup, if caching is enabled, read the cache file using fs/promises and populate the in-memory Map.
• In CLI mode, follow existing behavior: on cache miss compute then save, on clear-cache delete file and empty Map.
• In HTTP server setup (src/lib/main.js), wrap the GET /pi handler:
  • Compute a cache key from request query parameters.
  • If cache enabled and key exists, return JSON { digits, pi: cachedValue }.
  • Else call calculatePi, store result in Map and write updated cache file asynchronously, then return JSON.
• Ensure file I/O errors for cache file read or write do not prevent π calculation or server startup.

# Testing
• Unit tests in tests/unit/main.test.js should mock fs and the cache file to verify CLI load and save behavior.
• Add unit tests for HTTP cache logic using supertest:
  – Start server with --serve 0 --cache on.
  – Perform GET /pi?digits=10 twice; verify calculatePi is called only on the first request and second returns from cache.
  – Test that --cache off disables caching and calculatePi is invoked on each request.
  – Test that --clear-cache resets cache so subsequent requests recompute.

# Documentation
• Update README.md under Features and HTTP Server sections:
  – Document the --cache, --cache-file, and --clear-cache flags and defaults.
  – Describe caching behavior in HTTP mode with examples:
      node src/lib/main.js --serve 3000 --cache on
      curl http://localhost:3000/pi?digits=50  # computes and caches
      curl http://localhost:3000/pi?digits=50  # returns cached result
features/WEB_UI.md
# features/WEB_UI.md
# Overview

Add an interactive web interface to the HTTP server mode, allowing users to use a browser to compute π, view digit frequency analysis, and display charts without using the CLI or raw API.

# HTTP UI Endpoints

- GET /ui
  Display an HTML form where users can enter the number of digits and select an action: calculate pi, frequency analysis, or chart.
- POST /ui/calculate
  Accept form fields: digits (integer) and action (calculate|frequency|chart).
  - If action is calculate, render a page showing the π value up to the requested digits.
  - If action is frequency, show a table of digit counts and percentages.
  - If action is chart, embed a PNG bar chart (base64 data URI) of digit frequency.

# Implementation Details

• In src/lib/main.js, import ejs and express.urlencoded middleware.
• Define inline EJS templates as strings for the form and result pages.
• On GET /ui, respond with ejs.render(formTemplate, {}).
• On POST /ui/calculate, parse form data, validate digits, call calculatePi or analyzePi from existing logic, generate chart buffer via quickchart-js for chart action, convert to base64, and use ejs.render(resultTemplate, { digits, pi, counts, percentages, chartData }).
• Use express.urlencoded({ extended: true }) to support form submissions.
• Handle invalid input by rendering an error message in the HTML page with status 400.

# Testing

• In tests/unit/main.test.js, add supertest cases:
  - GET /ui returns status 200 and HTML containing a form element and input named digits.
  - POST /ui/calculate with digits=5 and action=calculate returns HTML containing the correct π string.
  - POST /ui/calculate with action=frequency returns a table with ten rows and correct counts.
  - POST /ui/calculate with action=chart returns HTML with an img tag whose src starts with data:image/png.
  - Invalid digits or missing action render a 400 status and HTML error message.

# Documentation

• Update README.md:
  - Add a Web UI section under HTTP API describing how to access the web interface.
  - Provide example:
      Open http://localhost:3000/ui in a browser to use the interactive form.
  - Show screenshots or sample markup of the form and results page.
features/BENCHMARK_PI.md
# features/BENCHMARK_PI.md
# Overview
This feature adds the ability to benchmark the performance of π calculation across different digit lengths and output the results as JSON or generate a PNG chart.

# CLI Interface
Extend main(args) to accept the following flags:
--benchmark                Run performance benchmarks of π calculation
--digits <list>            Comma-separated digit lengths to test (default: 10,100,500,1000)
--format <json|png>        Output format (default: json)
--output <file>            Path to save output (stdout if omitted)

# Implementation Details
Add a benchmarkPi(digitsArray) function that:
  • Iterates over each digit count, invokes calculatePi(digits), and measures execution time in milliseconds
  • Collects results into an array of objects with fields digits and time
  • For JSON format, serializes the results and writes to stdout or file
  • For PNG format, adds a quickchart-js dependency, generates a bar chart of digit vs time, and writes the image file
Ensure benchmarks run serially, support digits up to 1000, and gracefully handle errors and invalid inputs.

# Testing
Add unit tests in tests/unit/main.test.js to:
  • Mock timers (Date.now) and verify benchmarkPi returns expected result structure for sample inputs
  • Validate error handling for invalid digit values
Add e2e tests in tests/e2e/cli.test.js to:
  • Invoke CLI with --benchmark and --format json, parse output, and assert structure
  • Invoke CLI with --benchmark and --format png, write to a temp file, and assert file existence and non-zero size

# Documentation
Update README.md to describe the new --benchmark, --digits, --format, and --output flags, include usage examples for both JSON and PNG outputs, and note performance considerations and charting dependency requirements.features/ALGORITHM_SELECTION.md
# features/ALGORITHM_SELECTION.md
# Overview

Unify and enhance π computation algorithm selection by providing real implementations for Ramanujan and Chudnovsky series algorithms, and support an automatic mode that chooses the optimal algorithm based on the requested digit count. Allow users to configure selection thresholds via environment variables or configuration file, improving performance and ease of use.

# CLI Interface

Extend the existing flags in src/lib/main.js:

--algorithm <auto|machin|ramanujan|chudnovsky>   Specify the algorithm to compute π. auto (default) selects the fastest method based on digit count.
--workers <n>                                    Number of worker threads for parallel Chudnovsky computation (default 1)
--auto-threshold-machin <n>                      Maximum digits to use the Machin formula in auto mode (default 50)
--auto-threshold-ramanujan <n>                   Maximum digits to use the Ramanujan series in auto mode (default 500)

# Implementation Details

In src/lib/main.js:

1. Implement calculatePiRamanujan(digits) using the Ramanujan rapidly convergent series: sum terms until additional terms no longer affect the target precision and format result to the requested decimal places.
2. Implement calculatePiChudnovsky(digits, workers) using the Chudnovsky series: compute terms in parallel when workers > 1 via worker_threads, or serially when workers equals 1.
3. Extend calculatePi(digits, options) to support algorithm auto: read thresholds from opts.autoThresholdMachin and opts.autoThresholdRamanujan or from environment variables AUTO_THRESHOLD_MACHIN and AUTO_THRESHOLD_RAMANUJAN; choose:
   • if digits ≤ autoThresholdMachin then machin
   • else if digits ≤ autoThresholdRamanujan then ramanujan
   • else chudnovsky
4. Parse new CLI flags --auto-threshold-machin and --auto-threshold-ramanujan, merge them after defaults, configuration file values, and environment variables.
5. Validate that threshold values are positive integers; on invalid values, fall back to code defaults without error.
6. Ensure backward compatibility: if algorithm flag is set to machin, ramanujan, or chudnovsky explicitly, auto thresholds are ignored.

# Testing

Add unit tests in tests/unit/main.test.js and a new tests/unit/algorithm-implementation.test.js:

• Spy on calculatePiRamanujan and calculatePiChudnovsky and verify correct dispatch for auto mode thresholds and explicit algorithm flags.
• Test that auto thresholds correctly separate digit counts: at boundary values for machin, ramanujan, and chudnovsky.
• Validate fallback to default thresholds if environment variables or flags provide invalid threshold values.
• Verify calculatePiRamanujan produces expected prefixes for small digit counts (for example first five digits) and that calculatePiChudnovsky matches existing Machin output for small inputs.
• Simulate parallel execution by setting workers to 2 or more and verify consistency of results and that worker_threads module is invoked.

# Documentation

Update README.md under the CLI Usage section:

• Document the new algorithm options including auto and how the tool selects algorithms.
• Describe --auto-threshold-machin and --auto-threshold-ramanujan flags and their defaults.
• Show examples:
  node src/lib/main.js --digits 100 --algorithm auto
  node src/lib/main.js --digits 30 --algorithm auto --auto-threshold-machin 20
  node src/lib/main.js --digits 1000 --algorithm chudnovsky --workers 4features/OPENAPI_DOCS.md
# features/OPENAPI_DOCS.md
# Overview
This feature adds support for generating an OpenAPI 3.0 specification for the HTTP API endpoints, enabling clients and tools to integrate seamlessly.

# CLI Interface
Extend main(args) to accept the following flag:
--openapi <file>       Output the OpenAPI JSON specification to the specified file; if omitted, write to stdout

When --openapi is present, bypass normal operations (calculations, benchmarks, server startup) and output the OpenAPI spec.

# Implementation Details
• Define an OpenAPI 3.0 compliant JSON object with metadata (info, version, servers) and paths for /pi and /benchmark endpoints, including parameters, request validation, response schemas (PiResponse, BenchmarkResponse, ErrorResponse).
• In src/lib/main.js, after parsing args, detect --openapi. Construct the spec object in memory, serialize with JSON.stringify(spec, null, 2), and write to stdout or to the given file via fs/promises.writeFile.
• Reuse existing validation logic or manually define parameter schemas to ensure consistency with HTTP_API behavior.
• Do not introduce external dependencies for spec generation; leverage built-in modules.

# Testing
• Unit tests in tests/unit/main.test.js:
  – Invoke main with ['--openapi'] and verify the returned object has keys openapi, info, paths with entries /pi and /benchmark.
  – Mock fs/promises.writeFile and verify it is called when a file path is provided.
• E2E tests in tests/e2e/cli.test.js:
  – Run the CLI with --openapi, parse stdout as JSON, and assert top-level keys openapi, info, paths.
  – Run the CLI with --openapi openapi.json and assert that openapi.json exists, contains valid JSON, and includes the correct paths.

# Documentation
Update README.md to document the --openapi flag, provide usage examples:
    node src/lib/main.js --openapi
    node src/lib/main.js --openapi api-spec.json
Include a note that the generated specification is compliant with OpenAPI 3.0 and can be used with Swagger UI or other tools.features/STRUCTURED_LOGGING.md
# features/STRUCTURED_LOGGING.md
# Overview

Introduce structured and levelled logging across the CLI and HTTP server modes using a lightweight logger. This enables consistent log formatting, configurable log levels, and easier integration with monitoring and debugging tools.

# CLI Interface

Extend main(args) to accept the following flag and environment variable:

--log-level <level>    Set logging verbosity: debug, info, warn, error (default: info)
Environment variable PI_LOG_LEVEL may be used to set the default log level if the flag is not provided.

# Implementation Details

• Add pino as a dependency in package.json.
• In src/lib/main.js after parsing flags, initialize a pino logger with level opts.logLevel.
• Replace direct console.log and console.error calls with logger.info, logger.warn, logger.error, or logger.debug as appropriate:
  – On startup, log the selected digits, algorithm options and any serve port or rate limit configuration at info level.
  – In error paths, use logger.error with error messages and exit.
  – In debug mode, log parsed options, cache hits/misses, request payloads, and internal calculation milestones (e.g. when arctan series total is reached).
• For HTTP mode (when serve flag is present), apply a middleware that logs each incoming request at info level with method, path, and response status code. In debug mode, log request query or body.
• Ensure that when --log-level=error or --log-level=warn is set, informational logs and debug logs are suppressed.

# Testing

• Add unit tests in tests/unit/main.test.js that:
  – Mock pino to verify that main() uses the correct log level based on flag and environment variable.
  – Simulate errors (invalid digits, file write failures) and assert logger.error is called and process.exit is invoked.
  – Test that logger.info is called on normal startup.
• Add HTTP tests with supertest to verify that request logs are emitted:
  – Start server with --serve 0 --log-level debug and send a GET /pi?digits=2; spy on logger.debug to assert internal detail logs.
  – Start server with --serve 0 --log-level error and send requests; assert no info logs appear but errors still do.

# Documentation

• Update README.md under a new Logging section:
  – Describe the --log-level flag and PI_LOG_LEVEL environment variable.
  – List supported levels and defaults.
  – Provide examples:
      node src/lib/main.js --digits 50 --log-level debug
      PI_LOG_LEVEL=warn node src/lib/main.js --serve 3000
• Note that structured logging enables integration with external log aggregators and simplifies debugging and monitoring.features/PI_ANALYSIS.md
# features/PI_ANALYSIS.md
# Overview

Add a new analysis mode to compute statistical properties of the π digits sequence, enabling users to inspect digit frequency distributions and generate visual charts for deeper insights.

# CLI Interface

Extend main(args) to accept the following flags alongside --digits and existing options:

--analyze <frequency|chart>    Type of analysis to perform (default: frequency)
--output <file>                Path to write analysis output; for frequency JSON or chart PNG (stdout for JSON if omitted)

Behavior
• When --analyze frequency is specified, compute π to the requested number of digits and output a JSON object mapping each digit (0–9) to its count and percentage of the total.
• When --analyze chart is specified, compute frequency distribution and generate a PNG bar chart using quickchart-js, writing the image to the given output file (required) or stdout if possible.
• The tool bypasses normal PI printing when --analyze is present.

# Implementation Details

In src/lib/main.js and helper modules:

• Parse --analyze and --output flags in main.
• Implement analyzePi(digits) that:
  - Calls calculatePi(digits) to obtain the PI string.
  - Strips the decimal point and counts occurrences of characters '0' through '9'.
  - Computes percentage for each digit as (count / digits) * 100.
  - Returns an object { counts: Record<string, number>, percentages: Record<string, number> }.

• For frequency output:
  - Serialize the analysis object to JSON.stringify({ digits, counts, percentages }, null, 2).
  - If --output is provided, write to file via fs/promises.writeFile, else print to stdout.

• For chart output:
  - Add quickchart-js to dependencies.
  - Construct a QuickChart instance with type 'bar', labels ['0','1',...,'9'], and dataset percentages.
  - Call chart.toBinary() to get image buffer.
  - Write buffer to the output file via fs/promises.writeFile. Fail if no --output path is given.

• Validate that --output is provided when analyze=chart, else error and exit(1).
• Handle errors reading/writing files with clear messages and exit code 1.

# Testing

Unit tests in tests/unit/main.test.js:
• Mock calculatePi to return a known sequence (e.g., '3.14159') and verify analyzePi computes correct counts and percentages.
• Test main with args ['--digits','5','--analyze','frequency'] prints JSON with expected structure and exit(0).
• Test main with args ['--digits','5','--analyze','chart','--output','out.png'] calls quickchart and fs.writeFile appropriately.
• Test missing --output for chart mode triggers error and exit(1).

E2E tests in tests/e2e/cli.test.js:
• Run CLI with --digits 100 --analyze frequency; parse stdout JSON and assert keys 'counts' and 'percentages', total counts equal digits.
• Run CLI with --digits 50 --analyze chart --output freq.png; assert freq.png exists and is non-empty.

# Documentation

Update README.md to document the new analyze commands:

  node src/lib/main.js --digits 200 --analyze frequency
  node src/lib/main.js --digits 100 --analyze chart --output pi-frequency.png

Explain JSON frequency output and PNG chart generation. Note dependency on quickchart-js for chart mode.features/DIAGNOSTICS.md
# features/DIAGNOSTICS.md
# Overview
This feature adds a diagnostics mode to the CLI that reports detailed runtime and environment information. Users can invoke diagnostics to inspect Node version, platform details, memory and CPU usage, uptime, current working directory, and key dependency versions. The information is output as JSON for easy consumption.

# CLI Interface
Extend main(args) to accept the following flag:
--diagnostics           Run diagnostics and output a JSON object with:
                        • nodeVersion: string
                        • platform: string
                        • arch: string
                        • uptime: number (seconds)
                        • memoryUsage: object with rss, heapTotal, heapUsed, external (bytes)
                        • cpuUsage: object with user and system (microseconds)
                        • cwd: string
                        • dependencies: object mapping dependency names to versions

When --diagnostics is present, main should bypass other modes and print the JSON to stdout.

# Implementation Details
In src/lib/main.js:
  • Parse args to detect --diagnostics
  • Use process.version, process.platform, process.arch
  • Use process.uptime() for uptime
  • Use process.memoryUsage() and process.cpuUsage() for resource metrics
  • Use process.cwd() for current directory
  • Read package.json at runtime (via import or fs.readFile) to extract dependencies and devDependencies keys and versions
  • Compose an object with all fields and write JSON.stringify(object, null, 2) to stdout
  • Return the diagnostics object from main for ease of testing

Ensure that:
  • Diagnostics mode returns synchronously without error
  • If reading package.json fails, include an empty dependencies object and note the error in a field error

# Testing
Add unit tests in tests/unit/main.test.js:
  • Import main and call main(["--diagnostics"]); verify returned object has correct shape and types
  • Mock process.memoryUsage and process.cpuUsage to fixed values and verify they appear in the returned object

Add e2e tests in tests/e2e/cli.test.js (create tests/e2e directory if needed):
  • Spawn the CLI with node src/lib/main.js --diagnostics
  • Parse stdout as JSON
  • Assert presence and types of all expected keys

# Documentation
Update README.md to describe the --diagnostics flag:
  • Explain each field in the JSON output
  • Provide example command and sample output
  • Note that reading package.json may add overhead and potential error handlingfeatures/BATCH_API.md
# features/BATCH_API.md
# Overview

Introduce a batch processing endpoint to the HTTP server mode so clients can request multiple π calculations in a single API call. This reduces round-trip overhead and supports efficient bulk computations.

# HTTP Endpoint

Define a new POST route when the server is active:

POST /pi/batch
  • Accepts a JSON array of request objects with fields:
      • digits: integer number of decimal places (required)
      • algorithm: optional string (machin|chudnovsky|ramanujan)
      • workers: optional positive integer for chudnovsky parallelism
  • Validates the array and each item using Zod schema.
  • Computes π for each request sequentially or in parallel, returning an array of results:
      [{ digits, pi }]
  • On validation error, responds with status 400 and JSON { error: string } without performing computations.

# Implementation Details

• In src/lib/main.js during server setup when --serve is enabled:
  – Import express.json and zod.
  – Define a Zod schema: an array of objects { digits: z.number().int().min(1).max(1000), algorithm: z.enum([...]).optional(), workers: z.number().int().min(1).optional() }.
  – Apply express.json() middleware and mount app.post('/pi/batch', handler).
  – In handler, safeParse the request body. On failure, respond 400 with { error: issues message }.
  – On success, iterate over the parsed array, for each item call calculatePi(digits, { algorithm, workers }).
  – Collect results into an array of { digits, pi } and send JSON response with status 200.
  – Ensure errors in individual computations are caught and returned as a 500 error with a generic message.

# Testing

• Add unit tests in tests/unit/main.test.js using supertest:
  – Test POST /pi/batch with valid body [{ digits:5 }, { digits:3, algorithm:'ramanujan' }] returns status 200 and JSON array with correct pi strings.
  – Test invalid bodies (non-array, missing digits, invalid types) yield 400 and JSON error.
  – Simulate internal error by mocking calculatePi to throw; assert status 500 and JSON error.

# Documentation

• Update README.md under HTTP API section:
  – Document the POST /pi/batch endpoint, request schema and example:
      POST /pi/batch
      [ { "digits": 10 }, { "digits": 100, "algorithm": "chudnovsky", "workers": 2 } ]
      Response:
      [ { "digits": 10, "pi": "3.1415926536" }, { "digits": 100, "pi": "3.14..." } ]
  – Note validation rules and error responses.features/API_KEY_AUTH.md
# features/API_KEY_AUTH.md
# Overview

Add API key authentication to the HTTP server, SSE, and WebSocket endpoints so that only authorized clients can access π calculation and analysis services.

# CLI and Configuration Interface

Allow users to configure an API key via environment variable or configuration file:

• API key environment variable: PI_API_KEY
• Configuration file key: apiKey

Provide a new CLI flag:

--api-key-header <name>    HTTP header name to check for API key (default: X-API-Key)

When --serve is enabled and an API key is configured, all incoming requests to REST endpoints, SSE path, and WebSocket upgrades must present the correct API key in the specified header, otherwise the server responds with status 401 and JSON { error: "Unauthorized" } or closes the connection.

# Implementation Details

In src/lib/main.js during server setup:
• After loading configuration, read opts.apiKey from merged config or process.env.PI_API_KEY.
• Read opts.apiKeyHeader from CLI flag or default to 'X-API-Key'.
• If opts.apiKey is defined:
  – Add Express middleware before all routes:
      if request.headers[lowercase opts.apiKeyHeader] !== opts.apiKey then respond 401 { error: "Unauthorized" } and return.
• For SSE endpoint:
  – Before initiating getPiStream, check header and if invalid respond 401 and end response.
• For WebSocket upgrades:
  – In the upgrade handler, inspect request.headers[lowercase opts.apiKeyHeader]; if missing or incorrect, send HTTP 401 and destroy socket.

# Testing

Add unit tests in tests/unit/main.test.js and tests/unit/ws.test.js:
• Start server with main(["--serve","0","--api-key-header","X-My-Key"]) and set PI_API_KEY or config.apiKey to 'secret'.
• Test without header: GET /pi?digits=5 returns 401 and JSON { error: "Unauthorized" }.
• Test with wrong header value: 401 response as above.
• Test with correct header: GET /pi?digits=5 returns 200 and valid pi data.
• For SSE: GET /pi/sse?digits=5 with missing header returns 401 and JSON error, with correct header streams data.
• For WebSocket: connect without header or wrong key, connection is closed; with correct header, handshake succeeds and streaming works.

# Documentation

Update README.md under HTTP API section:
• Describe API key authentication and show examples:
    export PI_API_KEY=secret
    node src/lib/main.js --serve 3000 --api-key-header X-My-Key
    curl -H "X-My-Key: secret" http://localhost:3000/pi?digits=10

Note that if no API key is configured, the server remains open as before.features/CALCULATE_PI.md
# features/CALCULATE_PI.md
# Overview
Extend the existing π calculation feature to support structured output formats and file outputs for seamless machine integration and flexible workflows.

# CLI Interface
Add the following flags to main(args):
--digits <n>          Number of decimal places to calculate (integer, default: 10, max 1000)
--format <text|json>  Output format: plain text or JSON (default: text)
--output <file>       Path to write output; if omitted, write to stdout
--help, -h            Show help information and exit

When --format is json, the tool emits a JSON object with fields:
  digits: requested digit count
  pi: computed π string

If --output is provided, write the formatted output (text or JSON) to the specified file; otherwise print to stdout.

# Implementation Details
• In src/lib/main.js, enhance argument parsing to detect --format and --output flags alongside existing --digits and --help.
• Validate that --format accepts only 'text' or 'json'; on invalid value, print an error and exit with status 1.
• After computing π via calculatePi(digits), branch on format:
  - text: retain existing behavior of printing π string
  - json: create an object { digits, pi: piString } and serialize with JSON.stringify(obj, null, 2)
• If --output is set:
  - Import fs/promises and write the formatted string to the given file path
  - On write error, print an error message and exit with status 1
• If --output is not set, console.log the formatted output and exit status 0
• Ensure backward compatibility: if --format and --output are omitted, behavior matches previous calculatePi CLI

# Testing
• Add unit tests in tests/unit/main.test.js to:
  - Invoke main with ["--digits","5","--format","json"] and verify console.log was called with valid JSON matching structure
  - Mock fs/promises.writeFile to simulate writing and verify it is invoked when --output is provided
  - Test invalid --format values result in error and exit code 1
  - Test --output with unwritable path triggers error and exit code 1
• Add e2e tests in tests/e2e/cli.test.js:
  - Run the CLI with --digits 3 --format json and parse stdout as JSON to assert fields and values
  - Run the CLI with --digits 2 --format text --output temp.txt and verify temp.txt exists with expected content

# Documentation
• Update README.md under Features to document new --format and --output flags, describe default behaviors and provide examples:
    node src/lib/main.js --digits 5 --format json
    node src/lib/main.js --digits 8 --format text --output pi.txt
• Note that JSON output enables easy integration with other tools and scriptsfeatures/COMMANDER_CLI.md
# features/COMMANDER_CLI.md
# Overview

Integrate Commander.js into the CLI entry point to replace manual argument parsing and provide a robust, declarative interface for all existing and future flags. This will simplify parsing, improve validation, auto-generate help, and make it easier to add new options.

# Implementation Details

• Add "commander" as a dependency in package.json.
• In src/lib/main.js:
  • Import { Command, Option, Argument } from "commander" and read version and description from package.json.
  • Create a Command instance named "pi-calculator" with .name(), .version(), and .description().
  • Declare options using .option() or new Option():
    --digits <n>            number of decimal places (integer, default 10, min 1, max 1000)
    --format <text|json>    output format, choices text or json (default text)
    --output <file>         file path to write output (optional)
    --help, -h              show help information (built-in)
  • Use custom arg parsers to coerce and validate numeric values and enforce ranges; rely on .choices() for format.
  • After program.parse(argv), read opts via program.opts().
  • Branch behavior:
    - If format is json: build object { digits, pi } and JSON.stringify with 2-space indent.
    - Otherwise print the PI string.
  • If opts.output is set, import fs/promises and write the formatted string to that file, handling errors by program.error() and exit code 1.
  • Remove manual argv loops, console.log/console.error argument parsing, and process.exit calls are replaced by commander’s exitOverride or program.error.
  
# Testing

• Update tests/unit/main.test.js or create tests/unit/cli-commander.test.js:
  - Mock fs/promises.writeFile to verify file writes when --output is provided.
  - Test parsing and behavior for:
    * Defaults: running with no flags prints a PI string and exits 0.
    * --digits 3 prints correct formatted output.
    * --format json prints valid JSON with digits and pi fields.
    * --output writes to file and does not print to stdout.
    * Invalid values for digits or format cause commander to display an error and exit code 1.
  • Ensure existing calculatePi unit tests remain passing.

# Documentation

• Update README.md:
  - Add a "CLI Usage" section showing examples:
      node src/lib/main.js                   # 10 digits, text
      node src/lib/main.js --digits 5        # 5 digits, text
      node src/lib/main.js --digits 5 --format json
      node src/lib/main.js --digits 8 --format json --output pi.json
  - Include a snippet of auto-generated help output showing all available options and defaults.
  - Note that commander handles validation, help, and suggestions, simplifying future extensions.
features/STREAM_PI.md
# features/STREAM_PI.md
# Overview
Enable incremental streaming of π digits as they are calculated, allowing consumers to receive and process digits in real time rather than waiting for the full computation to complete.

# CLI Interface
Extend main(args) to accept the following flags:
--stream                 Stream π digits to stdout in chunks as they are computed (default: off)
--chunk-size <n>         Number of digits per chunk when streaming (integer, default: 100)

When --stream is present, main should bypass buffering the full π string and instead write successive chunks of digits to stdout as soon as they are generated, then exit when complete.

# HTTP API
Add a new endpoint:
GET /pi/stream
  Query parameters:
    digits: integer number of decimal places (default 10)
    chunkSize: integer chunk size (default 100)
  Response:
    - Uses HTTP chunked transfer encoding
    - Writes successive chunks of π digits as plain text
    - Closes the response when all digits are sent

# Implementation Details
• Refactor calculatePi to expose an async generator getPiStream(digits, chunkSize) that:
  - Internally computes π digits in blocks (e.g. slicing the decimal portion) and yields string chunks of length up to chunkSize
• In CLI mode, detect --stream and --chunk-size, then:
  - Call getPiStream with the requested digits and chunk size
  - Use for await on the generator and write each chunk to process.stdout.write
  - Ensure process.exit(0) after streaming completes
• In HTTP server mode, under /pi/stream:
  - Parse and validate query parameters using existing zod schemas
  - Set response headers for text/plain and transfer-encoding: chunked
  - For each chunk from getPiStream, call res.write(chunk)
  - On completion, call res.end()
  - Handle client abort events by stopping the generator
• Ensure streaming works up to the maximum supported digits and endorses backpressure in HTTP mode

# Testing
• Unit tests in tests/unit/main.test.js:
  - Mock getPiStream to yield known chunks; verify main writes chunks to stdout in correct order and exits with code 0
  - Test invalid --chunk-size values trigger error and exit code 1
• E2E tests in tests/e2e/cli.test.js:
  - Run CLI with --digits 50 --stream --chunk-size 10; capture stdout and assert chunks of 10 characters until full π string received
  - Run CLI without --stream to verify existing behavior remains unchanged
• HTTP API tests in tests/unit/main.test.js:
  - Use supertest to GET /pi/stream?digits=20&chunkSize=5; buffer response chunks and assert chunk sizes and combined result matches calculatePi(20)
  - Test invalid query parameters result in 400 status and error JSON

# Documentation
Update README.md to:
• Document the --stream and --chunk-size flags under Features
• Provide CLI example:
    node src/lib/main.js --digits 200 --stream --chunk-size 50
• Document HTTP streaming example:
    curl http://localhost:3000/pi/stream?digits=100&chunkSize=25

Explain that streaming reduces initial latency and enables real-time consumption of large π calculations.features/PROGRESS_INDICATOR.md
# features/PROGRESS_INDICATOR.md
# Overview
Enable real-time progress reporting during π digit calculations in the CLI to give users visual feedback when computing large numbers of digits.

# CLI Interface
Extend main(args) to accept the following flag:
--progress            Display a progress bar during π calculation (default: off)

Behavior:
  • When --progress is present, initialize a console progress bar before starting the algorithm.
  • Update the bar as computation proceeds, reflecting the percentage of work done.
  • On completion, render the full π result and stop the progress bar.

# Implementation Details
• Add a new dependency cli-progress for terminal progress bars.
• Refactor calculatePi(digits, options) to accept an optional onProgress callback.  
  – In Machin-formula implementation, report progress after each term or iteration.  
  – In Chudnovsky series, determine total iterations and call onProgress(completed/total).
• In main.js, when parsing flags detect --progress.  
  – When enabled, instantiate cli-progress SingleBar with a format template {bar} {percentage}% | ETA: {eta}s.  
  – Pass a callback to calculatePi that updates the bar with current progress.  
  – Ensure the bar is started with total steps equal to expected iterations and is stopped on finish or error.
• Maintain backward compatibility: if --progress is absent, behavior remains unchanged.

# Testing
• Unit tests in tests/unit/main.test.js:  
  – Mock a simplified calculatePi that invokes onProgress multiple times; verify progress bar start, update, and stop calls through a stubbed cli-progress API.  
  – Test that calculatePi without --progress does not instantiate the progress bar.
• E2E tests in tests/e2e/cli.test.js:  
  – Run CLI with --digits 1000 --progress.  
  – Capture stdout and assert lines matching progress bar patterns (e.g., constructs containing percent signs).  
  – Confirm final π output is correct and that the progress bar was cleared.

# Documentation
• Update README.md under Features to document the --progress flag.  
• Provide an example usage:  
    node src/lib/main.js --digits 500 --progress
• Note that progress reporting adds minimal overhead and requires the cli-progress dependency.features/GRAPHQL_API.md
# features/GRAPHQL_API.md
# Overview

Add a GraphQL endpoint to the existing HTTP server that unifies PI calculation, digit frequency analysis, and performance benchmarking under a single flexible GraphQL schema. Clients can submit queries or mutations to compute PI, inspect digit distributions, or run benchmarks with a single HTTP POST.

# Schema Definition

Define a GraphQL schema with the following types and fields

Query
  pi(digits: Int!): PiResult
  analyzeFrequency(digits: Int!): AnalysisResult
  benchmark(digits: [Int!]!): [BenchmarkResult!]!

Type PiResult
  digits: Int!
  pi: String!

Type AnalysisResult
  digits: Int!
  counts: [Int!]!
  percentages: [Float!]!

Type BenchmarkResult
  digits: Int!
  time: Float!

# Implementation Details

• Add dependencies graphql and express-graphql to dependencies file
• In src/lib/main.js, detect a new flag --graphql to enable GraphQL server mode
• Import express, express.json, graphqlHTTP from express-graphql, and buildSchema from graphql
• Build the schema text and resolver object mapping pi analyzeFrequency and benchmark functions to existing calculatePi, analyzePi, and benchmarkPi implementations
• Mount a POST route at /graphql using graphqlHTTP with schema and root resolvers
• Apply express.json middleware before the GraphQL handler to parse request bodies
• Support query validation and error handling through graphqlHTTP default mechanisms
• Ensure existing REST endpoints remain unchanged when --graphql is not present

# Testing

• Add unit tests in tests/unit/main.test.js using supertest and vitest
  – Start the server with main(["--serve","0","--graphql"]) and capture the instance
  – POST a GraphQL query { pi(digits:5){ pi } } and assert status 200 and data pi matches 3.14159
  – POST a query for analyzeFrequency(digits:5) and assert counts array length 10 and percentages sum close to 100
  – POST a mutation or query for benchmark(digits:[10,100]) and assert an array of two objects with digits fields and numeric time
  – Test invalid queries produce GraphQL errors with status 400

# Documentation

• Update README.md to add a GraphQL API section under HTTP API
  – Document starting the server with --graphql flag and default port
  – Provide example curl commands posting JSON bodies with GraphQL queries
  – Show sample query and response for each field type
  – Note dependencies and endpoint path /graphqlfeatures/HTTP_API.md
# features/HTTP_API.md
# Overview

Add an HTTP server mode to the CLI tool that exposes π calculation and benchmarking endpoints and provides an interactive Swagger UI for API exploration. This feature enables programmatic integration, monitoring, and effortless testing of the service.

# CLI Interface

Extend main(args) to accept the following flags:

--serve <port>       Start HTTP server on the specified port (default: 3000)
--cors                Enable CORS support on all routes for cross-origin requests
--swagger-ui          Serve an interactive Swagger UI at /docs for API documentation and testing

When --serve is present, the tool launches the HTTP server instead of performing local calculations or benchmarks.

# Implementation Details

• Install and import express and cors as dependencies in package.json.
• In src/lib/main.js:  
  – After parsing args, detect opts.serve and opts.cors.  
  – Create an Express app.  
  – If opts.cors is true, apply cors() middleware globally.  
  – Apply express.json() and express.urlencoded({ extended: true }) for future extension.  

• Define routes:  
  GET /pi  
    - Query parameter digits (integer, default 10).  
    - Validate with zod. On error, respond 400 JSON { error: string }.  
    - Call calculatePi(digits) and respond JSON { digits, pi } with status 200.  

  GET /benchmark  
    - Query parameter digits (comma-separated integers, default 10,100,500).  
    - Validate list items with zod. On error, respond 400.  
    - Call benchmarkPi(digitsArray) and respond JSON array of { digits, time } objects.  

  GET /openapi.json  
    - Generate or load the OpenAPI 3.0 spec for /pi and /benchmark endpoints.  
    - Respond JSON spec with correct content type.  

• Swagger UI Integration (if --swagger-ui is true):  
  – Install swagger-ui-dist as a dependency.  
  – Import absolutePath from swagger-ui-dist.  
  – Serve static files at /docs from swagger-ui-dist.absolutePath().  
  – Instruct users to navigate to /docs?url=/openapi.json to view the API docs.  

• Start the server:  
  – Call app.listen(opts.serve) and return the server instance from main when invoked programmatically.  
  – Ensure main awaits server startup in test scenarios.

# Testing

Add unit tests in tests/unit/main.test.js with supertest and vitest:

• Start the server with main(["--serve","0"]) and capture the instance.  
• Test GET /pi?digits=5 returns status 200 and body { digits: 5, pi: string matching /^3\.14159/ }.  
• Test GET /pi?digits=invalid returns status 400 and error JSON.  
• Test GET /benchmark?digits=2,5 returns status 200 and an array of two objects with correct digits fields.  
• Test GET /openapi.json returns 200 and a valid OpenAPI JSON with paths /pi and /benchmark.  
• When --swagger-ui is supplied, test GET /docs returns status 200 and HTML containing link to swagger-ui.css.  

After tests, close the server to free the port.

# Documentation

Update README.md under a new HTTP Server section:

• Document the --serve, --cors, and --swagger-ui flags and defaults.  
• Provide examples:  
    node src/lib/main.js --serve 4000 --cors --swagger-ui  
    curl http://localhost:4000/pi?digits=50  
    curl http://localhost:4000/benchmark?digits=10,100  
    Open http://localhost:4000/docs?url=/openapi.json in a browser.  
• Note that Swagger UI assets are served under /docs and API spec under /openapi.json.  
• Ensure links and examples are accurate and show user flows for JSON APIs and UI exploration.features/SSE_API.md
# features/SSE_API.md
# Overview

Introduce a Server-Sent Events endpoint in HTTP server mode to stream π digits in real time using EventSource clients. This complements existing HTTP chunk streaming and WebSocket APIs by offering a lightweight, browser-friendly SSE protocol.

# CLI Interface

Extend main(args) to accept the following flags alongside --serve and --cors:

--sse                       Enable SSE endpoint for π streaming (default: off)
--sse-path <path>           URL path for the SSE endpoint (default: /pi/sse)
--sse-chunk-size <n>        Number of digits per SSE message (default: 100)

When --sse is provided and the server is running, clients can connect with EventSource to the specified path with query parameters digits and optionally override chunkSize.

# Implementation Details

In src/lib/main.js during HTTP server setup when --serve and opts.sse are enabled:
• Import the existing getPiStream async generator from calculation module.
• After express.json and other middleware, define a route:
  app.get(opts.ssePath, async (req, res) => {
    // Validate query params digits (integer ≥1 ≤1000) and chunkSize (positive integer)
    // On validation error respond with 400 and JSON error
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const controller = new AbortController();
    req.on('close', () => controller.abort());
    try {
      for await (const chunk of getPiStream(digits, chunkSize, { signal: controller.signal })) {
        // SSE data event per chunk
        res.write(`data: ${chunk}\n\n`);
      }
      // Signal completion
      res.write('event: done\ndata: done\n\n');
    } catch (err) {
      // On abort do nothing; on other errors send event:error
      if (!controller.signal.aborted) {
        res.write(`event: error\ndata: ${err.message}\n\n`);
      }
    } finally {
      res.end();
    }
  });

Ensure chunkSize override in query and default from opts.sseChunkSize. Existing streaming logic should accept AbortSignal for cancellation.

# Testing

Add tests in tests/unit/main.test.js using supertest or raw HTTP:
• Start server with main(['--serve','0','--sse']); capture the instance.
• Perform GET /pi/sse?digits=20&chunkSize=5 and intercept raw text events; assert status 200, content-type text/event-stream and body contains "data: " prefixes and an "event: done" event at the end.
• Test default chunk size when only --sse is enabled and query param chunkSize is omitted.
• Test invalid query parameters (non-integer digits or negative chunkSize) return status 400 and JSON error body.
• Simulate client abort by closing connection early and assert server does not hang or throw unhandled exceptions.

# Documentation

Update README.md under HTTP API section:
• Document the --sse, --sse-path, and --sse-chunk-size flags.
• Provide an example:
    // Start server with SSE enabled
    node src/lib/main.js --serve 3000 --cors --sse
    // In browser or Node.js EventSource:
    const es = new EventSource('http://localhost:3000/pi/sse?digits=100&chunkSize=20');
    es.onmessage = e => console.log('chunk', e.data);
    es.addEventListener('done', () => console.log('stream complete'));