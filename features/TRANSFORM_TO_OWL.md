# Summary

Extend the Transform to OWL feature to support both single-source and multi-source ontology generation, with optional file output. Users can transform a single data source into OWL JSON or merge all supported sources into one ontology.

# Functional Requirements

- Export `transformToOwl(data: any[], options?: { baseUri?: string }): any` in `src/lib/main.js`:  
  - Wraps an array of JSON items into an OWL JSON structure with:
    - `@context` containing `@vocab` set to `options.baseUri` plus `#` or a default base URI.
    - `@graph` as an array of individuals where each object has an `@id` prefixed by the vocab URI and all other properties copied.

- Export `buildOntologies(options?: { baseUri?: string }): Promise<any>`:
  - Calls `getSupportedDataSources()` to get URLs.
  - For each URL, uses `fetchSource(url)` to retrieve JSON data.
  - Normalizes each dataset into an array and calls `transformToOwl` on it.
  - Merges all individual `@graph` entries into one combined `@graph` under a shared `@context`.
  - Returns the merged OWL JSON object.

- In `main(args)` entrypoint:
  - Handle `--transform-to-owl <url>` with optional `--base-uri <uri>` and `--output-file <path>`:
    1. Validate that `<url>` is provided and in `getSupportedDataSources()`; error and exit code 1 if not.
    2. Fetch JSON via `fetchSource(url)`, call `transformToOwl` with `{ baseUri }`.
    3. If `--output-file` is supplied, write JSON to that file; otherwise, print formatted JSON to stdout.
    4. Exit with code 0 on success; on any error, print to stderr and exit code 1.

  - Handle `--build-ontologies` with optional `--base-uri <uri>` and `--output-file <path>` similarly:
    1. Call `buildOntologies({ baseUri })`.
    2. Write or print the merged ontology as above.

- Preserve existing flags: `--list-sources`, `--fetch-source`, `--query-owl`, and default behavior.

# CLI Usage

- Transform a single source and print:
  ```bash
  npm run start -- --transform-to-owl <url> [--base-uri <uri>]
  ```
- Transform a single source and save to file:
  ```bash
  npm run start -- --transform-to-owl <url> [--base-uri <uri>] --output-file ontology.json
  ```
- Merge all sources and print:
  ```bash
  npm run start -- --build-ontologies [--base-uri <uri>]
  ```
- Merge all sources and save to file:
  ```bash
  npm run start -- --build-ontologies [--base-uri <uri>] --output-file merged.json
  ```

# API

```js
import { transformToOwl, buildOntologies } from '@xn-intenton-z2a/repository0-crucible';

// Single-source transformation
const owl = transformToOwl(dataArray, { baseUri: 'http://example.org/ontology' });

// Multi-source merge
const merged = await buildOntologies({ baseUri: 'http://example.org/ontology' });
console.log(JSON.stringify(merged, null, 2));
```

# Testing

- Unit tests for `transformToOwl`:
  - Provide sample arrays and custom base URIs; assert `@context` and `@graph` correctness.
  - Test default behavior when `options.baseUri` is omitted.

- Unit tests for `buildOntologies`:
  - Stub `fetchSource` for multiple URLs; assert merged `@graph` length and correct `@context`.

- CLI integration tests:
  - **Single-source**: spy on `console.log`, `fs/promises.writeFile`, and `process.exit`; invoke `main([...])`; assert printed or written JSON and exit codes.
  - **Multi-source**: same approach for `--build-ontologies` flag.
  - Error scenarios: missing URL, unsupported URL, missing file path, write failures, exit code 1.

# Documentation

- Update `README.md` under **Features** with **Transform to OWL** and **Merge Ontologies** sections.
- Provide usage examples and sample outputs in the README.
- Create or update `docs/TRANSFORM_TO_OWL.md` mirroring the above specification with detailed examples.