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

The command-line entrypoint is `src/lib/main.js`. It supports printing diagnostics and will serve as the base for future subcommands.

```bash
# Show diagnostics information:
node src/lib/main.js --diagnostics

# Run a command stub:
node src/lib/main.js example --key value
# Output:
# Run with: ["example","--key","value"]
```

---

## Diagnostics Mode

Use the `--diagnostics` flag to print runtime environment and dependency information as JSON:

```bash
node src/lib/main.js --diagnostics
```

The output includes:

- `packageVersion`: the version of the owl-builder package.
- `nodeVersion`: the current Node.js version.
- `platform`: the operating system platform.
- `dependencies`: an object listing direct dependencies and their versions.

Example output:

```json
{
  "packageVersion": "1.2.0-0",
  "nodeVersion": "v20.4.1",
  "platform": "linux",
  "dependencies": {
    "openai": "^4.96.2",
    "dotenv": "^16.5.0",
    // ... other dependencies
  }
}
```

---

### Future Subcommands

- `convert`: Convert a JSON file of term definitions into a JSON-LD OWL ontology document.
- `capital-cities`: Fetch capital cities from a public API and generate an ontology.

Contributions to implement and enhance these commands are welcome!