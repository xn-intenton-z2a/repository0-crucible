# Overview

This feature adds ability to compute pi to a specified number of digits via command line flag --calculate-pi. It uses a high-performance Chudnovsky algorithm with decimal.js for arbitrary precision. The result can be printed to standard output or saved to a file when an output path is provided.

# CLI Interface

Add new flags to the main CLI:

--calculate-pi <digits>  Specify number of digits of pi to compute
--output <path>          Optional file path to save the computed value

# Implementation

Update src/lib/main.js to import Decimal from decimal.js and implement a chudnovskyPi function. When the --calculate-pi flag is present, invoke the algorithm and handle output or file write. Ensure the tool exits with status zero on success and nonzero on invalid input. Modify package.json dependencies to include decimal.js.

# Testing

Add unit tests in tests/unit for chudnovskyPi with known small digit values. Verify output length, numeric prefix, and error handling for invalid input.

# Documentation

Update README.md to include the PI_CALCULATOR feature under Features and provide usage examples for --calculate-pi and --output.