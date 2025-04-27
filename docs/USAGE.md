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

Use the `--query` flag to execute a SPARQL query on an OWL JSON-LD artifact:

```bash
node src/lib/main.js --query <filePath> "<SPARQL query>"
```

Example:

```bash
node src/lib/main.js --query data/sample.jsonld "SELECT ?s WHERE { ?s ?p ?o } LIMIT 1"
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

Use the `--build-intermediate` flag to read JSON files from `data/`, generate OWL JSON-LD intermediate artifacts, and write them to the `intermediate/` directory.

```bash
node src/lib/main.js --build-intermediate
```

Example output:

```text
written sample-intermediate.json
Generated 1 intermediate artifacts into intermediate/
```

## Serve

Start a local HTTP server to expose REST endpoints:

```bash
node src/lib/main.js --serve
```

By default it listens on port `3000`, or an OS-assigned port if `PORT=0` is set.

### Available Endpoints

1. GET `/help`
   - Status: `200 OK`
   - Headers: `Content-Type: text/plain`
   - Body snippet:
     ```text
     owl-builder: create and manage OWL ontologies from public data sources
     Usage: node src/lib/main.js [options]
     ...
     ```

2. GET `/sources`
   - Status: `200 OK`
   - Headers: `Content-Type: application/json`
   - Body example:
     ```json
     [
       {
         "name": "DBpedia SPARQL",
         "url": "https://dbpedia.org/sparql"
       }
     ]
     ```

3. GET `/diagnostics`
   - Status: `200 OK`
   - Headers: `Content-Type: application/json`
   - Body example:
     ```json
     {
       "version": "1.2.0-0",
       "nodeVersion": "v20.x.x",
       "platform": "linux",
       "arch": "x64",
       "cwd": "/path/to/project",
       "publicDataSources": [...],
       "commands": [...],
       "healthChecks": [ ... ]
     }
     ```

4. GET `/capital-cities`
   - Status: `200 OK`
   - Headers: `Content-Type: application/json`
   - Body example:
     ```json
     {
       "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
       "@graph": [
         {
           "@id": "http://example.org/C",
           "capital": "http://example.org/K"
         }
       ]
     }
     ```

5. GET `/query?file=<path>&query=<sparql>`
   - Status: `200 OK`
   - Headers: `Content-Type: application/json`
   - Body: SPARQL Results JSON for the given file and query
   - Missing parameters: returns `400 Bad Request` with plain-text error
   - File not found: returns `404 Not Found`
   - Query error: returns `500 Internal Server Error` with plain-text message

6. GET `/refresh`
   - Status: `200 OK`
   - Headers: `Content-Type: text/plain`
   - Body snippet:
     ```text
     written <source1>.json
     written <source2>.json
     Refreshed 2 sources into data/
     ```

7. GET `/build-intermediate`
   - Status: `200 OK`
   - Headers: `Content-Type: text/plain`
   - Body snippet:
     ```text
     written <name>-intermediate.json
     Generated X intermediate artifacts into intermediate/
     ```

Any other path returns `404 Not Found`.
