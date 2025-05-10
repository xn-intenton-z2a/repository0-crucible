# Overview

This feature replaces the existing placeholder output in src/lib/main.js with a robust, structured command-line interface using yargs. It defines commands and options for all π operations, provides built-in help and version display, and dispatches to the appropriate handler functions based on user input.

# CLI Interface

--help
    Display usage information for all commands and options and exit with status zero.

--version
    Print the current tool version (from package.json) and exit with status zero.

calculate-pi <digits>
    Compute π to the specified number of digits and print to stdout or save to a file with --output.

extract-digit <position> [--base <decimal|hex>] [--output <path>]
    Extract a single digit of π at the given zero-based position in hex or decimal and write to stdout or file.

serve [--port <number>]
    Start the HTTP API server on the given port (default: 3000).

list-algorithms [--json]
    List all supported π algorithms in table format or JSON when --json is provided.

benchmark-pi <digits> [--algorithms <list>] [--output-dir <path>] [--chart-file <path>]
    Run benchmarks for specified algorithms and digit counts, output JSON summary and optional PNG chart.

diagnostics [--json]
    Print system and runtime diagnostics in human-readable form or JSON when --json is provided.

Global options:
--cache-dir <path>     Specify cache directory (default: ~/.pi_cache)
--no-cache             Disable persistent caching
--show-progress        Enable progress bar in terminal
--no-progress          Disable progress bar
--verify-digits <count>  Spot-check <count> random digits after calculation
--no-verify            Disable verification step

# Implementation

- Add yargs dependency in package.json and install.
- In src/lib/main.js:
    • Import yargs and package metadata for version.
    • Define commands using yargs.command with name, description, builder for options, and handler functions stubbed or imported.
    • Handlers call existing or future functions such as calculatePi, extractDigit, startServer, listAlgorithms, benchmarkPi, outputDiagnostics, etc.
    • Configure global options (--cache-dir, --no-cache, --show-progress, --no-progress, --verify-digits, --no-verify) in yargs options.
    • Enable automatic help and version output.
    • Use yargs.parse(args) inside the exported main(args) function so that tests can invoke CLI logic directly.

- Maintain ESM imports and export signature for main(args) to support both direct CLI use and programmatic invocation in tests.

# Testing

- Update tests/unit/main.test.js:
    • Test that main(["--help"]) writes usage information to stdout and exits code zero.
    • Test that main(["--version"]) prints a version matching package.json.
    • Mock handler functions for each command and verify that invoking commands dispatches to the correct handler with parsed arguments.
    • Test unknown command yields an error message and nonzero exit code.
    • Verify global options are parsed and passed through to handlers.

# Documentation

- Update README.md under Features to list all supported commands and global options with brief descriptions.
- Provide example usages for each major command, including calculate-pi, extract-digit, serve, list-algorithms, benchmark-pi, diagnostics, and global flags.