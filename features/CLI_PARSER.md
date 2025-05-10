# Overview

This feature introduces a structured command-line argument parser to transform the existing placeholder into a fully functional CLI framework. It provides built-in support for help, version information, and dispatching subcommands or flags consistently across all pi-related operations.

# CLI Interface

--help                  Display usage information and list available commands and options
--version               Show the current version of the tool
--calculate-pi <digits> Compute pi to the specified number of digits
--extract-digit <pos>   Extract a single digit of π at the given zero-based position
--serve                 Start the HTTP API server
--list-algorithms       List all supported π calculation algorithms
--benchmark-pi <digits> Run benchmarks for selected algorithms
--diagnostics           Output system and runtime diagnostic information
--cache-dir <path>      Specify cache directory for results
--no-cache              Disable persistent caching

# Implementation

- Add a dependency on yargs for robust argument parsing.
- In src/lib/main.js:
  • Import yargs and configure the CLI with commands and global flags.
  • Define a yargs command for each existing functional feature (calculate, extract-digit, serve, list-algorithms, benchmark-pi, diagnostics).
  • Map each command or option to the corresponding handler function stub that will later invoke the algorithm logic.
  • Enable automatic help and version output based on package.json metadata.
  • Ensure unknown commands or options show an error and suggest --help.
- Update package.json dependencies to include yargs.
- Maintain the existing import signature for main(args) to allow direct invocation in tests.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Verify that running main with --help prints usage information and exits code zero.
  • Verify that --version prints a semantic version matching package.json.
  • Mock yargs commands to simulate invocation of each stub handler and assert correct dispatch based on provided args.
  • Test that unknown commands produce an error message and nonzero exit code.

# Documentation

- Update README.md under Features:
  • Document the new CLI framework and list all supported commands and flags with brief descriptions.
  • Provide example usages:
    node src/lib/main.js --help
    node src/lib/main.js calculate-pi 1000
