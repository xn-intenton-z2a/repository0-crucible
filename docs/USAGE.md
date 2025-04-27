# Usage

## Listing Available Data Sources

Use the `--list-sources` flag to output the configured public data sources as a JSON array:

```bash
node src/lib/main.js --list-sources
```

Output:

```json
[
  {
    "name": "DBpedia SPARQL",
    "url": "https://dbpedia.org/sparql"
  }
]
```

## Custom Configuration

You can define additional data sources by creating a `data-sources.json` file in the project root:

```json
[
  { "name": "Custom API", "url": "https://example.com/api" }
]
```

When running with `--list-sources`, the output will include both default and custom sources:

```bash
node src/lib/main.js --list-sources
```

```json
[
  {
    "name": "DBpedia SPARQL",
    "url": "https://dbpedia.org/sparql"
  },
  {
    "name": "Custom API",
    "url": "https://example.com/api" }
]
```

Invalid configurations will log a warning and show only default sources.

## SPARQL Query

Use the `--query` flag to execute a SPARQL query on a JSON-LD OWL artifact:

```bash
node src/lib/main.js --query artifact.json "SELECT ?s WHERE { ?s a <http://www.w3.org/2002/07/owl#Class> } LIMIT 5"
```

### Programmatic

```js
import { sparqlQuery } from 'owl-builder';
(async () => {
  const results = await sparqlQuery(
    'artifact.json',
    'SELECT ?s WHERE { ?s a <http://www.w3.org/2002/07/owl#Class> } LIMIT 5'
  );
  console.log(JSON.stringify(results, null, 2));
})();
```

### Example Output

```json
{
  "head": { "vars": ["s"] },
  "results": {
    "bindings": [
      { "s": { "type": "uri", "value": "http://example.org/SomeClass" } }
    ]
  }
}
```

## Help

Use the `--help` or `-h` flag to display usage instructions and available options:

```bash
node src/lib/main.js --help
```

## Diagnostics

Use the `--diagnostics` flag to display environment and configuration diagnostics:

```bash
node src/lib/main.js --diagnostics
```

## Build Intermediate

### CLI Usage

Use the `--build-intermediate` flag with optional path arguments to specify input and output directories:

- **Default Invocation** (no paths):
  ```bash
  node src/lib/main.js --build-intermediate
  ```
  Reads from `./data` and writes to `./intermediate`.

- **Custom Input Directory** (one path):
  ```bash
  node src/lib/main.js --build-intermediate custom-data
  ```
  Reads from `./custom-data` and writes to `./intermediate`.

- **Custom Input and Output Directories** (two paths):
  ```bash
  node src/lib/main.js --build-intermediate custom-data custom-out
  ```
  Reads from `./custom-data` and writes to `./custom-out`.

Example output:

```text
written sample-intermediate.json
Generated 1 intermediate artifacts into intermediate/
```

## Build Enhanced

Use the `--build-enhanced` (or `-be`) flag to run the full ontology-building pipeline: refresh sources, build intermediate artifacts, and merge into a single enhanced OWL JSON-LD document.

```bash
node src/lib/main.js --build-enhanced
```

Example output:
```text
written ds.json
written sample-intermediate.json
written enhanced.json
Enhanced ontology written to enhanced/enhanced.json with 3 nodes
```

## Capital Cities

### CLI

Use the `--capital-cities` flag to fetch country–capital pairs from DBpedia and output an OWL JSON-LD document:

```bash
node src/lib/main.js --capital-cities
```

Example output:
```json
{
  "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
  "@graph": [
    { "@id": "http://example.org/C", "capital": "http://example.org/K" }
  ]
}
```

### Programmatic

```js
import { getCapitalCities } from 'owl-builder';
(async () => {
  const doc = await getCapitalCities();
  console.log(JSON.stringify(doc, null, 2));
})();
```