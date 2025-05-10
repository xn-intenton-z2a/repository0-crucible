# Overview

Introduce a global --json flag to the CLI tool to switch command outputs from human-readable text to structured JSON. This enhances scriptability and integration by providing machine-friendly responses for all operations.

# CLI Interface

--json, -j
    When provided, commands emit a JSON object on stdout instead of plain text. Applies globally to all commands, including calculate-pi, extract-digit, extract-range, benchmark-pi, diagnostics, list-algorithms, and serve-related outputs.

# Implementation

- In src/lib/main.js:
  • Extend the yargs setup to define a global boolean flag `json` (alias `j`, default: false).
  • In each command handler, inspect the `argv.json` property. If true, serialize the command’s result into a JSON object and write it to stdout:
    - calculate-pi: `{ pi: string, digits: number, algorithm: string }`
    - extract-digit: `{ digit: string, position: number, base: string }`
    - extract-range: `{ digits: string, start: number, end: number, base: string }`
    - benchmark-pi: `{ results: Array<{ algorithm: string, digits: number, durationMs: number, memoryBytes: number }> }`
    - diagnostics: raw diagnostics object as JSON
    - list-algorithms: `{ algorithms: Array<{ name: string, description: string }> }`
  • When `argv.json` is false, preserve existing human-readable text output.
  • No change to exit codes: 0 for success, nonzero for errors.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Simulate `main(["--calculate-pi","5","--json"])`; parse stdout as JSON and assert the presence and types of `pi`, `digits`, and `algorithm`.
  • Simulate `main(["--extract-digit","10","--base","hex","--json"])`; verify JSON has `digit`, `position`, and `base`.
  • Test that commands without `--json` still produce text output.

# Documentation

- Update README.md under Features:
  • Document the global `--json` (or `-j`) flag and its effect.
  • Show example CLI usage with `--json` and sample JSON responses.
