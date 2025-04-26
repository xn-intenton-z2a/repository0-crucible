# Merge and Persist Ontology

## Overview
The CLI gains a --merge-persist flag that merges multiple JSON-LD ontologies into a single combined ontology and persists it to disk or outputs to stdout. Users can aggregate ontologies from different sources or incremental updates into one consistent JSON-LD document.

## Functionality
- Add a --merge-persist option that accepts one or more input file paths or glob patterns; supports minimatch patterns.
- Introduce an optional --base argument to specify an existing JSON-LD ontology file to merge into; defaults to an empty document if omitted.
- Read and parse each input file or stdin when input is omitted, validating JSON-LD structure.
- Use the jsonld API to normalize and flatten each ontology, then merge @graph arrays into a single combined graph.
- Eliminate duplicate individuals by comparing normalized triples.
- Support an --out <filename> option to write the merged ontology to a file; otherwise write to stdout.
- On file read errors, parse failures, or merge conflicts, display a clear error message and exit with a non-zero status code.

## Usage
node src/lib/main.js --merge-persist data1.json data2.json --base existing.json --out merged.json
cat ontology1.json ontology2.json | node src/lib/main.js --merge-persist --out merged.json
node src/lib/main.js --merge-persist "ontologies/*.json"

## Testing
- Add unit tests in tests/unit/main.test.js to mock jsonld.compact and jsonld.normalize:
  - Verify that multiple input graphs are merged correctly with duplicates removed.
  - Test file path and glob input modes, base file merging behavior, stdout output, and error handling.

## Documentation
- Update README.md under Features and Usage to describe the new --merge-persist flag, its arguments, and provide example commands.