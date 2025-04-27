# Description
Implement a CLI command build-enhanced that reads all intermediate OWL JSON-LD artifacts and merges them into a single enhanced ontology document. This feature supports the mission to produce a consolidated ontology suitable for querying and downstream processing.

# Implementation
Extend main to detect the --build-enhanced flag. When present perform the following steps:

1. Locate the intermediate directory at project root named intermediate. If the directory does not exist, log an error via console.error and return without throwing.
2. Read all files ending with .json in the intermediate directory. Log a warning for files that cannot be parsed.
3. For each parsed document, extract its @graph array and collect all individual entries into a single merged array.
4. Construct a consolidated document with:
   - @context set to the OWL namespace ({ "@vocab": "http://www.w3.org/2002/07/owl#" })
   - @graph set to the merged array of graph entries
5. Ensure an ontologies directory exists at project root, creating it if necessary via fs.mkdirSync with recursive.
6. Write the consolidated document to ontologies/enhanced-ontology.json with two-space indentation using fs.writeFileSync.
7. Output console.log("written enhanced-ontology.json") then return.

# CLI Usage
To generate the enhanced ontology:
node src/lib/main.js --build-enhanced

# Testing
Add unit tests that:
- Mock fs.existsSync, fs.mkdirSync, fs.readdirSync, fs.readFileSync, fs.writeFileSync to simulate intermediate directory with sample JSON-LD files.
- Verify that writeFileSync is called with ontologies/enhanced-ontology.json and the expected merged document.
- Spy on console.log and console.error to verify messages for missing directory, warnings for bad files, and success log.
- Ensure main invoked with ["--build-enhanced"] returns without throwing.

Add integration tests for the HTTP endpoint GET /build-enhanced under --serve mode:
- Start server with --serve, GET /build-enhanced in a temp project with intermediate files, and verify response body contains lines: written <name>-intermediate entries and summary if applicable.

# Documentation Updates
Update docs/FEATURES.md and docs/USAGE.md to include the build-enhanced command, with example invocation and sample output. Update README.md under Features and Usage sections to reference build-enhanced.