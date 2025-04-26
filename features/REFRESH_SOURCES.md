# Description
Implement a CLI command refresh that fetches raw JSON from each configured public (and custom) data source and stores it locally. This captures source data for later transformation into OWL ontologies and supports reproducible data snapshots.

# Implementation
Extend main to detect the --refresh flag. When present perform the following steps:

1. Determine or create a local directory named data in the project root.
2. Load custom sources from data-sources.json if present and valid, merging with PUBLIC_DATA_SOURCES.
3. For each source in the combined list:
   - Construct a fetch request to the source URL.
   - Await the JSON response.
   - Slugify the source name (lowercase, hyphens for spaces, alphanumeric only) to produce a filename.
   - Write the JSON response to data/<slug>.json using fs.writeFileSync.
   - Log a line console.log written <filename> for each successful write.
4. If any fetch or write fails, console.error with a descriptive message but continue processing remaining sources.
5. After all sources are processed, exit without error.

# CLI Usage
To refresh all source data and write to data/: 
node src/lib/main.js --refresh

# Testing
Add unit tests that:

- Mock fetch to return sample JSON for one or more sources.
- Spy on fs.existsSync, fs.mkdirSync, fs.writeFileSync to verify directory creation and file writes.
- Verify console.log is called with the correct filenames.
- Simulate a fetch error and confirm console.error is called and subsequent sources still processed.

# Documentation Updates
Update docs/FEATURES.md, docs/USAGE.md, and README.md to describe the --refresh option, show example invocations, and a sample of written filenames and contents.