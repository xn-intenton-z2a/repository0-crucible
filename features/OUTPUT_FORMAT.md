# Multi-format Result Export

Enable users to format calculation results as plain text, JSON, CSV, or XML and optionally write output to a file, providing flexible interoperability and persistent storage.

# CLI Options

• --format <format>   Select output format: text (default), json, csv, xml
• --output <filepath> Write the formatted output to the specified file instead of standard output

# Implementation

1. Extend minimist configuration in src/lib/main.js to recognize a string option format with default text and an output option for file path
2. After obtaining the calculation result or diagnostics object:
   a. If format is json, serialize output with structured indentation
   b. If csv, for single values emit a header result and the value; for objects or arrays emit header row and comma separated values per record
   c. If xml, wrap each field in tags, enclosing arrays in a parent element
   d. If text, preserve existing console output of numbers or diagnostics JSON
3. Route final string: if output file path is provided write file via fs.writeFileSync, otherwise console.log the formatted string

# Testing

Add unit tests in tests/unit/main.test.js to:
• Invoke main with each format option and verify console.log or fs.writeFileSync receives correctly formatted data
• For csv and xml ensure header and tags appear without escape sequences
• Test that --output writes to file and suppresses console output

# Documentation

Update docs/USAGE.md under Options to describe --format and --output behavior with examples for each format
Update README.md under Features to list Multi-format Result Export and show sample commands for text, json, csv, and xml