# Summary
Add a CLI flag --query-owl and a programmatic API queryOntology to load an OWL JSON file and execute simple ESJ-like expressions against its @graph.

# Functional Requirements

## API
Export function queryOntology(ontology: any, expression: string): any[]:
- Ensure ontology has @graph array.
- Evaluate the expression against each item using a safe Function constructor: new Function('item', `return ${expression}`).
- Return an array of items for which the expression returns true.
- Throw Error if expression evaluation fails or ontology lacks @graph.

## CLI
Extend main(args: string[]) to handle:
- --query-owl <filePath>
- --query <expression>

Behavior:
1. When both flags are present, read the file at filePath with fs/promises.readFile and parse JSON.
2. Call queryOntology(parsed, expression).
3. Print JSON.stringify(results, null, 2) to stdout and exit with code 0.
4. If flags or values are missing, print descriptive error to stderr and exit code 1.
5. Catch file or parse errors and expression errors, print error.message to stderr and exit code 1.
Preserve existing flags (--list-sources, --fetch-source, --transform-to-owl, --build-ontologies, --capital-cities, --serve).

# Testing

## Unit Tests
- Provide sample ontology object with @graph; assert queryOntology returns correct filtered array.
- Test invalid expression or missing @graph leads to Error.

## CLI Integration Tests
- Stub fs/promises.readFile to return a sample JSON string.
- Spy on console.log and process.exit; run main(["--query-owl","file.json","--query","item.id==='1'"]); assert correct output and exit code 0.
- Test missing flags, missing file, invalid expression: spy console.error and process.exit, assert exit code 1.