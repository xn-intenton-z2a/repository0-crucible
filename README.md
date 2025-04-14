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

When invoked with the `--help` flag, the CLI displays detailed usage instructions showing available commands and options.

### Example Commands

- **Help Command:**
  ```bash
  node src/lib/main.js --help
  ```
  This command displays the usage instructions and available command options.

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

  Additionally, you can provide key=value filters. For example:
  ```bash
  node src/lib/main.js --query country=USA
  ```
  will output a message like: "Querying OWL ontologies with filters: {\"country\":\"USA\"}"

  Or, you can combine search terms with filters:
  ```bash
  node src/lib/main.js --query capital cities country=USA
  ```
  which outputs: "Querying OWL ontologies for: capital cities with filters: {\"country\":\"USA\"}"

- **Query with JSON Output:**
  An enhancement has been added that allows the query command to output its results as structured JSON when using the `--json` flag. For example:
  
  - With search terms only:
    ```bash
    node src/lib/main.js --query --json capital cities
    ```
    Expected JSON output:
    ```json
    {
      "searchTerms": ["capital", "cities"],
      "filters": {},
      "regex": false
    }
    ```
  
  - With filters only:
    ```bash
    node src/lib/main.js --query --json country=USA
    ```
    Expected JSON output:
    ```json
    {
      "searchTerms": [],
      "filters": {"country": "USA"},
      "regex": false
    }
    ```
  
  - With both search terms and filters:
    ```bash
    node src/lib/main.js --query --json capital cities country=USA
    ```
    Expected JSON output:
    ```json
    {
      "searchTerms": ["capital", "cities"],
      "filters": {"country": "USA"},
      "regex": false
    }
    ```

- **Query with Regex Filtering:**
  You can use the `--regex` flag to treat search terms as regular expressions. This flag can be combined with the `--json` flag for structured output. For example:
  
  - Standard output with regex filtering:
    ```bash
    node src/lib/main.js --query --regex capital cities
    ```
    This will output: "Querying OWL ontologies with regex for: capital cities"
  
  - JSON output with regex filtering:
    ```bash
    node src/lib/main.js --query --regex --json capital cities
    ```
    Expected JSON output:
    ```json
    {
      "searchTerms": ["capital", "cities"],
      "filters": {},
      "regex": true
    }
    ```

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
  
  Additionally, you can persist the validated ontology to a file by using the `--persist` option followed by the desired file path. For example:
  ```bash
  node src/lib/main.js --build-enhanced --persist ./enhanced-ontology.json
  ```
  When the `--persist` flag is provided, the tool writes the validated ontology to the specified file and logs a confirmation message with the file path.

- **Intermediate Build Ontology:**
  ```bash
  node src/lib/main.js --build-intermediate
  ```
  This command builds an intermediate version of the OWL ontology without Zod validation and outputs it in JSON format, providing a step between basic and enhanced builds.

- **Refresh OWL Ontology Data:**
  ```bash
  node src/lib/main.js --refresh
  ```
  This command refreshes and merges persistent OWL ontology data with newly crawled data, outputting a placeholder refreshed ontology in JSON format.

- **Merge Persist Ontology:**
  ```bash
  node src/lib/main.js --merge-persist
  ```
  This command now performs an actual merge of ontology data. It works as follows:
  - By default, if no persisted ontology is provided, it uses an ontology with an empty capitals array.
  - Use the `--persist <filePath>` flag to specify a file from which to read an existing persisted ontology (in JSON format).
  - The command simulates new ontology data and merges it with the persisted data, combining the capitals arrays without duplicating entries (new data overrides duplicates).
  - Optionally, use the `--out <filePath>` flag to persist the merged ontology to a file.

### Verbose Debug Mode

A new `--verbose` flag has been added. When this flag is included in any command, the CLI outputs additional debug information detailing internal state and execution flow. For example:

```bash
node src/lib/main.js --query capital cities --verbose
```

This will output extra messages, such as the received arguments, before processing the command. This feature is intended to assist in troubleshooting and understanding the internal processing of commands.

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
