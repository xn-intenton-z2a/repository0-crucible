# Purpose

Provide aggregated statistics for persisted ASCII face history files, allowing users to audit and analyze usage patterns by reporting counts and percentages for each face.

# Implementation Details

1. Parse stats flag
   • Extend minimist configuration to include a boolean option stats (no alias).
2. Determine history file path
   • If flags.persist is present with a value, use that as the history file path.  
   • If flags.persist is present without a value or not provided, default to face_history.log in the current directory.
3. Load and parse history
   • Read the history file synchronously using fs.readFileSync. On read error, print helpMessage and exit with code 1.  
   • Split content by newline, filter out empty lines, and accumulate an array of recorded faces.
4. Compute statistics
   • Count occurrences of each unique face string.  
   • Calculate total number of entries and percentage share for each face.
5. Output formatting
   • If flags.json is true, return a JSON string representing an object with keys face and values an object with count and percentage.  
   • Otherwise, console.log each face on its own line in descending order of count, formatted as face: count (percentage%).
6. Control flow in main()
   • At the start of CLI mode, if flags.stats is true, perform the statistics routine and return immediately without generating new faces or starting the HTTP server.

# CLI Interface Examples

- node src/lib/main.js --stats
  Displays a sorted list of faces with counts and percentages from face_history.log.
- node src/lib/main.js --stats --persist history.txt
  Reads history.txt, computes statistics, and prints plain text report.
- node src/lib/main.js --stats --persist history.log --json
  Outputs a JSON string of the statistics object for machine parsing.

# Testing

1. Unit Tests in tests/unit/main.test.js  
   • Mock fs.readFileSync and console.log.  
   • Simulate history content with multiple face entries; verify counts and percentages computed correctly and printed or returned as JSON.  
   • Simulate missing history file; expect helpMessage printed once and exit code behavior.
2. E2E Tests in tests/e2e/cli.test.js  
   • Create a temporary history file with known entries.  
   • Spawn CLI with --stats and path, capture stdout; assert plain text report contains correct values.  
   • Spawn CLI with --stats --json; parse JSON output and assert object shape and values.

# Documentation

- Update README.md under Features to describe the --stats flag and its purpose.  
- Extend docs/USAGE.md with a new "History Statistics" section showing usage examples and sample output.