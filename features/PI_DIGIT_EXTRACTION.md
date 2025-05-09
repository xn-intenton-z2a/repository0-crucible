# Overview

This feature adds the ability to extract a single digit of π at an arbitrary position without computing all preceding digits by leveraging the Bailey–Borwein–Plouffe (BBP) formula. Users can request either hexadecimal or decimal digits at specific zero-based indices.

# CLI Interface

--extract-digit <position>   Specify the zero-based index of the digit to extract
--base <decimal|hex>         Optional numeric base for extraction (default: hex)
--output <path>              Optional file path to write the extracted digit

# Implementation

- Extend src/lib/main.js to detect the --extract-digit flag and parse position, base, and output options.
- Implement a bbpDigit function using the BBP formula:
  • Accepts a non-negative integer position and base specification.
  • Computes the position-th digit of π without full-series summation for preceding digits.
  • Supports hexadecimal digit extraction natively; for decimal, perform necessary base conversion from computed hex fractions.
- Handle invalid inputs:
  • Position must be a non-negative integer.
  • Base must be either "hex" or "decimal".
- When invoked, write the extracted digit to stdout or to the specified output file.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Verify bbpDigit returns known hexadecimal digits at positions 0, 1, 5, etc.
  • Verify decimal digit extraction for small positions by comparing against published values.
  • Test error cases for negative position and invalid base values.
  • Test --output flag writes correct digit to a temporary file.

# Documentation

- Update README.md to document the extract-digit command:
  • Describe flags, defaults, and examples of extracting hex and decimal digits.
  • Provide example commands:
    node src/lib/main.js --extract-digit 5 --base hex
    node src/lib/main.js --extract-digit 10 --base decimal --output digit.txt
