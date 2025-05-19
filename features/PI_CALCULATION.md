# Overview

Implement a core library function and CLI subcommand to calculate the numeric value of π to a specified number of decimal places using two algorithms. Allow users to retrieve results in plain text or PNG image form.

# Implementation

- Create an exported function `calculatePi(options)` in src/lib/main.js.
- Support two algorithms:
  - gauss-legendre: Iterative Gauss–Legendre convergence using BigInt for arbitrary precision.
  - spigot: The spigot algorithm for digit-by-digit extraction of π.
- Internally use native BigInt for high precision arithmetic; no external big-number library needed.
- For PNG output, integrate the `canvas` package. Render the digits on a 24px monospaced canvas and output as PNG buffer.
- Add `canvas` to dependencies in package.json.

# CLI Interface

- Extend main(args) to parse additional flags:
  • --digits <number>        : Positive integer decimal places (default 10).
  • --algorithm <name>       : gauss-legendre or spigot (default gauss-legendre).
  • --output-format <type>   : text or png (default text).
  • --output-file <path>     : Path to write output; stdout if omitted.
- On invocation, parse flags into an options object, call calculatePi, and write results to file or stdout.

# API Interface

Export `calculatePi(options)` as part of module exports. Options shape:

- digits      : number
- algorithm   : "gauss-legendre" | "spigot"
- format      : "text" | "png"
- outputFile? : string

Returns a Promise that resolves to either a string (text) or Buffer (PNG).

# Output Formats

1. Text: UTF-8 string with π to requested digits and trailing newline.
2. PNG: Valid PNG binary rendering the digits.

# Error Handling and Validation

- Validate digits is an integer between 1 and 10000.
- Reject unsupported algorithm or format choices with clear messages and nonzero exit code.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • compare first 20 digits of calculatePi for both algorithms.
  • test CLI end-to-end: parsing, file output, edge cases.
- No external network calls; all computation local.
