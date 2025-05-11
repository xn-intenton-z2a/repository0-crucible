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
Update README.md to describe the new --benchmark, --digits, --format, and --output flags, include usage examples for both JSON and PNG outputs, and note performance considerations and charting dependency requirements.