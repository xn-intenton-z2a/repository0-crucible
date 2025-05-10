# Overview

Integrate a structured, extensible command-line interface for all core operations using yargs to replace the current placeholder main function. Define discrete commands for π calculation, digit extraction, benchmarking, diagnostics, and HTTP server startup, with shared global options for logging, configuration, caching, and timeouts. Provide clear help output, version display, and unified error handling.

# CLI Interface

Commands:
  calculate-pi <digits>
    Compute π to the specified number of digits. Supports options: --output, --threads, --no-threads, --show-progress, --no-progress, --verify-digits, --no-verify, --cache-dir, --no-cache, --cache-ttl, --clear-cache, --timeout, --config.

  extract-digit <position>
    Extract a single π digit by zero-based index. Supports: --base, --output, --config.

  extract-range <start>-<end>
    Extract a contiguous range of π digits. Supports: --base, --output, --config.

  benchmark-pi <digits>
    Benchmark one or more algorithms for the specified digit count. Supports: --algorithms, --output-dir, --chart-file, --report-file, --timeout, --config.

  list-algorithms
    List all supported π algorithms. Supports: --json.

  diagnostics
    Print system diagnostics. Supports: --json.

  serve
    Start the HTTP API server. Supports: --port, --metrics, --stream, --timeout, --config.

  version
    Print package version and exit.

Global Options:
  --cache-dir <path>
  --no-cache
  --config <path>
  --verbose
  --quiet

# Implementation

- Add yargs as a dependency in package.json.
- In src/lib/main.js:
  • Import yargs and read version from package.json.
  • Define each command with yargs.command, specifying its arguments, description, option builders, and async handler that invokes the underlying implementation or stub.
  • Register global options via yargs.option and apply middleware for configuration loading, logging setup, and timeout parsing before command handlers execute.
  • Use yargs.fail to handle parsing and validation errors, printing messages to stderr and exiting with appropriate codes.
  • Call yargs.parseAsync(process.argv.slice(2)) at the end of main.
- Ensure that if no command or --help is requested, a help summary is shown.

# Testing

- Update tests/unit/main.test.js:
  • Verify that invoking main with ['--help'] writes usage information containing each command name.
  • Mock underlying handler functions and confirm that each command dispatches to the correct handler with parsed arguments.
  • Test version command returns the version string and exits with code 0.
  • Simulate unknown commands and verify nonzero exit and error message.

# Documentation

- Update README.md under Features:
  • Document each CLI command, its description, flags, and example usage.
  • Provide a sample workflow demonstrating chained options and commands.
