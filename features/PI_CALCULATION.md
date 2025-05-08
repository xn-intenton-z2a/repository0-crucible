# Overview

Extend the CLI tool to compute π to a user-specified number of digits using configurable algorithms and render the result as text or PNG visualizations.

# CLI Usage

Users invoke the tool with new flags:
- `--digits <n>`: Number of digits to calculate (default 100)
- `--method <nilakantha|machin>`: Algorithm choice for computation (default machin)
- `--format <text|png>`: Output format (default text)
- `--output <path>`: File path for PNG output (required when format is png)

The tool continues to support `--help` for usage information.

# Implementation Details

Define pure functions for each algorithm:
- Machin-like formula leveraging arctan series
- Nilakantha series

Perform big-number arithmetic to achieve arbitrary precision within Node. Implement a renderer that:
- For text: concatenates computed digits and writes to stdout
- For PNG: uses a lightweight canvas library to map digits to pixels (e.g., grayscale heatmap), then serializes and writes to the specified file path

# Error Handling

Validate inputs:
- `digits` must be an integer between 1 and 10000
- `method` must match supported algorithms
- `format` must be text or png
- `output` must be provided when `format` is png

Fail fast with descriptive messages and non-zero exit codes.

# Testing

Add unit tests to:
- Verify argument parsing and defaults
- Compute small known digit lengths and assert correct prefix (e.g., digits=5 => 3.1415)
- Ensure invalid arguments trigger errors
- Simulate png mode by mocking the filesystem and confirming file write completed

# Documentation

Update README with new usage examples for each mode. Document the API of computation functions for library usage.