# Description

Implement a CLI command build-intermediate that reads raw JSON files from the data directory and transforms them into intermediate OWL JSON-LD artifacts. This feature supports the mission to transform JSON captures into ontology structures for downstream processing.

# Implementation

Extend main to detect the --build-intermediate flag. When present perform the following steps:

1. Locate the data directory at project root named data. If the directory does not exist log an error to console.error and return without error.
2. Create or ensure an intermediate directory at project root named intermediate using fs.mkdirSync with recursive option.
3. For each file ending with .json in the data directory read and parse the JSON content using fs.readFileSync and JSON.parse.
4. If the JSON includes a results.bindings array treat it as SPARQL JSON results:
   a. Determine graph nodes by mapping each binding object into an individual entry. Use the first variable value as @id and include other variable values as properties.
   b. Assemble a document with @context set to the OWL namespace and @graph containing all individual entries.
5. Skip files without a compatible structure and log a warning to console.error.
6. Write each generated document to intermediate/<slug>-intermediate.json using fs.writeFileSync with pretty printing.
7. Log console.log written intermediate/<slug>-intermediate.json for each artifact written.
8. After processing all files log console.log a summary message Refreshed X artifacts into intermediate/

# CLI Usage

to generate intermediate OWL artifacts run:

node src/lib/main.js --build-intermediate

# Testing

Add unit tests that:

- Mock fs.existsSync readdirSync mkdirSync readFileSync writeFileSync to simulate a data directory with sample JSON files.
- Provide a sample SPARQL JSON results file and verify that fs.writeFileSync is called with expected file path and JSON-LD content.
- Spy on console.log and console.error to verify output messages for written files and warnings.
- Ensure main returns without throwing an error when invoked with the flag.

# Documentation Updates

Update docs/FEATURES.md and README.md to describe the --build-intermediate flag, include example invocation, sample intermediate directory structure and sample JSON-LD content.