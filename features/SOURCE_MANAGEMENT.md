# Description

Provide unified management of public and custom data sources. This feature offers both CLI commands and programmatic APIs to list configured sources and to fetch and persist their JSON data locally. It consolidates the responsibilities of listing and refreshing source data into a coherent interface.

# Implementation

1. In src/lib/main.js maintain the existing PUBLIC_DATA_SOURCES constant for default sources.
2. Use the existing listSources function to load and merge default and custom sources from data-sources.json.
3. In the main function, add or refine handling for the --list-sources and --refresh flags:
   1. When --list-sources is passed, call listSources, format the result as pretty-printed JSON with two-space indentation, and output via console.log.
   2. When --refresh is passed, call refreshSources with the optional config path, and for each file returned log “written <filename>”. After processing all sources, log “Refreshed <count> sources into data/”.
4. Ensure refreshSources continues to support slugification of source names, writing JSON files to a data directory (creating it if necessary), and robust error handling that logs errors to console.error without interrupting other sources.
5. Do not introduce new files or delete existing ones; modify only main.js, related tests, README.md, and package.json if necessary.

# CLI Usage

To list configured sources:

node src/lib/main.js --list-sources

To refresh and persist JSON data from all configured sources:

node src/lib/main.js --refresh

# Testing

- Update tests in tests/unit/main.test.js to spy on console.log when invoking main(["--list-sources"]) and verify the output equals JSON.stringify(PUBLIC_DATA_SOURCES.concat(custom), null, 2).
- Update tests in tests/unit/main.test.js or a new file to mock global fetch and fs methods, call main(["--refresh"]), and verify console.log calls for written filenames and the final summary message.
- Ensure listSources tests remain valid and refreshSources tests cover error scenarios and file writes.

# Documentation Updates

- In docs/FEATURES.md and README.md remove separate List Sources and Refresh entries and replace with a new “Source Management” section describing both --list-sources and --refresh options, including example commands and sample JSON outputs.