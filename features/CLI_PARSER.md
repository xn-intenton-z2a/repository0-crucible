# Overview
Replace the existing placeholder main function with a robust CLI parser based on yargs to provide structured commands and global options. This foundational feature will enable all subsequent π calculation, extraction, benchmarking, diagnostics, caching, streaming, and reporting capabilities by dispatching to dedicated handlers.

# CLI Interface
--help
    Display usage information with descriptions of commands and global options and exit 0.
--version
    Print the current package version and exit 0.

Commands
calculate-pi <digits>
    Compute π to the specified digit count. Supports --output to write result to file.
extract-digit <position>
    Extract a single π digit at a zero-based index. Supports --base (hex|decimal) and --output.
serve
    Start the HTTP API server. Supports --port <number> and --json for JSON-formatted responses.
list-algorithms
    List all supported algorithms. Supports --json for machine-readable output.
benchmark-pi <digits>
    Benchmark one or more algorithms. Supports --algorithms, --output-dir, --chart-file, --report-file.
diagnostics
    Print environment and runtime diagnostics. Supports --json for structured output.

Global Options
--cache-dir <path>
    Directory for cache files (default: ~/.pi_cache).
--no-cache
    Disable cache read/write.
--show-progress
    Enable terminal progress bar.
--no-progress
    Disable progress bar.
--verify-digits <count>
    Number of random digits to verify after calculation (default 10).
--no-verify
    Disable spot-check verification.
--threads <number>
    Number of worker threads for parallel computation (default 1).
--no-threads
    Force single-threaded execution.

# Implementation
1. Add yargs dependency in package.json and import in src/lib/main.js.
2. In main(args:
    • Initialize yargs with strict mode, help, and version using package.json version field.
    • Define each command via yargs.command: name, description, builder for its flags, and handler that invokes existing feature functions (calculatePi, extractDigit, startServer, listAlgorithms, benchmarkPi, outputDiagnostics).
    • Configure global options with yargs.options so they propagate to all commands.
    • Replace console.log placeholder with yargs.parse to process process.argv.slice(2).
3. Ensure handlers are passed parsed options and arguments; do not alter core algorithm implementations.
4. Remove the old console.log branch and preserve the shebang line.
5. Update package.json scripts if necessary to include version injection for --version.

# Testing
- Update tests/unit/main.test.js:
    • Test main invoked with ["--help"] prints usage text containing command names and exits without error.
    • Test main invoked with ["--version"] prints a version matching package.json.
    • Mock handler functions and verify yargs dispatches to correct handler with parsed arguments.
    • Test unknown command returns nonzero exit code and prints an error.
    • Verify global options appear in parsed arguments for commands (e.g., --cache-dir is included when calling calculate-pi).

# Documentation
- Update README.md:
    • Under Features, document each command and global option with a brief description.
    • Provide example CLI invocations for common workflows (compute π, extract a digit, start server, list algorithms, run benchmarks, diagnostics).
    • Note dependency on yargs and instructions for contributing new commands.
