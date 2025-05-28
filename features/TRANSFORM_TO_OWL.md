# Summary

Extend the existing Transform to OWL feature to support writing the generated OWL JSON to a file via an optional --output-file flag in addition to printing to stdout.  This gives users flexibility to persist ontology output without piping CLI output.

# Functional Requirements

- In src/lib/main.js:
  - Locate the handling for --transform-to-owl <url> [--base-uri <uri>].
  - After fetching and transforming data via fetchSource and transformToOwl:
    1. Detect an optional --output-file <filePath> argument immediately following the URL and optional --base-uri.
    2. If --output-file is provided:
       - Verify a file path follows; if missing or malformed, print `Error: File path is required for --output-file` to stderr and exit code 1.
       - Write the OWL JSON to the specified file using fs/promises.writeFile with two-space indentation.
       - On successful write, exit with code 0 without additional stdout output.
       - On write failure, print the error message to stderr and exit code 1.
    3. If --output-file is not provided:
       - Print the OWL JSON via console.log(JSON.stringify(ontology, null, 2)) and exit code 0.
  - Preserve existing transform-to-owl behavior when no output-file flag is used.
  - Ensure other flags (--list-sources, --fetch-source, --build-ontologies, etc.) remain unaffected.

# CLI Usage

```bash
# Transform JSON from a single source and print to stdout
npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology

# Transform and save output to file
npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology --output-file ontology.json
``` 

# API

- transformToOwl(data: any[], options?: { baseUri?: string }): any — unchanged, transforms raw JSON into OWL JSON.

# Testing

- Unit tests for CLI output-file behavior:
  - Stub fs/promises.writeFile to resolve and reject:
    - Verify writeFile is called with correct path and formatted OWL JSON when --output-file is used.
    - Simulate write failure and assert error is printed to stderr and process exits with code 1.
- CLI integration tests for --transform-to-owl:
  - **With output-file**: spy on writeFile and process.exit; run main with --transform-to-owl and --output-file; assert file write, no stdout, exit code 0.
  - **Without output-file**: spy on console.log and process.exit; run main with only --transform-to-owl; assert JSON printed, exit code 0.
  - **Missing file path**: run main with --transform-to-owl <url> --output-file; assert `Error: File path is required for --output-file` and exit code 1.

# Documentation

- Update README.md:
  - In **Features**, note that --transform-to-owl supports an optional --output-file parameter.
  - In **Usage**, include examples for both printing and file output as shown above.
- Update docs/TRANSFORM_TO_OWL.md:
  - Add a section describing the --output-file option with usage examples and sample commands.