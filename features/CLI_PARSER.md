# Overview
This feature integrates a structured command-line parser into the existing CLI entrypoint, replacing the placeholder main function. It uses yargs to define and dispatch commands for π computation, digit extraction, benchmarking, diagnostics, listing algorithms, and starting the HTTP server. The parser provides a clear, unified interface and centralizes global option handling.

# CLI Interface
Commands:
  calculate-pi <digits>
    Compute π to the specified number of digits. Supports global options: --output, --verify-digits, --no-verify, --threads, --no-threads, --show-progress, --no-progress, --cache-dir, --no-cache, --config.
  extract-digit <position>
    Extract a single π digit at the given zero-based index. Supports: --base, --output, --config.
  extract-range <start>-<end>
    Extract a contiguous range of π digits. Supports: --base, --output, --config.
  benchmark-pi <digits>
    Benchmark one or more algorithms on the specified digit count. Supports: --algorithms, --output-dir, --chart-file, --report-file, --config.
  list-algorithms
    List all supported algorithms. Supports: --json, --config.
  diagnostics
    Print system and runtime diagnostics. Supports: --json.
  serve
    Start the HTTP API server. Supports: --port, --config.
  help
    Display usage information and exit.
  version
    Print package version and exit.
Global options:
  --cache-dir <path>      Directory for cache files (default ~/.pi_cache).
  --no-cache              Disable cache lookup and writing.
  --config <path>         Load default options from a configuration file.
  --verbose               Set log level to debug.
  --quiet                 Set log level to error.

# Implementation
- Add yargs as a new dependency in package.json.
- In src/lib/main.js:
    • Import yargs and version from package.json.
    • Remove the existing console.log placeholder logic.
    • Configure yargs.command for each command listed above, defining builder functions to register options and handlers that invoke the underlying implementation functions (e.g., chudnovskyPi, bbpDigit, benchmarkPi, startServer, listAlgorithms, printDiagnostics).
    • Use yargs.options to register global flags and .middleware to apply them uniformly.
    • Implement yargs.fail to handle unknown commands and validation errors, outputting messages to stderr and exiting with a nonzero code.
    • Ensure the entrypoint calls yargs.parseAsync(process.argv.slice(2)).
- Retain existing export of main(args) for programmatic usage, mapping arguments from yargs.

# Testing
- Extend tests in tests/unit/main.test.js:
    • Verify that `node src/lib/main.js --help` prints usage information containing each command name and exits with code 0.
    • Verify that `node src/lib/main.js --version` prints the version from package.json and exits with code 0.
    • Mock handler functions and test that invoking commands (e.g., calculate-pi, extract-digit, serve) dispatches to the correct handler with parsed arguments.
    • Test that unknown commands produce an error message and nonzero exit code.
    • Confirm that global options (cache-dir, config, verbose, quiet) appear in the parsed arguments passed to handlers.

# Documentation
- Update README.md under the Features section to list each command with its description and options.
- Add example invocations showing common workflows: computing π, extracting digits, running benchmarks, starting the server, and viewing diagnostics.
- Note the new dependency on yargs and provide instructions for contributing new commands.