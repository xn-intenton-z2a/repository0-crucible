# Description
Implement a CLI command merge-persist that reads all intermediate OWL JSON-LD artifacts and combines them into a single consolidated ontology, then writes the result to a persistent directory. This supports the mission by producing a unified OWL document ready for downstream consumption.

# Implementation
Extend main to detect the --merge-persist flag. When present perform the following steps:

1. Locate the intermediate directory at project root named intermediate. If it does not exist, log an error to console.error and return without error.
2. Determine or create a directory named ontologies at the project root using fs.mkdirSync with recursive option.
3. Read all files ending with -intermediate.json from the intermediate directory using fs.readdirSync and filter by suffix.
4. For each intermediate file:
   a. Read and parse the JSON content using fs.readFileSync and JSON.parse.
   b. Collect all entries in the @graph array into a single combined array named mergedGraph.
5. Assemble a document object:
   - @context set to the OWL namespace JSON-LD context (http://www.w3.org/2002/07/owl#)
   - @graph set to mergedGraph
6. Write the combined document to ontologies/combined-ontology.json using fs.writeFileSync with pretty printing.
7. Log a summary message console.log Persisted combined ontology with N entities to ontologies/combined-ontology.json where N is the length of mergedGraph.
8. Exit without error.

# CLI Usage
To merge all intermediate artifacts into a single ontology and persist it:

node src/lib/main.js --merge-persist

# Testing
Add unit tests that:

- Mock fs.existsSync, fs.mkdirSync, fs.readdirSync, fs.readFileSync, fs.writeFileSync to simulate an intermediate directory containing two sample -intermediate.json files.
- Provide sample intermediate JSON-LD files with @context and @graph arrays, verify that fs.writeFileSync is called once with the combined @graph entries and correct file path.
- Spy on console.log and console.error to verify expected messages when directory is missing or on successful persistence.
- Ensure main returns without throwing an error when invoked with the flag.

# Documentation Updates
Update docs/FEATURES.md and README.md under Features to describe the merge-persist option. Include an example invocation and a sample of the combined ontology JSON output.