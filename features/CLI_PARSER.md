# Overview

Integrate a structured, extensible command-line interface using yargs to replace the placeholder main function. Provide clearly defined commands and global options that dispatch to existing core computations, extraction, benchmarking, diagnostics, caching, configuration, and HTTP server features, offering a unified developer and end-user experience.

# CLI Interface

Commands:
  calculate-pi <digits>
    Compute π to the specified number of digits. Supports options: --output, --verify-digits, --no-verify, --threads, --no-threads, --show-progress, --no-progress, --cache-dir, --no-cache, --timeout, --config.

  extract-digit <position>
    Extract a single π digit at the given zero-based index. Supports: --base, --output, --config.

  extract-range <start>-<end>
    Extract a contiguous range of π digits. Supports: --base, --output, --config.

  benchmark-pi <digits>
    Benchmark one or more algorithms for the specified digit count. Supports: --algorithms, --output-dir, --chart-file, --report-file, --config, --timeout.

  list-algorithms
    List all supported π algorithms. Supports: --json, --config.

  diagnostics
    Print system diagnostics. Supports: --json.

  serve
    Start the HTTP API server. Supports: --port, --openapi, --openapi-output, --config, --timeout, --metrics, --stream.

  version
    Print package version and exit.

Global options:
  --cache-dir <path>      Directory for cache files (default ~/.pi_cache).
  --no-cache              Disable cache lookup and writing.
  --config <path>         Load defaults from a configuration file.
  --verbose               Enable debug-level logging.
  --quiet                 Suppress non-error output.

# Implementation

- Add yargs as a dependency in package.json.
- In src/lib/main.js:
  • Import yargs and version from package.json.
  • Define each command with yargs.command, specifying its name, description, builder for flags, and handler that invokes the underlying implementation (chudnovskyPi, bbpDigit, benchmarkPi, startServer, listAlgorithms, printDiagnostics, generateOpenapi).
  • Use yargs.options to register global flags and .middleware to apply configuration loading, logging verbosity, cache setup, and timeout parsing before command handlers.
  • Implement a centralized error handler via yargs.fail to output errors to stderr and exit with appropriate status codes.
  • Ensure main(args) remains exported for programmatic use by mapping parsed yargs argv to the same handlers.
  • On entry, call yargs.parseAsync(process.argv.slice(2)).

# Testing

- Extend tests in tests/unit/main.test.js:
  • Verify `node src/lib/main.js --help` prints usage containing all command names and exits with code 0.
  • Verify `node src/lib/main.js --version` prints the version string and exits with code 0.
  • Mock underlying handler functions and confirm that invoking each command dispatches to the correct handler with parsed arguments.
  • Test that unknown commands produce an error message and exit with nonzero code.
  • Confirm global options (cache-dir, config, verbose, quiet) appear in parsed argv passed to handlers.

# Documentation

- Update README.md under Features:
  • List each command and its description with example invocations.
  • Document global options and precedence rules.
  • Provide a complete sample workflow demonstrating chained options and commands.