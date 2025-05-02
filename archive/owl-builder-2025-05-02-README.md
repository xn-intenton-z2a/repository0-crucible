# owl-builder

`owl-builder` is a JavaScript library and CLI tool for generating JSON-LD OWL ontology documents from input data. It provides a programmatic API (`generateOntology`) and a command-line interface with subcommands for diagnostics, conversion, data fetching, and ontology inspection.

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

The CLI entry point is `src/lib/main.js`. It supports the following commands and subcommands:

**Diagnostics**

Print runtime environment and dependency information as JSON:
```bash
node src/lib/main.js --diagnostics
```

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

**List-Terms Subcommand**

List all term identifiers from a JSON-LD ontology file:
```bash
node src/lib/main.js list-terms \
  --input path/ontology.json
```

Options:
- `--input` (string, required): Path to the JSON-LD ontology file.

The command prints each term IRI on a separate line to stdout.

**Get-Term Subcommand**

Retrieve a single term node from a JSON-LD ontology file by term name:
```bash
node src/lib/main.js get-term \
  --input path/ontology.json \
  --term TermName \
  [--output out.json]
```

Options:
- `--input` (string, required): Path to the JSON-LD ontology file.
- `--term` (string, required): Local term name to retrieve.
- `--output` (string, optional): Path to write the term node JSON. If omitted, prints to stdout.

The command outputs the JSON object for the requested term node, either to stdout or to the specified file.

**Filter Subcommand**

Filter ontology nodes by a specified property and value, producing a JSON-LD fragment:
```bash
node src/lib/main.js filter \
  --input path/ontology.json \
  --property PropertyName \
  --value Value \
  [--output out.json]
```

Options:
- `--input` (string, required): Path to the JSON-LD ontology file.
- `--property` (string, required): Node property to filter by.
- `--value` (string, required): Value to match.
- `--output` (string, optional): Path to write the output JSON fragment. If omitted, prints to stdout.

The command outputs a JSON array of matching nodes, either to stdout or to the specified file.

**Unknown Commands**

Any unrecognized subcommand or flag combination will be echoed back:
```bash
node src/lib/main.js foo --bar baz
# Output: Run with: ["foo","--bar","baz"]
```

## Features

- Programmatic API:
  - `generateOntology`: Build JSON-LD OWL ontology documents from JavaScript objects.
- CLI Subcommands:
  - `--diagnostics`: Print environment and dependency information.
  - `convert`: Convert a JSON file of term definitions into an OWL ontology.
  - `capital-cities`: Fetch capital cities from REST Countries API and generate an ontology.
  - `list-terms`: List term identifiers from a JSON-LD ontology file.
  - `get-term`: Retrieve a specific term node by local name.
  - `filter`: Filter ontology nodes by property and value, producing a JSON-LD fragment.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Released under the MIT License. See [LICENSE](./LICENSE).