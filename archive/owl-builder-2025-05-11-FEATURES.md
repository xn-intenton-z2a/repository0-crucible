features/PI_VISUALIZER.md
# features/PI_VISUALIZER.md
# PI_VISUALIZER

# Description
Adds a command line option to produce a PNG visualization of the digit frequency histogram of the computed π value. This feature uses node-canvas and chart.js to render a bar chart and save it as an image file.

# CLI Usage
node src/lib/main.js --pi <digits> --visualize-histogram <outputPath> [--benchmark]

--pi                  Number of decimal places to compute π
--visualize-histogram  Path to output the PNG histogram image (e.g., histogram.png)
--benchmark           Optional flag; when provided, report the time taken to compute π

# Implementation
- Add dependencies "canvas" and "chart.js" to package.json
- Extend argument parser in main.js to detect:
  - --visualize-histogram <outputPath>
- After computing π and optional digit frequency counts:
  - Generate a bar chart with labels 0–9 and data from digit frequencies
  - Initialize a Canvas of size 800×600
  - Use Chart.js to draw the bar chart onto the Canvas
  - Export the Canvas to a PNG Buffer
  - Write the Buffer to the specified output file path
- Preserve existing behavior for --benchmark and --digit-frequency flags

# Testing
- Mock the Canvas and verify that a PNG Buffer is produced and written to disk
- Test invoking with --visualize-histogram creates a file at the given path with non-zero size
- Verify that chart data in the output matches expected digit frequency for known π segments
- Confirm appropriate error is thrown when outputPath is missing or invalidfeatures/PI_SERVER.md
# features/PI_SERVER.md
# PI_SERVER

# Description
Adds a CLI option to start an HTTP server that exposes a REST API for computing π values using the supported algorithms. The server listens on a configurable port and responds to GET /pi requests with JSON containing the computed π value, optional digit frequency histogram, and computation time.

# CLI Usage
node src/lib/main.js --serve [--port <port>] --pi <digits> [--algorithm <algorithmName>] [--samples <count>] [--seed <number>] [--benchmark] [--digit-frequency]

# API Endpoints
GET /pi?digits=<number>&algorithm=<name>&samples=<count>&seed=<number>&benchmark=<boolean>&digitFrequency=<boolean>

# Implementation
- Extend main.js argument parser to detect --serve and --port.
- When --serve is provided, use the built-in http module to create an HTTP server bound to the specified port (default 3000).
- Parse and validate query parameters using zod for digits, algorithm, samples, seed, benchmark, and digitFrequency.
- Reuse existing π computation functions for Gauss-Legendre, Chudnovsky, and Monte Carlo algorithms.
- Compute π and gather optional benchmark time and digit frequency.
- Respond with a JSON object { pi: string, digits: number, algorithm: string, benchmarkMs?: number, digitFrequency?: Record<string, number> }.
- Set Content-Type to application/json and handle invalid requests with a 400 status code and error message.

# Testing
- Mock http.createServer in unit tests to simulate GET requests and capture responses.
- Verify GET /pi returns correct JSON structure and values for known digit inputs.
- Test error responses for missing or invalid query parameters.
- Ensure the server cleans up and shuts down properly after tests complete.features/PI_CALCULATOR.md
# features/PI_CALCULATOR.md
# PI_CALCULATOR

# Description
Supports computing π to a specified number of decimal places using a choice of algorithms. Enables selection between Gauss-Legendre, Chudnovsky, and Monte Carlo approaches. Retains optional benchmarking and digit frequency histogram generation. Provides flexible controls for Monte Carlo simulation parameters.

# CLI Usage
node src/lib/main.js --pi <digits> --algorithm <algorithmName> [--samples <count>] [--seed <number>] [--benchmark] [--digit-frequency]

--pi                  Number of decimal places to compute π (required)
--algorithm           Algorithm to use: gauss-legendre, chudnovsky, monte-carlo (default: gauss-legendre)
--samples             Number of random samples for monte-carlo algorithm (only for monte-carlo, default: 1e6)
--seed                Seed value for Monte Carlo random number generator (only for monte-carlo, optional)
--benchmark           Optional flag; when provided, report computation time in milliseconds
--digit-frequency     Optional flag; when provided, compute and print a digit frequency histogram of the computed value

# Implementation
- Add or update dependencies: ensure decimal.js is available for high-precision algorithms
- Extend argument parser in main.js to detect:
  - --pi <digits>
  - --algorithm <algorithmName>
  - --samples <count>
  - --seed <number>
  - --benchmark
  - --digit-frequency
- Implement algorithm dispatch:
  - Gauss-Legendre: use Decimal and Gauss-Legendre as before
  - Chudnovsky: implement Chudnovsky series with Decimal for high-performance arbitrary precision
  - Monte Carlo: use built-in Math.random or seeded PRNG when --seed is provided; sample points in unit square to estimate π
- After computation:
  - Print π string to stdout
  - If digit-frequency enabled: count and print each digit 0–9 excluding decimal point
  - If benchmark enabled: print Computation Time: <elapsed> ms

# Testing
- Verify Gauss-Legendre known outputs for small digit counts
- Verify Chudnovsky outputs match Gauss-Legendre for overlapping digits
- Test Monte Carlo with small sample sizes and fixed seed produces consistent approximate value
- Confirm errors thrown for missing or invalid inputs (negative digits, unsupported algorithm names)
- Ensure combined flags produce the correct sequence of π output, histogram lines, and timing lines