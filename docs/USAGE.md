# Usage Guide

This document covers both CLI and programmatic usage for `repository0-crucible`.

## CLI Usage

The tool logs any arguments you pass and prints them as a JSON array or emits specialized output for certain flags.

### Commands

- `npm run start` or `node src/lib/main.js`
  - Runs with no arguments: logs `Run with: []`.
- `npm run start -- [args...]` or `node src/lib/main.js [args...]`
  - Pass any arguments after `--` (npm) or directly (node) to see them logged.
- `node src/lib/main.js --capital-cities`
  - Generates and emits a JSON-LD OWL ontology of world capital cities.

#### Examples

```bash
# No arguments
npm run start
# => Run with: []

# Passing arguments
npm run start -- alpha beta gamma
# => Run with: ["alpha","beta","gamma"]

# Capital Cities Ontology
node src/lib/main.js --capital-cities
# => {
#     "@context": {
#       "@vocab": "http://example.org/ontology#",
#       "owl": "http://www.w3.org/2002/07/owl#",
#       "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
#       "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
#       "xsd": "http://www.w3.org/2001/XMLSchema#"
#     },
#     "@graph": [
#       { "@id": "Country", "@type": "owl:Class" },
#       { "@id": "hasCapital", "@type": "rdf:Property" },
#       { "@id": "France", "@type": "Country", "hasCapital": "Paris" },
#       { "@id": "Germany", "@type": "Country", "hasCapital": "Berlin" },
#       { "@id": "Italy", "@type": "Country", "hasCapital": "Rome" }
#     ]
#   }
```

## Programmatic API

You can import and invoke the main function in your own code:

```js
import { main } from '@xn-intenton-z2a/repository0-crucible';

// Pass an array of strings; output will be logged to console
main(['foo', 'bar']);
```

### Parameters

- `args: string[]` — Array of command-line arguments to log or flags to trigger special behavior.

### Behavior

- Without special flags, the `main` function logs: `Run with: ${JSON.stringify(args)}`.
- With `--capital-cities`, it logs a pretty-printed JSON-LD OWL ontology of countries and capitals.

## Next Steps

Refer to the [Incremental Changes Plan](./README.md#incremental-changes-plan) for upcoming enhancements and features in this library.
