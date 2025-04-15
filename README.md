# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- Provides a CLI tool for generating and handling OWL ontologies in JSON format.
- Supports exporting OWL ontology of capital cities with a generation timestamp.
- Simulates various operations: diagnostics, data crawling, refreshing data, and build processes.
- Includes an HTTP server to serve the ontology.
- New: Validates the exported ontology JSON file using the `--validate-ontology` option.
- New: Provides extended help information using the `--help-extended` option.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

To get the help message in JSON format for programmatic use:

```bash
node src/lib/main.js --help-json
```

To get extended help information with detailed descriptions and usage examples for each command, run:

```bash
node src/lib/main.js --help-extended
```

Example extended help output:

```
Extended Help:

--help: Displays a brief help message.
         Example: node src/lib/main.js --help

--help-json: Displays help in JSON format.
         Example: node src/lib/main.js --help-json

--help-extended: Displays detailed help information with descriptions and usage examples for each command.
         Example: node src/lib/main.js --help-extended

--diagnostics: Outputs diagnostics info about the current environment.
         Example: node src/lib/main.js --diagnostics

--capital-cities: Outputs the capital cities OWL ontology in JSON format.
         Example: node src/lib/main.js --capital-cities

--export-ontology: Exports the OWL ontology to a file named exported_ontology.json.
         Example: node src/lib/main.js --export-ontology

... and so on for other options.
```

To output an example OWL ontology in JSON format representing capital cities with a generation timestamp, run:

```bash
node src/lib/main.js --capital-cities
```

To output diagnostics information about the current environment including Node.js version, OS platform, and available commands, run:

```bash
node src/lib/main.js --diagnostics
```

To simulate crawling public data sources and output dynamic JSON data, run:

```bash
node src/lib/main.js --crawl-data
```

To refresh the data (simulate a data refresh operation), run:

```bash
node src/lib/main.js --refresh
```

To simulate an intermediate build process, run:

```bash
node src/lib/main.js --build-intermediate
```

To simulate an enhanced build process, run:

```bash
node src/lib/main.js --build-enhanced
```

To simulate merging and persisting OWL ontology data, run:

```bash
node src/lib/main.js --merge-persist
```

To start a simple HTTP server that serves the OWL ontology for capital cities, run:

```bash
node src/lib/main.js --serve
```

To export the OWL ontology for capital cities to a file, run:

```bash
node src/lib/main.js --export-ontology
```

This command writes the ontology JSON to a file named `exported_ontology.json` and outputs a confirmation message.

To validate the exported OWL ontology JSON file and ensure its structure is correct, run:

```bash
node src/lib/main.js --validate-ontology
```

If the file exists and is valid, the tool will output "Ontology is valid". If the file is missing or invalid, an appropriate error message will be displayed.

To simulate a comprehensive build pipeline that sequentially executes multiple steps, run:

```bash
node src/lib/main.js --build-detailed
```

This command outputs a single consolidated JSON object containing the following keys:

- **crawlData**: Simulated data crawl result with a `fetchedAt` timestamp.
- **refreshData**: Simulated data refresh result with a `refreshedAt` timestamp.
- **intermediateBuild**: Simulated intermediate build result with a `builtAt` timestamp.
- **enhancedBuild**: Simulated enhanced build result with a `builtAt` timestamp.
- **mergePersist**: Simulated merge and persist operation result with a `mergedAt` timestamp.

Once the server is running, send an HTTP GET request to:

http://localhost:3000/capital-cities

to retrieve the capital cities ontology in JSON format.

### Handling Unsupported Options

If an unsupported CLI option is provided, the tool will output an error message along with usage instructions. For example:

```bash
node src/lib/main.js --foo
```

Will output:

```
Error: Unknown option: --foo
Usage: node src/lib/main.js [options]
```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
