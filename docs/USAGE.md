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

## Add Source (CLI)

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

## Remove Source (CLI)

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

## Update Source (CLI)

Use the `--update-source` flag to update the name or URL of an existing custom data source.

```bash
node src/lib/main.js --update-source "OldName" "NewName" "https://new.url/api"
```

Output:

```json
[
  {
    "name": "DBpedia SPARQL",
    "url": "https://dbpedia.org/sparql"
  },
  {
    "name": "NewName",
    "url": "https://new.url/api"
  }
]
```

## Build Intermediate (CLI)

Reads JSON files from `data/`, transforms each into OWL JSON-LD intermediate artifacts in `intermediate/`, logs each write, and prints a summary line.

```bash
node src/lib/main.js --build-intermediate
```

```text
written sample-intermediate.json
Generated 1 intermediate artifacts into intermediate/
```

## Build Enhanced (CLI)

Runs the full ontology-building pipeline: refresh → intermediate → enhanced.

Default invocation:
```bash
node src/lib/main.js --build-enhanced
```

Custom directories:
```bash
node src/lib/main.js --build-enhanced data1 int1 out1
```

## Manage Sources (HTTP)

### List Sources

Retrieve the merged list of default and custom data sources:

```bash
curl http://localhost:3000/sources
```

Response:

```json
[
  {
    "name": "DBpedia SPARQL",
    "url": "https://dbpedia.org/sparql"
  }
]
```

### Add Source

Add a custom data source:

```bash
curl -X POST http://localhost:3000/sources \
  -H 'Content-Type: application/json' \
  -d '{"name":"Custom API","url":"https://example.com/api"}'
```

Response (201 Created):
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

### Delete Source

Remove a custom data source by name or URL:

```bash
curl -X DELETE http://localhost:3000/sources/Custom%20API
```

Response (200 OK):
```json
[
  {
    "name": "DBpedia SPARQL",
    "url": "https://dbpedia.org/sparql"
  }
]
```

### Update Source

Update an existing custom data source:

```bash
curl -X PUT http://localhost:3000/sources/Custom%20API \
  -H 'Content-Type: application/json' \
  -d '{"name":"NewName","url":"https://new.url"}'
```

Response (200 OK):
```json
[
  {
    "name": "DBpedia SPARQL",
    "url": "https://dbpedia.org/sparql"
  },
  {
    "name": "NewName",
    "url": "https://new.url"
  }
]
```
