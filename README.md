# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic-lib](nhttps://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see https://github.com/xn-intenton-z2a/agentic-lib

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

* π Calculation: Calculate π to a specified number of decimal places using the Leibniz series algorithm.
  - `--digits <number>`: Number of decimal places (default: 5).
  - `--algorithm <string>`: Calculation method (default: "leibniz").
  - `--diagnostics`: Outputs a JSON object with execution diagnostics (algorithm, parameters, durationMs, iterations/samplesUsed, and result).
* Feature specification validation: Check that feature specification files under `features/` reference the project mission (`MISSION.md`) using the `--validate-features` option.
* HTTP API Server: Start server with `--serve <port>` to provide REST API endpoints (`/pi`, `/pi/data`, `/pi/chart`) for programmatic π calculation.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### π Calculation

Calculate π to 10 decimal places:

```bash
node src/lib/main.js --digits 10
# Outputs: 3.1415926536
```

Specify the algorithm (currently supports "leibniz"):

```bash
node src/lib/main.js --digits 5 --algorithm leibniz
# Outputs: 3.14159
```

### HTTP API Server

Start the server on port 3000:

```bash
node src/lib/main.js --serve 3000
# Logs: Listening on port 3000
```

Access the endpoints:

```bash
curl http://localhost:3000/pi
curl "http://localhost:3000/pi?digits=3&algorithm=montecarlo&samples=1000&diagnostics=true"
```
