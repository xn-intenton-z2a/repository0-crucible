# Overview

This feature adds the ability to extract a contiguous range of π digits between two zero-based positions without computing all preceding digits by leveraging the existing BBP digit extraction formula.

# CLI Interface

--extract-range <start>-<end>
    Specify a zero-based inclusive range of digits to extract, for example 100-200.

--start <start> --end <end>
    Alternatively specify start and end positions separately.

--base <decimal|hex>
    Optional numeric base for extraction (default: hex).

--output <path>
    Optional file path to write the extracted digit sequence.

# HTTP API

GET /digits
    Query Parameters:
      start: number (required) - starting zero-based index.
      end: number (required) - ending zero-based index.
      base: decimal|hex (optional, default: hex).
    Returns JSON with fields:
      digits: string of extracted digits
      start: number
      end: number
      base: string

# Implementation

- Extend src/lib/main.js to detect --extract-range or --start and --end flags in the CLI parser.
- Validate that start and end are non-negative integers and end >= start; exit with an error on invalid input.
- For each index i from start to end inclusive, invoke the existing bbpDigit(i, base) function and append the result to a buffer.
- Write the final digit sequence to stdout or to the specified output file when --output is provided.
- In the HTTP server logic under --serve, add a route handler for GET /digits that:
  • Parses and validates query parameters.
  • Performs digit extraction as above.
  • Responds with status code 200, Content-Type application/json, and the JSON payload.
- Ensure descriptive error handling and nonzero exit codes for invalid CLI or HTTP inputs.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Invoke main with ["--extract-range","5-10"] and verify stdout contains the correct digit sequence.
  • Test --start 0 --end 0 extracts the first digit of π.
  • Verify invalid ranges (start > end, negative values, non-integer inputs) produce descriptive errors and nonzero exit codes.
  • Test --output writes the expected sequence to a temporary file.
  • Start the HTTP server with --serve and perform GET /digits?start=10&end=15; verify status code 200, application/json response, and payload fields.

# Documentation

- Update README.md under Features:
  • Document the --extract-range, --start, --end, --base, and --output flags with example usage.
  • Provide example CLI commands and expected output.
  • Document the GET /digits endpoint with example curl requests and sample JSON response.
