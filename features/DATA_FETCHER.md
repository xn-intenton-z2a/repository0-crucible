# DATA_FETCHER

## Overview

This feature extends the existing data fetching capability of the CLI by supporting HTTP requests to a set of pre-configured, canned data sources. By incorporating a new command line switch (e.g., `--datasource`), users can choose from a list of known data sources when gathering ontology data. This update streamlines the process of building OWL ontologies from live, verified public data sources in keeping with the mission of owl-builder.

## Functionality

- **Datasource Selection:** Introduce a new command line flag (`--datasource`) that accepts a predefined identifier for a data source. For example, choosing `worldclock` would fetch data from a corresponding URL.
- **HTTP Request Processing:** Modify the existing `--fetch` command to incorporate datasource selection. When a valid datasource is specified, the CLI will perform an HTTP request to the associated API endpoint.
- **Data Transformation:** Convert the fetched data into a valid ontology JSON structure using existing transformation and validation routines (based on the Zod schema).
- **Fallback Behavior:** If no datasource is provided or the given identifier is not recognized, the CLI will fall back to the default behavior (using dummy data or a default API endpoint).
- **Logging and Error Handling:** All operations, including successful fetches and errors, will be logged using existing logging utilities to aid debugging and diagnostics.

## CLI Integration

- Update the help message to include usage of `--datasource` with the `--fetch` command.
- Example usage: `node src/lib/main.js --fetch --datasource worldclock`.
- The command parses both `--fetch` and `--datasource` arguments and maps canned datasource identifiers to their corresponding URLs.

## Implementation Details

- **Code Changes:** Enhance the `handleFetch()` function in `src/lib/main.js` to detect and process the `--datasource` flag.
- **Data Source Map:** Maintain a map of datasource identifiers (e.g., `worldclock`, `weather`, `finance`) to their respective URLs. This can be hardcoded or configurable via a JSON file.
- **Error Management:** Validate API responses using the existing Zod schema. In case of an error (e.g., invalid datasource or HTTP error), appropriate error logging will be triggered.
- **Testing:** Add unit and end-to-end tests to ensure that the feature correctly fetches, processes, and logs data from the specified datasource.

## Usage Example

```bash
node src/lib/main.js --fetch --datasource worldclock
```

The above command fetches ontology data from the pre-configured "worldclock" data source, transforms it into a valid ontology JSON object, and logs the operation.

## Impact and Value

- **Streamlined Data Gathering:** Enables users to easily select among multiple live data sources, improving the flexibility and usability of the CLI.
- **Enhanced Functionality:** Aligns with the mission to build OWL ontologies from live, verified data sources by offering a deterministic way to fetch external data.
- **Improved Developer Experience:** With built-in logging and error handling, developers can more easily debug issues related to data fetching.
