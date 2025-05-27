# Summary
Implement a new CLI flag --query-owl and a programmatic API queryOntology to allow users to load an OWL ontology JSON file and execute ESJ-like queries against its @graph. This feature enables interactive filtering and extraction of ontology individuals without custom code.

# Functional Requirements

- In src/lib/main.js:
  - Import the file system promises API: import { readFile } from 'fs/promises'.
  - Export a function queryOntology(ontology: any, expression: string): any[] that:
    - Accepts an ontology object with an @graph array and a simple expression string (e.g. "item.property === 'value'").
    - Iterates over ontology['@graph'], binding each element to a local variable named item.
    - Uses the Function constructor to evaluate the expression against each item, returning an array of items for which the expression is truthy.
    - Throws a descriptive error if the expression is invalid.
  - Extend the main(args) entrypoint to detect:
    - --query-owl <filePath>
    - --query <expression>
  - Workflow for the flags:
    1. Validate that both flags and their values are provided; if missing, print an error to stderr and exit code 1.
    2. Read the JSON file at filePath, parse it into an object.
    3. Call queryOntology(parsed, expression).
    4. Print JSON.stringify(results, null, 2) to stdout and exit code 0.
    5. On any file or parse error, or invalid expression, print the error message to stderr and exit code 1.
  - Preserve behavior for existing flags (--list-sources, --fetch-source, --transform-to-owl, --capital-cities).

# API

- queryOntology(ontology: any, expression: string): any[] — Evaluate a simple ESJ-like expression against each individual in an OWL JSON ontology and return matching items.
- main(args: string[]): Promise<void> — Extended to support the new --query-owl and --query flags.

# CLI Usage

```bash
# Query an OWL JSON file for individuals matching a condition
npm run start -- --query-owl path/to/ontology.json --query "item.population > 1000000"
```

# Sample Output

```json
[
  { "@id": "http://example.org/ontology#XYZ", "name": "CityA", "population": 1500000 }
]
```

# Testing

- In tests/unit/main.test.js:
  - **Unit tests for queryOntology**:
    1. Provide a sample ontology object with an @graph array of objects.
    2. Call queryOntology(sample, "item.key === 'value'") and assert it returns expected items.
    3. Test that invalid expressions throw an error with a clear message.
  - **CLI integration tests**:
    1. Stub readFile to return a JSON string of a sample ontology.
    2. Spy on console.log and process.exit; call await main(["--query-owl", "file.json", "--query", "item.id === '1'"]); assert correct JSON and exit code 0.
    3. Test missing file path or expression scenarios: spy console.error and process.exit; assert exit code 1.

# Documentation

- Update README.md:
  - Under **Features**, add **Query OWL** section describing the new flag and API.
  - Under **Usage**, include the CLI example and sample output.
- Create docs/OWL_QUERY.md mirroring the README guidance with full details and examples.