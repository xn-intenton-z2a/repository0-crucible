# Overview

Add a new CLI mode that outputs the selected emoticon as a JSON object. This mode enables machine consumption and integration into other tools and pipelines.

# Behavior

When the user runs the CLI with the --json option, the tool will select an emoticon as in the random mode and print a single line of valid JSON to standard output. The JSON object will include:
- face: the ASCII art string chosen
- mode: string literal "random" or "seeded" depending on whether a seed was provided
- seed: the numeric seed value or null when random mode was used

# CLI Options

--json       Output the chosen emoticon in JSON format instead of plain text
--seed <n>   Works in combination with --json to produce deterministic JSON output

# Implementation Details

- In src/lib/main.js, extend argument parsing to detect the --json flag.
- After selecting the emoticon, build a JavaScript object with keys face, mode, and seed.
- Use JSON.stringify on the object and write the result to console.log without additional formatting.
- When both --json and --list are provided, print the full array of emoticons as a JSON array and exit successfully.
- Ensure that handling of invalid seed values produces an error and exit code >0 in JSON mode as well, with a JSON object containing an error message.

# Tests

- In tests/unit/main.test.js, add tests for JSON output:
  - Running with --json alone prints valid JSON that parses to an object with expected keys.
  - Combining --json with --seed returns consistent JSON object across runs.
  - Combining --json with --list prints a JSON array of all emoticon strings.
  - Invalid seed with --json prints a JSON error object and exits with nonzero code.

# Documentation

- Update README.md to document the new --json option under CLI Options.
- Provide examples showing invocation of the CLI with --json and sample JSON output.
