features/PI_BENCHMARK.md
# features/PI_BENCHMARK.md
# Overview

Provide a unified π computation and benchmarking pipeline that implements multiple high-precision algorithms, configurable digit length, optional performance measurement, and text or PNG output. This feature merges basic calculation and benchmarking into a single core capability that delivers precise results and timing metrics.

# Implementation

1. Command-Line Interface
   - Parse flags in src/lib/main.js using minimist
     • --algorithm <leibniz|gauss-legendre|chudnovsky> to choose the calculation method
     • --digits <n> to specify number of decimal places (default 1000)
     • --format <text|png> to select output format (default text)
     • --output <path> to write result to a file, fallback to stdout if omitted
     • --benchmark to measure execution time and throughput in digits per millisecond

2. Algorithm Modules
   - Inline implementations in main.js or local helper functions:
     • Leibniz series with dynamic iteration count tuned to digit precision
     • Gauss-Legendre method using BigInt and manual scaling for quadratic convergence
     • Chudnovsky formula leveraging native BigInt with manual decimal placement for rapid convergence
   - Use a simple decimal scaling approach or a lightweight decimal library if needed

3. Benchmarking
   - When --benchmark is enabled, wrap computation in performance.now() before and after
   - Calculate total time and throughput (digits per millisecond)
   - Include timing summary in text output or annotate PNG caption

4. Output Generation
   - Text format: write the computed π digits and benchmark summary as UTF-8 text
   - PNG format: use an existing canvas or charting library to render digits or a simple error-margin plot
   - Write files to the specified output path or stdout for text

# Testing

- Add unit tests in tests/unit/benchmark.test.js
  • Verify first 10 digits of π for each algorithm
  • Confirm benchmark flag produces positive timing values
  • Simulate CLI calls with various flags and check correct output format and file creation

# Documentation

- Update README.md:
  • Document each new CLI flag with description and defaults
  • Provide example commands for computing π with and without benchmarking in text and PNG formats
  • Describe expected output structure and how to interpret timing metricsfeatures/PI_CALCULATION.md
# features/PI_CALCULATION.md
# Overview

Enable direct command-line computation of π to arbitrary precision, complementing the existing HTTP API and argument echo. Users can specify digit count, choose algorithm, and direct output to stdout or a file without starting a server.

# Implementation

1. Argument Parsing
   • In src/lib/main.js, enhance minimist invocation with flags:
     – --algorithm <chudnovsky|gauss-legendre|leibniz> (default chudnovsky)
     – --digits <n> (integer ≥ 0, default 1000)
     – --output <path> (file path; if omitted, write to stdout)
     – --benchmark (boolean) to include timing and throughput
   • Retain --serve exclusivity: when --serve is present, start HTTP server; otherwise use CLI mode.

2. Input Validation
   • Use zod to coerce and validate digits and algorithm:
     – digits must be integer ≥ 0
     – algorithm must match one of the supported values
   • On validation failure, print descriptive error to stderr and exit with code 1.

3. Computation and Timing
   • Record start time with performance.now().
   • Invoke computePi(digits, algorithm).
   • Record end time and compute elapsed time (ensure minimum 1 ms).
   • If --benchmark is set, calculate throughput as digits / elapsed ms.

4. Output Handling
   • If --output is provided:
     – Import fs/promises and write UTF-8 text containing π digits, and if benchmarking, timing summary.
     – On success, exit with code 0; on file error, print to stderr and exit with code 1.
   • If --output is omitted:
     – Write π digits (and optional benchmark summary) to stdout.
     – Exit process with code 0.

# Testing

- Add tests in tests/unit/cli-calculation.test.js:
  • Simulate process.argv for valid flags; capture stdout; assert correct π prefix and no extra logs.
  • Test writing to a temporary file; verify file contents match computed π and included timing when benchmark is enabled.
  • Simulate invalid digits (negative or non-integer) and invalid algorithm; capture stderr and assert exit code 1.

# Documentation

