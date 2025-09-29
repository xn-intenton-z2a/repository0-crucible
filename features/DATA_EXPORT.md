# Summary
Provide a CLI flag --export-sources and a programmatic API exportSupportedDataSources(outputPath) to export the current supported data source URLs list to a JSON file for sharing or backup.

# Functional Requirements

In src/lib/main.js:

- Export an async function exportSupportedDataSources(outputPath: string): Promise<void> that:
  1. Calls getSupportedDataSources() to retrieve the current list of URLs.
  2. Uses fs/promises.writeFile to write the list as formatted JSON (two-space indent) to outputPath.
  3. Throws on write failure.

- Extend main(args) to detect the flag --export-sources <filePath>:
  1. If <filePath> is missing or starts with --, print `Error: File path is required for --export-sources` to stderr and exit code 1.
  2. Call await exportSupportedDataSources(filePath).
  3. On success, print `Export completed` to stdout and exit code 0.
  4. On failure, print the error message to stderr and exit code 1.
  5. Preserve existing --list-sources and --refresh-sources behavior.

# CLI Usage

```bash
npm run start -- --export-sources <filePath>
```

# API Example

```js
import { exportSupportedDataSources, getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

await exportSupportedDataSources('sources.json');
console.log(getSupportedDataSources());
```

# Testing

- Unit Tests (in tests/unit/main.test.js):
  - Mock fs/promises.writeFile to resolve: assert writeFile was called with correct path and JSON content.
  - Mock write failure: assert error is printed and process.exit(1).
- CLI Integration Tests:
  - Valid path: spy on console.log and process.exit; run main(["--export-sources","out.json"]); assert writeFile call, "Export completed", exit code 0.
  - Missing path: spy on console.error and process.exit; run main(["--export-sources"]); assert error and exit code 1.
