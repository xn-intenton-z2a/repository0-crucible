# Summary
Add a CLI flag --build-ontologies and a programmatic API buildOntologies(options?) to fetch and transform all supported data sources into a single merged OWL JSON ontology.

# Functional Requirements

- In src/lib/main.js:
  - Export an async function buildOntologies(options?: { baseUri?: string }): Promise<any> that:
    1. Retrieves the list of supported data source URLs via getSupportedDataSources().
    2. For each URL, calls fetchSource(url) to fetch JSON data.
    3. Transforms each dataset into OWL JSON using transformToOwl(data, { baseUri }).
    4. Merges all individuals from each ontology’s @graph into a single @graph array.
    5. Returns a combined OWL JSON object with @context set to the vocab URI and the merged @graph.
  - Extend main(args) to detect the flag --build-ontologies and optional --base-uri <uri>:
    1. If args includes --build-ontologies, parse an optional --base-uri value.
    2. Call await buildOntologies({ baseUri }).
    3. Print JSON.stringify(ontology, null, 2) to stdout and exit process with code 0.
    4. On any error during fetch or transform, print the error message to stderr and exit process with code 1.
  - Ensure existing flags (--list-sources, --fetch-source, --transform-to-owl, --query-owl, --capital-cities, --serve) and default behavior remain unchanged.

# Testing

- Unit Tests:
  - Stub fetchSource to return sample arrays for multiple URLs and call buildOntologies({ baseUri }).
  - Assert that the returned object’s @graph length equals the sum of all input datasets and @context uses the correct vocab URI.

- CLI Integration Tests:
  - Spy on console.log and process.exit; stub fetchSource to return mock data.
  - Invoke await main(["--build-ontologies", "--base-uri", testUri]); assert JSON output matches buildOntologies result and exit code 0.
  - Simulate fetchSource throwing; assert error printed and exit code 1.

# Documentation

- Update README.md under **Features** with a **Merge Ontologies** section describing the --build-ontologies flag and buildOntologies() API.
- Create docs/BUILD_ONTOLOGIES.md mirroring this specification with examples, API reference, and sample merged OWL JSON output.