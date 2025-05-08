# Overview

Implement a built-in help command for the CLI tool so users can discover available options and usage patterns without consulting external documentation. When invoked with `--help` or `-h`, the tool will print a structured usage message and exit.

# Implementation

1. Argument Parsing
   - Add `minimist` to src/lib/main.js for parsing arguments.
   - Define aliases: `-h` for `--help`.
   - Ensure help flags are detected before any other action.

2. Usage Message
   - In the `main()` function, when help is requested, write a multi-line usage message to stdout. The message should include:
     • Invocation syntax: `node src/lib/main.js [options]`
     • List of supported flags:
       - `-h, --help`             Show this help message and exit
       - `--algorithm <name>`     Choose π algorithm: leibniz, gauss-legendre, chudnovsky
       - `--digits <n>`           Number of decimal places to compute (default 1000)
       - `--format <text|png>`    Output format for π result (default text)
       - `--output <path>`        File path for output (defaults to stdout)
       - `--benchmark`            Measure and display execution time
       - `--report <path>`        Generate HTML report at specified path
       - `--progress`             Display live progress bar during computation
       - `--serve`                Launch HTTP API server
       - `--cache-dir <path>`     Directory for persistent cache storage
       - `--no-cache`             Disable cache lookup and storage
       - `--sweep <r:s:e>`        Run performance sweep over a range of digit values
       - `--algorithms <list>`    Comma-separated list of algorithms for sweep
       - `--port <n>`             Port for HTTP server (default 3000)

3. Process Exit
   - After printing help, call `process.exit(0)` to terminate without error.

# Testing

- Create `tests/unit/help.test.js`:
  • Simulate `process.argv` with `--help` and capture stdout. Assert that output contains "Usage:" and each flag description.
  • Simulate `process.argv` with `-h` and repeat assertions.
  • Verify that `main()` finishes without throwing exceptions and that `process.exit` is invoked with code 0.

# Documentation

- Update `README.md`:
  • Under Usage, add a bullet for the `--help`/`-h` option.
  • Provide examples:
    ```bash
    node src/lib/main.js --help
    node src/lib/main.js -h
    ```