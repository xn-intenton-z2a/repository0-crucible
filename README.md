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

## Environment Variable Handling

Environment variable inputs are processed via an inline utility integrated in the main source file. This inline logic provides methods for normalizing input values by trimming whitespace and collapsing multiple whitespace characters—including non-breaking spaces—with a unified regex. When a non-numeric input is encountered (for example, variations of "NaN" such as " NaN ", "\tNaN", and "\u00A0NaN\u00A0"), a diagnostic warning is logged and the value falls back to a default (or a configurable fallback) value. The warning and its associated telemetry event are logged up to a configurable threshold defined by the environment variable `NANFALLBACK_WARNING_THRESHOLD` (default is 1). This mechanism ensures that in high concurrency scenarios, the number of warning logs per unique invalid input can be controlled.

Additionally, when CLI override options (e.g. `--livedata-retry-default` and `--livedata-delay-default`) are provided, they take precedence over the corresponding environment variables and default values. Strict mode, enabled via `--strict-env` or setting `STRICT_ENV=true`, causes non-numeric inputs to throw errors immediately.

There is special handling for the environment variable `TEST_UNIQUE` where different formatting (even when normalized to the same value) may trigger separate warnings, aiding granular detection during testing.

## Aggregated Telemetry Summary

In scenarios where NaN inputs occur repeatedly, an aggregated summary report is generated. This summary includes the count for each unique normalized invalid input along with its associated telemetry details. Use the `--diagnostic-summary-naN` CLI flag to view this report.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines. When contributing changes to the environment variable parsing logic or WebSocket notification features, please note the updated mechanisms for asynchronous telemetry logging, configurable warning thresholds, and real-time updates.

## License

Released under the MIT License.