- Update README.md under a new "CLI Calculation" section:
  • Document each flag (--algorithm, --digits, --output, --benchmark) with defaults and types.
  • Provide example commands:
      node src/lib/main.js --algorithm gauss-legendre --digits 500 --output pi.txt
      node src/lib/main.js --digits 1000 --benchmark
  • Note that --serve remains exclusive and that CLI mode covers computation without HTTP server.features/PI_HTML_REPORT.md
# features/PI_HTML_REPORT.md
# Overview

Introduce the ability to generate a comprehensive HTML report for π calculations, combining algorithm results, benchmark metrics, and visualizations into a single shareable document. This feature leverages existing charting and templating dependencies to produce an interactive summary that users can open in any web browser.

# Implementation

1. Command-Line Interface
   - Add a new flag `--report <path>` to main.js argument parsing using minimist.
   - When provided, compute π and benchmark data as usual, then invoke the report generator to write an HTML file at the specified path.

2. Report Generation Module
   - Create an inline templating routine in src/lib/main.js using EJS to render an HTML template.
   - Template sections:
     • Summary: algorithm name, digits requested, execution time, and throughput.
     • Benchmark Chart: embed a base64-encoded PNG or inline SVG of error margin vs iteration count.
     • Details Table: list algorithm parameters and timing metrics.
   - Use existing PNG output logic if `--format png` was used; otherwise generate a lightweight inline chart using a JS charting library CDN link.

3. Dependencies
   - Reuse EJS dependency (already declared) for templating.
   - Add no new dependencies; include chart.js via a `<script>` tag in the HTML template.

# Testing

- Unit tests in tests/unit/html-report.test.js:
  • Simulate CLI calls with `--report report.html` and verify that the HTML file is created.
  • Assert that the file contains expected sections (Summary, Benchmark Chart, Details Table) by reading its contents.
  • Test fallback behavior when report path is invalid or unwritable.

# Documentation

- Update README.md:
  • Document the `--report` flag in the CLI options section.
  • Provide an example command: node src/lib/main.js --algorithm chudnovsky --digits 500 --benchmark --report pi-report.html.
  • Describe the structure of the generated HTML report and how to view it in a browser.features/PI_PROGRESS.md
# features/PI_PROGRESS.md
# Overview

Introduce a real-time progress indicator for long-running π computations, giving users visibility into algorithm progress, estimated completion time, and iteration count. This enhancement improves user experience when calculating large digit counts by providing feedback and confidence during execution.

# Implementation

1. Command-Line Interface
   - Add a new flag `--progress` (boolean) to main.js argument parsing using minimist.
   - When `--progress` is enabled, display a dynamic progress bar in the console during computation.

2. Progress Bar Integration
   - Add dependency `cli-progress` to dependencies in package.json.
   - For iterative algorithms (Leibniz series, Gauss-Legendre, Chudnovsky), determine total work units (e.g., number of iterations or precision steps).
   - Initialize a `cli-progress` bar before computation begins, configured with total iterations or digit count.
   - On each major iteration or precision increase, update the progress bar to reflect work done.
   - Stop and clear the progress bar upon completion, then output final π result as usual.

3. Dependency Management
   - Add `cli-progress` to package.json dependencies.

# Testing

- Unit tests in tests/unit/progress.test.js:
  • Simulate a short computation with `--progress` enabled and verify that the progress bar methods start, update, and stop without errors.
  • Ensure that disabling `--progress` yields no progress bar output and returns only π result.

# Documentation

- Update README.md:
  • Document the `--progress` flag under CLI options.
  • Provide an example command: node src/lib/main.js --algorithm chudnovsky --digits 10000 --progress.
  • Describe expected console output including the progress bar and final π output.
features/PI_HTTP_API.md
# features/PI_HTTP_API.md
# Overview

Extend the CLI library to serve an HTTP API that computes π to arbitrary precision on request and returns JSON or PNG results. This addition transforms the tool from a pure CLI into a lightweight microservice, enabling integrations with web applications and remote clients.

