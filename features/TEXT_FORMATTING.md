# Overview

Enable flexible grouping and line wrapping of the CLI text output for π digits. Users can insert a space between groups of digits and break lines at a specified length to improve readability in terminals or in redirected text files.

# CLI Usage

--group-size <n>
    Insert a space every n digits in the fractional part of the π string. Leading “3” and the decimal point remain unaffected unless grouping spans them.

--line-length <n>
    Wrap the (grouped or raw) π string into lines of at most n characters. Breaks occur only at character boundaries after grouping is applied.

Examples:
    node src/lib/main.js --digits 100 --group-size 5
    node src/lib/main.js --digits 200 --line-length 40
    node src/lib/main.js --digits 500 --group-size 10 --line-length 50

# Implementation Details

## Flag Parsing in src/lib/main.js
  • Add support for `--group-size` and `--line-length` flags. Parse each value as integer and validate that it is ≥1. On invalid or non-integer input, throw an error: “Invalid --group-size. Must be integer ≥1” or “Invalid --line-length. Must be integer ≥1.”

## Formatting Helper
  • Implement a helper function `formatPiString(piStr: string, groupSize?: number, lineLength?: number): string`.
  • Grouping step:
      - Split `piStr` into `integerPart` and `fractionalPart` around the decimal point.
      - If `groupSize` is provided, insert a space every `groupSize` characters in `fractionalPart`.
      - Reassemble as `integerPart` + '.' + formatted `fractionalPart`.
  • Wrapping step:
      - If `lineLength` is provided, break the assembled string into substrings of length `lineLength` and join with newline characters.
      - Ensure that grouping spaces count toward the line length limit.
  • Return the fully formatted string.

## Integration in main()
  • After calling `calculatePi` and obtaining `piStr`, detect if `format === 'text'`. If so, call:
      const outputStr = formatPiString(piStr, groupSize, lineLength);
      console.log(outputStr);
  • Other output modes (`png`, benchmarking, server) remain unchanged.

# Tests

Create `tests/unit/textFormatting.test.js` with cases covering:
  • Grouping only: a sample pi string and `groupSize` parameter produce expected spaces every n digits.
  • Wrapping only: ensure newlines are inserted at correct positions when only `lineLength` is specified.
  • Combined grouping and wrapping: verify that wrapping accounts for spaces added by grouping.
  • Error conditions: passing zero or negative values for `--group-size` or `--line-length` throws descriptive errors.
  • Direct unit tests of `formatPiString` helper to isolate formatting logic.

# Documentation

1. README.md
   • Under Features, add a “Text Formatting” section describing both flags, their behavior, and examples.

2. docs/USAGE.md
   • Under Options, document `--group-size` and `--line-length` with valid ranges, explanations, and sample CLI commands.
