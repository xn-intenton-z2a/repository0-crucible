# ENHANCED_OUTPUT Feature

# Overview
Extend the existing emoticon output pipeline with a count option to output multiple emoticons per invocation. Retain diagnostics mode, custom config loading, JSON modes, interactive REPL, and ANSI styling support.

# Count Option
Introduce a new CLI flag --count <n> where n is a non-negative integer. When provided:
- In plain mode: output n emoticons, one per line, selected at random by default.
- In JSON mode (--json): output a JSON array of n emoticon strings.
- When combined with --seed: generate count emoticons using seed, seed+1, ..., seed+count-1 via the seededFace function.
- If n is invalid or missing, display an error message and exit with code 1.

# CLI Options
--count <n>        Output n emoticons instead of a single one
Existing options remain unchanged: --list, --seed, --json, --diagnostics, --config, --interactive, --serve, --port, --color, --help, --version.

# Implementation Details
1. In main, detect the presence of --count and parse the next argument as an integer.
2. Validate that the parsed count is a non-negative integer; on failure, log an error and call process.exit(1).
3. Create a utility to produce an array of emoticons based on mode (random or seeded) and count.
4. When count is specified, output results according to plain or JSON mode and then exit.
5. Ensure count handling occurs before default single-output logic and does not interfere with other modes like --list or --interactive.

# Tests
- Test that main(["--count","3"]) prints three valid emoticons, each on its own line.
- Test that main(["--json","--count","2"]) logs a JSON array of length 2 with valid emoticon strings.
- Test that combining --seed 5 --count 4 produces a deterministic array of four emoticons based on seeds 5,6,7,8.
- Test that invalid count such as --count -1 or --count abc results in an error message and process.exit(1).

# Documentation
Update README.md and docs/EMOTICON_OUTPUT.md to include the --count flag, its behavior in plain and JSON modes, interaction with --seed, and usage examples.