# Implementation

1. HTTP Server Setup
   - Add Express as a dependency in package.json.
   - In src/lib/main.js, detect the --serve flag and launch an Express server on a configurable port (default 3000).

2. API Routes
   - GET /pi
     • Query parameters: digits (integer), algorithm (leibniz, gauss-legendre, chudnovsky), format (json, png).
     • Response: JSON with computed digits, algorithm, time taken, or PNG image when format=png.
   - GET /benchmark
     • Accepts the same parameters but always returns detailed timing and throughput metrics in JSON.

3. Integration with Existing Algorithms
   - Refactor each π algorithm implementation into separate functions in src/lib/main.js or a new internal module.
   - The HTTP routes invoke these functions and measure execution time with performance.now().

4. Configuration
   - Allow customizing server port via environment variable SERVER_PORT or CLI option --port when using --serve.

# Testing

- Unit tests in tests/unit:
  • Import and call the algorithm functions directly to verify correctness of first 10 digits.
  • Simulate HTTP server start without errors.
- E2E tests in tests/e2e/cli.test.js:
  • Use a HTTP client (such as supertest) to send GET requests to /pi and /benchmark endpoints.
  • Verify status codes, response structure, and sample values.

# Documentation

- Update README.md:
  • Add instructions to install express and launch the HTTP server with npm run serve.
  • Describe the /pi and /benchmark endpoints with examples.
  • Include sample curl commands for JSON and PNG responses.features/PI_CACHE.md
# features/PI_CACHE.md
# Overview

Introduce a persistent caching mechanism to store and reuse previously computed π digits and benchmark metrics, reducing compute time for repeated or incremental requests.

# Implementation

1. Cache Storage
   • Implement a cache directory configurable via --cache-dir or CACHE_DIR environment variable.
   • Store cache entries keyed by algorithm name and digit count in JSON or binary files.
   • Maintain a cache index file for quick lookup of available entries.

2. CLI Options
   • --cache-dir <path> to specify custom cache directory.
   • --no-cache to disable cache lookup and storage.
   • --cache-format <json|binary> to choose cache serialization format.

3. Cache Lookup and Update
   • On each compute request, check cache index for existing entry matching algorithm and digits.
   • If found and caching enabled, load result and timing metrics from cache and skip computation.
   • If not found or caching disabled, compute π, then serialize and save result and metrics to cache.
   • Enforce a cache cleanup policy based on maximum total size or entry count to limit disk usage.

# Testing

- Unit tests for cache lookup logic, serialization, and deserialization.
- Simulate CLI compute calls with caching enabled and disabled to verify correct behavior and fallback logic.

# Documentation

- Update README.md with new cache-related CLI flags and usage examples.
- Document cache directory structure, index format, and format options in Usage section.features/PI_ALGORITHMS.md
# features/PI_ALGORITHMS.md
# Overview

Implement high-precision π calculation algorithms using a decimal arithmetic library. Replace the placeholder computePi function with dedicated implementations for Leibniz, Gauss–Legendre, and Chudnovsky methods, supporting arbitrary digit counts and accurate results.

# Implementation

1. Dependencies
   Add decimal.js to package.json dependencies.

2. Algorithm Modules
   - Import Decimal from decimal.js in src/lib/main.js.
   - Implement computeLeibniz(digits) using series summation until reaching the desired precision.
   - Implement computeGaussLegendre(digits) using iterative arithmetic-geometric mean with Decimal for quadratic convergence.
   - Implement computeChudnovsky(digits) using the standard Chudnovsky formula with Decimal for rapid convergence.
   - Update computePi(digits, algorithm) to switch on algorithm and invoke the corresponding function, returning a string of the computed π digits.

3. Performance Measurement
   Retain existing performance.now timing logic around computePi calls for benchmarking and HTTP responses.

# Testing

