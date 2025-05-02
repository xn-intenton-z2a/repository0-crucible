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

The command-line entrypoint is `src/lib/main.js`. Currently it prints out the parsed CLI arguments for debugging.

```bash
# Show help (not yet implemented, placeholder)
node src/lib/main.js --help

# Run a command stub:
node src/lib/main.js example --key value
# Output:
# Run with: ["example","--key","value"]
```

### Future Subcommands

- `convert`: Convert a JSON file of term definitions into a JSON-LD OWL ontology document.
- `capital-cities`: Fetch capital cities from a public API and generate an ontology.

Contributions to implement and enhance these commands are welcome!