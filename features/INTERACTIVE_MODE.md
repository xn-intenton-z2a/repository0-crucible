# Interactive Mode

# Purpose
Allow users to enter an interactive session to continuously generate ASCII faces without re-invoking the CLI, enhancing exploratory and demo workflows.

# Implementation Details
1. Parse interactive flag
   • Add boolean option interactive (alias i) to minimist configuration.
2. Initialize interactive REPL
   • If flags.interactive is true, display welcome message and instructions.
   • Use Node's readline module to create an interface reading from stdin and writing to stdout.
3. Handle user input
   • On empty input or pressing Enter, generate and print faces according to flags.count, flags.json, flags.color, flags.seed, flags.theme, and flags.config.
   • If user inputs exit, quit, or Ctrl+C, close the interface and exit gracefully.
4. Exit behavior
   • On receiving close event, print a goodbye message and exit process.
5. Integration with existing features
   • Support all existing face generation flags (count, config, theme, color, seed, json).
   • Do not start HTTP server when interactive mode is active.

# CLI Interface Examples
- Start interactive session
  node src/lib/main.js --interactive
- Generate three faces per Enter in JSON mode
  node src/lib/main.js --interactive --count 3 --json
- Use a custom theme in interactive mode
  node src/lib/main.js --interactive --theme happy

# Testing
1. Unit Tests
   • Mock readline interface to simulate user pressing Enter and typing exit; verify console.log called with correct faces and session ends.
   • Test combining interactive with count=2 and json flags to ensure JSON arrays printed on input.
2. Integration Tests
   • Spawn CLI with --interactive flag, send newline and exit commands; capture stdout and assert it contains welcome message, face output, and goodbye message.

# Documentation
- Update README.md under Features to describe the --interactive (-i) mode and options.
- Extend docs/USAGE.md with an Interactive Mode section showing usage examples and behavior.