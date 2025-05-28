# Summary
Add a new CLI flag `--fetch-source <url>` and a programmatic API `fetchSource(url)` to retrieve live JSON data from supported public data sources.  Users can choose to print fetched data to stdout or write it to a file via an optional `--output-file <path>` argument.

# Functional Requirements

- In `src/lib/main.js`:
  1. Export an asynchronous function:
       ```js
       export async function fetchSource(url: string): Promise<any> {
         if (!getSupportedDataSources().includes(url)) {
           throw new Error(`Unsupported data source: ${url}`);
         }
         const response = await fetch(url);
         return await response.json();
       }
       ```
  2. Extend the `main(args)` entry point to handle `--fetch-source <url> [--output-file <path>]`:
     - Validate the URL argument is present and supported; print an error and exit code 1 if missing or unsupported.
     - Call `await fetchSource(url)` to retrieve JSON data.
     - If `--output-file <path>` follows, write the fetched JSON to the specified file using `fs/promises.writeFile` with two-space indentation; on success exit code 0; on write failure print error and exit code 1.
     - If no `--output-file` is provided, print the JSON to stdout via `console.log(JSON.stringify(data, null, 2))` and exit code 0.
  3. Preserve existing `--list-sources` behavior and default CLI output.

# CLI Usage

```bash
# Print fetched data to stdout
npm run start -- --fetch-source https://restcountries.com/v3.1/all

# Save fetched data to file
npm run start -- --fetch-source https://restcountries.com/v3.1/all --output-file data.json
```

# API

```js
import { getSupportedDataSources, fetchSource } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const sources = getSupportedDataSources();
  try {
    const data = await fetchSource(sources[0]);
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
})();
```

# Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Stub `global.fetch` to resolve sample JSON; assert `fetchSource(validUrl)` resolves and `fetch` is called correctly.
  - Assert `fetchSource(invalidUrl)` rejects with `Error('Unsupported data source: <invalidUrl>')`.
- **CLI Integration Tests**:
  - **Valid URL without `--output-file`**: spy on `console.log` and `process.exit`; run `await main(['--fetch-source', validUrl])`; assert JSON printed and exit code 0.
  - **Valid URL with `--output-file`**: spy on `fs/promises.writeFile` and `process.exit`; suppress `console.log`; run `await main(['--fetch-source', validUrl, '--output-file', path])`; assert file write and exit code 0.
  - **Missing URL**: assert error to stderr and exit code 1.
  - **Unsupported URL**: assert error to stderr and exit code 1.
  - **Missing file path**: assert error and exit code 1.
  - **Write failure**: mock writeFile rejection; assert error and exit code 1.

# Documentation

- Update `README.md`:
  - Under **Features**, add **Fetch Source** entry noting `--output-file` option.
  - Under **Usage**, include both stdout and file-save examples.
- Create or update `docs/FETCH_SOURCE.md` mirroring the README with full examples and API reference.