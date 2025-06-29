# Summary
Add a CLI flag --build-ontologies and a programmatic API buildOntologies to fetch and transform all supported data sources into a single merged OWL JSON ontology.

# Functional Requirements

- In src/lib/main.js:
  - Export an asynchronous function buildOntologies(options?: { baseUri?: string }): Promise<any> that:
    1. Retrieves the list from getSupportedDataSources().
    2. For each URL, calls fetchSource(url) to get JSON data.
    3. Transforms each dataset with transformToOwl(data, { baseUri }).
    4. Merges all @graph individuals into a single array.
    5. Returns an object with @context set to the vocab URI and the combined @graph.

- Extend main(args) to detect --build-ontologies and optional --base-uri <uri>:
  - Validate flags and options.
  - Call buildOntologies({ baseUri }).
  - Print JSON.stringify(result, null, 2) to stdout and exit with code 0.
  - On any error, print error.message to stderr and exit with code 1.

# API

- buildOntologies(options?: { baseUri?: string }): Promise<any> — returns merged OWL JSON combining all sources.

# CLI Usage

```bash
npm run start -- --build-ontologies [--base-uri http://example.org/ontology]
```

# Testing

- Unit Tests:
  - Stub fetchSource to return sample arrays for multiple URLs.
  - Call buildOntologies({ baseUri }) and assert @graph length and @context.

- CLI Integration Tests:
  - Spy on console.log and process.exit; stub fetchSource; run main(["--build-ontologies","--base-uri",uri]); assert output and exit code.
  - Simulate fetchSource throwing and assert error and exit code 1.

# Documentation

- Update README.md under **Features** with **Merge Ontologies** section.
- Add docs/MERGE_ONTOLOGIES.md mirroring this specification with examples.