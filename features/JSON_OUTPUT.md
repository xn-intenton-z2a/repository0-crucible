# JSON_OUTPUT Feature

## Overview

Introduce a new CLI mode to emit the chosen emoticon and context metadata in JSON format. This mode enables downstream programs and scripts to parse and integrate emoticon output reliably.

## Behavior

When invoked with the --json flag:

- If used alone, select a random emoticon and print a single-line JSON object with keys:
  - face: string of the ASCII emoticon
  - mode: "random" when no seed is provided, otherwise "seeded"
  - seed: numeric seed value when provided, otherwise null
- If combined with --seed <n>, deterministically select the emoticon by computing n modulo the number of emoticons, set mode to "seeded", and include seed in the JSON
- If combined with --list, ignore seed and list all emoticon strings as a JSON array on one line
- On invalid seed input, emit a JSON object with an error key and message, e.g.:
  { "error": "Invalid seed. Seed must be a non-negative integer." }
  Exit with a nonzero status code

## CLI Options

--json        Output results as JSON
--seed <n>    Provide a non-negative integer seed (only valid with --json or default mode)
--list        List all available emoticons

## Implementation Details

- Modify src/lib/main.js argument parsing to detect the --json flag alongside --seed and --list
- After selecting or listing emoticons, construct the appropriate JavaScript value:
  - Single emoticon: { face, mode, seed }
  - Full list: array of strings
- Serialize with JSON.stringify and console.log the resulting string without extra formatting or line breaks
- On error (invalid seed), console.error JSON.stringify({ error: message }) and call process.exit(1)
- Ensure non-JSON modes remain unchanged

## Tests

In tests/unit/main.test.js, add tests for JSON mode:

- Running main(["--json"]) logs a valid JSON object that parses to an object with face, mode, seed keys
- Running main(["--json", "--seed", "5"]) returns consistent output across runs and seed equals 5
- Running main(["--json", "--list"]) logs a valid JSON array of all emoticon strings
- Running main(["--json", "--seed", "-1"]) logs a JSON error object and exits with nonzero code

## Documentation

- Update README.md to include the --json option under CLI Options
- Provide usage examples showing invocation with --json, with --seed, and with --list, and sample JSON outputs
