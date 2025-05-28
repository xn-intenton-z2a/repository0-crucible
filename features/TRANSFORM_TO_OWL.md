# Summary
Extend the Transform to OWL feature to support both single‐source and merged multi‐source ontology generation, with optional file output.

# Functional Requirements

- In src/lib/main.js:
  - Export a function transformToOwl(data: any[], options?: { baseUri?: string }): any that:
    - Wraps raw JSON into an OWL JSON structure with `@context` and `@graph`.
    - Uses `options.baseUri` or defaults to `http://example.org/ontology`.
  - Export an async function buildOntologies(options?: { baseUri?: string }): Promise<any> that:
    - Fetches JSON from every URL in getSupportedDataSources().
    - Transforms each dataset with transformToOwl using the same base URI.
    - Merges all individuals into one `@graph` under a shared `@context`.
    - Returns the combined OWL JSON object.
  - Extend main(args) to detect:
    - `--transform-to-owl <url>` with optional `--base-uri <uri>` and `--output-file <path>`:
      1. Validate `<url>` is supported.
      2. Fetch JSON via fetchSource(url).
      3. Call transformToOwl on the result.
      4. If `--output-file` is provided, write output to the file; otherwise print to stdout.
      5. Exit with code 0 on success, code 1 on any error.
    - `--build-ontologies` with optional `--base-uri <uri>` and `--output-file <path>`:
      1. Call buildOntologies({ baseUri }).
      2. Write or print merged ontology as above.
  - Preserve existing flags: list-sources, fetch-source, query-owl, capital-cities, serve.

# CLI Usage

```bash
# Transform a single source and print
npm run start -- --transform-to-owl <url> [--base-uri <uri>]

# Transform and save to file
npm run start -- --transform-to-owl <url> [--base-uri <uri>] --output-file ontology.json

# Build merged ontology from all sources and print
npm run start -- --build-ontologies [--base-uri <uri>]

# Build merged ontology and save to file
npm run start -- --build-ontologies [--base-uri <uri>] --output-file merged.json
``` 

# API

```js
import { transformToOwl, buildOntologies } from '@xn-intenton-z2a/repository0-crucible';

// Single source
const owl = transformToOwl(dataArray, { baseUri: 'http://example.org/ontology' });

// Multi-source merge
const merged = await buildOntologies({ baseUri: 'http://example.org/ontology' });
```

# Testing

- Unit tests for transformToOwl:
  - Provide sample arrays and custom baseUri; assert `@context` and `@graph` structure.
- Unit tests for buildOntologies:
  - Stub fetchSource for each URL; call buildOntologies and assert merged graph length and context.
- CLI tests:
  - Single-source: spy on console.log/writeFile and process.exit; simulate transform-to-owl flow.
  - Multi-source: simulate build-ontologies flow including errors.

# Documentation

- Update README.md under **Features** with **Transform to OWL** section explaining both flags and file option.
- Provide examples under **Usage** for printing and saving outputs.
- Create docs/TRANSFORM_TO_OWL.md mirroring README with full examples.