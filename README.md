# PI Calculator CLI Tool

`pi-calculator-cli` is a command-line application for calculating digits of π using multiple algorithms, benchmarking performance, and generating visual outputs.

## Project Overview

The PI Calculator CLI supports three algorithms:
- **Spigot**: sequential decimal digit generation.
- **Chudnovsky**: high-precision series-based decimal calculation.
- **BBP**: direct hexadecimal digit extraction at arbitrary positions.

## Installation

Requires Node.js ≥20.0.0.

```bash
npm install
```

## Features

* Generate decimal digits via **Spigot** and **Chudnovsky** algorithms.
* Extract individual hexadecimal digits via **BBP** formula.
* Output results as **text** or **PNG** visualizations (uses default filenames when none specified).
* Emit **diagnostics** for compute and render timings.
* Run **benchmarks** across multiple digit sizes with **text**, **CSV**, or **PNG** reports.

## Usage Examples

```bash
# Basic decimal output (Spigot)
node src/lib/main.js --algorithm spigot --digits 20

# Decimal PNG output (Chudnovsky)
node src/lib/main.js --algorithm chudnovsky --digits 50 --output png --file pi50.png

# Hex-digit extraction (BBP)
node src/lib/main.js --algorithm bbp --hex-index 1

# Benchmark text report (sizes 10,100)
node src/lib/main.js --benchmark-sizes 10,100

# Benchmark CSV output to file
node src/lib/main.js --benchmark-sizes 50,200 --benchmark-output csv --benchmark-file benchmark.csv

# Benchmark PNG chart to file
node src/lib/main.js --benchmark-sizes 100,500 --benchmark-output png --benchmark-file performance.png
```

Refer to [Detailed CLI Documentation](docs/PI_CALCULATOR.md) for full option descriptions, defaults, and examples.

## Contributing & License

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.  
Released under the MIT License ([LICENSE](LICENSE)).