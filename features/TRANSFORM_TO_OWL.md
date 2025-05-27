# Summary
Extend the existing Transform to OWL feature to support both single‐source and multi‐source (merge) ontology generation from supported data sources.

# Functional Requirements

In src/lib/main.js:

- Export function transformToOwl(data: any, options?: { baseUri?: string }) that:
  - Wraps raw JSON data into a minimal OWL JSON structure with @context and @graph.
  - Uses options.baseUri or falls back to a default base URI.

- Export async function buildOntologies(options?: { baseUri?: string }) that:
  - Calls fetchSource for each URL in supportedDataSources.
  - Transforms each dataset with transformToOwl using options.baseUri.
  - Combines all transformed individuals into a single @graph under a shared @context.

- Extend main(args: string[]) to handle:
  - --transform-to-owl <url> [--base-uri <uri>]
    1. Validate <url> is in supportedDataSources.
    2. Call fetchSource(url) and transformToOwl on the result.
    3. Print JSON.stringify(ontology, null, 2) and exit with code 0.
    4. On errors, print error to stderr and exit code 1.

  - --build-ontologies [--base-uri <uri>]
    1. Call buildOntologies, passing baseUri if provided.
    2. Print merged ontology JSON and exit with code 0.
    3. On errors, print error to stderr and exit code 1.

- Preserve existing flags --list-sources, --fetch-source, --query-owl and default behavior.

# CLI Usage

- npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology
- npm run start -- --build-ontologies --base-uri http://example.org/ontology

# Testing

- Unit tests for transformToOwl using sample arrays and verifying @context and @graph structure.
- Unit tests for buildOntologies by stubbing fetchSource for multiple URLs and validating merged @graph.
- CLI integration tests for both flags covering valid scenarios and error paths.

# Documentation

- Update README.md under Features to describe the Transform to OWL feature, including both single and merged modes.
- Create docs/TRANSFORM_TO_OWL.md mirroring README content, with detailed API reference, CLI examples and sample outputs.