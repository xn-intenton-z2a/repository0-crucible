# Overview

Introduce a robust, structured command-line parser replacing the placeholder console.log to provide a cohesive entry point for all π operations. Users invoke intuitive commands and global flags; handlers dispatch to feature implementations. This foundational feature unlocks all other CLI and HTTP capabilities.

# CLI Interface

Help and Version
--help                 Display usage information with descriptions of commands and global options and exit with status code zero.
--version              Print current tool version from package.json and exit with status code zero.

Commands

calculate-pi <digits>             Compute π to the given digit count and output to stdout or file (--output).
extract-digit <position>          Extract a single π digit at zero-based index in hex or decimal (--base, --output).
serve [--port <number>]           Start the HTTP API server on specified port (default: 3000).
list-algorithms [--json]          List supported π algorithms in table or JSON format when --json provided.
benchmark-pi <digits>             Measure performance of one or more algorithms, output JSON summary and optional PNG chart (--algorithms, --output-dir, --chart-file).
diagnostics [--json]              Print environment and runtime diagnostics in human-readable or JSON format.

Global Options
--cache-dir <path>                Directory for persistent cache (default: ~/.pi_cache)
--no-cache                        Disable cache reads and writes for current run.
--show-progress                   Enable terminal progress bar for long-running tasks.
--no-progress                     Disable progress bar.
--verify-digits <count>           Spot-check random digits after calculation (default: 10).
--no-verify                       Disable verification step.
--threads <number>                Number of worker threads for parallel computation.
--no-threads                      Force single-threaded execution.

# Implementation

- Add yargs dependency in package.json and import into src/lib/main.js.
- Replace console.log placeholder in exported main(args) with yargs.parse implementation:
  • Define commands via yargs.command with name, description, builder for options, and a handler that invokes underlying feature functions (e.g., calculatePi, extractDigit, startServer, listAlgorithms, benchmarkPi, outputDiagnostics).
  • Configure global options with yargs.options and ensure they are parsed and passed into each handler.
  • Enable automatic help and version handling using yargs.help() and yargs.version().
  • Use yargs.strict() to reject unknown commands and options with informative errors.

# Testing

- Update tests/unit/main.test.js:
  • Test main(["--help"]) writes usage output containing key command names and exits cleanly.
  • Test main(["--version"]) prints version matching package.json.
  • Mock each handler function and verify yargs dispatches to correct handler with parsed arguments.
  • Test unknown command returns nonzero exit code and prints error message.
  • Verify global options propagate to handlers when multiple commands and flags are combined.

# Documentation

- Update README.md under Features section:
  • Document each command and global option with examples.
  • Provide usage snippets for common workflows: computing π, extracting digits, running server, listing algorithms, benchmarking, diagnostics.
  • Note dependency on yargs and how to contribute additional commands.
