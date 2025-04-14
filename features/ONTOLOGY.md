# ONTOLOGY Feature Update

## Overview
This update expands the ontology management capabilities by integrating features to refresh and persist ontology data. In addition to generating and validating OWL ontologies from public data (e.g., via the `--capital-cities` flag and enhanced build commands), users can now trigger a data refresh and merge new ontology data with existing persisted JSON data using the `--refresh` and `--merge-persist` flags.

## Implementation Details
### CLI Integration
- Update the main CLI parser in `src/lib/main.js` to recognize the new flags:
  - `--refresh`: Triggers a data refresh from public sources and regenerates the ontology.
  - `--merge-persist`: Merges newly fetched ontology data with existing persisted JSON data and saves the updated ontology.
- In the source file, add corresponding function implementations:
  - `refreshOntology(args)`: Implements fetching fresh data, regenerating the ontology, and outputting the refreshed data.
  - `mergePersistOntology(args)`: Reads existing persisted ontology (if available), merges with the newly generated ontology, validates the result using the Zod schema, and saves it.
- Integrate error handling with clear messages in case of data fetch failures, file read/write errors, or validation issues.

### Testing
- Update tests in `tests/unit/main.test.js` to include new test cases:
  - A test case for `--refresh` that verifies the transcript of a data-refresh operation.
  - A test case for `--merge-persist` verifying that merging occurs correctly and the output includes expected data structures such as `type`, `capitals`, and a merged result.

### Documentation
- Update `README.md` to include a section explaining the new flags with usage examples:
  - Example: `node src/lib/main.js --refresh` to trigger a data refresh.
  - Example: `node src/lib/main.js --merge-persist` to merge refreshed ontology data with persisted data.
- Update `CONTRIBUTING.md` to describe guidelines for extending refresh and persistence functionality.

## Future Considerations
- Enhance data merging strategies by incorporating conflict resolution and version history.
- Integrate improvements in error handling and logging to provide users more detailed diagnostic feedback during refresh and merge operations.
- Consider support for additional data sources or custom user configurations for persistence paths.
