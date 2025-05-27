# Overview

This feature adds core functionality to calculate digits of π using the Chudnovsky algorithm. It provides both a programmatic API and CLI interface to compute π to a specified number of digits, output results in text or PNG visualization, and optionally benchmark performance.

# CLI Interface

Accepts the following flags:
- --digits <n>  Specify the number of digits of π to compute (default 100).
- --format <text|png>  Choose output format: text writes digits to stdout, png generates a visualization image.
- --output <path>  Write output to a file instead of stdout.
- --benchmark  Measure and print computation time and memory usage.

# API

Exports:
- calculatePi(digits: number): Promise<string>  Compute and return π to given digits as a string.
- generatePiImage(digits: number, filepath: string): Promise<void>  Render π digits into a PNG image at the specified path.
- runBenchmark(digits: number): Promise<{durationMs: number, memoryMB: number}>  Execute computation and return performance metrics.

# Implementation Details

- Use BigInt arithmetic for precision and performance.
- Implement the Chudnovsky series algorithm with iterative summation and optimizations.
- Leverage a lightweight PNG library to render digit patterns in grayscale.
- Stream outputs to avoid excessive memory use for large digit counts.

# Testing

- Unit tests for calculatePi confirm accuracy against known prefixes of π.
- Integration tests for CLI validate correct parsing of flags and output modes.
- Performance tests ensure benchmark metrics are returned and formatted correctly.

# Documentation Updates

- Update README to include usage examples and API references for new commands and functions.