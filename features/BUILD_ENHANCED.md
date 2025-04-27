# Description

Implement a CLI command build-enhanced that merges intermediate OWL JSON-LD artifacts into a single enhanced ontology, adds rdfs:label properties derived from entity IRIs, and persists the result for downstream consumption.

# Implementation

Extend main to detect the --build-enhanced or -be flag. When present perform the following steps:

1. Check that the directory intermediate exists at the project root. If it does not exist, log an error to console.error and return without error.
2. Ensure a directory named ontologies exists at the project root, creating it with fs.mkdirSync and the recursive option if needed.
3. Read all files in intermediate ending with -intermediate.json using fs.readdirSync and filter by suffix.
4. For each intermediate file:
   a. Read and parse JSON content with fs.readFileSync and JSON.parse.
   b. Extract entries from the @graph array and collect them into a single array mergedGraph.
5. For each entry in mergedGraph:
   a. Derive a human readable label by taking the last segment of the entry @id IRI after slash or hash, decoding percent encoding, and assign it to the property rdfs:label.
6. Assemble an enhanced document object:
   - @context includes the OWL namespace vocabulary and the rdfs namespace prefix for labels
   - @graph set to mergedGraph with added rdfs:label for each entity
7. Write the enhanced document to ontologies/enhanced-ontology.json using fs.writeFileSync with two-space pretty printing.
8. Log to console.log Persisted enhanced ontology with N entities to ontologies/enhanced-ontology.json where N is mergedGraph.length.
9. Exit without error.

# CLI Usage

To generate and persist an enhanced ontology:

  node src/lib/main.js --build-enhanced
  node src/lib/main.js -be

# Testing

Add unit tests in tests/unit/main.test.js that:

- Mock fs.existsSync, fs.mkdirSync, fs.readdirSync, fs.readFileSync, and fs.writeFileSync to simulate an intermediate directory containing sample -intermediate.json files.
- Provide a sample intermediate JSON-LD file with @context and @graph entries, invoke main with ["--build-enhanced"], and verify fs.writeFileSync is called once with path ontologies/enhanced-ontology.json and JSON content containing the merged @graph and rdfs:label properties.
- Spy on console.log to verify the summary message Persisted enhanced ontology with N entities to ontologies/enhanced-ontology.json.
- Ensure main returns without throwing an error when invoked with the flag.

# Documentation Updates

Update docs/FEATURES.md and README.md under Features to describe the build-enhanced option, include example invocations, and show a sample of the enhanced ontology JSON output.