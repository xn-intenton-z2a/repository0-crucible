# Overview

Integrate Commander.js into the CLI entry point to replace manual argument parsing and provide a robust, declarative interface for all existing and future flags. This will simplify parsing, improve validation, auto-generate help, and make it easier to add new options.

# Implementation Details

• Add "commander" as a dependency in package.json.
• In src/lib/main.js:
  • Import { Command, Option, Argument } from "commander" and read version and description from package.json.
  • Create a Command instance named "pi-calculator" with .name(), .version(), and .description().
  • Declare options using .option() or new Option():
    --digits <n>            number of decimal places (integer, default 10, min 1, max 1000)
    --format <text|json>    output format, choices text or json (default text)
    --output <file>         file path to write output (optional)
    --help, -h              show help information (built-in)
  • Use custom arg parsers to coerce and validate numeric values and enforce ranges; rely on .choices() for format.
  • After program.parse(argv), read opts via program.opts().
  • Branch behavior:
    - If format is json: build object { digits, pi } and JSON.stringify with 2-space indent.
    - Otherwise print the PI string.
  • If opts.output is set, import fs/promises and write the formatted string to that file, handling errors by program.error() and exit code 1.
  • Remove manual argv loops, console.log/console.error argument parsing, and process.exit calls are replaced by commander’s exitOverride or program.error.
  
# Testing

• Update tests/unit/main.test.js or create tests/unit/cli-commander.test.js:
  - Mock fs/promises.writeFile to verify file writes when --output is provided.
  - Test parsing and behavior for:
    * Defaults: running with no flags prints a PI string and exits 0.
    * --digits 3 prints correct formatted output.
    * --format json prints valid JSON with digits and pi fields.
    * --output writes to file and does not print to stdout.
    * Invalid values for digits or format cause commander to display an error and exit code 1.
  • Ensure existing calculatePi unit tests remain passing.

# Documentation

• Update README.md:
  - Add a "CLI Usage" section showing examples:
      node src/lib/main.js                   # 10 digits, text
      node src/lib/main.js --digits 5        # 5 digits, text
      node src/lib/main.js --digits 5 --format json
      node src/lib/main.js --digits 8 --format json --output pi.json
  - Include a snippet of auto-generated help output showing all available options and defaults.
  - Note that commander handles validation, help, and suggestions, simplifying future extensions.
