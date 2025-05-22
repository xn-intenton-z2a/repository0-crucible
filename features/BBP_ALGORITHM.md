# Overview

Add support for the Bailey–Borwein–Plouffe (BBP) formula to extract individual hexadecimal digits of π at arbitrary positions. This feature complements existing decimal-based algorithms by enabling direct, non-sequential extraction of π’s digits in base-16.

# CLI Options

* `--algorithm bbp`          Choose the BBP algorithm for hexadecimal digit extraction.
* `--hex-index <n>`          Zero-based index of the hex digit to extract. Required when `--algorithm bbp` is used.
* `--file <path>`            Optional file path to save the single hex character; defaults to stdout if omitted.

# Source File Changes

Enhance `src/lib/main.js` to:

1. Implement `computePiBBP(index)` using the BBP series:
   - Validate that `index` is a non-negative integer.  
   - Return the integer part (`3`) for `index === 0`.  
   - For `index > 0`, compute fractional hex digit via modular exponentiation and series summation.
2. Extend CLI parsing (via `minimist`) to recognize `bbp` algorithm and the `hex-index` option.
3. In `main(args)`, when `algorithm === 'bbp'`:
   - Parse and validate `hex-index`.  
   - Call `computePiBBP(hexIndex)` and output the result as a single hex character.
   - Write to file if `--file` is provided, otherwise print to console.

# Test File Changes

Add unit and CLI tests in `tests/unit/main.test.js` to verify:

* Unit tests for `computePiBBP`:
  - `computePiBBP(0)` returns "3".  
  - `computePiBBP(1)` returns "2".  
  - Known fractional positions (e.g., index 4 returns "F").
* CLI tests:
  - Running `node main.js --algorithm bbp --hex-index 1` prints "2" to stdout and exits code 0.
  - With `--file hex.txt`, the file contains the correct hex digit.

# README Updates

Update `README.md` under CLI Options and Examples:

* Document `--algorithm bbp` and `--hex-index <n>` usage.  
* Provide examples:
  - `node src/lib/main.js --algorithm bbp --hex-index 0`  # prints 3
  - `node src/lib/main.js --algorithm bbp --hex-index 1 --file hex1.txt`

# Dependencies

No new dependencies required. Reuse `minimist` for CLI parsing and core Node.js modules for file I/O.