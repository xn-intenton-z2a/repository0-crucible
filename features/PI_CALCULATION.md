# Overview

Implement core arbitrary-precision π calculation CLI command. Allow users to compute π to a specified number of decimal places using multiple high-precision algorithms and output the result in text format.

# Implementation

1. Command-Line Interface
   - Use minimist to parse flags in src/lib/main.js:
     • --algorithm <leibniz|gauss-legendre|chudnovsky> to choose calculation method (default chudnovsky)
     • --digits <n> to specify number of decimal places (default 1000)
     • --output <path> to write result to a file or stdout if omitted

2. Algorithm Modules
   - Implement three algorithms in src/lib/main.js or helper functions:
     • Leibniz series with BigInt and manual scaling
     • Gauss-Legendre method for quadratic convergence using BigInt
     • Chudnovsky formula for rapid convergence leveraging BigInt
   - Manage fixed-point arithmetic manually or with a lightweight decimal helper

3. Output Generation
   - Format computed digits as plain UTF-8 text
   - Write output to stdout or file specified by --output

# Testing

- Create tests in tests/unit/pi-calculation.test.js:
  • Verify first 10 digits of π for each algorithm implementation
  • Simulate CLI calls with minimist flags and confirm correct output for digits and algorithm selection

# Documentation

- Update README.md:
  • Document --algorithm, --digits, and --output flags under Usage and CLI Options
  • Provide example commands:  
    node src/lib/main.js --algorithm chudnovsky --digits 500  
    node src/lib/main.js --digits 1000 --output pi.txt
