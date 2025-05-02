# Summary
Enhance the existing ASCII face output functionality by implementing a help flag that clearly documents available commands, flags, and usage examples. This addition ensures users can easily discover how to operate the CLI without referencing external documentation.

# Behavior
When the tool is invoked with --help or -h, it should:
  • Print a formatted usage block describing the CLI name, purpose, and list of available flags and parameters.
  • Include examples of common invocations (default, custom faces, seed, count).
  • Exit with code 0 immediately after printing help, without outputting any faces or errors.
All other invocation patterns continue to behave according to existing specifications for face generation.

# CLI Interface
  • -h, --help : Show usage instructions and exit 0.
  • --faces <path> : Path to a YAML file defining custom faces (unchanged).
  • --seed <number> : Seed for deterministic face selection (unchanged).
  • --count <n> : Number of faces to output (unchanged).

# Source Changes
In src/lib/main.js:
  • At the top of argument parsing, detect presence of --help or -h.
  • Implement a function printUsage() that prints the usage block to console.log.
  • If help flag is detected, call printUsage() and process.exit(0) before any other logic.
  • Ensure printUsage() describes the tool name, summary, all flags, and shows three usage examples.
  • Retain existing parsing and generation logic unaffected when help is not requested.

# Tests
In tests/unit/main.test.js:
  • Add a test for main(["--help"]) that spies on console.log and verifies:
      – console.log is called exactly once.
      – The logged string contains the tool name, description, and flag list.
      – process.exit is called with 0 without printing any faces.
  • Add an equivalent test for main(["-h"]).
  • Ensure existing face output tests still pass.

# Documentation
In README.md under Features and Usage:
  • Document the -h alias and --help flag with a brief description.
  • Show an example of running node src/lib/main.js --help and a sample snippet of the help output.
  • Confirm that help is the first item in the Features list.

# Dependencies and Files
  • No new dependencies are required.
  • Update only src/lib/main.js, tests/unit/main.test.js, and README.md.
  • No new files are created or removed.