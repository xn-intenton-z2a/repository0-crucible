# Summary
Enable transformation of JSON data from supported sources into OWL ontology JSON. This feature adds a programmatic API and CLI flag to fetch source data, apply a basic ontology mapping, and output a JSON representation of the ontology.

# Functional Requirements
- In src/lib/main.js:
  - Export a function transformToOwl(data: any, options?: { baseUri?: string }): any that:
    - Wraps raw JSON data into a minimal OWL JSON structure with context, classes, and individuals.
    - Uses a base URI if provided, defaulting to a fixed base.
  - Extend the main(args) entrypoint to detect '--transform-to-owl <url>' and optional '--base-uri <uri>'.
    - Validate that the URL is one of supportedDataSources.
    - Fetch JSON from the URL.
    - Call transformToOwl with the data and provided baseUri.
    - Print JSON.stringify(ontology, null, 2) to stdout and exit with code 0.
    - On errors or unsupported URL, print to stderr and exit with code 1.
  - Ensure existing flags --list-sources and --fetch-source remain unchanged.

# API
- transformToOwl(data: any, options?: { baseUri?: string }): any — transforms JSON data into OWL JSON.
- fetchSource(url: string): Promise<any> — unchanged; fetches JSON data.
- getSupportedDataSources(): string[] — unchanged; returns source URLs.
- main(args: string[]): Promise<void> — extended to handle the new flag.

# CLI Usage
- npm run start -- --transform-to-owl <url>
- Optional base URI:
  --base-uri <uri>

Example:
```bash
npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology
```

# Testing
- In tests/unit/main.test.js:
  - Unit test for transformToOwl:
    - Provide sample raw JSON and options, assert output structure includes context and graph entries.
  - CLI integration tests:
    - Valid URL and baseUri: spy on console.log and process.exit, call await main([...]), assert printed ontology JSON and exit 0.
    - Missing or unsupported URL: spy on console.error and process.exit, call await main([...]), assert error output and exit 1.

# Documentation
- Update README.md:
  - Under **Features**, add **Transform to OWL** section describing the new flag and API.
  - Under **Usage**, include example invocation and sample output.
- Create features/TRANSFORM_TO_OWL.md mirroring README details with full specification.