- Create tests/unit/algorithm.test.js:
  * For each algorithm, verify the first 10 digits match reference pi digits 3.1415926535.
  * Test edge cases: digits=0 returns "3", digits=1 returns "3.1".
  * Validate algorithm selection and error handling when algorithm is unsupported.
- Update existing API tests to rely on new computePi behavior for accuracy assertions.

# Documentation

- README.md:
  * Under Features, describe the new high-precision algorithms.
  * Add examples for CLI: node src/lib/main.js --algorithm gauss-legendre --digits 1000
  * Add examples for HTTP: curl "/pi?digits=50&algorithm=chudnovsky"
  * Note that algorithm selection now yields mathematically accurate digits.features/CLI_HELP.md
# features/CLI_HELP.md
# Overview

Add a built-in help command so users can discover available options and usage patterns without reading external docs. When invoked with --help or -h, the tool prints a structured usage message and exits.

# Implementation

1. Dependency Update
   • Add "minimist" to dependencies in package.json.

2. Argument Parsing in main.js
   • Import minimist at the top of src/lib/main.js.
   • In main(), call minimist on the raw args array, defining boolean flags ["help", "h"] and aliases { h: "help" }.
   • Check parsedArgs.help; if true:
     - Write a multi-line usage message to stdout. Include:
       * Invocation syntax: node src/lib/main.js [options]
       * List of supported flags with brief descriptions and defaults.
     - Call process.exit(0).
   • Otherwise proceed with existing logic.

3. Usage Message Content
   • Show each flag and alias: --help, -h, --algorithm, --digits, --format, --output, --benchmark, --report, --progress, --serve, --cache-dir, --no-cache, --sweep, --algorithms, --port.
   • Include default values where applicable.

# Testing

- Create tests/unit/help.test.js
  • Simulate process.argv including ['node', 'src/lib/main.js', '--help'] and capture stdout. Assert stdout contains "Usage:" and each flag description, and process.exit was called with code 0.
  • Repeat for ['node', 'src/lib/main.js', '-h'].
  • Ensure main() does not throw when help is not requested.

# Documentation

- Update README.md:
  • Under Usage add a bullet for --help and -h options.
  • Provide example commands:
      node src/lib/main.js --help
      node src/lib/main.js -h

  • Confirm that "npm run start" shows help when --help is passed.
features/PI_SWAGGER_UI.md
# features/PI_SWAGGER_UI.md
# Overview

Add a Swagger UI endpoint that serves interactive API documentation for all existing HTTP routes. Users can explore and test the /health, /pi, and /benchmark endpoints visually in their browser.

# Implementation

1. Dependencies
   - Add swagger-ui-express to package.json dependencies.
   - Use js-yaml to serialize OpenAPI spec if needed.

2. Express Setup
   - In src/lib/main.js, import swaggerUi from swagger-ui-express and buildOpenApiSpec helper that constructs the OpenAPI spec using existing zod schemas and ALGORITHMS array.
   - Within createApp, after defining routes, mount swaggerUi.serve and swaggerUi.setup(openapiSpec) at path /docs.
   - Add a new GET /openapi.json route that responds with the raw OpenAPI JSON spec.

3. CLI Flag
   - Introduce --serve-docs alias for --serve to automatically enable the /docs endpoint when the server starts.

# Testing

- Unit tests in tests/unit/swagger-ui.test.js
  • Send GET request to /docs and expect HTML containing SwaggerUIBundle script references.
  • Send GET request to /openapi.json and assert JSON includes openapi, info, and paths for /health, /pi, and /benchmark.
  • Simulate server start without --serve-docs and verify /docs returns 404.

# Documentation

- Update README.md:
  • Document the /docs endpoint under HTTP API section.
  • Describe the /openapi.json route and how to access the interactive docs.
  • Provide example browser URL to view the Swagger UI and curl command to fetch the raw spec.features/PI_PERFORMANCE_MATRIX.md
# features/PI_PERFORMANCE_MATRIX.md
# Overview

