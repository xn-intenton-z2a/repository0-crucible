features/PI_EXPORT.md
# features/PI_EXPORT.md
# Overview

Allow users to save calculated π values to a file instead of only printing to the console. This feature enhances usability for large digit counts by writing results directly to disk.

# CLI Interface

- Add flag --output-file or -o followed by a file path for the π output.  
- If provided, write the computed π string to the specified file.  
- If not provided, default to printing the π string to console.

# Implementation Details

- Extend argument parsing in src/lib/main.js to detect --output-file or -o and capture the output path.  
- After calculatePi(digits) is invoked:  
  - If an output path is set, import fs and call fs.writeFileSync(path, resultString).  
  - Otherwise, console.log the π string as before.  
- Throw a descriptive error if writing to the file fails (e.g., invalid path or permissions).
- No new dependencies are required, as fs is built-in.

# Testing

- In tests/unit/main.test.js:  
  - Simulate main(["--digits","5","--output-file","test.txt"]) and assert that test.txt exists and contains π to 5 decimal places.  
  - Simulate main(["--digits","3"]) without --output-file and capture console output, asserting it matches π to 3 decimal places.  
  - Test error handling when providing an invalid or unwritable file path, expecting a thrown error.
  
- Clean up any test files created during testing.features/PI_CACHE.md
# features/PI_CACHE.md
# Overview

Implement a persistent cache for computed π values on disk to accelerate repeated queries. When a user requests π to a certain number of digits and a cache file exists, the tool will serve the prefix from cache if available, or compute only the additional digits and append them to the cache. This dramatically reduces computation time for repeated or incremental precision requests.

# CLI Interface

- Add flag --cache-file or -c followed by an optional file path for the cache file. Default to .pi_cache in the working directory.
- Add flag --no-cache to disable cache lookup and writing.
- When --cache-file is provided, use that path; otherwise use default cache path.
- Cache operations are silent by default; add verbose logging if --verbose is enabled.

# Implementation Details

- Extend argument parsing in src/lib/main.js to detect --cache-file, --no-cache, and --verbose flags.
- On invocation:
  - If caching is enabled and cache file exists:
    - Read the cache file contents (string of π digits).
    - If requested digits <= cache length:
      - Immediately return the prefix of the cached string up to the requested length.
      - Skip calculation.
    - If requested digits > cache length:
      - Compute the additional tail segment: calculatePi(requestedDigits).slice(cacheLength).
      - Append the new segment to the cache file via fs.appendFileSync.
      - Return full π string.
  - If caching is disabled or cache file does not exist:
    - Compute π via calculatePi and if caching enabled, write full string to new cache file.
  - All file system errors (permission, invalid path) should throw descriptive errors.

# Testing

- In tests/unit/main.test.js:
  - Use a temporary test cache file path and simulate main with --digits, --cache-file testCache.
    - First invocation should compute and create the file containing π digits to N.
    - Second invocation with smaller digits should read from cache and not call calculatePi internally (mock function to track calls).
    - Third invocation with larger digits should call calculatePi only for the delta and append to cache file.
  - Test that --no-cache forces full recomputation and does not create or modify cache file.
  - Clean up any temporary cache files after each test.
features/PERFORMANCE_BENCHMARK.md
# features/PERFORMANCE_BENCHMARK.md
# Overview

Introduce a benchmarking mode that measures execution time and memory usage for π calculations at one or more precision levels. This feature enables users to assess performance characteristics directly from the CLI and choose optimal precision targets based on tangible metrics.

# CLI Interface

- Add a flag `--benchmark` or `-b` that accepts an optional comma-separated list of digit counts (e.g., `--benchmark 10,100,500`).
- If no list is provided, default to benchmarking at 10, 100, and 500 digits.
- Add an option `--json` to emit the benchmark report as a JSON array instead of a console table.

# Implementation Details

- Extend main argument parsing in `src/lib/main.js` to detect the `--benchmark` flag and parse digit targets.
- For each specified digit count:
  - Record start time using `performance.now()`.
  - Invoke the existing `calculatePi(digits)` function.
  - Record end time and compute duration.
  - Capture memory usage delta via `process.memoryUsage().heapUsed` before and after.
- Aggregate results into a structured array of objects:
  - digitCount: number
  - durationMs: number
  - memoryBytes: number
- If `--json` is present, output `JSON.stringify(results, null, 2)`; otherwise use `console.table(results)`.
- Ensure error handling for invalid or out-of-range digit inputs.

