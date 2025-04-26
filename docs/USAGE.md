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
