# Features

- **List Sources (`--list-sources`)**: Outputs the list of configured public data sources in JSON format. If a `data-sources.json` file is present with a valid array of `{ name, url }`, it will be merged with the default sources. Invalid or missing configs will fall back to defaults with a warning for invalid configs.
- **Help (`--help`, `-h`)**: Display the help message with usage instructions.
- **Diagnostics (`--diagnostics`)**: Outputs diagnostic information (version, node version, platform, architecture, working directory, uptimeSeconds, memoryUsage, public data sources, and commands) as pretty-printed JSON, and includes a `healthChecks` array with real-time availability and latency metrics for each data source:
  - **healthChecks**: Array of objects with properties:
    - `name` (string): Data source name.
    - `url` (string): Data source URL.
    - `statusCode` (number|null): HTTP status code from a HEAD request, or `null` if unreachable.
    - `latencyMs` (number|null): Round-trip time in milliseconds, or `null` if unreachable.
    - `reachable` (boolean): `true` if statusCode is between 200 and 299.
  - `uptimeSeconds` (number): The number of seconds the process has been running.
  - `memoryUsage` (object): Memory usage statistics including properties `rss`, `heapTotal`, `heapUsed`, `external`, and `arrayBuffers`.
- **Serve (`--serve`)**: Starts a local HTTP server on port `3000` (or `process.env.PORT`). Available endpoints:
  - **GET `/help`**: Returns the CLI help text as plain text.
  - **GET `/sources`**: Returns the list of public (and custom) data sources as pretty-printed JSON.
  - **GET `/diagnostics`**: Returns diagnostic information and a live `healthChecks` array as pretty-printed JSON.
  - **GET `/capital-cities`**: Returns country–capital pairs fetched via SPARQL from DBpedia as OWL JSON-LD with `@context` and `@graph`.
  - **GET `/query?file=<path>&query=<sparql>`**: Executes a SPARQL query against an OWL JSON-LD file and returns SPARQL Results in JSON format.
  - **GET `/refresh`**: Triggers fetching and persisting data from all configured public and custom sources. Streams plain-text logs with one line per written file (`written <filename>.json`), ends with a summary line (`Refreshed <count> sources into data/`), and returns status 200 with `Content-Type: text/plain`. On error, responds with status 500 and a plain-text error message.
  - **GET `/build-intermediate`**: Reads JSON files from `data/`, transforms each into an OWL JSON-LD document, writes to `intermediate/`, and streams each `written <name>-intermediate.json` line followed by a summary `Generated X intermediate artifacts into intermediate/`.
  - Any other path responds with `404 Not Found`.
- **Refresh (`--refresh`)**: Merges default and custom data sources, fetches JSON from each source, persists each to `data/<slugified-source-name>.json`, logs `written <filename>` for each successful write, and outputs a summary `Refreshed X sources into data/`.
- **Build Intermediate (`--build-intermediate`)**: Reads JSON files from `data/`, transforms each into an OWL JSON-LD document (`@context` + `@graph`), writes to `intermediate/`, logs each write, and ends with a summary line.
- **Capital Cities (`--capital-cities`)**: Queries DBpedia SPARQL for country–capital pairs using the API `getCapitalCities(endpointUrl?)` and outputs an OWL-compatible JSON-LD document with `@context` and `@graph`.
- **Programmatic API (`getCapitalCities(endpointUrl?)`)**: Async function that fetches country–capital pairs from a SPARQL endpoint (defaulting to DBpedia), using `Accept: application/sparql-results+json`. Returns a JSON-LD document:
  ```json
  {
    "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
    "@graph": [
      { "@id": "<countryUri>", "capital": "<capitalUri>" },
      …
    ]
  }
  ```
- **Programmatic API (`listSources(configPath?)`)**: Returns a Promise resolving to the list of public data sources merged with an optional custom `data-sources.json`. It accepts an optional `configPath` (defaulting to `data-sources.json` in the current working directory). On invalid or missing config, logs an error and returns only the default sources.
- **Programmatic API (`refreshSources(configPath?)`)**: Async function to fetch and persist data from all configured sources into `data/`, returning an object `{ count: number, files: string[] }`. Errors from individual sources are logged and do not interrupt processing.
- **Programmatic API (`buildIntermediate({ dataDir?: string, outDir?: string })`)**: Reads JSON files from `dataDir`, transforms each into OWL JSON-LD, writes to `outDir`, logs each write, and returns a summary object `{ count: number, files: string[] }`.
- **Programmatic API (`queryOntologies(filePath, sparqlQuery)`)**: Async function to execute a SPARQL query against an OWL JSON-LD artifact. Returns a Promise resolving to a SPARQL Results JSON object with `head.vars` and `results.bindings`.
