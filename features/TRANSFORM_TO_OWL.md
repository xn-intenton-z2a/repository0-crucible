# Summary
Extend the existing Transform to OWL feature to support an optional --output-file flag. Users can fetch JSON data from a supported source, transform it into an OWL JSON ontology, and optionally write the output to a file instead of printing to stdout.

# Functional Requirements
- In src/lib/main.js:
  - In the --transform-to-owl handling block:
    1. Detect the flag `--transform-to-owl <url>` followed optionally by `--base-uri <uri>` and an optional `--output-file <path>` following the URI arguments.
    2. Validate that the `<url>` argument is provided and is one of `getSupportedDataSources()`; if missing or unsupported, print an error to stderr and exit code 1.
    3. Determine `baseUri` from `--base-uri <uri>` if supplied, otherwise use the existing default.
    4. Call `fetchSource(url)` to retrieve JSON data from the source.
    5. Call `transformToOwl(data, { baseUri })` to generate the ontology object.
    6. If `--output-file <path>` is present:
       - Validate that a file path follows the flag; if missing, print an error to stderr and exit code 1.
       - Use `fs/promises.writeFile` to write `JSON.stringify(ontology, null, 2)` to the specified file.
       - On successful write, exit code 0 without printing to stdout.
       - On write failure, print the error message to stderr and exit code 1.
    7. If `--output-file` is not provided:
       - Print `JSON.stringify(ontology, null, 2)` to stdout and exit code 0.
  - Preserve all existing behavior for other flags and default CLI output.

# CLI Usage
```bash
# Transform a supported source and print OWL JSON
npm run start -- --transform-to-owl <url> [--base-uri <uri>]

# Transform and save to file
npm run start -- --transform-to-owl <url> [--base-uri <uri>] --output-file ontology.json
```

# Testing
- **Unit Tests** (in tests/unit/main.test.js):
  - Stub global.fetch to return sample JSON; test that `transformToOwl` produces correct @context and @graph structure given sample data and custom baseUri.
  - Stub fs/promises.writeFile to simulate write success and failure when `--output-file` is used.
- **CLI Integration Tests**:
  - **Valid URL without output-file**: spy on console.log and process.exit; simulate `main(["--transform-to-owl", validUrl])`; assert printed ontology JSON and exit code 0.
  - **Valid URL with output-file**: spy on writeFile, suppress console.log, simulate `main(["--transform-to-owl", validUrl, "--output-file", "out.json"])`; assert writeFile called with formatted JSON and exit code 0.
  - **Missing URL or file path**: simulate missing arguments; spy on console.error and process.exit; assert error messages and exit code 1.
  - **Unsupported URL**: simulate URL not in supported list; assert error and exit code 1.
  - **Write failure**: simulate write failure; assert error printed and exit code 1.

# Documentation
- Update README.md:
  - In **Features**, extend the **Transform to OWL** section to note `--output-file` support.
  - Under **Usage**, add examples for saving transformed ontology to a file.
- Update features/TRANSFORM_TO_OWL.md to include `--output-file` option, usage examples, and behavior notes.