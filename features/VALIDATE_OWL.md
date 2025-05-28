# Summary
Provide a CLI flag `--validate-owl` and a programmatic API `validateOwl(ontology)` to verify that an OWL JSON ontology file conforms to the required structure and report any validation errors.

# Functional Requirements

- In `src/lib/main.js`:
  - Export a function `validateOwl(ontology: any): { valid: boolean; errors: string[] }` that:
    - Checks that the ontology object has an `@context` key mapping to an object with an `@vocab` string.
    - Checks that the ontology object has an `@graph` array.
    - For each element in `@graph`, verifies an `@id` property of type string exists.
    - Collects descriptive error messages for any missing or invalid fields and returns an object with `valid: errors.length === 0` and the `errors` array.
  - Extend the `main(args: string[])` entrypoint to detect the flag `--validate-owl <filePath>`:
    1. If `<filePath>` is missing, print `Error: File path required for --validate-owl` to stderr and exit with code `1`.
    2. Read the file at the given path using `fs/promises.readFile`, parse it as JSON.
    3. Call `validateOwl(parsed)`.
    4. If `valid` is `true`, print `Validation successful` to stdout and exit with code `0`.
    5. If `valid` is `false`, print `JSON.stringify(errors, null, 2)` to stderr and exit with code `1`.
  - Preserve existing behavior for all other CLI flags.

# API

- `validateOwl(ontology: any): { valid: boolean; errors: string[] }` — Validates the OWL JSON structure and returns a summary of validity and errors.

# CLI Usage

```bash
node src/lib/main.js --validate-owl path/to/ontology.json
```

- **Successful Validation:**

  ```bash
  # Prints:
  Validation successful
  ```

- **Validation Errors:**

  ```bash
  # Prints JSON array of error messages to stderr and exits with code 1.
  ```

# Testing

- **Unit Tests** (in `tests/unit/main.test.js`):
  - Provide a sample valid ontology object and assert `validateOwl` returns `{ valid: true, errors: [] }`.
  - Provide sample invalid objects (missing `@context`, missing `@graph`, missing `@id`) and assert the errors array contains descriptive messages.

- **CLI Integration Tests**:
  - Stub `fs/promises.readFile` to return valid and invalid JSON strings.
  - Spy on `console.log`, `console.error`, and `process.exit`:
    - Valid file: call `await main(["--validate-owl", filePath])`; assert `Validation successful` printed and exit code `0`.
    - Invalid file: assert errors printed to stderr and exit code `1`.
    - Missing path: assert error message and exit code `1`.

# Documentation

- Update `README.md`:
  - Under **Features**, add **Validate OWL** section with a brief summary.
  - Under **Usage**, add the `--validate-owl` example and expected outputs.

- Create `docs/VALIDATE_OWL.md` mirroring README details, with API reference, CLI examples, and sample outputs.