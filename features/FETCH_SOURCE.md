# Summary
Extend the existing Fetch Source feature to support an optional --output-file flag for persisting fetched JSON data to a file or printing it to stdout.

# Functional Requirements

1. In src/lib/main.js:
   - Export async function fetchSource(url: string): Promise<any>:
     - Validate url against getSupportedDataSources(); if unsupported, throw `Error("Unsupported data source: <url>")`.
     - Use global fetch() to retrieve JSON and return parsed result.
   - In main(args: string[]) entrypoint, detect `--fetch-source <url>`:
     1. Ensure <url> is provided and supported; on error print to stderr and exit code 1.
     2. Call `await fetchSource(url)`.
     3. Detect optional `--output-file <path>` following URL:
        - If provided, verify <path> is present; on error print to stderr and exit code 1.
        - Use fs/promises.writeFile to write `JSON.stringify(data, null, 2)` to file; on success exit code 0 without stdout; on write failure print error and exit code 1.
     4. If no --output-file, print JSON to stdout and exit code 0.
   - Preserve existing --list-sources behavior and default CLI output.

# CLI Usage

```bash
# Print data to console
npm run start -- --fetch-source <url>

# Save data to file
npm run start -- --fetch-source <url> --output-file <path>
```

# Testing

- Unit tests (tests/unit/main.test.js):
  - Stub global.fetch to resolve sample JSON; assert fetchSource(validUrl) resolves and rejects on unsupported URL.
  - Mock fs/promises.writeFile to simulate success and failure; assert correct invocation and error handling for --output-file.
- CLI integration tests:
  - Valid URL without --output-file: spy console.log and process.exit; assert JSON output and exit 0.
  - Valid URL with --output-file: spy writeFile and process.exit; suppress console.log; assert file write call and exit 0.
  - Missing URL, unsupported URL, missing file path, write errors: assert stderr messages and exit code 1.

# Documentation

- Update README.md under **Features** with **Fetch Source** entry including optional --output-file.
- Include usage examples for both print and file output.
- Create or update docs/FETCH_SOURCE.md mirroring README with API reference, CLI examples, and error scenarios.