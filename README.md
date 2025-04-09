# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Endpoints and Testing

owl-builder uses a broad list of public endpoints to build ontologies, such as:

- `https://api.publicapis.org/entries`
- `https://dog.ceo/api/breeds/image/random`
- `https://jsonplaceholder.typicode.com/posts`
- `https://api.coindesk.com/v1/bpi/currentprice.json`
- ...

_Note:_ Ensure that your network allows access to these endpoints for successful data retrieval.

## WebSocket Notifications

owl-builder now includes a real-time WebSocket notification service. This service broadcasts a JSON payload to all connected clients whenever key ontology operations (e.g., refresh, merge, update) occur.

### How It Works

- The WebSocket server runs alongside the HTTP server on the same port.
- When an ontology is updated, refreshed, or merged, a payload is broadcast with the following fields:
  - `updatedOntologyTitle`: The title of the updated ontology.
  - `version`: The current version of owl-builder.
  - `timestamp`: ISO formatted timestamp of the update.
  - `statusMessage`: A description of the update (e.g., "Ontology refreshed").

### Usage Example

You can connect to the WebSocket endpoint as follows:

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

No additional configuration is needed; the WebSocket server starts automatically when running the CLI tool with the `--serve` flag.

## Real-Time Anomaly Detection

A new feature in owl-builder is the real-time anomaly detection mechanism within the live data integration workflow. After fetching data from a live endpoint, the data is validated to ensure it meets expected schema criteria. For instance, when using the `https://api.publicapis.org/entries` endpoint, the data must contain an `entries` array with at least one element. If an anomaly is detected (e.g., missing or empty `entries`), owl-builder logs detailed diagnostic messages and broadcasts a WebSocket alert with a status message such as "Anomaly detected in live data". This helps operators quickly identify issues with the external data source.

### CLI Usage

To force anomaly detection and test the feature, use the `--detect-anomaly` flag. You may optionally provide a JSON string representing sample data for testing. If not provided, live data will be used.

Example:

```bash
node src/lib/main.js --detect-anomaly '{"entries": []}'
```

This command will simulate an anomaly scenario by providing an empty `entries` array.

## Environment Variable Handling

owl-builder processes environment variables inline. This includes:

1. **Normalization**: All environment variable values are trimmed and collapsed. For example, inputs like "  NaN  ", " nAn ", or even with non-breaking spaces like "\u00A0NaN\u00A0" are normalized to a consistent format.

2. **Fallback Mechanism**: If an environment variable expected to be numeric is found to be non-numeric, a diagnostic warning is logged and the value falls back to a default or configurable fallback value. This behavior is determined by:
   - The default value provided to the parser.
   - An optional fallback value if specified.
   - CLI override values (e.g. `--livedata-retry-default` and `--livedata-delay-default`), which take precedence over environment-specified or default values.

3. **Aggregated Telemetry**: To avoid flooding logs, warnings for non-numeric inputs are aggregated per unique normalized value. The number of warnings logged is controlled by the `NANFALLBACK_WARNING_THRESHOLD` (default is 1). You can view a summary of all such warnings using the CLI flag `--diagnostic-summary-naN`.

4. **Strict Mode**: When strict mode is enabled (using the `--strict-env` CLI flag or setting `STRICT_ENV=true`), any non-numeric input will immediately throw an error instead of falling back.

Proper configuration of these variables is essential for predictable ontology building and live data integration.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines. When contributing changes to the environment variable parsing, WebSocket notification features, or the new anomaly detection mechanism, ensure that you update both the inline documentation in the source code and this README with the details of the fallback behavior and diagnostic telemetry.

## License

Released under the MIT License.