# Testing

- In `tests/unit/main.test.js`, add unit tests that:
  - Simulate `main(["--benchmark","5,10"])` and verify the returned or printed report structure contains entries for 5 and 10.
  - Confirm `--json` produces valid JSON parseable to an array of the correct length.
  - Test default benchmarking behavior when no targets are provided.
  - Validate error thrown on non-integer or out-of-range values in the benchmark list.features/BENCHMARK_VISUALIZATION.md
# features/BENCHMARK_VISUALIZATION.md
# Overview

Generate PNG bar chart visualizations of benchmark results for π calculation across multiple precision targets. This feature enables users to produce visual artifacts that help identify performance bottlenecks and compare execution characteristics at a glance.

# CLI Interface

- Add flag --benchmark-chart or -bc that accepts an optional comma-separated list of digit counts (e.g., --benchmark-chart 10,100,500).
- If no list is provided, default to benchmarking at 10, 100, and 500 digits.
- Add option --out or -o followed by a file path for the output PNG image; default to benchmark.png.

# Implementation Details

- Extend argument parsing in src/lib/main.js to detect the --benchmark-chart flag, parse digit targets, and read the output path.
- For each specified digit count:
  - Record start time using performance.now().
  - Invoke the existing calculatePi(digits) function.
  - Record end time and compute duration.
  - Capture memory usage delta via process.memoryUsage().heapUsed before and after.
- Aggregate results into an array of objects with fields digitCount, durationMs, and memoryBytes.
- Add a dependency on chartjs-node-canvas to render a bar chart:
  - X axis displays digitCount values.
  - Y axis displays durationMs values.
  - Optionally overlay memoryBytes as a secondary dataset.
- Render the chart to a PNG buffer and write it to the specified output file using fs.writeFileSync.
- Throw descriptive errors for invalid digit arguments or file write failures.

# Testing

- In tests/unit/main.test.js, mock performance.now and process.memoryUsage to return fixed values.
- Call main(["--benchmark-chart","5,10","--out","test.png"]) and assert that test.png is created on disk.
- Use fs.readFileSync to read the file and confirm the PNG file signature (first eight bytes) matches the standard PNG header.
- Test default behavior with no digits or output path, verifying the creation of benchmark.png in the working directory.
- Verify the CLI throws errors on non-integer digit lists or inaccessible output file paths.features/ALGORITHM_SELECTION.md
# features/ALGORITHM_SELECTION.md
# Overview

Introduce a new flag to let users choose which algorithm to use for π calculation. Users can select from supported implementations to compare convergence speed and accuracy, or to employ specialized methods like Chudnovsky for high-precision results.

# CLI Interface

- Add flag --algorithm or -a followed by one of the following values:
  - `machin` (default): a Machin-like arctangent series implementation
  - `chudnovsky`: the Chudnovsky fast converging series
  - `bbp`: the Bailey-Borwein-Plouffe digit extraction formula
- Example usage:
  node src/lib/main.js --digits 100 --algorithm chudnovsky

# Implementation Details

- Extend the calculatePi function signature in src/lib/main.js to accept an optional algorithm parameter.
- Create separate internal functions:
  - calculatePiMachin(digits)
  - calculatePiChudnovsky(digits)
  - calculatePiBBP(digits)
- In calculatePi, use a switch or mapping on the algorithm argument to dispatch to the chosen function.
- Validate that the algorithm argument matches one of the supported names and throw an error on unknown values.
- Ensure all three algorithms produce identical output for small digit counts (e.g., first 10 digits) for consistency tests.

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Verify calculatePi with each algorithm flag returns correct known values (e.g., π to 5 or 10 digits).
  - Test that missing or unrecognized algorithm values result in a descriptive error.
  - Confirm default behavior uses the Machin implementation when no flag is provided.features/PI_CALCULATOR.md
# features/PI_CALCULATOR.md
# Overview

Provide a new command‒line option to calculate π to a specified number of decimal places using a performant algorithm. This feature enables users to request an arbitrary precision π value directly from the CLI, printed as text output.

# CLI Interface

- Add a new flag `--digits` or `-d` followed by a positive integer to configure how many decimal places of π to calculate.  
- If no `--digits` flag is provided, the CLI prints π to a default precision of 10 decimal places.
- Validate that the digits argument is a non‒negative integer less than or equal to 1000.

# Implementation Details

