# owl-builder

`owl-builder` is a JavaScript library and CLI tool for generating JSON-LD OWL ontology documents from input data. It provides a programmatic API (`generateOntology`) and a command-line interface with subcommands for conversion and data fetching.

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

The CLI entry point is `src/lib/main.js`. It supports commands for diagnostics, conversion, and fetching capital city data.

**Diagnostics**

```bash
node src/lib/main.js --diagnostics
```

Prints runtime environment and dependency information as JSON.

**Convert Subcommand**

Convert a JSON file of term definitions into a JSON-LD OWL ontology document:

```bash
node src/lib/main.js convert \
  --input path/terms.json \
  --ontology-iri http://example.org/onto \
  [--base-iri http://example.org/base] \
  [--output out.json]
```

**Capital-Cities Subcommand**

Fetch capital city data from a public API and generate a JSON-LD OWL ontology document:

```bash
node src/lib/main.js capital-cities \
  --ontology-iri http://example.org/onto \
  [--base-iri http://example.org/base] \
  [--api-endpoint https://restcountries.com/v3.1/all] \
  [--output capitals.json]
```

**Unknown Commands**

```bash
node src/lib/main.js foo --bar baz
# Output: Run with: ["foo","--bar","baz"]
```

## Features

- `generateOntology`: Programmatic API to build JSON-LD OWL ontologies.
- CLI subcommands:
  - `convert`: Convert a JSON file of term definitions into a JSON-LD OWL ontology.
  - `capital-cities`: Fetch capital cities from REST Countries API and generate an ontology.
- Future subcommands (not yet implemented):
  - `list-terms`: List all term identifiers from a JSON-LD ontology file.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Released under the MIT License. See [LICENSE](./LICENSE).
