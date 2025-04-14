# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds].

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

TODO: Add features here.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Query Ontologies:**
  ```bash
  node src/lib/main.js --query
  ```
  This command queries OWL ontologies. By default, it displays a placeholder message indicating that the feature is under development.

  You can also append search terms after `--query` to filter the query. For example:
  ```bash
  node src/lib/main.js --query capital cities
  ```
  This will output a message like: "Querying OWL ontologies for: capital cities"

  Additionally, you can now provide key=value filters. For example:
  ```bash
  node src/lib/main.js --query country=USA
  ```
  will output a message like: "Querying OWL ontologies with filters: {\"country\":\"USA\"}"

  Or, you can combine search terms with filters:
  ```bash
  node src/lib/main.js --query capital cities country=USA
  ```
  which outputs: "Querying OWL ontologies for: capital cities with filters: {\"country\":\"USA\"}"

- **Diagnostics Information:**
  ```bash
  node src/lib/main.js --diagnostics
  ```
  This command outputs diagnostic information about the system, such as the Node.js version and other runtime details.

- **Crawl Data:**
  ```bash
  node src/lib/main.js --crawl
  ```
  This command initiates a data crawl operation from public sources and outputs a placeholder message confirming the action.

- **Generate Capital Cities OWL Ontology:**
  ```bash
  node src/lib/main.js --capital-cities
  ```
  This command outputs a JSON representation of an OWL ontology containing dummy data about capital cities, including city names and their associated countries.

- **Serve REST API:**
  ```bash
  node src/lib/main.js --serve
  ```
  This command starts an Express REST API server on port 3000 (or the port specified by the environment variable PORT). The root endpoint (`/`) returns a JSON object:
  ```json
  { "message": "owl-builder REST API" }
  ```

- **Enhanced Build Ontology:**
  ```bash
  node src/lib/main.js --build-enhanced
  ```
  This command builds an enhanced OWL ontology, validates it using Zod, and outputs the validated ontology in JSON format.

- **Intermediate Build Ontology:**
  ```bash
  node src/lib/main.js --build-intermediate
  ```
  This command builds an intermediate version of the OWL ontology without Zod validation and outputs it in JSON format, providing a step between basic and enhanced builds.

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
