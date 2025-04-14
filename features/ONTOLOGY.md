# Ontology Feature Enhancement with MERGE_PERSIST

## Overview
This update refines and extends the existing ontology management functionality by fully integrating a new `--merge-persist` flag. In addition to the current `--refresh` command, the CLI will now support merging freshly crawled ontology data with stored (persisted) ontology data. This update is in line with our mission of dynamically managing OWL ontologies and providing reliable data merging with schema validation.

## Implementation Details
- **CLI Argument Parsing:**
  - Update `src/lib/main.js` to detect the `--merge-persist` flag.
  - When `--merge-persist` is provided, bypass the default `--refresh` behavior and invoke a new branch that calls the `mergePersistOntology(args)` function.

- **MergePersist Function:**
  - Implement a new function `mergePersistOntology(args)` in `src/lib/main.js`.
  - Retrieve a dummy in-memory persisted ontology that simulates previously stored ontology data. For example, using hard-coded JSON reflective of past data (e.g., previous capital cities).
  - Simulate merging this persisted ontology with freshly crawled data (e.g., update with new or modified capital cities data) using lodash's merge function.
  - Validate the merged ontology against the existing Zod `ontologySchema` to ensure consistency and integrity.
  - Output the merged ontology as structured JSON and optionally allow further extension (e.g., persisting to a file if a `--persist` flag is provided alongside a filepath).

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to include unit tests for the `--merge-persist` flag.
  - Verify that when `--merge-persist` is provided, the CLI calls `mergePersistOntology(args)` and outputs a JSON object that adheres to the ontology schema, including verifying properties like `type` and `capitals`.

- **Documentation Updates:**
  - Revise `README.md` to document the new `--merge-persist` command, including example CLI usage:
    ```bash
    node src/lib/main.js --merge-persist
    ```
    which should output the merged ontology.
  - Update `CONTRIBUTING.md` with testing guidelines and instructions for extending the merge persist functionality.

## Future Considerations
- Improve the merging strategy to handle conflicts between old and new data more gracefully.
- Transition from dummy in-memory storage to persistent file operations if needed.
- Enhance error handling and logging during the merge process, particularly when schema validation fails.

This enhancement consolidates our ontology management functions under a unified feature while ensuring backward compatibility with existing commands.