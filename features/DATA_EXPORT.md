# Summary
Provide a new CLI flag --export-sources and an API exportSupportedDataSources to export the current supported data source URLs list to a JSON file. This enables users to persist their configured sources for sharing or backup.

# Functional Requirements
- In src/lib/main.js:
  - Export a function exportSupportedDataSources(outputPath: string): Promise<void> that:
    1. Calls getSupportedDataSources() to retrieve the current list.
    2. Writes the list as formatted JSON (2-space indent) to the specified file path using fs/promises.writeFile.
    3. Throws an error on write failure.
  - Extend the main(args) entrypoint to detect:
    - --export-sources <filePath>
      1. Validate a file path follows the flag; if missing or starts with "--", print `Error: File path is required for --export-sources` to stderr and exit code 1.
      2. Call await exportSupportedDataSources(filePath).
      3. On success, print `Export completed` to stdout and exit code 0.
      4. On error, print error.message to stderr and exit code 1.
  - Ensure existing --list-sources and --refresh-sources behaviors remain unchanged.

# CLI Usage
```bash
npm run start -- --export-sources sources.json
```

# API
```js
import { exportSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  try {
    await exportSupportedDataSources('sources.json');
    console.log('Export completed');
  } catch (err) {
    console.error(err.message);
  }
})();
```

# Testing
- **Unit Tests** (in tests/unit/main.test.js):
  - Stub fs/promises.writeFile to resolve and reject.
  - Assert exportSupportedDataSources calls writeFile with correct path and JSON content.
  - Simulate rejection and assert error is thrown.
- **CLI Integration Tests**:
  - **Valid Path**: spy on console.log and process.exit; run await main(["--export-sources","out.json"]); assert writeFile call, `Export completed` output, and exit code 0.
  - **Missing Path**: spy on console.error and process.exit; run await main(["--export-sources"]); assert error message and exit code 1.
  - **Write Failure**: mock writeFile rejection; assert error message and exit code 1.