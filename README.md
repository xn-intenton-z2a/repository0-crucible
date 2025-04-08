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

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.
