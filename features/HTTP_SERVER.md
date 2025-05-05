# Overview
Enhance the command-line interface by adding a --help flag and refining existing serve and demo mode behavior. Provide clear usage instructions for all supported flags and ensure help text takes precedence.

# CLI Flag Handling
Add support for a --help flag:
- When args includes --help, ignore other flags.
- Print usage summary listing available options: --help, --demo, --serve, --port=<port>, --diagnostics, --build-intermediate, --build-enhanced, --refresh, --merge-persist.
- Exit process with status code 0 after printing.

Retain existing handling for:
- --serve: start HTTP server on default or provided port
- --demo: run interactive demo

Ensure flag parsing is consistent and maintainable by extracting into a helper function printUsage.

# HTTP Server Mode
- No change to endpoint path or behavior for GET /faces
- Ensure help message is not logged when serving

# Implementation
In src/lib/main.js:
- Add a printUsage function that logs usage lines
- In main, before other checks, if args includes --help call printUsage and process.exit(0)
- Refactor existing flag checks into a switch or if/else ladder for clarity
- Include help information with brief description of each flag

# Tests
In tests/unit/main.test.js:
- Add a test for main(["--help"]):
  - Mock console.log to capture output
  - Mock process.exit to throw an object containing code
  - Assert that printed lines include usage header and each flag description
  - Assert exit code is 0
- Ensure existing tests for demo mode and serve mode still pass

# Documentation
In docs/USAGE.md and README.md:
- Document the --help flag under Options with its purpose
- Show example invocation: node src/lib/main.js --help
- Include sample help output listing available flags

# Dependencies
No new dependencies required; use built-in console and process modules.