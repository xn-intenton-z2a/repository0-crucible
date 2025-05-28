# Summary
Enhance the fetch-source feature to support an optional output-file argument, allowing users to persist fetched JSON data to disk or print it to the console.

# Functional Requirements

In `src/lib/main.js`:

- Import `writeFile` from `fs/promises`.
- In the `main(args)` entrypoint, detect the flag `--fetch-source <url>`:
  1. Verify a URL follows the flag; if missing or starting with `--`, print `Error: URL is required for --fetch-source` to stderr and exit code 1.
  2. Validate that the URL is in `supportedDataSources`; if not, print `Error: Unsupported data source: <url>` to stderr and exit code 1.
  3. Call `await fetchSource(url)` to retrieve parsed JSON data.
  4. After fetching:
     - If `--output-file <path>` follows the URL:
       - Verify a file path follows; if missing or starting with `--`, print `Error: File path is required for --output-file` to stderr and exit code 1.
       - Call `await writeFile(path, JSON.stringify(data, null, 2))`.
       - Exit with code 0 on success.
       - On write failure, print the error message to stderr and exit code 1.
     - Otherwise, print `JSON.stringify(data, null, 2)` to stdout and exit code 0.
- Preserve existing `--list-sources` behavior and default CLI stub for unknown flags.

# API

- `fetchSource(url: string): Promise<any>` — Validates URL is supported or throws `Error("Unsupported data source: " + url)`; uses global `fetch` to retrieve and parse JSON.

# CLI Usage

```bash
npm run start -- --fetch-source <url> [--output-file <path>]
```

# Testing

In `tests/unit/main.test.js`:

- Unit tests for `fetchSource`:
  - Mock `global.fetch` to return a `json()` response; assert `fetchSource(validUrl)` resolves to sample data and rejects when URL unsupported.
- CLI integration tests:
  - **Valid URL without output-file**: spy on `console.log` and `process.exit`; run `await main(["--fetch-source", validUrl])`; assert JSON printed and exit code 0.
  - **Valid URL with output-file**: spy on `writeFile` and `process.exit`; suppress `console.log`; run `await main(["--fetch-source", validUrl, "--output-file", path])`; assert file write called and exit code 0.
  - **Missing URL**: assert error and exit code 1.
  - **Unsupported URL**: assert error and exit code 1.
  - **Missing file path**: assert error and exit code 1.
  - **Write failure**: simulate `writeFile` rejection; assert error and exit code 1.

# Documentation

- Update `README.md`:
  - Under **Features**, add **Fetch Source** section describing `--fetch-source` and `--output-file` options with examples.
- Update or create `docs/FETCH_SOURCE.md` mirroring the README with API reference, CLI examples, and error scenarios.
