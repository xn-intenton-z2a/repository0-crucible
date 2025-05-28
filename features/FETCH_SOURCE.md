# Summary

Introduce a new CLI flag `--fetch-source` and programmatic API function `fetchSource(url)` to retrieve live JSON data from supported public data sources. Users will be able to fetch and display raw data or write it to a file via an optional `--output-file` argument.

# Functional Requirements

- In **src/lib/main.js**:
  - Export an asynchronous function:
      ```js
      export async function fetchSource(url: string): Promise<any> {
        if (!getSupportedDataSources().includes(url)) {
          throw new Error(`Unsupported data source: ${url}`);
        }
        const response = await fetch(url);
        return response.json();
      }
      ```
  - Extend the `main(args: string[])` entrypoint to handle:
    - `--fetch-source <url>` followed optionally by `--output-file <path>`:
      1. Validate a URL argument follows `--fetch-source`; if missing or starts with `--`, print an error to stderr and exit code 1.
      2. Validate that the URL exists in the result of `getSupportedDataSources()`; if not, print an error and exit code 1.
      3. Call `await fetchSource(url)` to retrieve JSON.
      4. If `--output-file <path>` is present:
         - Validate the file path; if missing, error and exit code 1.
         - Use `import { writeFile } from 'fs/promises'` to write formatted JSON to disk.
         - On success, exit code 0 without additional output.
         - On write failure, print the error message and exit code 1.
      5. If no `--output-file` flag is provided:
         - Print `JSON.stringify(data, null, 2)` to stdout and exit code 0.
  - Preserve existing behavior for other flags, including `--list-sources`.

# CLI Usage

Fetch and display data:
```bash
node src/lib/main.js --fetch-source https://restcountries.com/v3.1/all
```

Fetch and save to a file:
```bash
node src/lib/main.js --fetch-source https://restcountries.com/v3.1/all --output-file data.json
```

# API

```js
import { fetchSource, getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const sources = getSupportedDataSources();
  const url = sources[0];
  try {
    const data = await fetchSource(url);
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
})();
```

# Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Stub `global.fetch` to resolve with a mock response whose `json()` returns sample data. Assert that `fetchSource(validUrl)` resolves correctly and `fetch` was called with `validUrl`.
  - Assert that calling `fetchSource(invalidUrl)` rejects with the exact error message.
  - Stub `writeFile` to resolve or reject, and verify correct behavior and error handling when using `--output-file`.

- **CLI Integration Tests**:
  - **Valid URL without `--output-file`**: spy on `console.log` and `process.exit`, invoke `main(["--fetch-source", validUrl])`, assert JSON printed and exit code 0.
  - **Valid URL with `--output-file`**: spy on `writeFile`, suppress `console.log`, invoke `main(["--fetch-source", validUrl, "--output-file", outPath])`, assert file write call, no stdout output, and exit code 0.
  - **Missing URL**: invoke `main(["--fetch-source"])`, assert error to stderr and exit code 1.
  - **Unsupported URL**: invoke with an unsupported URL, assert error and exit code 1.
  - **Missing file path**: invoke `--output-file` without path, assert error and exit code 1.
  - **Write error**: simulate write failure, assert error printed and exit code 1.

# Documentation

- Update **README.md**:
  - Under **Features**, add a **Fetch Source** entry describing the new flag, optional `--output-file`, and usage examples.
  - Under **Usage**, include commands demonstrating both printing and saving data.
- Create **docs/FETCH_SOURCE.md** mirroring README content, including API reference, CLI examples, and error cases.
