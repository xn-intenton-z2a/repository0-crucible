# Summary
Enhance the Fetch Source feature to allow writing fetched JSON data to a file via an optional --output-file flag.

# Functional Requirements

- In `src/lib/main.js`, extend the existing `--fetch-source <url>` handling:
  - Detect an optional `--output-file <filePath>` argument following the URL.
  - If `--output-file` is provided:
    1. After fetching data with `fetchSource(url)`, use `fs/promises.writeFile` to write `JSON.stringify(data, null, 2)` to `filePath`.
    2. On successful write, exit with code `0` without printing to stdout.
    3. On write failure, print the error message to stderr and exit with code `1`.
  - If `--output-file` is not provided, preserve existing behavior: print JSON to stdout and exit with code `0`.

# CLI Usage

- `npm run start -- --fetch-source <url> [--output-file <path>]`

Example:

```bash
npm run start -- --fetch-source https://restcountries.com/v3.1/all --output-file data.json
```

# API

- `fetchSource(url: string): Promise<any>` — Unchanged, returns parsed JSON for a supported URL.

# Testing

- **Unit Tests**:
  - Stub `fs/promises.writeFile` to simulate success and error:
    - Verify `writeFile` is called with the correct file path and formatted JSON.
    - Simulate rejection and assert the error is thrown as expected.
- **CLI Integration Tests**:
  - **With output-file**:
    - Spy on `fs/promises.writeFile`, `process.exit`, and suppress `console.log`.
    - Invoke `await main(["--fetch-source", validUrl, "--output-file", filePath])`.
    - Assert `writeFile` was called and `process.exit(0)`.
    - Assert no JSON printed to stdout.
  - **Write Error**:
    - Mock `writeFile` to reject with an error.
    - Assert the error message is printed to stderr and `process.exit(1)`.

# Documentation

- Update `features/FETCH_SOURCE.md` to describe the `--output-file` option with examples.
- Update `README.md`:
  - Under **Features**, note that `--fetch-source` supports `--output-file`.
  - Under **Usage**, include an example invocation with `--output-file` and sample output message indicating file write.