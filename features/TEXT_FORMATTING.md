# Overview

Provide users with advanced text formatting options for π output in CLI mode. Introduce two flags:
--group-size to insert spaces between groups of digits, and --line-length to wrap lines after a specified length. Improves readability in terminals or text files.

# CLI Flag Parsing

In `src/lib/main.js`:

• Recognize and validate two new flags:
  – `--group-size <n>`: integer ≥1. Error if invalid: "Invalid --group-size. Must be integer ≥1"
  – `--line-length <n>`: integer ≥1. Error if invalid: "Invalid --line-length. Must be integer ≥1"

• After parsing existing flags (`--digits`, `--method`, `--format`), extract `groupSize` and `lineLength`. Only apply when `format` is `text`. Ignore in other modes.

# Formatting Helper

Implement `formatPiString(piStr: string, groupSize?: number, lineLength?: number): string` in `src/lib/main.js` or a dedicated module:

1. Split `piStr` into `integerPart` and `fractionalPart` around the decimal point.
2. If `groupSize` is provided:
   - Break `fractionalPart` into groups of `groupSize` characters.
   - Join groups with single spaces.
   - Reassemble as `integerPart + '.' + grouped fractional part`.
3. If `lineLength` is provided:
   - Break the full string (including spaces) into substrings of length `lineLength`.
   - Join substrings with newline characters.
4. Return the formatted string.

# Integration in main()

After computing `piStr`:

```
if (format === 'text') {
  const outputStr = formatPiString(piStr, groupSize, lineLength)
  console.log(outputStr)
}
``` 

Ensure PNG, benchmark, and server modes ignore these flags.

# Tests

Create or extend `tests/unit/textFormatting.test.js` to cover:

• Grouping only: given a sample π string, assert spaces inserted every groupSize digits.
• Wrapping only: given a sample π string, assert newline breaks at lineLength boundaries.
• Combined grouping and wrapping: ensure wrapping counts inserted spaces.
• Error conditions: non-integer, zero, or negative values for flags throw descriptive errors.
• Direct unit tests of `formatPiString` isolating formatting logic.

# Documentation

Update documentation in two places:

- **README.md**, under "Text Formatting": describe both flags with usage examples.
- **docs/USAGE.md**, under "CLI Options": add lines for:
  --group-size <n>    Insert a space every _n_ digits (integer ≥1)
  --line-length <n>   Wrap output into lines of length _n_ (integer ≥1)

Include example commands demonstrating grouping, wrapping, and combined use.