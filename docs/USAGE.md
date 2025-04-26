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
    "url": "https://example.com/api"
  }
]
```

Invalid configurations will log a warning and show only default sources.

## Help

Use the `--help` or `-h` flag to display usage instructions and available options:

```bash
node src/lib/main.js --help
```

Example output:

```text
owl-builder: create and manage OWL ontologies from public data sources
Usage: node src/lib/main.js [options]

  --help                Display this help message
  --diagnostics         Show diagnostic information
  --serve               Start the local HTTP server
  --build-intermediate  Generate intermediate ontology artifacts
  --build-enhanced      Generate enhanced ontology artifacts
  --refresh             Fetch and persist all data sources
  --merge-persist       Merge and persist data to storage
  --list-sources        List public (and custom) data sources
  --capital-cities      Query DBpedia for capital cities and output JSON-LD
```

## Diagnostics

Use the `--diagnostics` flag to display environment and configuration diagnostics:

```bash
node src/lib/main.js --diagnostics
```

Sample output:

```json
{
  "version": "1.2.0-0",
  "nodeVersion": "v20.0.0",
  "platform": "linux",
  "arch": "x64",
  "cwd": "/path/to/your/project",
  "publicDataSources": [
    {
      "name": "DBpedia SPARQL",
      "url": "https://dbpedia.org/sparql"
    }
  ],
  "commands": [
    "--help",
    "-h",
    "--list-sources",
    "--diagnostics",
    "--serve",
    "--build-intermediate",
    "--build-enhanced",
    "--refresh",
    "--merge-persist",
    "--capital-cities"
  ]
}
```

## Serve

Start a local HTTP server to expose endpoints for help, sources, diagnostics, and capital cities:

```bash
node src/lib/main.js --serve
```

Example output:

```text
Server running at http://localhost:3000/
```

You can then request:

```bash
curl http://localhost:3000/help
curl http://localhost:3000/sources
curl http://localhost:3000/diagnostics
curl http://localhost:3000/capital-cities
```

Example response for capital cities:

```json
{
  "@context": {
    "@vocab": "http://www.w3.org/2002/07/owl#"
  },
  "@graph": [
    {
      "@id": "http://example.org/c1",
      "capital": "http://example.org/cap1"
    },
    {
      "@id": "http://example.org/c2",
      "capital": "http://example.org/cap2"
    }
  ]
}
```

## Refresh

Use the `--refresh` flag to fetch and persist data from all configured public and custom sources into the `data/` directory:

```bash
node src/lib/main.js --refresh
```

Sample output:

```
written dbpedia-sparql.json
written custom-api.json
Refreshed 2 sources into data/
```

## Programmatic API

You can use the `listSources` function in your code to retrieve the configured data sources:

```js
import { listSources } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const sources = await listSources();
  console.log(sources);
})();
```

Optionally, specify a custom config path:

```js
const sources = await listSources('/path/to/data-sources.json');
```