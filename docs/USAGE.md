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

## Manage Sources (HTTP)

### Add Source

```bash
curl -X POST http://localhost:3000/sources \
  -H 'Content-Type: application/json' \
  -d '{"name":"Custom API","url":"https://example.com/api"}'
```

Response:

```http
HTTP/1.1 201 Created
Content-Type: application/json

[
  { "name": "DBpedia SPARQL", "url": "https://dbpedia.org/sparql" },
  { "name": "Custom API", "url": "https://example.com/api" }
]
```

### Remove Source

```bash
curl -X DELETE http://localhost:3000/sources/Custom%20API
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  { "name": "DBpedia SPARQL", "url": "https://dbpedia.org/sparql" }
]
```

## SPARQL Query

... (rest unchanged) ...`,