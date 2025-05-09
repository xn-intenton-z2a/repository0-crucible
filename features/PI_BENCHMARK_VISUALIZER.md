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
- Provide examples of running benchmarks and viewing the generated chart