Introduce a performance matrix sweep feature that runs π calculations across a range of digit lengths and algorithms, capturing timing metrics for each combination. This enables users to explore how execution time scales with precision and compare algorithm performance over multiple samples.

# Implementation

1. Command-Line Interface
   - Add a new `--sweep <start:step:end>` option to main.js argument parsing using minimist to specify a range of digit counts (for example 100:500:5000).
   - Allow `--algorithms <list>` to choose one or more algorithms (leibniz, gauss-legendre, chudnovsky) in a comma-separated list.
   - Add `--format <csv|png>` for output format and `--output <path>` to specify destination file.
   - Default to chudnovsky only, range 100:100:1000, CSV output to stdout if not specified.

2. Sweep Execution
   - Parse sweep range into an array of digit values.
   - For each algorithm and digit count, compute π using existing implementations and measure execution time with performance.now().
   - Collect results into a data table with columns: algorithm, digits, timeMs, throughput (digits per millisecond).

3. Output Generation
   - CSV format: serialize the data table into comma-separated values with header row.
   - PNG format: use chartjs-node-canvas (add as dependency) to render a line chart: x-axis digit counts, y-axis execution time, separate series per algorithm, and save image to the specified path.

# Testing

- Unit tests in tests/unit/performance-matrix.test.js:
  • Validate correct parsing of sweep ranges and algorithm lists.
  • Mock π calculation functions to simulate constant work and verify timing collection and data table structure.
  • Simulate CLI calls with small ranges and check CSV output lines and header.

# Documentation

- Update README.md:
  • Document the `--sweep`, `--algorithms`, `--format`, and `--output` flags under CLI options.
  • Provide example commands:
    node src/lib/main.js --sweep 100:200:1000 --algorithms leibniz,gauss-legendre --format png --output performance.png
  • Describe the structure of generated CSV and the appearance of the PNG chart and how to interpret it.features/DIAGNOSTICS.md
# features/DIAGNOSTICS.md
# Overview

Add a diagnostics mode to the CLI that outputs detailed environment and runtime information. This feature helps users and operators inspect system characteristics, library versions, and execution environment for troubleshooting and auditing purposes.

# Implementation

1. CLI Flag
   - Add a new boolean flag --diagnostics to src/lib/main.js argument parsing via minimist.
   - When --diagnostics is present, bypass normal computation or server startup and trigger diagnostics output.

2. Data Gathering
   - Import the os module and read process and package.json metadata.
   - Collect information including:
     • Node version and executable path
     • Operating system platform, release, CPU architecture, and CPU core count
     • Total and free system memory
     • Versions of key dependencies from package.json (express, minimist, zod)
     • Current working directory and environment variables summary

3. Output Generation
   - Construct a diagnostics object with the collected fields.
   - If an --output <path> flag is provided:
     • Use fs/promises to write the JSON string of diagnostics to the file path in UTF-8.
     • On success exit with code 0, on error print error to stderr and exit with code 1.
   - If --output is omitted:
     • Print the diagnostics object as pretty JSON to stdout.
     • Exit with code 0.

# Testing

- Create tests/unit/diagnostics.test.js:
  • Simulate process.argv with --diagnostics and capture stdout. Parse the JSON and assert required keys exist and have correct types.
  • Simulate with --diagnostics --output temp.json and verify the file is created and contains valid JSON with matching fields.
  • Simulate file write errors by pointing --output to an invalid directory and assert exit code 1 and error message on stderr.

# Documentation

- Update README.md under CLI options:
  • Document the --diagnostics flag, describe its purpose and output format.
  • Document the optional --output flag and behavior.
  • Provide example commands:
      node src/lib/main.js --diagnostics
      node src/lib/main.js --diagnostics --output diagnostics.json
features/PI_OPENAPI_SPEC.md
# features/PI_OPENAPI_SPEC.md
# Overview

Add a new command to generate an OpenAPI (Swagger) specification for the existing HTTP API endpoints, enabling users and tools to discover and integrate the service programmatically.

