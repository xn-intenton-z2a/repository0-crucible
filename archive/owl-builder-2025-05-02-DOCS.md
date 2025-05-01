docs/ontology-generation.md
# docs/ontology-generation.md
# Ontology Generation

This feature enables generating OWL ontologies in JSON-LD format from arbitrary JSON data.

## Library Usage

```js
import { generateOntology } from 'repository0-crucible';
const owl = await generateOntology(
  { Person: { name: 'Alice' } },
  { ontologyIri: 'http://example.org/onto', baseIri: 'http://example.org/base' }
);
console.log(JSON.stringify(owl, null, 2));
```

## CLI Usage

Generate an ontology and write to a file:

```bash
cat data.json | node src/lib/main.js \
  --to-owl http://example.org/onto \
  --ontology-base http://example.org/base > ontology.json
```

Use `--help` to see command options:

```bash
node src/lib/main.js --help
```