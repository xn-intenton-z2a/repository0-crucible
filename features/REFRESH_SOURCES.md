# Summary
Add a CLI flag --refresh-sources and programmatic API refreshSupportedDataSources(configUrl) to dynamically update and list supported data source URLs.

# Functional Requirements

In src/lib/main.js:
- Export an async function refreshSupportedDataSources(configUrl: string): Promise<void> that:
  1. Fetches JSON from configUrl via global fetch, expecting an array of URL strings.
  2. Validates each entry is a well-formed URL, throwing "Invalid data source URL: <entry>" on failure.
  3. Updates the in-memory supportedDataSources array with the fetched list.
- Modify main(args) entrypoint:
  - If args includes "--refresh-sources":
    1. Ensure a configUrl follows; if missing or starts with "--", print "Error: Config URL required for --refresh-sources" to stderr and exit code 1.
    2. Call await refreshSupportedDataSources(configUrl).
    3. On success, print "Sources refreshed" to stdout and exit code 0.
    4. On error, print the error message to stderr and exit code 1.
  - Preserve existing --list-sources behavior to list the updated sources.

# CLI Usage

```bash
npm run start -- --refresh-sources <configUrl>
```

# API

```js
import { refreshSupportedDataSources, getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

await refreshSupportedDataSources('https://example.com/sources.json');
console.log(getSupportedDataSources());
```

# Testing

- Unit tests for refreshSupportedDataSources:
  - Stub fetch to return valid and invalid JSON data; assert in-memory list updates or error is thrown.
- CLI integration tests:
  - Simulate main(["--refresh-sources", validUrl]) and assert "Sources refreshed" and exit code 0.
  - Simulate missing configUrl and assert error message and exit code 1.
  - After refresh, simulate main(["--list-sources"]) to ensure the new list is printed.
