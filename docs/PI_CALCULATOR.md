# PI Calculator

## Overview

Introduce a core π calculation engine with multiple algorithm options, digit-length control, benchmark reporting, and flexible output modes (text, PNG, and BBP hex extraction).

## CLI Options

* `-h`, `--help`                  Show help message and exit
* `--algorithm <name>`           Choose from supported algorithms: `spigot`, `chudnovsky`, `bbp`. Default: `spigot`.
* `--digits <n>`                 Number of decimal digits to generate (default: 100).
* `--hex-index <n>`              Index for BBP hexadecimal digit extraction (0-based).
* `--output <type>`              Output format: `text` or `png` (default: `text`).
* `--file <path>`                File path to save output (default: stdout).
* `--diagnostics`                Emit compute and render timing diagnostics.
* `--benchmark-sizes <list>`     Comma-separated list of digit counts to benchmark.
* `--benchmark-output <type>`    Benchmark report format: `text`, `csv`, or `png` (default: `text`).
* `--benchmark-file <path>`      File path to save benchmark report or chart.

## Examples

```bash
# Show help
node src/lib/main.js --help

# Compute 10 decimal digits with spigot
node src/lib/main.js --algorithm spigot --digits 10
# Output: 3.141592653

# Compute 15 decimal digits with Chudnovsky
node src/lib/main.js --algorithm chudnovsky --digits 15
# Output: 3.14159265358979

# Extract hex digit with BBP
node src/lib/main.js --algorithm bbp --hex-index 1
# Output: 2

# Save 50 digits to file
node src/lib/main.js --digits 50 --file pi50.txt

# Render 20 digits to PNG
node src/lib/main.js --output png --digits 20 --file pi20.png

# Show diagnostics
node src/lib/main.js --digits 30 --diagnostics
# Compute time: Xms
# Render time: Yms

# Benchmark decimal algorithms (text report)
node src/lib/main.js --benchmark-sizes 10,100

# Benchmark and CSV output
node src/lib/main.js --benchmark-sizes 20,50 --benchmark-output csv --benchmark-file benchmark.csv

# Benchmark and PNG chart
node src/lib/main.js --benchmark-sizes 20,50 --benchmark-output png --benchmark-file benchmark.png
```