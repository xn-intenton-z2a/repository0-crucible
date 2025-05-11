# Performance Benchmark

_See the project mission in [MISSION.md](../MISSION.md) to understand the scope and context of this feature._

Enable users to measure and compare execution performance of supported π calculation algorithms for given parameters and output results in table or JSON format.

# CLI Options

Add new options:

--benchmark <number>   Specify the parameter value to use for benchmarking. Interpreted as digits for Leibniz and Chudnovsky, and as sample count for Monte Carlo.
--benchmark-algorithms <list>   Comma-separated list of algorithms to benchmark. Supported values: leibniz, montecarlo.
--benchmark-output <format>    Output format for benchmark results. Supported values: table (default), json.

# Implementation

1. In src/lib/main.js detect options.benchmark. If present, bypass single-algorithm path and enter benchmark mode.
2. Determine the algorithm list by splitting options.benchmark-algorithms or defaulting to [leibniz, montecarlo].
3. For each algorithm in the list:
   - Record start time.
   - Invoke the corresponding calculate function with Number(options.benchmark).
   - Record end time and compute durationMs.
   - Collect objects of shape { algorithm, parameter: Number(options.benchmark), durationMs, result } into an array.
4. After all benchmarks complete, output results:
   - If options.benchmark-output is json, print JSON.stringify(benchmarkResults, null, 2).
   - If table, format a simple ASCII table with columns algorithm, parameter, durationMs, result, and console.log it.
5. Exit the process after printing benchmark output.

# Testing

1. In tests/unit/main.test.js add tests for benchmark mode:
   - Mock calculatePiLeibniz and calculatePiMonteCarlo to return fixed values.
   - Invoke main(["--benchmark", "5"]) and verify console.log output contains a table with both algorithms and matching data.
   - Invoke main(["--benchmark", "3", "--benchmark-algorithms", "montecarlo", "--benchmark-output", "json"]) and assert the JSON output array contains one entry for montecarlo with correct fields.
   - Ensure process exits cleanly after benchmark runs.

# Documentation

1. Update docs/USAGE.md to document the --benchmark, --benchmark-algorithms, and --benchmark-output options with example commands.
2. Update README.md under Features to describe the performance benchmark capability and include sample CLI usages.
