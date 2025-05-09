# Overview

This feature extends the existing CLI library to support on-demand calculation of π to a user-specified number of decimal places. It uses a high-performance Chudnovsky series algorithm to generate π with arbitrary precision.

# CLI Interface

Add a new command-line option --pi <digits> (alias -p). When invoked, the main function will compute π to the requested number of decimal places and print the resulting decimal string to standard output. The digits parameter is a positive integer between 1 and 10000, defaulting to 100 when omitted.

# Implementation Details

Modify src/lib/main.js to parse the --pi flag. Introduce a new helper function calculatePi(digits) that implements the Chudnovsky series for rapid convergence. Use the decimal.js library for arbitrary precision arithmetic. Update package.json to include the decimal.js dependency.

# Testing and Validation

Add unit tests in tests/unit/main.test.js for calculatePi. Cover typical cases (digits=1, 5, 15) and edge conditions (digits=0 or non-numeric input). Ensure that main correctly processes the --pi option, outputs the expected π string, and handles invalid input with an error message.

# Documentation

Update README.md to document the new π feature under the Features section. Include usage examples, for example:

node src/lib/main.js --pi 10

Expected output: 3.1415926535
