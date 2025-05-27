# Summary
Implement a new CLI flag --validate-owl and a programmatic API function validateOwl to verify that an OWL JSON ontology file conforms to required structure and report any validation errors.

# Functional Requirements

- In src/lib/main.js:
  - Export a function validateOwl(ontology: any): { valid: boolean; errors: string[] } that:
    - Verifies the object has an @context key mapping to an object with an @vocab string.
    - Verifies there is an @graph array of objects.
    - For each element in @graph, checks presence of @id property of type string.
    - Collects messages for any missing or invalid parts into an errors array.
    - Returns { valid: errors.length === 0, errors }.
  - In the main(args) entrypoint, detect the flag --validate-owl followed by a file path:
    - If missing file path, print "Error: File path required for --validate-owl" to stderr and exit code 1.
    - Read the file via fs/promises.readFile, parse JSON.
    - Call validateOwl(parsed).
    - If valid, print "Validation successful" and exit code 0.
    - If invalid, print JSON.stringify(errors, null, 2) to stderr and exit code 1.
  - Ensure existing flags and behavior remain unchanged.

# CLI Usage

```bash
npm run start -- --validate-owl path/to/ontology.json
```

# API

```js
import { validateOwl } from '@xn-intenton-z2a/repository0-crucible';

const ontology = JSON.parse(fs.readFileSync('ontology.json', 'utf-8'));
const result = validateOwl(ontology);
console.log(result);
```

# Testing

- **Unit Tests** in tests/unit/main.test.js:
  - Provide a sample valid ontology object and assert validateOwl returns { valid: true, errors: [] }.
  - Provide sample invalid objects (missing @context, missing @graph, missing @id) and assert errors array contains descriptive messages.
- **CLI Integration Tests**:
  - Stub fs/promises.readFile to return valid and invalid JSON content.
  - Spy on console.log, console.error, and process.exit.
  - Invoke await main(["--validate-owl", filePath]) and assert correct output, exit codes, and error printing.

# Documentation

- Update README.md:
  - Under **Features**, add **Validate OWL** with a brief description.
  - Under **Usage**, include an example invocation and sample output for both valid and invalid cases.
- Create docs/VALIDATE_OWL.md mirroring README details with full API reference, CLI examples, and validation rules.
