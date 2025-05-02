# Usage Guide

This guide explains how to use the owl-builder library API and CLI tool.

---

## Library Usage

Use the `generateOntology` function to build a JSON-LD OWL ontology document from a JavaScript object.

```js
import { generateOntology } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const data = {
    TermA: { description: 'An example term' },
    TermB: { relatedTo: 'TermA' },
  };
  const options = {
    ontologyIri: 'http://example.com/ontology',
    baseIri:     'http://example.com/base',
  };
  try {
    const ontology = await generateOntology(data, options);
    console.log(JSON.stringify(ontology, null, 2));
  } catch (err) {
    console.error('Error generating ontology:', err.message);
  }
})();
```

### Options

- `ontologyIri` (string, required): The root IRI for the ontology document.
- `baseIri` (string, optional): Base IRI for term identifiers in the context.

---

## CLI Usage

The command-line entrypoint is `src/lib/main.js`. It supports diagnostics, conversion, capital-cities, list-terms, get-term, and filter subcommands.

```bash
# Show diagnostics information:
node src/lib/main.js --diagnostics

# Convert a JSON file of term definitions into a JSON-LD OWL ontology document:
node src/lib/main.js convert \
  --input path/terms.json \
  --ontology-iri http://example.org/onto \
  [--base-iri http://example.org/base] \
  [--output out.json]

# Fetch capital city data and generate an ontology:
node src/lib/main.js capital-cities \
  --ontology-iri http://example.org/onto \
  [--base-iri http://example.org/base] \
  [--api-endpoint https://restcountries.com/v3.1/all] \
  [--output capitals.json]

# List all term identifiers from an ontology file:
node src/lib/main.js list-terms \
  --input path/ontology.json

# Retrieve a single term node from an ontology file:
node src/lib/main.js get-term \
  --input path/ontology.json \
  --term TermName \
  [--output out.json]

# Filter ontology nodes by property and value:
node src/lib/main.js filter \
  --input path/ontology.json \
  --property PropertyName \
  --value Value \
  [--output out.json]
```

---

### Filter Subcommand

Filter ontology nodes by a specified property and value, producing a JSON-LD fragment.

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

The command outputs a JSON array of matching nodes, either to stdout or to the specified file. It always exits 0 on success, even if no nodes match (empty array).