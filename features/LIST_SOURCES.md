# Summary
Provide a CLI flag --list-sources and a programmatic API getSupportedDataSources() to expose the list of supported public data source URLs.

# Functional Requirements

- In src/lib/main.js:
  - Define and export getSupportedDataSources(): string[] that returns the in-memory array of source URLs.
  - Detect --list-sources in main(args: string[]):
    1. When present, print JSON.stringify(getSupportedDataSources(), null, 2) to stdout.
    2. Call process.exit(0) immediately.
  - Preserve behavior for all other flags and default output.

# CLI Usage

```bash
node src/lib/main.js --list-sources
```

# API Usage

```js
import { getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';
const sources = getSupportedDataSources();
console.log(sources);
```

# Testing

- Unit test for getSupportedDataSources(): verify it returns the exact array.
- CLI test for --list-sources: spy on console.log and process.exit, simulate main(['--list-sources']), assert JSON output and exit code.

# Documentation

- Update README.md under **Features** with a List Sources entry.
- Under **Usage**, document the CLI flag and sample output.