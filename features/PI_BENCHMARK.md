# Overview
The PI_BENCHMARK feature adds support for measuring and comparing the performance of π calculation algorithms. Users can run benchmarks against one or all supported algorithms, specify digit length and iteration count, and obtain a summary of execution times.

# CLI Interface
This feature extends the main executable with the following flags:

--benchmark           Run performance benchmark instead of single calculation
--iterations <number> Number of times to run each algorithm (default 5)
--digits <number>     Number of decimal places for π in each iteration (default 100)
--algorithm <name>    Name of algorithm to benchmark (leibniz, spigot, gauss-legendre) or all
--benchmark-format <format>
                      Output format for benchmark results: table or json (default table)

If --benchmark is provided without additional flags, it runs all algorithms for 5 iterations at 100 digits and displays a table.

# Implementation Details
Benchmark logic is implemented in src/lib/main.js next to existing calculation functions. A new helper measureAlgorithm runs a given algorithm the specified number of iterations and records elapsed time using process.hrtime. Results are aggregated into an array of objects containing algorithm name, average time, and individual sample times.
When output format is table, results are printed as aligned columns to console. When json is selected, results are serialized and printed as JSON.
Flag parsing reuses existing argument handling and adds new options. No additional dependencies are required.

# Testing
Add unit tests in tests/unit/main.test.js:
- Verify that invoking main with --benchmark produces console output without error
- Mock calculation functions to run instantly and test that measureAlgorithm is called correct number of times
- Test output formatting for both table and json formats by mocking console.log and inspecting content
- Test invalid iteration or digit values trigger meaningful error messages and exit codes
