# Purpose
Enable CLI users to receive random ASCII face output in JSON format for easier machine parsing and integration into scripts or tools.

# Implementation Details
1. Parse JSON flag
   • Add a boolean option json (alias j) to minimist configuration alongside existing options.  
   • Default value: false.
   
2. Adjust CLI output behavior
   • If flags.json is true and flags.face is set:
     - When count is 1, wrap the single face string with JSON.stringify and print it.
     - When count is greater than 1, collect all generated faces into an array and print JSON.stringify(array).
   • Ensure no additional logging or formatting is applied in JSON mode (pure JSON output).
   • If flags.json is provided without --face, print the help message and exit.

3. Help and validation
   • Update helpMessage in main() to include --json (-j) description and JSON output semantics.
   • On invalid flag combinations (e.g., --json without --face), display the help message and exit with code 1.

# CLI Interface Examples
- Single face as JSON string:
  node src/lib/main.js --face --json
  Outputs: "(^_^)"

- Multiple faces as JSON array:
  node src/lib/main.js --face --count 3 --json
  Outputs: ["(>_<)","(^.^)","(o_O)"]

- Invalid usage without --face:
  node src/lib/main.js --json
  Prints help message and exits with code 1.

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Mock console.log; run main(["--face", "--json"]); verify console.log called once with a valid JSON string matching one of asciiFaces.
   • Run main(["--face", "--count", "2", "--json"]); verify console.log called once with a JSON array of length 2 and each element in asciiFaces.
   • Test running with --json only; assert help message printed and process exits or returns without error.

# Documentation
- Update README.md under Features section to document --json (-j) flag, purpose, and examples.
- Update docs/USAGE.md to include a "JSON Output" subsection under CLI usage with examples for single and batch JSON outputs.