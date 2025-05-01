docs/USAGE.md
# docs/USAGE.md
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
docs/FEATURES.md
# docs/FEATURES.md
# Features

- **List Sources (`--list-sources`)**: Outputs the list of configured public data sources in JSON format. If a `data-sources.json` file is present with a valid array of `{ name, url }`, it will be merged with the default sources. Invalid or missing configs will fall back to defaults with a warning for invalid configs.
- **Help (`--help`, `-h`)**: Display the help message with usage instructions.
- **Diagnostics (`--diagnostics`)**: Outputs diagnostic information (version, node version, platform, architecture, working directory, uptimeSeconds, memoryUsage, and commands) as pretty-printed JSON, including:
  - **publicDataSources**: Array of configured data sources (merged default and custom from data-sources.json).
  - **healthChecks**: Array of objects with real-time availability and latency metrics for each configured data source.
  - **dataFilesCount**: Number of JSON files in the project `data/` directory (or `0` if directory is missing).
  - **dataFiles**: Sorted list of JSON filenames present in `data/` (or an empty array if none).
  - **intermediateFilesCount**: Number of JSON files in the project `intermediate/` directory (or `0` if directory is missing).
  - **intermediateFiles**: Sorted list of JSON filenames present in `intermediate/` (or an empty array if none).
  - **dependencies**: Object mapping runtime dependency names to their installed versions from `package.json`.
  - **devDependencies**: Object mapping development dependency names to their installed versions from `package.json`.
- **Build Intermediate (`--build-intermediate`)**: Reads JSON files from `data/`, transforms each into OWL JSON-LD intermediate artifacts in `intermediate/`, logs each write, and prints a summary line.
- **Add Source (`--add-source <name> <url>`)**: Add a custom data source to the `data-sources.json` configuration, validating inputs and preventing duplicates. Outputs the merged list of sources in JSON.
- **Remove Source (`--remove-source <identifier>`)**: Remove a custom data source by its name or URL from `data-sources.json`. Outputs the updated merged list of sources in JSON.
- **Update Source (`--update-source <identifier> <newName> <newUrl>`)**: Update the name or URL of an existing custom data source in `data-sources.json`, validating inputs and writing the updated configuration. Outputs the merged list of sources in JSON.
- **Build Enhanced (`--build-enhanced`, alias `-be` [dataDir] [intermediateDir] [outDir])**: Runs the full ontology-building pipeline: refresh sources, build intermediate artifacts, and merge into a single enhanced OWL JSON-LD document. Optionally specify custom input (data), intermediate, and output directories (default: data → intermediate → enhanced). Logs each step and outputs a summary line: `Enhanced ontology written to <outDir>/enhanced.json with <count> nodes`.
- **Capital Cities (`--capital-cities`)**: Queries DBpedia for country-capital pairs and outputs an OWL-compatible JSON-LD document with `@context` and `@graph`.
- **SPARQL Query (`--query`, `-q`)**: Execute SPARQL SELECT or ASK queries on JSON-LD OWL artifacts and output results in SPARQL JSON format. Also available via HTTP GET `/query?file=<path>&sparql=<query>`.
- **HTTP Endpoint for Sources Management:**
  - **GET /sources**: Responds with HTTP 200 and a JSON array of merged default and custom data sources.
  - **POST /sources**: Reads and buffers the request body as JSON with fields `{ name: string, url: string }`. Adds a custom data source via `addSource`, responds with HTTP 201 and the merged list as JSON, or HTTP 400 with a plain-text error on invalid input.
  - **DELETE /sources/:identifier**: Removes a custom data source by name or URL via `removeSource`, responds with HTTP 200 and the merged list as JSON.
  - **PUT /sources/:identifier**: Reads and buffers the request body as JSON with fields `{ name: string, url: string }`. Updates an existing custom data source via `updateSource`, responds with HTTP 200 and the merged list as JSON, or HTTP 400 with a plain-text error on invalid input.
