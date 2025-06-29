# Summary
Provide dynamic updating of supported data sources by fetching a remote configuration and integrate it with existing list-sources functionality.

# Functional Requirements

In src/lib/main.js:

- Export an async function refreshSupportedDataSources(configUrl: string): Promise<void>:
  1. Fetch JSON from configUrl via global fetch; expect an array of URL strings.
  2. Validate each entry is a well-formed URL; if invalid, throw an Error("Invalid data source URL: " + entry).
  3. Replace the in-memory supportedDataSources with the fetched list.

- Extend getSupportedDataSources(): string[] to return the current in-memory list.

- In the main(args) entrypoint, before handling --list-sources:
  - Detect --refresh-sources <configUrl>:
    1. If configUrl is missing or starts with "--", print "Error: Config URL required for --refresh-sources" to stderr and exit with code 1.
    2. Call await refreshSupportedDataSources(configUrl).
    3. On success, print "Sources refreshed" to stdout and exit with code 0.
    4. On error, print the error message to stderr and exit with code 1.

Ensure existing --list-sources behavior uses the updated list and all other flags remain unchanged.
