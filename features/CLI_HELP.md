# CLI Help

# Overview
Add a --help flag that displays detailed usage information for the CLI, including available commands, flags and examples.

# Functionality
- Recognize --help and -h flags in main.js arguments
- When invoked, print usage text covering available flags (--help, --diagnostics, --serve, --fetch, --refresh, --capital-cities)
- Display brief descriptions and example commands
- Exit with status code zero after printing

# Usage
node src/lib/main.js --help
node src/lib/main.js -h

# Testing
- Add tests in tests/unit/main.test.js mocking process.argv to include --help and -h
- Capture stdout and verify help text content and exit code zero

# Documentation
- Update README.md under Features to include the --help flag and its description
- Extend docs/USAGE.md with a section on invoking help and sample output