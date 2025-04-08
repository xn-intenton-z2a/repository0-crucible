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

Environment variable inputs are processed via an inline utility integrated in the main source file. This inline logic provides methods for normalizing input values by trimming whitespace and collapsing multiple whitespace characters, as well as parsing numeric values. When a non-numeric input is encountered (e.g. variations of "NaN" such as " NaN ", "\tNaN", and "\u00A0NaN\u00A0"), a one-time diagnostic warning is logged and the value falls back to a default (or a provided fallback). The logged telemetry event now includes additional context fields:

- `timestamp`: When the warning occurred in ISO format.
- `rawValue`: The original, unnormalized input value.
- `cliOverride`: A boolean indicating whether the value came from a CLI override.

The telemetry event is prefixed by `TELEMETRY:` in the logs to facilitate extraction by diagnostic tools.

CLI override options (e.g. `--livedata-retry-default` and `--livedata-delay-default`) take precedence over environment variables and defaults. Strict mode, enabled via `--strict-env` or setting `STRICT_ENV=true`, causes non-numeric inputs to throw errors immediately.

There is special handling for the environment variable `TEST_UNIQUE` where different formatting (even when normalized to the same value) will trigger separate warnings, aiding granular detection during testing.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines. When contributing changes to the environment variable parsing logic, please note the enhanced telemetry format which now includes additional context fields for better diagnostics.

## License

Released under the MIT License.
