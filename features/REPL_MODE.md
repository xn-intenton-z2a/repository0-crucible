# Overview

Provide an interactive Read–Eval–Print Loop (REPL) mode for the CLI tool, allowing users to enter Pi commands and options at a prompt rather than via one-off flags. This empowers exploratory workflows and quick experimentation without restarting the process for each command.

# Functional Requirements

- In `src/lib/main.js`, add support for a `--repl` flag. When provided:
  - Ignore standalone flags and enter interactive mode.
  - Initialize a readline interface with a prompt string, e.g., `π> `.
  - Support the following commands with arguments separated by spaces:
    - `help`: Display available commands and usage examples.
    - `pi [digits] [algorithm]`: Compute π to `digits` places using the specified `algorithm` (defaults: 100, machin).
    - `export <path> [digits] [algorithm] [format] [base]`: Invoke `exportPi` to write π to a file.
    - `convergence <output> [digits] [algorithm] [iterations]`: Invoke `visualizePiConvergence`.
    - `distribution <output> [digits] [algorithm]`: Invoke `visualizePiDigits`.
    - `benchmark <min> <max> <step> [algorithm] [mode]`: Invoke `benchmarkPi`, where `mode` is `csv` or `chart`.
    - `search <pattern> [digits] [algorithm] [--all]`: Invoke `searchPi`.
    - `extractHex <position> <count>`: Invoke `extractPiHex`.
    - `extractDecimal <position> <count> [algorithm]`: Invoke `extractPiDecimal`.
    - `exit` or `quit`: Exit the REPL session.
  - Parse and validate arguments for each command; print descriptive errors on invalid input.
  - Dispatch each command to the existing library functions and print or save results accordingly.
  - Continue prompting after each command until `exit` or `quit`.
  - Handle `SIGINT` (Ctrl+C) by asking for confirmation to exit or clearing the current input line.

# CLI Interface

- Add `--repl` flag to the CLI parser in `src/lib/main.js`.
- Update the help output to document `--repl` and note that other flags are ignored when in REPL mode.

# Dependencies

- Use Node's built-in `readline` module; no new external dependencies required.

# Testing

- Add unit tests in `tests/unit/main.test.js` or a new `tests/unit/repl.test.js`:
  - Mock the `readline` interface to supply a sequence of commands and verify correct function calls and outputs.
  - Test error handling for unknown commands and invalid arguments.
  - Simulate `SIGINT` to confirm graceful handling.
- Add CLI tests in `tests/e2e/cli.test.js`:
  - Spawn the CLI with `--repl`, feed commands via stdin, and assert expected stdout lines and file creation when using export or chart commands.
  - Ensure `exit` or `quit` closes the process with exit code 0.
