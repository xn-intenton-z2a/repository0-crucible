# Summary
Add a new CLI flag --build-ontologies and programmatic API buildOntologies to fetch and transform all supported data sources into a single merged OWL ontology JSON.

# Functional Requirements

1. **API: buildOntologies(options?: { baseUri?: string }): Promise<any>**
   - Retrieve the list of supported data sources via getSupportedDataSources().
   - For each URL in the list:
     - Use fetchSource(url) to fetch live JSON data.
     - Normalize the fetched data to an array if it is a single object.
     - Call transformToOwl(data, { baseUri }) to produce an OWL JSON object.
   - Combine all individual entries from each ontology’s @graph into a single @graph array.
   - Use the provided baseUri or default base URI, set in the @context of the merged ontology.
   - Return the merged OWL JSON object with @context and combined @graph.

2. **CLI: --build-ontologies flag in main(args)**
   - Detect the --build-ontologies flag.
   - Parse an optional --base-uri <uri> argument following the flag.
   - Call await buildOntologies({ baseUri }).
   - Print JSON.stringify(mergedOntology, null, 2) to stdout.
   - Exit with code 0 on success.
   - On any error during fetch or transform, print the error message to stderr and exit with code 1.

3. **Preserve existing flags**
   - Ensure --list-sources, --fetch-source, --transform-to-owl, --query-owl, --capital-cities behavior remains unchanged.

# Testing

- **Unit tests** in tests/unit/main.test.js:
  - Stub fetchSource() to return mock arrays for multiple URLs and call buildOntologies({ baseUri }); assert that the returned object’s @graph length equals the sum of item counts, and @context uses the correct URI.

- **CLI integration tests:**
  - Spy on console.log and process.exit; stub fetchSource() for multiple sources; invoke await main(["--build-ontologies", "--base-uri", testUri]); assert correct JSON output and exit code 0.
  - Simulate fetch failure in one source: assert error printed and exit code 1.

# Documentation

- **README.md**:
  - Under **Features**, add **Merge Ontologies** describing the --build-ontologies flag and buildOntologies() API.
  - Under **Usage**, include examples for single-source and merged ontologies:
    ```bash
    npm run start -- --build-ontologies --base-uri http://example.org/ontology
    ```

- **features/MERGE_ONTOLOGIES.md**:
  - Provide full specification, API reference, CLI examples, and sample merged OWL JSON output.