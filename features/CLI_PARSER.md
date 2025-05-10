# Overview

Integrate a structured, extensible command-line interface for all core operations using yargs and unify global options for configuration, caching, logging, and timeouts. The CLI should support discrete commands for π calculation, digit extraction, benchmarking, diagnostics, and HTTP server startup with clear help output, version display, and unified error handling.

# Commands

calculate-pi <digits>
    Compute π to the specified number of digits. Supports options: --output, --threads, --no-threads, --show-progress, --no-progress, --verify-digits, --no-verify, --cache-dir, --no-cache, --cache-ttl, --clear-cache, --timeout, --config, --openapi, --openapi-output

extract-digit <position>
    Extract a single π digit by zero-based index. Supports options: --base, --output, --config

extract-range <start>-<end>
    Extract a contiguous range of π digits. Supports options: --base, --output, --config

benchmark-pi <digits>
    Benchmark one or more algorithms for the specified digit count. Supports options: --algorithms, --output-dir, --chart-file, --report-file, --timeout, --config

list-algorithms
    List all supported π calculation and extraction algorithms. Supports options: --json

diagnostics
    Print system diagnostics including Node version, platform, CPU and memory metrics. Supports options: --json

serve
    Start the HTTP API server. Supports options: --port, --metrics, --stream, --timeout, --config

version
    Print package version and exit

# Global Options

--config <path>
    Load CLI defaults from YAML or JSON configuration file. Overrides default search order: ./pi-config.yaml, ./pi-config.yml, ./pi-config.json

--cache-dir <path>
    Directory for cache files. Overrides default ~/.pi_cache

--no-cache
    Disable cache lookup and writes

--verbose
    Enable detailed debug and info logging

--quiet
    Suppress non-error output

--timeout <seconds>
    Abort long-running operations after specified seconds

# Implementation

- Add yargs as a dependency and import in src/lib/main.js
- Use yargs.command to define each subcommand with its positional arguments, description, option builders, and async handlers that invoke underlying logic
- Register global options via yargs.option and apply middleware to:
  • Load configuration from file or environment using js-yaml and dotenv
  • Initialize logging utility based on --verbose, --quiet, and LOG_LEVEL
  • Parse and validate --timeout using Zod schemas
- Use yargs.fail to handle parsing and validation errors consistently, printing messages to stderr and exiting with appropriate status codes
- Ensure that commands like --openapi and --openapi-output run before any server startup or computation, emitting the OpenAPI JSON and exiting immediately
- Call yargs.parseAsync(process.argv.slice(2)) at the end of main

# Testing

- Update tests in tests/unit/main.test.js to:
  • Verify that invoking main with --help prints usage information containing all command names
  • Mock handler functions and confirm that each command dispatches correctly with parsed arguments
  • Test version command returns the correct version and exit code 0
  • Simulate unknown commands and verify a nonzero exit and error message

# Documentation

- Update README.md under Features:
  • Document each CLI command, its description, available flags, and example usage
  • Provide sample workflows demonstrating combined options and commands