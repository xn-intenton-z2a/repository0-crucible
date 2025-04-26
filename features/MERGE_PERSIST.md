# Merge and Persist Ontology

## Overview
Add a --merge-persist flag to the CLI that takes one or more existing JSON-LD ontology files, merges their contents into a single OWL ontology, and writes the combined result to a file or stdout. This enables users to unify locally generated or sourced ontologies without fetching remote data.

## Functionality
- Recognize a --merge-persist option in src/lib/main.js that accepts multiple file paths or glob patterns.
- For each file path:
  - Read and parse the JSON-LD document from disk.
  - Validate that the document contains an @graph property with an array of individuals.
- Use jsonld.flatten on each document to normalize structure.
- Merge all @graph arrays into a single array.
- Deduplicate triples by normalizing to N-Quads via jsonld.toRDF and comparing canonical forms.
- Assemble a final JSON-LD object with a standard @context including OWL, RDF, RDFS, and XSD prefixes and a merged @graph.
- Support an optional --out <filename> argument to write the output to a file; default to stdout if omitted.
- Handle errors for missing files, JSON parse failures, invalid JSON-LD, or merge conflicts; print descriptive messages and exit with a non-zero code.

## Usage
node src/lib/main.js --merge-persist ontology1.jsonld ontology2.jsonld --out merged.jsonld
cat file1.jsonld file2.jsonld | node src/lib/main.js --merge-persist - --out combined.jsonld

## Testing
- Add unit tests in tests/unit/main.test.js mocking jsonld APIs and file system:
  - Simulate reading multiple JSON-LD documents and verify merged @graph contents.
  - Test deduplication when the same individual appears in multiple files.
  - Verify behavior with and without --out, including stdout default.
  - Simulate file read errors and invalid JSON-LD and confirm error exit codes and messages.

## Documentation
- Update README.md under Features to include the --merge-persist flag with description and examples.
- Extend docs/USAGE.md to document merging workflows and sample commands and output.