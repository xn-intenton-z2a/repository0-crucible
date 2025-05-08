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