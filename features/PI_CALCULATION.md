# Overview

Add a core library and CLI feature to calculate the value of π to a specified number of decimal places using one or more algorithms. This feature will allow users to request π to any reasonable digit count directly from the command line or programmatically via the exported API, and output the result in text or PNG format.

# CLI Interface

- Introduce new flags to main.js:
  • --digits <number>   : Number of decimal places of π to compute (default 10).
  • --algorithm <name>  : Algorithm choice (options: "gauss-legendre", "spigot"). Default "gauss-legendre".
  • --output-format <type> : "text" or "png". Default "text".
  • --output-file <path> : File path to write the result; stdout if omitted.

- Example: node src/lib/main.js --digits 100 --algorithm spigot --output-format png --output-file pi100.png

# API Interface

- Export a new function `calculatePi(options)` in src/lib/main.js:
  • options.digits      : number
  • options.algorithm   : string
  • options.format      : string
  • options.outputFile? : string

- The `main` function will parse CLI args, construct an options object, call calculatePi, and handle writing to stdout or file.

# Output Formats

1. Text: a UTF-8 string representing π with the requested decimal places and a trailing newline.
2. PNG: Render the numeric representation as a legible monospaced text image using a canvas or SVG library. Produce a valid PNG binary.

# Dependencies

- Use a pure JavaScript big number library (for example, built-in BigInt or add dependency if required).
- For PNG output, utilize a lightweight canvas or SVG-to-PNG package (add to package.json).

# Error Handling and Validation

- Validate that digits is a positive integer less than a configurable max (e.g., 10000).
- Validate algorithm choice against supported list.
- Validate format against supported list.
- On invalid input, exit with a nonzero code and print a clear message.

# Testing

- Unit tests in tests/unit/main.test.js for:
  • calculatePi produces correct prefix of digits (compare first 20 digits).
  • CLI option parsing and invocation of calculatePi.
  • Error cases: invalid digits, unknown algorithm, unknown format.

- No external API calls; all logic runs locally.
