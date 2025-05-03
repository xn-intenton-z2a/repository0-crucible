# EMOTICON_OUTPUT Feature

## Overview
Provide a unified CLI mode for outputting ASCII emoticons in plain text or JSON formats, supporting random selection, deterministic seeding, and full listing. This feature realizes the mission of offering emotional feedback through a robust command-line interface that can be consumed by humans and downstream programs alike.

## Behavior

When invoked without flags:
- Select one emoticon at random and print it as plain text.

With the `--seed <n>` flag:
- Validate that n is a non-negative integer.
- Compute index as n modulo the number of emoticons and print the selected emoticon as plain text.
- On invalid seed, print an error message and exit with a nonzero status code.

With the `--list` flag:
- Print all available emoticons, one per line in their defined order.

With the `--json` flag (can be combined with `--seed` or `--list`):
- If alone, pick a random emoticon and emit a single-line JSON object: { face, mode, seed } where mode is “random” and seed is null.
- If combined with `--seed <n>`, emit mode “seeded” and include the seed value.
- If combined with `--list`, emit a JSON array of all emoticon strings.
- On invalid seed, emit { error: message } and exit with a nonzero status code.

## CLI Options

--list       List all available ASCII emoticons in order.
--seed <n>   Provide a non-negative integer seed for deterministic selection.
--json       Output results in JSON format.

## Implementation Details

- In `src/lib/main.js`, extend argument parsing to detect `--json` alongside `--seed` and `--list`.
- Centralize emoticon logic so that selection and listing can produce either text or JSON output:
  - For single emoticon: prepare an object with keys face, mode, seed or print the string directly.
  - For full list: use an array of strings or print each face on its own line.
- Serialize JSON with `JSON.stringify` and print via `console.log` (no extra line breaks).
- On invalid seed: `console.error` with the error JSON or text and `process.exit(1)`.
- Preserve existing behavior when no JSON flag is present.

## Tests

In `tests/unit/main.test.js`:
- Verify default behavior prints one of the known faces based on a mocked `Math.random`.
- Test `--list` prints each face in order.
- Test `--seed 7` yields a consistent face and same output across calls.
- Test `--json` alone emits a valid JSON object with face, mode “random”, seed null.
- Test `--json --seed 5` emits correct JSON with seed 5 and mode “seeded”.
- Test `--json --list` emits a JSON array of all faces.
- Test invalid seeds in JSON mode produce an error JSON and nonzero exit code.

## Documentation

- Update `README.md` to describe all three flags under CLI Options with usage examples for plain text and JSON modes.
- Provide sample invocations and outputs for:
  - Default run
  - Seeded run
  - Listing
  - JSON outputs
