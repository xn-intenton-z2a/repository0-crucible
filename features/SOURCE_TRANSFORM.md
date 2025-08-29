# Summary
Provide a combined CLI flag and API to fetch JSON from a supported data source and transform it directly into an OWL ontology JSON structure. This streamlines creating ontology output in one step.

# Functional Requirements

- In `src/lib/main.js`:
  - Export a function:
    ```js
    export async function fetchAndTransform(url: string, options?: { baseUri?: string }): Promise<any>
    ```
    - Validate `url` against `getSupportedDataSources()`; if unsupported, throw `Error("Unsupported data source: " + url)`.
    - Use `await fetchSource(url)` to retrieve JSON data.
    - Call `transformToOwl(data, options)` on the fetched data and return the OWL JSON object.
  - Extend `main(args)` to detect `--transform-source <url>` with optional `--base-uri <uri>` and `--output-file <path>`:
    1. Validate `<url>` presence and support; on failure, print error to stderr and exit code 1.
    2. Call `await fetchAndTransform(url, { baseUri })`.
    3. If `--output-file` is provided, write the OWL JSON to the file with `fs/promises.writeFile`; on success exit 0; on write failure print error and exit 1.
    4. If no `--output-file`, print `JSON.stringify(ontology, null, 2)` to stdout and exit 0.
    5. Preserve existing behavior for other flags.

# CLI Usage

```bash
npm run start -- --transform-source https://restcountries.com/v3.1/all --base-uri http://example.org/ontology [--output-file ontology.json]
```

# API

```js
import { fetchAndTransform } from '@xn-intenton-z2a/repository0-crucible';
(async () => {
  const ontology = await fetchAndTransform(
    'https://restcountries.com/v3.1/all',
    { baseUri: 'http://example.org/ontology' }
  );
  console.log(JSON.stringify(ontology, null, 2));
})();
```

# Testing

- **Unit tests**:
  - Stub `fetchSource` to return sample JSON; assert `fetchAndTransform` calls `transformToOwl` with correct data and returns the OWL object.
  - Assert unsupported URL rejects with the correct error.
- **CLI integration tests**:
  - Valid URL: spy on console.log and process.exit; simulate `main(["--transform-source", validUrl, "--base-uri", uri])`; assert printed OWL JSON and exit code 0.
  - With `--output-file`: spy on writeFile and process.exit; assert file write and exit code 0.
  - Missing URL or unsupported URL: assert stderr error and exit code 1.

# Documentation

- Update `README.md`: add **Transform Source** under **Features** with summary, CLI usage, and API reference.
- Create `docs/SOURCE_TRANSFORM.md` mirroring the spec with examples and test guidance.