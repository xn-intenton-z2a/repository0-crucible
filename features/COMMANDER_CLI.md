# Overview

Integrate Commander.js into the existing CLI entry point to replace manual argument parsing. This provides declarative flag definitions, built-in validation, default values, help generation, and easier extension for future features.

# Implementation Details

• Add commander as a dependency in package.json (commander@latest).  
• In src/lib/main.js, import { Command } from 'commander' and create a new Command instance configured with name, version (from package.json), and description.  
• Use .option() calls to declare all CLI flags:
  - --digits <n> (integer, default 10, max 1000)  
  - --format <text|json> (choices text or json, default text)  
  - --output <file> (string, optional)  
  - --help, -h (built-in help)  
• Parse argv with program.parse(argv) and extract opts via program.opts().  
• Validate options using commander’s built-in choices and custom argument parser functions where needed (e.g., coerce number, enforce range).  
• After parsing, implement behavior branching based on opts:
  - If opts.format is json, wrap the calculatePi result into { digits, pi } object and serialize with JSON.stringify.  
  - If opts.output is provided, write output to file via fs/promises.writeFile; otherwise print to stdout.  
  - On validation or write errors, display error message and exit with code 1.  
• Remove manual argv loops and console.log/console.error based parsing; rely on commander for help and errors.  
• Ensure backward compatibility for users invoking legacy flags: program should accept --digits and --help with identical behavior.

# Testing

• Update tests/unit/main.test.js to add or adapt tests for commander-based parsing:
  - Test invoking main(['node','src/lib/main.js','--digits','3']) logs Pi string and exits 0.  
  - Test --format json prints valid JSON and exits 0.  
  - Mock fs/promises.writeFile and test that --output triggers file write.  
  - Test invalid values for --digits and --format cause commander to print error and exit with code 1.  
• Create a new test file tests/unit/cli-commander.test.js if needed to isolate commander integration tests.  
• Ensure all existing calculatePi tests remain passing.

# Documentation

• Update README.md under Features and Usage:
  - Describe new usage examples:
      node src/lib/main.js --digits 5
      node src/lib/main.js --digits 5 --format json
      node src/lib/main.js --digits 5 --format json --output pi.json
  
• Show auto-generated help output snippet from commander.  
• Document default values and allowable choices for flags.  
• Note that integration with commander simplifies future CLI enhancements.