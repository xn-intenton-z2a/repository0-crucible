# PI Calculator

## Overview

Introduce a core π calculation engine with multiple algorithm options, digit-length control, benchmark reporting, and flexible output modes (text, PNG, and BBP hex extraction).

## CLI Options

* `--algorithm <name>` Choose from supported algorithms: `spigot`, `chudnovsky`, `bbp`. Default: `spigot`.
* `--digits <n>` Number of π digits to generate (decimal mode, default: 100). Number of total digits (including the "3").
* `--hex-index <n>` Index for BBP mode (hexadecimal digit extraction, 0-based). Required when `--algorithm bbp` is used.
* `--output <type>` Output format: `text` or `png` (default: `text`).
* `--file <path>` Optional file path to save output.
* `--diagnostics` Emit benchmark timings for compute and render phases.
* `--benchmark-sizes <list>` Comma-separated list of digit counts to benchmark. When provided, single-run options are ignored and benchmarking mode is entered.
* `--benchmark-output <type>` Benchmark report output format: `text`, `csv`, or `png` (default: `text`).
* `--benchmark-file <path>` File path to save benchmark report or chart. If omitted, `text` is printed to stdout; `csv` and `png` use default filenames `benchmark.csv` or `benchmark.png`.

## Examples

```bash
# Print first 10 digits using spigot
node src/lib/main.js --algorithm spigot --digits 10
# Output: 3.141592653

# Print first 15 digits using Chudnovsky
node src/lib/main.js --algorithm chudnovsky --digits 15
# Output: 3.14159265358979

# Extract hex digit at index 0 (integer part)
node src/lib/main.js --algorithm bbp --hex-index 0
# Output: 3

# Extract hex digit at index 1 (first fractional)
node src/lib/main.js --algorithm bbp --hex-index 1
# Output: 2

# Save 50 digits to file
node src/lib/main.js --digits 50 --file pi50.txt
# File pi50.txt contains: 3.....

# Render 20 digits to PNG
node src/lib/main.js --output png --digits 20 --file pi20.png

# Show diagnostics timings
node src/lib/main.js --digits 30 --diagnostics
# Output:
# Compute time: 10ms
# Render time: 5ms

# Benchmark sizes with default text output
node src/lib/main.js --benchmark-sizes 10,100

# Benchmark and output CSV to file
node src/lib/main.js --benchmark-sizes 20,50 --benchmark-output csv --benchmark-file benchmark.csv

# Benchmark and output PNG chart
node src/lib/main.js --benchmark-sizes 20,50 --benchmark-output png --benchmark-file benchmark.png
```