# QUERY_JSON Feature Enhancement

## Overview
This feature enhances the existing query functionality by introducing a new flag `--query-json` that produces structured JSON output. When a user invokes the query command along with this flag, the CLI will output a JSON object containing detailed query parameters (search terms and filters) rather than a simple string message. This approach aligns with the mission of providing programmatic and machine-readable outputs for easier integration with other systems.

## Implementation Details
- **CLI Argument Parsing:**
  - Update the `query` function in `src/lib/main.js` to detect the `--query-json` flag.
  - Parse the remaining arguments to split search terms and key=value filters as usual.
  - If the flag is present, construct a JSON object with the following keys:
    - `searchTerms`: an array of search term strings (if provided).
    - `filters`: an object containing any key=value pairs.
    - `message`: a summary message indicating the type of query.
  - Use `JSON.stringify` to output the structured response.
  - Retain existing behavior if `--query-json` is not provided.

- **Error Handling:**
  - Ensure proper handling of edge cases (e.g., no search terms or filters) and fallback to a default JSON structure.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js`:
    - Add a new test case for the query command using the `--query-json` flag.
    - Verify that the output is valid JSON.
    - Confirm that the JSON contains all expected keys (`searchTerms`, `filters`, and `message`).

- **Documentation Updates:**
  - Update `README.md` in the "Query Ontologies" section to include a usage example for the new `--query-json` flag. 
  - Explain how the JSON output can be used for programmatic integration.

## Future Considerations
- Extend the JSON output to include additional metadata or support more advanced filtering and sorting options.
- Consider providing a configuration option to select between human-readable and machine-readable outputs globally.
