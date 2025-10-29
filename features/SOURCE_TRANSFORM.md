# Summary
Provide a combined CLI flag `--transform-source` and programmatic API `fetchAndTransform(url, options?)` to fetch JSON from a supported data source and transform it into OWL JSON in one step, with optional file output.

# Functional Requirements

1. In `src/lib/main.js`:
   - Export an async function:
     ```js
     export async function fetchAndTransform(url: string, options?: { baseUri?: string }): Promise<any> {
       // Validate url is supported
       // Fetch JSON via fetchSource(url)
       // Transform data via transformToOwl(data, options)
       // Return OWL JSON object
     }
     ```
   - Extend `main(args)` to detect:
     - `--transform-source <url>` with optional `--base-uri <uri>` and `--output-file <path>`.
     - Validate URL presence and support; error and exit 1 if invalid.
     - Call `await fetchAndTransform(url, { baseUri })`.
     - If `--output-file` is provided:
       - Validate file path; write `JSON.stringify(ontology, null, 2)` to disk and exit 0, or error and exit 1.
     - Otherwise, print OWL JSON to stdout and exit 0.
   - Preserve existing flags and behavior when `--transform-source` is absent.

# CLI Usage

```
npm run start -- --transform-source <url> [--base-uri <uri>] [--output-file <path>]
```

# API Example

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

- Unit tests:
  - Stub `fetchSource` and `transformToOwl`; assert `fetchAndTransform` returns correct OWL JSON and errors on unsupported URL.
- CLI integration tests:
  - Valid URL scenario: spy on console.log/process.exit for `main(["--transform-source", validUrl, "--base-uri", uri])`.
  - With `--output-file`: spy on writeFile/process.exit and assert file write and exit 0.
  - Error scenarios: missing URL, unsupported URL, missing file path, write errors exit 1.
