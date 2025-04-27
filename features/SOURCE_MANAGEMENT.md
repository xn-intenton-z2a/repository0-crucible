# Description
Provide unified management of public and custom data sources and persistence operations including listing sources, refreshing source data, and merging persisted JSON files.

# Implementation
Extend main in src/lib/main.js to detect the following flags:

--list-sources
  Call listSources with an optional config path. Format the resulting array as pretty-printed JSON with two-space indentation and output via console.log. Return without error.

--refresh
  Call refreshSources with an optional config path. Ensure the data directory exists by creating it if necessary. For each source, fetch and write its JSON to the data directory. For each successful write log written <filename> via console.log. After all sources are processed, log Refreshed <count> sources into data/ via console.log. Return without error.

--merge-persist
  Locate the data directory at the project root. If the directory does not exist log an error via console.error and return without error. Read all files in the data directory ending with .json. For each file read and parse its JSON content. Collect each parsed object into an array. Write the array to data/merged.json using fs.writeFileSync with two-space pretty printing. Log Merged <count> files into data/merged.json via console.log where <count> is the number of parsed files. Return without error.

# CLI Usage
Use the following commands to manage sources and persistence:

node src/lib/main.js --list-sources

node src/lib/main.js --refresh

node src/lib/main.js --merge-persist

# Testing
Add unit tests in tests/unit/main.test.js that:
- Mock fs.existsSync, fs.mkdirSync, fs.readdirSync, fs.readFileSync, and fs.writeFileSync to simulate a data directory with sample .json files.
- Invoke main with ["--merge-persist"] and verify writeFileSync is called with path data/merged.json and a JSON array of parsed contents.
- Spy on console.log to verify the summary message Merged <count> files into data/merged.json.
- Simulate a missing data directory by mocking fs.existsSync to return false and verify console.error is called without throwing an error.
- Ensure main returns without throwing an error.

# Documentation Updates
Update docs/FEATURES.md, docs/USAGE.md, and README.md to include a section for the merge-persist option. Provide example invocations and sample output for merged files.