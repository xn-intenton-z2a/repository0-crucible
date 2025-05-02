# owl-builder

`owl-builder` is a JavaScript library and CLI tool for generating JSON-LD OWL ontology documents from input data. It provides a programmatic API (`generateOntology`) and a command-line interface stub for future subcommands.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Library API

Import the `generateOntology` function:

```js
import { generateOntology } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const data = {
    Person: { name: 'Alice' },
    City:   { population: 100000 },
  };
  const options = {
    ontologyIri: 'http://example.org/ontology',
    baseIri:     'http://example.org/base',
  };
  const ontology = await generateOntology(data, options);
  console.log(JSON.stringify(ontology, null, 2));
})();
```

### `generateOntology(data, options)`

- `data` (object): Keys are term names; values are term properties.
- `options` (object):
  - `ontologyIri` (string, required): IRI for the ontology root.
  - `baseIri` (string, optional): Base IRI for relative term IRIs.
- Returns: Promise resolving to a JSON-LD OWL ontology document.

## Command-Line Interface

The CLI entry point is `src/lib/main.js`. Currently, it logs the parsed arguments:

```bash
node src/lib/main.js [subcommand] [options]
# Example:
node src/lib/main.js foo --bar baz
# Output: Run with: ["foo","--bar","baz"]
```

## Features

- `generateOntology`: Programmatic API to build JSON-LD OWL ontologies.
- CLI stub for subcommands (future enhancement).
- Planned subcommands (not yet implemented):
  - `convert`: Convert a JSON file of term definitions into an ontology.
  - `capital-cities`: Fetch capital cities from REST Countries API and build an ontology.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Released under the MIT License. See [LICENSE](./LICENSE).
