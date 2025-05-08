# Overview

Enhance π calculation capabilities by integrating the high-performance Chudnovsky algorithm alongside existing Machin and Nilakantha series. Provide both a CLI interface with flexible output options and a lightweight HTTP API for remote computation requests.

# CLI Usage

The tool extends existing commands with new options:

- `--digits <n>`: Number of digits to compute (integer between 1 and 10000, default 100)
- `--method <nilakantha|machin|chudnovsky>`: Choice of algorithm (default chudnovsky)
- `--format <text|png>`: Output format (default text)
- `--output <path>`: File path for PNG output; required when format is png
- `--serve [port]`: Start HTTP server on specified port (default 3000)

Example:

node src/lib/main.js --digits 500 --method chudnovsky --format text

# HTTP API Usage

When invoked with `--serve`, the tool runs an HTTP server exposing `/pi` endpoint:

GET /pi?digits=500&method=chudnovsky&format=text

Query parameters:

- `digits`: number of digits
- `method`: nilakantha, machin, or chudnovsky
- `format`: text or png

Responses:

- `application/json` for text mode: `{ "pi": "3.1415..." }`
- `image/png` for PNG mode

# Implementation Details

- Implement three pure functions: nilakanthaSeries, machinFormula, and chudnovskyAlgorithm, each returning a string of computed digits.
- Use an arbitrary-precision library to support large integer and fractional operations.
- For CLI, parse arguments via a minimal parser, then dispatch to the selected algorithm and renderer.
- For HTTP, use Node.js built-in http module to handle requests, parse URL parameters, and send generated output.
- For PNG output, map each digit to a pixel in a grayscale canvas, serialize to PNG, and write to file or HTTP response.

# Error Handling

- Validate that digits is within range and method and format match supported values.
- In CLI mode, exit with nonzero code and descriptive message on invalid input.
- In HTTP mode, respond with 400 status and JSON error details for invalid parameters.

# Testing

- Unit tests for each algorithm against known sequences (e.g., first 10 digits).
- CLI tests covering flag parsing, default values, and invalid inputs.
- HTTP integration tests mocking server requests for both text and PNG modes.
- Filesystem mocks to verify PNG file creation and content headers.

# Documentation

- Update README with detailed CLI and HTTP usage examples.
- Document exported computation functions in API reference.
- Provide guidance on performance characteristics and recommended methods based on digit size.