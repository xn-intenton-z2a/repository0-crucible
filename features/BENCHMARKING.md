# Overview

Introduce a CLI benchmarking feature that runs all supported π calculation algorithms in sequence and reports performance metrics and accuracy in a single JSON array. Users gain standardized comparisons of execution time and error for Leibniz, Monte Carlo, and Chudnovsky methods.

# Implementation

1. CLI Integration
   • Ensure the existing --benchmark boolean option triggers this feature.  
   • When benchmark is enabled, iterate over algorithms ["leibniz","montecarlo","chudnovsky"].  
   • For each algorithm, apply appropriate parameters (digits or samples) and record:
     - algorithm name
     - input parameters (digits or samples)
     - result value
     - durationMs measured with Date.now()
     - error computed as absolute difference from Math.PI using fixed precision or raw sampling
   • Collect all entries into an array and output via console.log as formatted JSON with two-space indentation.

2. Schema Validation
   • No changes required to existing Zod schemas; reuse validated CLI options for digits and samples.

3. Dependencies
   • Use built-in JSON and timing logic; no additional dependencies required.

# Testing

1. Unit tests in tests/unit/main.test.js:
   - Invoke main with ["--digits", "3", "--benchmark"] and spy on console.log to capture output.  
   - Parse logged JSON array and assert it contains three entries for leibniz, montecarlo, and chudnovsky.  
   - For each entry verify presence of algorithm, result, durationMs, error fields.  
   - Check that error values are numbers and within expected bounds for small digits.

# Documentation

1. docs/USAGE.md
   • Add a section under Options describing --benchmark.  
   • Provide example command and sample JSON output.

2. README.md
   • Under Features, add a **Benchmark** entry explaining the CLI benchmarking mode and include a usage example.