# PI Calculator

## Overview

Introduce a core π calculation engine with multiple algorithm options, digit-length control, benchmark reporting, and flexible output modes (text and PNG).

## CLI Options

* `--algorithm <name>` Choose from supported algorithms: `spigot`, `chudnovsky`. Default: `spigot`.
* `--digits <n>` Number of π digits to generate (default: 100). Number of total digits (including the "3").
* `--output <type>` Output format: `text` or `png` (default: `text`).
* `--file <path>` Optional file path to save output.
* `--diagnostics` Emit benchmark timings for compute and render phases.

## Examples

```bash
# Print first 10 digits using spigot
node src/lib/main.js --algorithm spigot --digits 10
# Output: 3.141592653

# Print first 15 digits using Chudnovsky
node src/lib/main.js --algorithm chudnovsky --digits 15
# Output: 3.14159265358979

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
```