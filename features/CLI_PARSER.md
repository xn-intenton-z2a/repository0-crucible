# Overview

Integrate a structured, extensible command-line interface using yargs to unify all core operations under clear commands and global options. This feature lays the foundation for the CLI tool to parse commands, flags, and environment configuration consistently, enabling future features to plug into defined subcommands.

# Commands and Options

Define discrete commands for key operations:

calculate-pi <digits>
    Compute π to the specified number of digits. Supports options: --output, --threads, --timeout, --config, --cache-dir, --no-cache, --show-progress, --no-progress, --verify-digits, --no-verify

extract-digit <position>
    Extract a single π digit at the given index. Supports options: --base, --output, --config

extract-range <start>-<end>
    Extract a range of π digits. Supports options: --base, --output, --config

benchmark-pi <digits>
    Benchmark algorithms for π computation. Supports options: --algorithms, --output-dir, --chart-file, --report-file, --timeout, --config

list-algorithms
    List supported π calculation and extraction algorithms. Supports option: --json

diagnostics
    Print system diagnostics. Supports option: --json

serve
    Start the HTTP API server. Supports options: --port, --metrics, --stream, --timeout, --config

version
    Print package version and exit

Global Options:

--config <path>
    Load CLI defaults from a JSON or YAML file

--cache-dir <path>
    Directory for cache files

--no-cache
    Disable cache lookup and writes

--verbose
    Enable debug and info logging

--quiet
    Suppress non-error output

--timeout <seconds>
    Abort long-running operations after the specified seconds

# Implementation

- Add a dependency on yargs in package.json
- In src/lib/main.js, import yargs and define commands via yargs.command with description, builder for options, and handler that invokes existing or placeholder logic
- Register global options via yargs.option and middleware to:
    • Load configuration from file using js-yaml and merge with CLI flags
    • Initialize logging based on --verbose, --quiet, and LOG_LEVEL environment variable
    • Validate flags (e.g., digits and positions) using zod schemas
- Use yargs.fail to handle parsing errors, printing messages to stderr and exiting with code 1
- At end of main, call yargs.parseAsync(args)

# Testing

- Update tests/unit/main.test.js to verify:
    • main invoked with --help prints usage information containing all commands and global options
    • main invoked with version command prints the correct version and exits code 0
    • Commands dispatch to the correct handler based on parsed arguments (mock handlers if necessary)
    • Invalid commands or flags result in exit code 1 and descriptive error messages

# Documentation

- Update README.md under Features to:
    • Describe each CLI command with its options and usage examples
    • Show how to load configuration from a file and override with flags
    • Provide sample workflows combining commands and global flags