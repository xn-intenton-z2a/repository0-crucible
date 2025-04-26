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
  --refresh             Refresh source data
  --merge-persist       Merge and persist data to storage
  --list-sources        List public (and custom) data sources
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
    "--merge-persist"
  ]
}
```

## Serve

Start a local HTTP server to expose endpoints for sources and diagnostics:

```bash
node src/lib/main.js --serve
```

Example output:

```text
Server running at http://localhost:8080/
```

You can then request:

```bash
curl http://localhost:8080/sources
curl http://localhost:8080/diagnostics
```