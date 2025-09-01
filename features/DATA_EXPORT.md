# Summary
Provide a CLI flag --export-sources and an API exportSupportedDataSources to export the current supported data source URLs list to a JSON file for sharing or backup.

# Functional Requirements

## API: exportSupportedDataSources
- In src/lib/main.js:
  - Export an async function exportSupportedDataSources(outputPath: string): Promise<void> that:
    1. Calls getSupportedDataSources() to retrieve the current list of URLs.
    2. Uses fs/promises.writeFile to write the list as formatted JSON (2-space indent) to outputPath.
    3. Throws an error on write failure.

## CLI Behavior
- Extend main(args) in src/lib/main.js to detect --export-sources <filePath>:
  1. If filePath is missing or starts with "--", print Error: File path is required for --export-sources to stderr and exit code 1.
  2. Call await exportSupportedDataSources(filePath).
  3. On success, print "Export completed" to stdout and exit code 0.
  4. On write error, print the error message to stderr and exit code 1.
  5. Preserve existing --list-sources and --refresh-sources behavior.

# CLI Usage

```bash
npm run start -- --export-sources sources.json
```

# API Example

```js
import { exportSupportedDataSources, getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

await exportSupportedDataSources('sources.json');
console.log(getSupportedDataSources());
```

# Testing

- **Unit Tests** in tests/unit/main.test.js:
  - Mock fs/promises.writeFile to resolve: assert writeFile is called with correct path and JSON content.
  - Mock rejection: assert error is thrown.
- **CLI Integration Tests**:
  - Valid path: spy on console.log and process.exit; run main(["--export-sources","out.json"]); assert writeFile call, "Export completed", exit code 0.
  - Missing path: spy on console.error and process.exit; run main(["--export-sources"]); assert error and exit code 1.