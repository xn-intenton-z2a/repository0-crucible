# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## CLI Integration

The CLI command handling has been integrated directly into the main module (`src/lib/main.js`). This consolidation simplifies the project structure, eliminating the need for a separate CLI directory. The main module now provides functions such as `runCLI`, `getVersion`, `displayHelp`, `listCommands`, and `startWebServer`.

### Usage Examples

#### Running the CLI

```bash
node src/lib/main.js --detect-anomaly '{"entries": []}'
```

This command simulates an anomaly scenario with an empty `entries` array, triggering the automated rollback mechanism if a valid backup exists.

#### Exporting Telemetry Data

To export telemetry data in JSON format (default):

```bash
node src/lib/main.js --export-telemetry
```

To export telemetry data in CSV format:

```bash
node src/lib/main.js --export-telemetry --format csv
```

After running the command, check the respective file (`telemetry.json` or `telemetry.csv`) in your working directory for the exported telemetry data.

## Web Server and WebSocket Notifications

owl-builder now includes an integrated web server and WebSocket notification service. The web server responds to HTTP GET requests on `/` with a simple status message, while the WebSocket server broadcasts a JSON payload to all connected clients whenever key ontology operations (e.g., refresh, merge, update, rollback) occur.

### How It Works

- The web server and WebSocket server run on the same port (default is 3000). You can start the server using the CLI command:

  ```bash
  node src/lib/main.js --serve
  ```

- When an ontology is updated, refreshed, merged, or rolled back, a payload is broadcast with the following fields:
  - `updatedOntologyTitle`: The title of the updated ontology.
  - `version`: The current version of owl-builder.
  - `timestamp`: ISO-formatted timestamp of the update.
  - `statusMessage`: A description of the update (e.g., "Ontology refreshed").

### Using the Web Server

You can check the server status by navigating to `http://localhost:3000/` in your browser. A successful response will display:

```
owl-builder Web Server Running
```

## Real-Time Anomaly Detection and Automated Rollback

A new feature in owl-builder is the real-time anomaly detection mechanism within the live data integration workflow. After fetching data from a live endpoint, the data is validated to ensure it meets expected schema criteria. For instance, when using the `https://api.publicapis.org/entries` endpoint, the data must contain an `entries` array with at least one element.

If an anomaly is detected (e.g., missing or empty `entries`), owl-builder logs detailed diagnostic messages and broadcasts a WebSocket alert. In addition, owl-builder automatically attempts to restore a valid ontology by rolling back to the last known good backup stored in `ontology-backup.json`. If the rollback is successful, the backup ontology is restored as the current ontology and a WebSocket notification with the status message "Ontology rollback executed due to live data anomaly" is broadcast.

## Live Data Fetch Caching

To reduce redundant API calls and improve response times when fetching live data, owl-builder now implements an in-memory caching mechanism. Before initiating a network request via `fetchDataWithRetry`, the tool checks if a valid cached response for the requested URL exists. If a cached response is found and it has not expired, the cached data is returned immediately. Otherwise, a new network request is made and its result is cached for subsequent requests.

The cache duration is configurable via the `LIVE_DATA_CACHE_TTL` environment variable (in milliseconds). If not explicitly set, the default cache TTL is 60000 ms (1 minute).

## Environment Variable Handling

owl-builder processes environment variables inline. This includes:

1. **Normalization**: All environment variable values are trimmed and collapsed. For example, inputs like "  NaN  ", " nAn ", or even with non-breaking spaces like "\u00A0NaN\u00A0" are normalized to a consistent format.

2. **Fallback Mechanism**: If an environment variable expected to be numeric is found to be non-numeric, a diagnostic warning is logged and the value falls back to a default or configurable fallback value. This behavior is determined by:
   - The default value provided to the parser.
   - An optional fallback value if specified.
   - CLI override values (e.g. `--livedata-retry-default` and `--livedata-delay-default`), which take precedence over environment-specified or default values.

3. **Aggregated Telemetry**: To avoid flooding logs, warnings for non-numeric inputs are aggregated per unique normalized value. The number of warnings logged is controlled by the `NANFALLBACK_WARNING_THRESHOLD` (default is 1). You can view a summary of all such warnings using the CLI flag `--diagnostic-summary-naN`.

4. **Explicit 'NaN' Handling**: Explicit inputs that normalize to "nan" (including edge-case variations) are now detected and logged as a distinct telemetry event labeled "ExplicitNaN". These explicit 'NaN' values will also fall back to default values but are clearly distinguished in diagnostic logs.

5. **Strict Mode**: When strict mode is enabled (using the `--strict-env` CLI flag or setting `STRICT_ENV=true`), any non-numeric input will immediately throw an error instead of falling back.

6. **Optimized Telemetry Batching**: A debounced flush mechanism ensures that rapid, successive non-numeric inputs are batched efficiently. The delay for flushing telemetry logs is configurable via the `TELEMETRY_FLUSH_DELAY` environment variable (default is 50ms).

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines. When contributing changes to the CLI command handling system, ensure that you update both the inline documentation in the source code and this README with the details of the integrated CLI approach.

## License

Released under the MIT License.