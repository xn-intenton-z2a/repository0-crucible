# Summary
Provide a global --output-file option to write any CLI JSON output to a file instead of printing to stdout.

# Functional Requirements

- In src/lib/main.js:
  - Detect a global flag --output-file <filePath> in the provided args before any command handling.
  - Remove the --output-file flag and its argument from args and store the file path in a variable outputFile.
  - After executing any command that produces a JSON result (list-sources, fetch-source, transform-to-owl, build-ontologies, query-owl, capital-cities):
    - If outputFile is defined:
      1. Use fs/promises.writeFile to write JSON.stringify(result, null, 2) to outputFile.
      2. On success, exit the process with code 0 and do not call console.log for the result.
      3. On write failure, print the error message to stderr and exit with code 1.
    - If outputFile is not defined:
      1. Print JSON.stringify(result, null, 2) to stdout via console.log.
      2. Exit the process with code 0 as usual.
  - Preserve all existing command behaviors and error paths when --output-file is absent.

# Testing

- In tests/unit/main.test.js:
  1. Unit test that main(args) correctly detects and removes --output-file and returns the remaining args.
  2. Mock fs/promises.writeFile to resolve and verify it is called with the correct file path and formatted JSON data.
  3. Mock fs/promises.writeFile to reject with an error and assert that the error is printed to stderr and process.exit(1) is called.
  4. Integration test example for --list-sources with --output-file: simulate main(["--list-sources","--output-file","out.json"]), stub writeFile, and assert no console.log of data, writeFile called, and exit code 0.
  5. Test missing file path after --output-file: assert stderr prints a descriptive error and exit code 1.

# Documentation

- Update README.md **Usage** section to describe the global --output-file <path> option and show examples for writing command output to a file.
- Optionally update each feature’s docs to note support for the --output-file flag.