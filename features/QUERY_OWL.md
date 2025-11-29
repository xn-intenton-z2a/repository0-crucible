# Summary
Add a CLI flag --query-owl and a programmatic API queryOntology to allow users to load an OWL ontology JSON file and execute ESJ-like expressions against its @graph. This feature enables interactive filtering and extraction of ontology individuals without writing custom code.

# Functional Requirements

In src/lib/main.js:

- Export function queryOntology(ontology: any, expression: string): any[] that:
  - Verifies the ontology object has an @graph array.
  - Uses a safe Function constructor new Function('item', `return ${expression}`) to evaluate the expression against each item in @graph.
  - Returns an array of items for which the expression returns truthy.
  - Throws a descriptive error if the expression is invalid or @graph is missing.

- Extend the main(args) entrypoint to detect:
  - --query-owl <filePath>
  - --query <expression>

- CLI Workflow:
  1. Validate both flags and their values are provided; if missing, print an error to stderr and exit code 1.
  2. Read the JSON file at filePath with fs/promises.readFile and parse it.
  3. Call queryOntology(parsed, expression).
  4. Print JSON.stringify(results, null, 2) to stdout and exit code 0.
  5. Catch file, parse, or evaluation errors, print error.message to stderr, and exit code 1.

- Preserve existing flags (--list-sources, --fetch-source, --transform-to-owl, --build-ontologies, --capital-cities, --serve, --help, etc.) and default behavior.
