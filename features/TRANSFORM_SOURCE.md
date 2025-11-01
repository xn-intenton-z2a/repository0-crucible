# Summary
Provide a combined CLI flag --transform-source and a programmatic API fetchAndTransform(url, options?) to fetch JSON from a supported public data source and transform it directly into OWL JSON in one step, with optional file output.

# Functional Requirements

## API: fetchAndTransform
- In src/lib/main.js, export an async function:

      export async function fetchAndTransform(url, options = {}) {
        if (!getSupportedDataSources().includes(url)) {
          throw new Error(`Unsupported data source: ${url}`)
        }
        const data = await fetchSource(url)
        return transformToOwl(Array.isArray(data)? data : [data], options)
      }

- Validates the provided URL against supported sources, fetches JSON, transforms to OWL, and returns the ontology object.

## CLI: --transform-source
- In main(args):
  1. Detect the flag --transform-source <url>.
  2. Validate URL presence and support; if invalid, print error to stderr and exit(1).
  3. Parse an optional --base-uri <uri> and optional --output-file <path> following the URL.
  4. Call fetchAndTransform(url, { baseUri }).
  5. If --output-file is provided, write JSON.stringify(ontology, null, 2) to the file and exit(0) without console output; on write error, print error and exit(1).
  6. If no --output-file, print JSON.stringify(ontology, null, 2) to stdout and exit(0).
  7. Preserve existing flags and behavior when --transform-source is absent.

# CLI Usage

```bash
npm run start -- --transform-source <url> [--base-uri <uri>] [--output-file <path>]
```

# Testing

- **Unit Tests**:
  - Stub fetchSource and transformToOwl; assert fetchAndTransform returns correct OWL JSON and rejects on unsupported URL.
- **CLI Integration Tests**:
  - Valid URL: spy on console.log and process.exit for main(["--transform-source", validUrl, "--base-uri", uri]).
  - With --output-file: spy on writeFile and process.exit; assert file write and exit code 0.
  - Error scenarios: missing URL, unsupported URL, missing file path, write error produce stderr messages and exit code 1.
