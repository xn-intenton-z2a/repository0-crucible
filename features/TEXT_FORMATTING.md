# Overview

Introduce flexible formatting options for text-based π output, enabling users to group digits into fixed-size blocks and wrap lines at a specified length. This improves readability for large-digit outputs in the terminal or redirected text files.

# CLI Usage

--group-size <n>
    Insert a space character between every n digits in the π string. Must be integer >=1. Applies after decimal point and before (leading "3" is unaffected unless grouping covers it).

--line-length <n>
    Wrap the formatted (or raw) π string into lines of n characters. Must be integer >=1. Lines break only at character boundaries (ignores spaces introduced by grouping).

Examples:
    node src/lib/main.js --digits 50 --group-size 5
    node src/lib/main.js --digits 100 --line-length 25
    node src/lib/main.js --digits 200 --group-size 10 --line-length 50

# Implementation Details

1. **Flag Parsing** in src/lib/main.js
   • Add parsing for `--group-size` and `--line-length`. Validate that each value is an integer >=1. If invalid, throw an error.
   • Store values in `groupSize` and `lineLength` variables (undefined if absent).

2. **Formatting Pipeline** in main()
   • After `const piStr = calculatePi(digits, method);` but before output, apply optional transformations:
     a. **Grouping**: If `groupSize` is defined, build a new string by slicing out the integer part and fractional part. Leave the integer part (e.g., "3") intact, then for the fractional part insert a space every `groupSize` digits.
     b. **Line Wrapping**: If `lineLength` is defined, wrap the (grouped or raw) string into substrings of length `lineLength`, joining with newline characters.
   • Assign the transformed string to `outputStr`.

3. **Output**
   • For `format === 'text'` (and PNG mode unaffected), `console.log(outputStr)`.

# Tests

Create a new unit test file `tests/unit/textFormatting.test.js`:
  • Test grouping alone: e.g., `piStr = '3.14159265'` with `groupSize=3` yields `3.141 592 65`.
  • Test line wrapping alone: e.g., `piStr = '3.1415'` with `lineLength=2` yields `3.`, `14`, `15` on separate lines.
  • Test combined grouping and wrapping: verify that spaces count as characters only after grouping is applied.
  • Validate invalid `--group-size` and `--line-length` values throw appropriate errors.

# Documentation

1. **README.md**
   • Under Features, add a section “Text Formatting” with usage examples and brief description.

2. **docs/USAGE.md**
   • Under Options, document `--group-size` and `--line-length` flags, their semantics, valid ranges, and sample commands.