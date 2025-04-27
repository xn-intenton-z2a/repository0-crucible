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

## Add Source

Use the `--add-source` flag to add a custom data source to the configuration file. Duplicate names or URLs are ignored.

```bash
node src/lib/main.js --add-source "Custom API" "https://example.com/api"
```

Output:

```json
[
  {
    "name": "DBpedia SPARQL",
    "url": "https://dbpedia.org/sparql"
  },
  {
    "name": "Custom API",
    "url": "https://example.com/api"
  }
]
```

## Remove Source

Use the `--remove-source` flag to remove a custom data source by its name or URL.

```bash
node src/lib/main.js --remove-source "Custom API"
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

### HTTP Query Endpoint

When running the HTTP server (`--serve`), you can query the server directly over HTTP:

```bash
curl "http://localhost:3000/query?file=artifact.json&sparql=SELECT%20%3Fs%20WHERE%20%7B%20%3Fs%20a%20%3Chttp://www.w3.org/2002/07/owl%23Class%3E%20%7D%20LIMIT%201"
```

Response (application/json):

```json
{
  "head": { "vars": ["s"] },
  "results": {
    "bindings": [
      {
        "s": { "type": "uri", "value": "http://example.org/SomeClass" }
      }
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