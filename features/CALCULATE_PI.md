# Overview
Extend the existing π calculation feature to support structured output formats and file outputs for seamless machine integration and flexible workflows.

# CLI Interface
Add the following flags to main(args):
--digits <n>          Number of decimal places to calculate (integer, default: 10, max 1000)
--format <text|json>  Output format: plain text or JSON (default: text)
--output <file>       Path to write output; if omitted, write to stdout
--help, -h            Show help information and exit

When --format is json, the tool emits a JSON object with fields:
  digits: requested digit count
  pi: computed π string

If --output is provided, write the formatted output (text or JSON) to the specified file; otherwise print to stdout.

# Implementation Details
• In src/lib/main.js, enhance argument parsing to detect --format and --output flags alongside existing --digits and --help.
• Validate that --format accepts only 'text' or 'json'; on invalid value, print an error and exit with status 1.
• After computing π via calculatePi(digits), branch on format:
  - text: retain existing behavior of printing π string
  - json: create an object { digits, pi: piString } and serialize with JSON.stringify(obj, null, 2)
• If --output is set:
  - Import fs/promises and write the formatted string to the given file path
  - On write error, print an error message and exit with status 1
• If --output is not set, console.log the formatted output and exit status 0
• Ensure backward compatibility: if --format and --output are omitted, behavior matches previous calculatePi CLI

# Testing
• Add unit tests in tests/unit/main.test.js to:
  - Invoke main with ["--digits","5","--format","json"] and verify console.log was called with valid JSON matching structure
  - Mock fs/promises.writeFile to simulate writing and verify it is invoked when --output is provided
  - Test invalid --format values result in error and exit code 1
  - Test --output with unwritable path triggers error and exit code 1
• Add e2e tests in tests/e2e/cli.test.js:
  - Run the CLI with --digits 3 --format json and parse stdout as JSON to assert fields and values
  - Run the CLI with --digits 2 --format text --output temp.txt and verify temp.txt exists with expected content

# Documentation
• Update README.md under Features to document new --format and --output flags, describe default behaviors and provide examples:
    node src/lib/main.js --digits 5 --format json
    node src/lib/main.js --digits 8 --format text --output pi.txt
• Note that JSON output enables easy integration with other tools and scripts