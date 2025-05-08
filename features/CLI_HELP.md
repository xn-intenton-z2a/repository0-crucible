# Overview

Add a built-in help command so users can discover available options and usage patterns without reading external docs. When invoked with --help or -h, the tool prints a structured usage message and exits.

# Implementation

1. Dependency Update
   • Add "minimist" to dependencies in package.json.

2. Argument Parsing in main.js
   • Import minimist at the top of src/lib/main.js.
   • In main(), call minimist on the raw args array, defining boolean flags ["help", "h"] and aliases { h: "help" }.
   • Check parsedArgs.help; if true:
     - Write a multi-line usage message to stdout. Include:
       * Invocation syntax: node src/lib/main.js [options]
       * List of supported flags with brief descriptions and defaults.
     - Call process.exit(0).
   • Otherwise proceed with existing logic.

3. Usage Message Content
   • Show each flag and alias: --help, -h, --algorithm, --digits, --format, --output, --benchmark, --report, --progress, --serve, --cache-dir, --no-cache, --sweep, --algorithms, --port.
   • Include default values where applicable.

# Testing

- Create tests/unit/help.test.js
  • Simulate process.argv including ['node', 'src/lib/main.js', '--help'] and capture stdout. Assert stdout contains "Usage:" and each flag description, and process.exit was called with code 0.
  • Repeat for ['node', 'src/lib/main.js', '-h'].
  • Ensure main() does not throw when help is not requested.

# Documentation

- Update README.md:
  • Under Usage add a bullet for --help and -h options.
  • Provide example commands:
      node src/lib/main.js --help
      node src/lib/main.js -h

  • Confirm that "npm run start" shows help when --help is passed.
