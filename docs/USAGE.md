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

Use the `--diagnostics` flag to display environment and configuration diagnostics, including live health checks for each data source:

```bash
node src/lib/main.js --diagnostics
```

## Serve

Start a local HTTP server to expose endpoints for help, sources, diagnostics, capital cities, refresh, and build intermediate:

```bash
node src/lib/main.js --serve
```

Example usage:

```bash
curl http://localhost:3000/help
curl http://localhost:3000/sources
curl http://localhost:3000/diagnostics
curl http://localhost:3000/capital-cities
curl http://localhost:3000/refresh
curl http://localhost:3000/build-intermediate
```

## Refresh

Use the `--refresh` flag to fetch and persist data from all configured public and custom sources into the `data/` directory:

```bash
node src/lib/main.js --refresh
```

## Build Intermediate

Use the `--build-intermediate` flag to transform existing JSON data into OWL JSON-LD intermediate artifacts:

```bash
node src/lib/main.js --build-intermediate
```

Example output:

```text
written example-intermediate.json
Generated 1 intermediate artifacts into intermediate/
```