# Overview
Add shorthand CLI flags for common data source refresh commands to simplify user workflows.

# Functionality
- Recognize two new flags in src/lib/main.js: --capital-cities and --countries.
- Map each flag to invoke the existing refresh logic with sourceKey "capitalCities" or "countries".
- Allow optional --base <filename> and --out <filename> arguments following the alias flag to merge into an existing ontology or write output to a file.
- If --out is omitted, write the merged JSON-LD ontology to stdout.
- Emit clear error messages and exit with a non-zero status on unknown alias, missing source entry, or refresh failures.

# Usage
node src/lib/main.js --capital-cities
node src/lib/main.js --capital-cities --base existing.json --out capitals.json
node src/lib/main.js --countries --out countries.json

# Testing
- Write unit tests in tests/unit/main.test.js mocking global.fetch and console.log:
  - Verify invoking main with ["--capital-cities"] calls refresh with ["capitalCities"].
  - Verify invoking main with ["--countries"] calls refresh with ["countries"].
  - Test behavior with optional --base and --out arguments, including default stdout output.
  - Confirm error handling on invalid alias or missing SOURCE entries.

# Documentation
- Update README.md under Features to list --capital-cities and --countries flags with descriptions, example commands, and expected output.
- Extend docs/USAGE.md to document shortcut flags and usage scenarios with examples.