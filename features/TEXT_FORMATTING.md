# Overview

Enable flexible grouping and line-wrapping of text-based π output. Users can insert a space between groups of digits and break lines at a specified length for readability in the terminal or redirected files.

# CLI Usage

--group-size <n>
    Insert a space every n digits in the π string (integer ≥1). Applies to the fractional part; the leading "3" and decimal point remain unaffected unless grouping covers them.

--line-length <n>
    Wrap the (grouped or raw) π string into lines of n characters (integer ≥1). Line breaks occur only at character boundaries, after grouping.

Examples:
    node src/lib/main.js --digits 50 --group-size 5
    node src/lib/main.js --digits 100 --line-length 25
    node src/lib/main.js --digits 200 --group-size 10 --line-length 50

# Implementation Details

1. Flag Parsing in src/lib/main.js
   • Add support for `--group-size` and `--line-length`. Parse each value as integer and validate ≥1. On invalid input, throw an error describing the issue.

2. Formatting Pipeline in main()
   • After computing `piStr = calculatePi(digits, method)`, apply:
     a. Grouping: split at the decimal point into integerPart and fractionalPart. Leave integerPart + "." intact, then insert a space every `groupSize` characters in fractionalPart.
     b. Wrapping: take the resulting string and break it into substrings of length `lineLength`, joined by newline characters.
   • Assign the final formatted string to `outputStr`.

3. Output
   • When `format === 'text'`, output `outputStr` via `console.log`. All other output modes remain unchanged.

# Tests

Create `tests/unit/textFormatting.test.js`:
  • Test grouping only: given a sample `piStr`, verify correct spacing at every n digits.
  • Test wrapping only: verify newlines are inserted at correct positions for lineLength.
  • Test combined grouping and wrapping: ensure wrapping counts spaces from grouping.
  • Test invalid values for `--group-size` and `--line-length` throw descriptive errors.
  • Use spies or direct invocation of the formatting helper to isolate logic.

# Documentation

1. README.md
   • Under Features, add a section "Text Formatting" with description and examples of `--group-size` and `--line-length`.

2. docs/USAGE.md
   • Under Options, document both flags with valid ranges, semantics, and sample commands.