# repository0-crucible

`repository0-crucible` is a JavaScript library and CLI tool for generating OWL ontologies in JSON-LD format from JSON data. It provides a simple API to convert arbitrary JSON objects into OWL ontology documents and a command-line interface to integrate into data pipelines.

**Prerequisite:** Node.js >= 20

## Installation

Install from npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

- Generate OWL ontology in JSON-LD from JSON data.
- Easy-to-use library API: `generateOntology`.
- CLI support: `--to-owl` and `--ontology-base` flags.
- Standard JSON-LD prefixes (`owl`, `rdf`) automatically included.

## Library API

Import and call `generateOntology`:

```js
import { generateOntology } from "@xn-intenton-z2a/repository0-crucible";

const data = { Person: { name: "Alice" } };
const options = {
  ontologyIri: "http://example.org/onto",
  baseIri: "http://example.org/base", // optional
};

const ontology = await generateOntology(data, options);
console.log(JSON.stringify(ontology, null, 2));
```

### `generateOntology(data, options)`

- `data` (Object): keys are term names, values are term property objects.
- `options.ontologyIri` (String, required): IRI for the ontology.
- `options.baseIri` (String, optional): base IRI for `@base` in the `@context`.
- Returns: `Promise<Object>` resolving to the OWL ontology document in JSON-LD.

## CLI Usage

Read JSON data from stdin and output the ontology to stdout or redirect to a file:

```bash
cat data.json \
  | node src/lib/main.js --to-owl http://example.org/onto --ontology-base http://example.org/base \
  > ontology.json
```

Use `--help` to display available options:

```bash
node src/lib/main.js --help
```

Output:

```
Usage: node main.js [options]
Options:
  --help                  Show this help message.
  --to-owl <ontologyIri>  Generate OWL ontology JSON-LD for the input data.
  --ontology-base <IRI>   Base IRI to include in the @context @base field.
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on reporting issues, submitting changes, and updating documentation.

## License

Released under the MIT License. See [LICENSE](./LICENSE) for details.
