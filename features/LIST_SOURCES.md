# Summary
Extend list-sources to allow dynamic refresh of data sources and improve discovery.

# Functional Requirements

## Refresh Sources
- Export async function refreshSupportedDataSources(configUrl: string): Promise<void>
  - Fetch JSON array of URLs from configUrl via global fetch
  - Validate each entry is a valid URL string
  - Replace in-memory supportedDataSources with fetched list

## List Sources Behavior
- In src/lib/main.js main(args):
  - Detect `--refresh-sources <configUrl>` before other flags
    - If missing or invalid, print `Error: Config URL required for --refresh-sources` to stderr and exit 1
    - Call await refreshSupportedDataSources(configUrl)
    - On success, print `Sources refreshed` to stdout and exit 0
    - On failure, print error message to stderr and exit 1
  - Detect `--list-sources` flag
    - Print JSON array from getSupportedDataSources() to stdout
    - Exit process with code 0
  - Preserve other flags and default behavior

# CLI Usage

```bash
# Refresh then list sources
npm run start -- --refresh-sources https://example.com/sources.json --list-sources
```

# API

```js
import { getSupportedDataSources, refreshSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';
await refreshSupportedDataSources('https://example.com/sources.json');
console.log(getSupportedDataSources());
```

# Testing

- Unit tests for refreshSupportedDataSources:
  - Stub fetch to return valid and invalid JSON arrays; assert list is updated or error thrown
- CLI integration tests:
  - `main(["--refresh-sources","<url>"])`: assert `Sources refreshed` and exit 0
  - `main(["--refresh-sources"])`: assert error message and exit 1
  - After refresh, `main(["--list-sources"])`: assert printed updated list and exit 0