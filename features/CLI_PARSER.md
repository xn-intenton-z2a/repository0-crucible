# Overview

Integrate a structured CLI parser based on yargs to replace the existing placeholder main function. This forms the foundation for all π computation, extraction, benchmarking, and HTTP server commands by dispatching to dedicated handlers and wiring global options.

# CLI Interface

Commands:
  calculate-pi <digits>      Compute π to the specified digit count. Supports --output <path>, --verify-digits <count>, --no-verify, --threads <number>, --no-threads, --show-progress, --no-progress, --cache-dir <path>, --no-cache, --config <path>.
  extract-digit <position>   Extract a single π digit at the given zero-based index. Supports --base <decimal|hex>, --output <path>, --config <path>.
  extract-range <start>-<end>  Extract a contiguous digit range. Supports --base <decimal|hex>, --output <path>, --config <path>.
  benchmark-pi <digits>     Benchmark one or more algorithms. Supports --algorithms <list>, --output-dir <path>, --chart-file <path>, --report-file <path>, --config <path>.
  list-algorithms           List all supported algorithms. Supports --json, --config <path>.
  diagnostics               Print system and runtime diagnostics. Supports --json.
  serve                     Start the HTTP API server. Supports --port <number>, --config <path>.
  help                      Display usage information and exit.
  version                   Print package version and exit.

Global options:
  --cache-dir <path>        Directory for cache files (default ~/.pi_cache).
  --no-cache                Disable cache.
  --config <path>           Load default options from a configuration file.
  --verbose                 Enable detailed logging (alias for LOG_LEVEL=debug).
  --quiet                   Suppress non-error logging (alias for LOG_LEVEL=error).

# Implementation

- Add a dependency on yargs in package.json and install it.
- In src/lib/main.js:
  • Import yargs and the version field from package.json.
  • Remove the current console.log placeholder and replace with yargs
    setup: define commands using yargs.command(name, description, builder, handler).
  • For each command, wire builder to set options and handler to call the corresponding
    implementation function (e.g., chudnovskyPi, bbpDigit, benchmarkPi, startServer,
    listAlgorithms, printDiagnostics).
  • Configure global options via yargs.options so they are available to all commands.
  • Use yargs.fail to handle unknown commands or validation failures, exiting with nonzero status.
  • Preserve ESM imports, the existing shebang, and ensure arguments are parsed from process.argv.

# Testing

- Update tests/unit/main.test.js:
  • Verify that invoking main with ['--help'] prints usage information containing each command name and exits with status 0.
  • Verify that invoking main with ['--version'] prints the version from package.json and exits with status 0.
  • Mock individual handler functions and assert that yargs dispatches to the correct handler with parsed arguments for each command.
  • Test that unknown commands result in an error message and nonzero exit code.
  • Confirm that global options (e.g., --cache-dir, --config) appear in the parsed arguments passed to handlers.

# Documentation

- Update README.md under Features:
  • List each command with its description and associated options.
  • Provide example invocations for common workflows: computing π, extracting digits, running benchmarks, starting the server, and viewing diagnostics.
  • Note the dependency on yargs and instructions for contributing new commands.