- Implement a function `calculatePi(digits)` in `src/lib/main.js` that returns a string representation of π to the requested precision.  
- Use a Machin-like formula or arctangent series for convergence efficiency.  
- Update `main(args)` to parse the new flags, call `calculatePi`, and output the result.
- Include error handling for invalid or out‒of‒range values.

# Testing

- Add unit tests in `tests/unit/main.test.js` to verify correct π output for small digit values (e.g., 0, 1, 5, 10).  
- Test that invalid inputs throw a descriptive error.  
- Ensure the default precision path produces the expected 10 decimal places.features/HTTP_SERVER.md
# features/HTTP_SERVER.md
# Overview

Provide an HTTP server mode that exposes π calculation and benchmarking as JSON API endpoints. This feature allows users to invoke core functionality remotely over HTTP and integrate with other tools or web clients.

# CLI Flags

- Add flag --serve or -s with optional port number (e.g. --serve 4000).  
- If no port is provided, default to port 3000.  
- When --serve is present, the CLI starts the HTTP server and does not print to console directly.

# API Endpoints

- GET /pi?digits={n}
  Returns a JSON object with value: π to n decimal places.
  Query parameter digits is a nonnegative integer up to 1000, default 10.

- GET /benchmark?digits={list}
  Returns a JSON array of benchmark results for each digit target.
  Query parameter digits is a comma-separated list of integers, default [10,100,500].
  Each result object contains digitCount, durationMs, memoryBytes.

# Implementation Details

- Extend src/lib/main.js argument parsing to detect --serve or -s and optional port.
- When serving:
  - Import Node http module and calculatePi and benchmarking logic.
  - Create an HTTP server listening on the configured port.
  - On incoming requests, parse URL and query params.
  - Route path /pi to calculatePi and return JSON response { value: string }.
  - Route path /benchmark to run in-process benchmarking per existing algorithm and return JSON of results.
  - Respond with 400 status and descriptive JSON error for invalid paths or inputs.
  - On server start, print listening address to console.

# Testing

- In tests/unit/main.test.js start the server by calling main(["--serve","0"]) and capturing the returned server instance.
- Use a simple HTTP client (fetch API or Node http.request) to request /pi and /benchmark endpoints.
- Verify status codes, JSON structure, and error handling for invalid inputs.
- Ensure server closes after tests to avoid hanging processes.
features/PI_DASHBOARD.md
# features/PI_DASHBOARD.md
# Overview

Provide an interactive web-based dashboard for π calculations, algorithm selection, performance benchmarking, and visualizations.  Users can launch a single HTTP server process that serves a dynamic HTML interface with inputs and charts, enabling browser-based exploration without installing separate tooling.

# Architecture

- Extend existing --serve HTTP server mode in src/lib/main.js to also serve a static dashboard at the root path `/`.
- Use EJS (already in dependencies) to render a simple HTML template with embedded JavaScript for client-side requests and Chart.js for rendering charts.
- Leverage existing API endpoints `/pi` and `/benchmark` to drive UI interactions.

# User Interface

- Input controls:
  - A numeric input for digit count (default 10).
  - A dropdown for algorithm selection (machin, chudnovsky, bbp).
  - A multi-select or comma-separated input for benchmark digit list (default 10,100,500).
  - Buttons to "Compute π" and "Run Benchmark".

- Output areas:
  - A text area displaying the resulting π value.
  - A bar chart showing execution time per digit count.
  - An optional memory usage line chart toggled by a checkbox.

# Implementation Details

- In src/lib/main.js:
  - Detect a new flag `--dashboard` or `-D` (optional port number, e.g. `--dashboard 4000`).  When present, start HTTP server and do not print CLI output.
  - On server startup:
    - Precompile an EJS template string in code for the dashboard page.
    - Serve GET `/` to render the EJS template with the configured port and API paths.
    - Serve static client-side assets inline or via EJS script tags for Chart.js (loaded from CDN).
    - Retain existing `/pi` and `/benchmark` JSON endpoints for data.

- Update package.json dependencies:
  - Ensure Chart.js CDN usage in template; no new npm dependency required for frontend.

# Testing

- In tests/unit/main.test.js:
  - Start the dashboard server with `main(["--dashboard","0"])`, capture the returned server instance.
  - Use Node http request to GET `/` and assert status 200 and Content-Type `text/html`.
  - Verify the returned HTML contains key elements: `<input` for digits, `<canvas` tags for charts.
  - Cleanly close the server after tests.

- Ensure existing API tests for `/pi` and `/benchmark` still pass under dashboard mode.
