# repository0-crucible

`@xn-intenton-z2a/repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) and also provides a CLI tool and JavaScript library for calculating π to a specified precision using different algorithms. It supports diagnostics, benchmarking, convergence data export, chart generation, feature specification validation, an HTTP API server mode, and an interactive web dashboard.

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

* π Calculation  
  - `--algorithm <string>`: Calculation method (`leibniz`, `montecarlo`, `chudnovsky`, `ramanujan-sato`, `gauss-legendre`) (default: `leibniz`).  
  - `--digits <number>`: Number of decimal places (for digit-based algorithms) (default: `5`).  
  - `--samples <number>`: Number of random samples (for Monte Carlo) (default: `100000`).  
  - `--level <number>`: Level for Ramanujan–Sato series (default: `1`).  
  - `--max-iterations <number>`: Maximum iterations for high-precision series (default: `50`).  
  - `--error-tolerance <number>`: Error tolerance threshold for series termination.  
  - `--diagnostics`: Outputs a JSON object with execution diagnostics (`algorithm`, parameters, `result`, `durationMs`, `iterations`/`samplesUsed`).

* Benchmark  
  - `--benchmark`: Runs all supported algorithms and outputs a consolidated JSON benchmark report including algorithm, input parameters, result, durationMs, and error.

* Convergence Data Export  
  - `--convergence-data <filepath>`: Saves raw convergence data (approximation and error at each step) to the specified JSON file.

* Chart Generation  
  - `--chart <filepath>`: Saves a convergence chart (error vs. iteration/sample index) as a PNG file.

* Feature Specification Validation  
  - `--validate-features`: Validates that all feature spec files under `features/` reference `MISSION.md` and exits with status 0.

* HTTP API Server  
  - `--serve <port>`: Starts an Express HTTP server exposing `/pi`, `/pi/data`, `/pi/chart`, and `/dashboard` endpoints for programmatic and interactive use.

* Interactive Dashboard  
  - Access the web dashboard at `http://localhost:<port>/dashboard` for a browser-based UI to configure π calculation parameters and view live results and an error chart.

## CLI Usage Examples

```bash
# Leibniz method: 10 decimal places
node src/lib/main.js --digits 10

# Monte Carlo sampling with diagnostics
node src/lib/main.js --algorithm montecarlo --samples 100000 --diagnostics

# Ramanujan–Sato series: level 1, 3 digits
node src/lib/main.js --algorithm ramanujan-sato --level 1 --digits 3

# Gauss–Legendre algorithm: 4 digits
node src/lib/main.js --algorithm gauss-legendre --digits 4

# Benchmark all algorithms with 5-digit precision
node src/lib/main.js --benchmark --digits 5

# Export convergence data to JSON
node src/lib/main.js --digits 5 --convergence-data data.json

# Generate PNG convergence chart
node src/lib/main.js --digits 5 --chart chart.png

# Validate feature specifications
node src/lib/main.js --validate-features
``` 

## HTTP API Server

Start the server on port 3000:

```bash
node src/lib/main.js --serve 3000
```

Example REST calls:

```bash
# Basic π calculation
curl http://localhost:3000/pi

# Chudnovsky for 2 digits
curl "http://localhost:3000/pi?algorithm=chudnovsky&digits=2"

# Ramanujan–Sato with diagnostics
curl "http://localhost:3000/pi?algorithm=ramanujan-sato&digits=3&level=1&diagnostics=true"

# Gauss–Legendre for 2 digits
curl "http://localhost:3000/pi?algorithm=gauss-legendre&digits=2"

# Monte Carlo with diagnostics
curl "http://localhost:3000/pi?digits=3&algorithm=montecarlo&samples=1000&diagnostics=true"

# Convergence data JSON
curl "http://localhost:3000/pi/data?digits=2&algorithm=leibniz"

# Convergence chart PNG
curl "http://localhost:3000/pi/chart?digits=2&algorithm=leibniz" --output chart.png

# Interactive Dashboard
curl http://localhost:3000/dashboard
```