# Implementation

1. CLI Flag
   - Add a new flag --generate-openapi <path?> to src/lib/main.js argument parsing using minimist.
   - When provided with a file path, write the spec file at that location. When provided without a path, print the JSON or YAML spec to stdout.

2. OpenAPI Spec Generation
   - Build an OpenAPI 3.0 spec object with:
     * info: title from package.json.name, version from package.json.version
     * servers: one entry using SERVER_PORT default or CLI port flag
     * paths: definitions for /health, /pi, and /benchmark endpoints
       • parameters: digits, algorithm, format, etc.
       • responses: 200 and 400 with JSON schemas
   - Derive parameter schemas from existing zod validators and ALGORITHMS array.
   - Serialize spec to JSON. If output extension is .yaml or flag --yaml is present, use js-yaml to output YAML.

3. File I/O and Error Handling
   - Import fs/promises to write files.
   - Validate output directory and file permissions; on error, print to stderr and exit with code 1.
   - On success, exit with code 0.

# Testing

- Add tests in tests/unit/openapi.test.js:
  • Simulate CLI invocation with --generate-openapi spec.json and assert file exists and contains valid JSON with openapi and paths keys.
  • Simulate flag without path and capture stdout; parse output as JSON and assert expected spec fields.
  • Provide an invalid output path and verify process exits with code 1 and prints an error message.

# Documentation

- Update README.md:
  • Under CLI options, document --generate-openapi [path] and --yaml for YAML output.
  • Provide example commands:
      node src/lib/main.js --generate-openapi openapi.json
      node src/lib/main.js --generate-openapi > spec.yaml --yaml
  • Describe how to load the spec into Swagger UI or other tools.features/PI_VISUALIZATION.md
# features/PI_VISUALIZATION.md
# Overview

Add visualization support for π computations, enabling users to produce PNG charts via the CLI with a --visualize flag and via an HTTP /visualize endpoint. Visualizations include digit sequence plots and performance charts to help analyze algorithm behavior and results.

# Implementation

1. Command-Line Interface
   • Add a new boolean flag --visualize to src/lib/main.js argument parsing using minimist.
   • When --visualize is provided alongside --digits and --algorithm, compute π and optionally benchmark performance.
   • Generate a PNG chart using chartjs-node-canvas:
     - If --benchmark is also enabled, render an iterations vs error or throughput chart.
     - Otherwise, render the digits sequence as a visual representation (e.g., heatmap or line).
   • Use --output <path> to write the PNG file; default to stdout or a default filename visualize.png if omitted.

2. HTTP Endpoint
   • In createApp(), add GET /visualize route.
   • Parse query parameters: digits (integer), algorithm (enum), mode (digits|benchmark, default digits).
   • Compute π and metrics, generate a PNG chart buffer via chartjs-node-canvas.
   • Respond with status 200 and content-type image/png containing the PNG image.
   • Handle validation errors with 400 JSON error responses using zod.

3. Dependencies
   • Add chartjs-node-canvas to dependencies in package.json.
   • Import ChartJSNodeCanvas and configure canvas dimensions via options.

# Testing

- Unit tests in tests/unit/visualize.test.js:
  • Simulate CLI invocation with --visualize, capture output file or stdout image data, and assert buffer begins with PNG signature.
  • Test combining --visualize and --benchmark to ensure chart reflects performance data without errors.
  • Use supertest to call GET /visualize?digits=10&algorithm=chudnovsky and expect status 200 and content-type image/png.
  • Validate error cases: missing or invalid digits or algorithm return 400 JSON.

# Documentation

- Update README.md:
  • Document the --visualize flag under CLI options, describe default filename, required flags, and examples:
    node src/lib/main.js --digits 1000 --algorithm chudnovsky --visualize --output pi.png
  • Describe the /visualize HTTP endpoint, query parameters, and example curl command:
    curl http://localhost:3000/visualize?digits=500&algorithm=gauss-legendre > chart.png