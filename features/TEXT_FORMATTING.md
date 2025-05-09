# Overview

Enable flexible grouping and line wrapping of the CLI text output for π digits. Users can insert spaces between groups of digits and wrap lines at a specified maximum length to improve readability in terminals or text files.

# CLI Usage

--group-size <n>
    Insert a space every n digits in the fractional part of the π string. Leading “3” and the decimal point are unaffected unless grouping spans them.

--line-length <n>
    Wrap the output (grouped or raw) into lines of at most n characters. Line breaks occur only at character boundaries, counting spaces inserted by grouping.

Examples:
    node src/lib/main.js --digits 1000 --group-size 5
    node src/lib/main.js --digits 1000 --line-length 50
    node src/lib/main.js --digits 1000 --group-size 5 --line-length 50

# Implementation Details

## Flag Parsing in src/lib/main.js

• Add support for `--group-size` and `--line-length` in the command-line parser. Parse each value as an integer and validate that it is ≥1. If invalid, throw an error:
  • "Invalid --group-size. Must be integer ≥1"
  • "Invalid --line-length. Must be integer ≥1"

• After parsing standard flags (`--digits`, `--method`, `--format`), detect `groupSize` and `lineLength` and pass them through to the formatting helper when format is `text`.

## Formatting Helper

Implement a function `formatPiString(piStr: string, groupSize?: number, lineLength?: number): string` in `src/lib/main.js` or a dedicated module:

1. Split `piStr` into `integerPart` and `fractionalPart` around the decimal point.
2. If `groupSize` is provided:
   - Break `fractionalPart` into groups of `groupSize` characters.
   - Join groups with single spaces.
   - Reassemble as `integerPart` + '.' + grouped fractional part.
3. If `lineLength` is provided:
   - Break the entire string into substrings of length `lineLength`.
   - Join substrings with newline characters.
4. Return the formatted string.

## Integration in main()

After computing `piStr` and confirming `format === 'text'`:

    const outputStr = formatPiString(piStr, groupSize, lineLength);
    console.log(outputStr);

Ensure that other modes (`png`, `benchmark`, HTTP server) remain unaffected by these flags.

# Tests

Create `tests/unit/textFormatting.test.js` with tests covering:

• Grouping only: Given a sample π string and `groupSize`, assert spaces are inserted correctly.
• Wrapping only: Given a sample π string and `lineLength`, assert line breaks at correct positions.
• Combined grouping and wrapping: Verify that wrapping accounts for inserted spaces.
• Error conditions: Passing zero, negative, or non-integer values for `--group-size` or `--line-length` should throw descriptive errors.
• Direct unit tests of `formatPiString` to isolate formatting logic.

# Documentation

## README.md

Under "Key Features", in the Text Formatting section:

- Add descriptions for `--group-size` and `--line-length` with examples.

## docs/USAGE.md

Under "CLI Options":

  --group-size <n>       Insert a space every _n_ digits (integer ≥1)
  --line-length <n>      Wrap output into lines of length _n_ (integer ≥1)

Include example commands demonstrating grouping, wrapping, and combined use.