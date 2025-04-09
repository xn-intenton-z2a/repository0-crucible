# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## CLI Modular Architecture

The CLI command handling has been refactored for better modularity and extensibility. The commands are now defined in separate modules under the `src/cli/` directory:

- **src/cli/commands.js**: Contains individual, self-contained functions for each CLI command.
- **src/cli/index.js**: Acts as the centralized CLI handler. It imports the command modules, maps CLI flags to their corresponding functions, and invokes them based on user input.

This new structure makes it easier to add, modify, or remove CLI commands without cluttering the main source file.

### Adding a New CLI Command

1. Create a new function in `src/cli/commands.js` for your command.
2. Add an entry to the `commandActions` object mapping the CLI flag to your function.
3. The new command will automatically be available through the CLI handler in `src/cli/index.js`.

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

## Endpoints and Testing

owl-builder uses a broad list of public endpoints to build ontologies, such as:

- `https://api.publicapis.org/entries`
- `https://dog.ceo/api/breeds/image/random`
- `https://jsonplaceholder.typicode.com/posts`
- `https://api.coindesk.com/v1/bpi/currentprice.json`
- ...

_Note:_ Ensure that your network allows access to these endpoints for successful data retrieval.

## WebSocket Notifications

owl-builder now includes a real-time WebSocket notification service. This service broadcasts a JSON payload to all connected clients whenever key ontology operations (e.g., refresh, merge, update, rollback) occur.

### How It Works

- The WebSocket server runs alongside the HTTP server on the same port.
- When an ontology is updated, refreshed, merged, or rolled back, a payload is broadcast with the following fields:
  - `updatedOntologyTitle`: The title of the updated ontology.
  - `version`: The current version of owl-builder.
  - `timestamp`: ISO formatted timestamp of the update.
  - `statusMessage`: A description of the update (e.g., "Ontology refreshed", "Ontology rollback executed due to live data anomaly").

### Usage Example

```js
import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
  console.log('Connected to owl-builder notifications');
});

ws.on('message', (data) => {
  const notification = JSON.parse(data);
  console.log('Received update:', notification);
});
```

## Real-Time Anomaly Detection and Automated Rollback

A new feature in owl-builder is the real-time anomaly detection mechanism within the live data integration workflow. After fetching data from a live endpoint, the data is validated to ensure it meets expected schema criteria. For instance, when using the `https://api.publicapis.org/entries` endpoint, the data must contain an `entries` array with at least one element.

If an anomaly is detected (e.g., missing or empty `entries`), owl-builder logs detailed diagnostic messages and broadcasts a WebSocket alert. In addition, owl-builder now automatically attempts to restore a valid ontology by rolling back to the last known good backup stored in `ontology-backup.json`. If the rollback is successful, the backup ontology is restored as the current ontology and a WebSocket notification with the status message "Ontology rollback executed due to live data anomaly" is broadcast.

_Note:_ In previous versions, when running in a test environment, live data integration returned hardcoded test data. This version removes that early return to ensure that anomaly detection and rollback are fully exercised even during testing.

## Exporting Telemetry Data

A new CLI command `--export-telemetry` has been added. When invoked without additional parameters, it gathers the aggregated diagnostic telemetry (including NaN fallback warnings) and exports the summary as a JSON file named `telemetry.json` in the current working directory. Additionally, by specifying the `--format csv` flag, the telemetry data can be exported in CSV format to a file named `telemetry.csv`.

### How It Works

- The command aggregates telemetry data using internal telemetry functions, such as `getAggregatedNaNSummary` and `enhancedDiagnosticSummary`.
- By default, the telemetry data is exported in JSON format. Use the `--format csv` flag to export in CSV format.
- When exporting in CSV, the file will contain two sections:
  - **NaN Fallback Telemetry:** Contains headers (`key,count,envVar,rawValue,cliOverride,timestamp`) and rows for each aggregated warning.
  - **Diagnostic Summary:** Contains headers (`timestamp,message,version`) and a summary row.

### CLI Usage Examples

Export telemetry data in JSON format (default):

```bash
node src/lib/main.js --export-telemetry
```

Export telemetry data in CSV format:

```bash
node src/lib/main.js --export-telemetry --format csv
```

After running the command, check the respective file (`telemetry.json` or `telemetry.csv`) in your working directory for the exported telemetry data.

## Environment Variable Handling

owl-builder processes environment variables inline. This includes:

1. **Normalization**: All environment variable values are trimmed and collapsed. For example, inputs like "  NaN  ", " nAn ", or even with non-breaking spaces like "\u00A0NaN\u00A0" are normalized to a consistent format.

2. **Fallback Mechanism**: If an environment variable expected to be numeric is found to be non-numeric, a diagnostic warning is logged and the value falls back to a default or configurable fallback value. This behavior is determined by:
   - The default value provided to the parser.
   - An optional fallback value if specified.
   - CLI override values (e.g. `--livedata-retry-default` and `--livedata-delay-default`), which take precedence over environment-specified or default values.

3. **Aggregated Telemetry**: To avoid flooding logs, warnings for non-numeric inputs are aggregated per unique normalized value. The number of warnings logged is controlled by the `NANFALLBACK_WARNING_THRESHOLD` (default is 1). You can view a summary of all such warnings using the CLI flag `--diagnostic-summary-naN`.

4. **Strict Mode**: When strict mode is enabled (using the `--strict-env` CLI flag or setting `STRICT_ENV=true`), any non-numeric input will immediately throw an error instead of falling back.

5. **Optimized Telemetry Batching**: A debounced flush mechanism now ensures that rapid, successive non-numeric inputs are batched efficiently, improving accuracy and performance under high concurrency.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines. When contributing changes to the CLI command handling system, ensure that you update both the inline documentation in the source code and this README with the details of the new modular structure.

## License

Released under the MIT License.
