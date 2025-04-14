# Ontology Feature Enhancement

## Overview
This update refines and extends the existing ontology management functionality by fully implementing both the refresh and merge-persist operations. In addition to the already available `--refresh` command, this update adds support for a new `--merge-persist` flag that merges newly fetched ontology data with previously persisted data. The enhancements ensure that ontology data is dynamically updated and seamlessly integrated into our workflow, in line with our mission of managing and transforming OWL ontologies.

## Implementation Details
- **CLI Argument Parsing:**
  - Update `src/lib/main.js` to detect both `--refresh` and `--merge-persist` flags.
  - When the `--refresh` flag is provided, the CLI will call the existing `refresh(args)` function to simulate fetching and output a refreshed ontology in JSON format.
  - When the `--merge-persist` flag is provided, add a new branch that calls a newly implemented function `mergePersistOntology(args)`. This function will simulate reading a previously persisted ontology, merge it with freshly crawled data, validate the merged ontology using the existing Zod schema, and output the merged result.

- **Source Code Changes:**
  - In `src/lib/main.js`, implement the `mergePersistOntology(args)` function. The implementation should:
    - Retrieve an in-memory dummy persisted ontology (similar to the one in the capital cities functions).
    - Simulate the merging of new data (for example, updated capital city information) with the persisted ontology using a merging strategy (e.g., using lodash's `merge`).
    - Validate the merged ontology with the existing Zod schema (`ontologySchema`).
    - Output the merged ontology in structured JSON format.
  - Update the main command handling to include a check for `--merge-persist` prior to defaulting to the main function.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to add new unit test cases for the `--merge-persist` command:
    - Verify that when `--merge-persist` is provided, the CLI calls `mergePersistOntology(args)` and outputs a valid merged ontology.
    - Ensure that the merged ontology contains the required properties as defined by the `ontologySchema` (e.g., `type` and `capitals`).

- **Documentation Updates:**
  - Update `README.md` to document the new `--merge-persist` command, including usage examples. For example:
    ```bash
    node src/lib/main.js --merge-persist
    ```
    should output the merged ontology in JSON format.
  - Revise `CONTRIBUTING.md` to include guidelines on extending and testing the merge-persist functionality.

## Future Considerations
- Enhance the merging strategy to better handle conflicts between persisted and new data.
- Transition the dummy in-memory storage to persistent file operations if necessary.
- Extend validation and error handling as real-world data sources are integrated.
