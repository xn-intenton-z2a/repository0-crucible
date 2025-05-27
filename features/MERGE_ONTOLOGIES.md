# Summary
Add a new CLI flag --build-ontologies and a programmatic API buildOntologies to fetch and transform all supported data sources into a single merged OWL ontology JSON.

# Functional Requirements
- In src/lib/main.js export an async function buildOntologies(options?: { baseUri?: string }): any that:
  - Iterates over supportedDataSources.
  - For each URL, uses fetchSource(url) to retrieve JSON data.
  - Transforms each dataset into OWL JSON via transformToOwl, passing options.baseUri if provided.
  - Collects all individuals from each transformed ontology into a single @graph array.
  - Returns an object with @context set to the vocab URI (baseUri plus # or default) and @graph containing all merged individuals.
- Extend main(args) entrypoint to detect --build-ontologies:
  - Parse an optional --base-uri <uri> argument.
  - Call buildOntologies({ baseUri }) and await the result.
  - Print JSON.stringify(ontology, null, 2) to stdout and exit with code 0.
  - On any error, print the error message to stderr and exit with code 1.
- Ensure no change to existing flags and behavior.

# API
- buildOntologies(options?: { baseUri?: string }): any — returns a merged OWL JSON object combining all supported sources.

# CLI Usage
- npm run start -- --build-ontologies
- With custom URI:
  npm run start -- --build-ontologies --base-uri http://example.org/merged

# Testing
- Unit tests:
  - Stub fetchSource to return sample arrays for multiple URLs.
  - Call buildOntologies and assert that the returned object has the expected @context and that @graph length equals the sum of all input datasets.
- CLI integration:
  - Spy on console.log and process.exit, stub fetchSource to return mock data.
  - Invoke main(['--build-ontologies']) and assert JSON output matches buildOntologies result and process exits with code 0.
  - Test error paths by causing fetchSource to throw and asserting process exits with code 1.

# Documentation
- Update README.md under **Features** with a **Merge Ontologies** section describing the flag and API.
- Create features/MERGE_ONTOLOGIES.md mirroring this specification with examples and details.