# MERGE_PERSIST Feature

## Overview
This feature introduces a new merge and persist functionality for JSON Schema changes. When invoked by the CLI flag `--merge-persist`, it leverages the existing diff engine to automatically merge detected schema differences and persist the updated schema to disk. This helps streamline the update process after reviewing differences, reducing manual intervention and potential errors.

## Functionality
- **Merge Diff Outputs**:
  - Utilize the existing JSON Schema diff engine to gather changes between versions.
  - Automatically merge non-conflicting updates and flag potential conflicts for manual review.

- **Persistence**:
  - Write the resulting merged schema back to a designated file location.
  - Optionally, backup the original schema before applying changes.

- **CLI Integration**:
  - Introduce a new CLI flag `--merge-persist` to trigger the process.
  - Provide clear command line feedback and error messages in case of merge conflicts or file write failures.

- **Testing & Error Handling**:
  - Include comprehensive unit tests to verify merge logic, error handling, and file persistence operations.
  - Ensure compatibility with existing diff and report generation functionalities.

## Implementation
- **Module Placement**: 
  - Create a new source file (e.g., `src/lib/mergePersist.js`) containing the merge and persistence logic.
  - Update `src/lib/main.js` to parse the `--merge-persist` flag and invoke the merge persist function.

- **Documentation & Guidelines**:
  - Update README.md and CONTRIBUTING.md with usage examples for the new `--merge-persist` flag.
  - Provide inline comments and usage examples in the source code to facilitate further contributions.

## Value Proposition
This feature automates the often error-prone process of merging schema changes after a diff has been reviewed. By persisting the merged output, it helps maintain a reliable, up-to-date schema version, thereby simplifying API evolution and fostering smoother development workflows.