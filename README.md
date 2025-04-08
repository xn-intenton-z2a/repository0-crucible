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

Environment variable inputs are processed via a centralized utility located in `src/lib/utils/envUtils.js`. This module provides methods for normalizing input values by trimming whitespace and collapsing multiple whitespace characters, as well as parsing numeric values. Invalid inputs (e.g., variations of "NaN" such as " NaN ", "\tNaN", and "\u00A0NaN\u00A0") trigger a one-time diagnostic warning and a JSON-formatted telemetry event per unique normalized invalid input. CLI override options (e.g. `--livedata-retry-default` and `--livedata-delay-default`) take precedence over environment variables and defaults. Strict mode, when enabled via `--strict-env` or `STRICT_ENV=true`, causes non-numeric inputs to throw clear errors.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines. In particular, when making changes to the environment variable parsing, please update the centralized logic in `src/lib/utils/envUtils.js`.

## License

Released under the MIT License.
