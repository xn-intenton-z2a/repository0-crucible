# Overview

Add a new analysis mode to compute statistical properties of the π digits sequence, enabling users to inspect digit frequency distributions and generate visual charts for deeper insights.

# CLI Interface

Extend main(args) to accept the following flags alongside --digits and existing options:

--analyze <frequency|chart>    Type of analysis to perform (default: frequency)
--output <file>                Path to write analysis output; for frequency JSON or chart PNG (stdout for JSON if omitted)

Behavior
• When --analyze frequency is specified, compute π to the requested number of digits and output a JSON object mapping each digit (0–9) to its count and percentage of the total.
• When --analyze chart is specified, compute frequency distribution and generate a PNG bar chart using quickchart-js, writing the image to the given output file (required) or stdout if possible.
• The tool bypasses normal PI printing when --analyze is present.

# Implementation Details

In src/lib/main.js and helper modules:

• Parse --analyze and --output flags in main.
• Implement analyzePi(digits) that:
  - Calls calculatePi(digits) to obtain the PI string.
  - Strips the decimal point and counts occurrences of characters '0' through '9'.
  - Computes percentage for each digit as (count / digits) * 100.
  - Returns an object { counts: Record<string, number>, percentages: Record<string, number> }.

• For frequency output:
  - Serialize the analysis object to JSON.stringify({ digits, counts, percentages }, null, 2).
  - If --output is provided, write to file via fs/promises.writeFile, else print to stdout.

• For chart output:
  - Add quickchart-js to dependencies.
  - Construct a QuickChart instance with type 'bar', labels ['0','1',...,'9'], and dataset percentages.
  - Call chart.toBinary() to get image buffer.
  - Write buffer to the output file via fs/promises.writeFile. Fail if no --output path is given.

• Validate that --output is provided when analyze=chart, else error and exit(1).
• Handle errors reading/writing files with clear messages and exit code 1.

# Testing

Unit tests in tests/unit/main.test.js:
• Mock calculatePi to return a known sequence (e.g., '3.14159') and verify analyzePi computes correct counts and percentages.
• Test main with args ['--digits','5','--analyze','frequency'] prints JSON with expected structure and exit(0).
• Test main with args ['--digits','5','--analyze','chart','--output','out.png'] calls quickchart and fs.writeFile appropriately.
• Test missing --output for chart mode triggers error and exit(1).

E2E tests in tests/e2e/cli.test.js:
• Run CLI with --digits 100 --analyze frequency; parse stdout JSON and assert keys 'counts' and 'percentages', total counts equal digits.
• Run CLI with --digits 50 --analyze chart --output freq.png; assert freq.png exists and is non-empty.

# Documentation

Update README.md to document the new analyze commands:

  node src/lib/main.js --digits 200 --analyze frequency
  node src/lib/main.js --digits 100 --analyze chart --output pi-frequency.png

Explain JSON frequency output and PNG chart generation. Note dependency on quickchart-js for chart mode.