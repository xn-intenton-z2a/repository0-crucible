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

## Environment Variable Handling

Environment variable inputs are processed via an inline utility integrated in the main source file. This inline logic provides methods for normalizing input values by trimming whitespace and collapsing multiple whitespace characters—including non-breaking spaces—with a unified regex. When a non-numeric input is encountered (for example, variations of "NaN" such as " NaN ", "\tNaN", and "\u00A0NaN\u00A0"), a one-time diagnostic warning is logged asynchronously using a promise-based batching mechanism to ensure atomic aggregation even under high concurrency. The logged telemetry event now includes additional context fields:

- `timestamp`: When the warning occurred in ISO format.
- `rawValue`: The original, unnormalized input value.
- `cliOverride`: A boolean indicating whether the value came from a CLI override.

Telemetry logs for NaN fallback events are batched using a promise-based approach to ensure that each unique invalid input is logged exactly once, even under rapid concurrent invocations. Aggregated telemetry data is maintained at runtime and can be accessed via the CLI flag `--diagnostic-summary-naN`.

CLI override options (e.g. `--livedata-retry-default` and `--livedata-delay-default`) take precedence over environment variables and defaults. Strict mode, enabled via `--strict-env` or setting `STRICT_ENV=true`, causes non-numeric inputs to throw errors immediately.

There is special handling for the environment variable `TEST_UNIQUE` where different formatting (even when normalized to the same value) may trigger separate warnings, aiding granular detection during testing.

## Aggregated Telemetry Summary

In scenarios where NaN inputs occur repeatedly, an aggregated summary report is generated. This summary includes the count for each unique normalized invalid input along with its associated telemetry details. Use the `--diagnostic-summary-naN` CLI flag to view this report.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines. When contributing changes to the environment variable parsing logic, please note the updated promise-based batching mechanism for telemetry logs which ensures atomic, consistent logging under high concurrency.

## License

Released under the MIT License.