# PI N-gram Distribution Feature

## Overview

Compute and output the frequency distribution of all contiguous n-gram substrings of π digits for a specified length. This supports in-depth pattern analysis and exploration of recurring sequences in π digits.

## Functional Requirements

- Add function countPiNgrams(options) in src/lib/main.js
  - options.digits: positive integer specifying total number of digits to compute (including integer part and fraction; minimum 1, default 1000)
  - options.algorithm: one of machin, gauss-legendre, or chudnovsky (default machin)
  - options.ngramLength: positive integer length of substrings to count (minimum 1, default 2)
- Compute π as a string using calculatePi with sufficient precision
- Remove the decimal point and build all contiguous substrings of length options.ngramLength
- Count occurrences of each unique n-gram and assemble a plain object mapping substring to count
- Return the count object

## CLI Interface

- Extend src/lib/main.js to accept new flags:
  --ngram-length <n>        Length of digit substrings to count (integer ≥ 1; default 2)
  --distribution-ngram-json   Output n-gram distribution as JSON
- When --ngram-length is provided:
  - Parse digits, algorithm, and ngram-length from flags
  - Invoke countPiNgrams with the parsed options
  - Print the JSON string of the returned count object to stdout and exit
  - On invalid values (non-integer or <1), print descriptive error and exit non-zero
- Update CLI help text to document the new flags and defaults

## Dependencies

- No new external dependencies; use built-in string handling and object utilities

## Testing

- Unit Tests in tests/unit/main.test.js:
  - Mock calculatePi to return a fixed sequence (e.g., "1231234") for a small digit count
  - Verify countPiNgrams returns correct counts for substrings of specified length
  - Test invalid ngramLength values produce thrown descriptive errors
- CLI Tests in tests/e2e/cli.test.js:
  - Invoke CLI with --digits 7 --algorithm machin --ngram-length 2 --distribution-ngram-json and assert correct JSON output
  - Test missing or invalid ngram-length flags result in descriptive errors and non-zero exit codes