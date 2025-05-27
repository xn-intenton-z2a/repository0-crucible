# Summary
Extend the existing Transform to OWL feature to support both single-source transformation and multi-source merging of OWL ontologies from supported data sources.

# Functional Requirements

In `src/lib/main.js`:

- Export a function `transformToOwl(data: any[], options?: { baseUri?: string }): any` that:
  - Accepts an array of JSON objects.
  - Wraps the items into a minimal OWL JSON structure:
    - An `@context` with `@vocab` set to `options.baseUri` plus `#`, or a default base URI `http://example.org/ontology#`.
    - An `@graph` array where each object is mapped to an individual:
      - Generates an `@id` prefixed by the vocab URI and the item's `id` field.
      - Copies all other fields from the source object.

- Export an async function `buildOntologies(options?: { baseUri?: string }): Promise<any>` that:
  - Retrieves all supported data sources via `getSupportedDataSources()`.
  - For each URL, calls `fetchSource(url)` to get JSON data (array or object).
  - Normalizes the fetched data into an array, then calls `transformToOwl` for each dataset,
    using the provided `options.baseUri` if given.
  - Merges all individual `@graph` arrays into a single `@graph`.
  - Returns a combined OWL JSON object with a shared `@context` and merged `@graph`.

- Extend the `main(args: string[])` entrypoint to handle:
  - `--transform-to-owl <url>` and optional `--base-uri <uri>`:
    1. Validate `<url>` is in supported sources; if not, print error and exit code 1.
    2. Fetch JSON via `fetchSource(url)`.
    3. Call `transformToOwl` with the fetched data and `baseUri`.
    4. Print `JSON.stringify(ontology, null, 2)` to stdout and exit code 0.
  - `--build-ontologies` with optional `--base-uri <uri>`:
    1. Call `buildOntologies({ baseUri })`.
    2. Print merged ontology JSON to stdout and exit code 0.
  - Ensure existing flags (`--list-sources`, `--fetch-source`, `--query-owl`) and default behavior remain unaffected.

# CLI Usage

- Single-source transform:

```bash
npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology
```

- Merge all sources:

```bash
npm run start -- --build-ontologies --base-uri http://example.org/ontology
```

# Testing

In `tests/unit/main.test.js`:

- **Unit tests for `transformToOwl`**:
  - Provide sample arrays and custom URIs; assert `@context` and each `@graph` item structure.
  - Test default base URI when no `options.baseUri` is provided.

- **Unit tests for `buildOntologies`**:
  - Stub `fetchSource` to return sample arrays for multiple URLs.
  - Assert the merged `@graph` contains all individuals and correct `@context`.

- **CLI integration tests**:
  - **Single-source**: spy on `console.log` and `process.exit`, call `await main([...])`; assert output and exit code.
  - **Merged**: spy similarly for `--build-ontologies` scenario.
  - Test invalid URL and missing arguments produce errors and exit code 1.
