# Ontology CLI

## Overview

The `--ontology <input.json>` flag transforms a JSON array file into a simple OWL-like ontology in JSON format, then exits.

## Usage

```bash
node src/lib/main.js --ontology input.json
node src/lib/main.js --ontology input.json --output output.json
```

## Behavior

- Reads and parses the specified JSON file, which must contain an array of objects.
- Each object becomes an individual in the ontology. Objects without a `type` property receive a default `type` of `Individual`.
- The output JSON includes:
  ```json
  {
    "ontologyVersion": "<version from package.json>",
    "individuals": [ /* transformed records */ ]
  }
  ```
- If `--output <path>` is provided, the result is written to the given file. Otherwise, it is printed to stdout.
- On missing or invalid input, the CLI reports an error and exits with a non-zero code.

## Sample Input (data.json)
```json
[
  { "name": "Alice", "age": 30 },
  { "type": "Person", "name": "Bob", "age": 25 }
]
```

## Sample Output
```json
{
  "ontologyVersion": "1.2.0-0",
  "individuals": [
    {
      "name": "Alice",
      "age": 30,
      "type": "Individual"
    },
    {
      "type": "Person",
      "name": "Bob",
      "age": 25
    }
  ]
}
```