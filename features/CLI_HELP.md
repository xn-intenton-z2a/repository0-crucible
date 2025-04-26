# Description

Provide a CLI command to display help instructions and usage examples. This satisfies the mission to showcase all features of the library via a standard help interface and guides users in using the CLI tool.

# Implementation

Extend the main function to detect the --help or -h flag. When present, output a formatted usage message that includes:

Usage: node src/lib/main.js [option]

Options:
  --list-sources, -l    List configured public data sources and their URLs
  --help, -h            Show help instructions and available commands

Preserve existing behavior when no help flag is provided.

# CLI Usage

To display help:

node src/lib/main.js --help
node src/lib/main.js -h

Expected output:

Usage: node src/lib/main.js [option]
Options:
  --list-sources, -l    List configured public data sources and their URLs
  --help, -h            Show help instructions and available commands

# Testing

Add a test that spies on console.log when calling main with the --help flag and verifies the usage header and options lines are printed. Ensure main terminates without throwing an error when invoked with the flag.

# Documentation Updates

Update README.md under Features to describe the help option and show example usage and output.