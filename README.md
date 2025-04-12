# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows and a modular CLI design.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on the seed CONTRIBUTING files in [./seeds].

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

- CLI tool for building and managing OWL ontologies with a modular command routing. The CLI modularizes each command handler directly in the main file to improve testability.
- JSON-based persistence and retrieval of OWL ontologies via integrated persistence functions exported from the main module (located in src/lib/main.js).
- Exports a GraphDB-friendly format from OWL ontology JSON using the GraphDB Exporter feature.
- Merge functionality: Merge two ontology JSON files and persist the merged result via the --merge-persist CLI option.
- **Version Display:** Use the --version flag to display the current package version as specified in package.json.
- **Help Command:** Use --help (or run without arguments) to display CLI usage instructions. The help output includes the effective DEFAULT_TIMEOUT value after environment validation.
- **Custom Ontology Persistence:** Use the --ontology flag with --persist to supply a custom ontology (as a JSON string or via a file path) instead of the default dummy ontology.
- **Enhanced Environment Variable Validation:** The CLI tool now explicitly validates the DEFAULT_TIMEOUT environment variable. If DEFAULT_TIMEOUT is not set, a message is logged indicating the fallback to 5000. If an invalid or non-finite numeric value is provided, a corresponding structured error code is logged with details, and the default value of 5000 is used.
- **Robust Logging:** Every command execution is logged in JSON format to a dedicated log file (logs/cli.log). Error logs include structured error codes (e.g., LOG_ERR_*) and detailed contextual information. <strong>Note:</strong> The logger functionality is now integrated directly into the main CLI file and uses a dedicated helper function to ensure the log directory is correctly setup.
- **Diagnostics Mode:** Use the --diagnostics flag to output a detailed JSON report containing package version, environment variables, system details, available CLI commands, and current execution context.
- **System Refresh:** Use the --refresh flag to reinitialize the system state by clearing cached logs and resetting any internal states.
- **Build Commands:**
  - **Intermediate Build:** Use --build-intermediate to process and output an intermediate build version of the ontology.
  - **Enhanced Build:** Use --build-enhanced to process additional steps and output an enhanced build version of the ontology.
- **REST Server:** Use the --serve flag to launch an HTTP server that exposes REST endpoints (e.g., /diagnostics) to interact with the ontology operations.
- **Zod Schema Validation:** Ontology JSON files are validated using a strict Zod schema to ensure they contain the required properties (name, version, classes, and properties) with the correct data types. This integration provides clearer error messages on invalid ontology formats.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Default Demo/Help Output:**
  ```bash
  node src/lib/main.js
  ```

- **Display Package Version:**
  ```bash
  node src/lib/main.js --version
  ```

- **Read Ontology from JSON File:**
  ```bash
  node src/lib/main.js --read path/to/ontology.json
  ```

- **Persist Ontology to JSON File (Using Default Dummy Ontology):**
  ```bash
  node src/lib/main.js --persist path/to/output.json
  ```

- **Persist Ontology with Custom Input:**
  - Using a JSON string:
    ```bash
    node src/lib/main.js --persist path/to/output.json --ontology '{"name": "Custom Ontology", "version": "2.0", "classes": ["CustomClass"], "properties": {"customProp": "customValue"}}'
    ```
  - Using a file containing valid JSON:
    ```bash
    node src/lib/main.js --persist path/to/output.json --ontology path/to/customOntology.json
    ```

- **Export Ontology to GraphDB Format:**
  ```bash
  node src/lib/main.js --export-graphdb path/to/ontology.json [path/to/output.json]
  ```

- **Merge and Persist Ontologies:**
  ```bash
  node src/lib/main.js --merge-persist ontology1.json ontology2.json mergedOntology.json
  ```

- **Diagnostics Mode:**
  ```bash
  node src/lib/main.js --diagnostics
  ```
  This command outputs a detailed JSON report with diagnostic information.

- **System Refresh:**
  ```bash
  node src/lib/main.js --refresh
  ```
  This command reinitializes the system state by clearing cached logs and resetting any internal states.

- **Intermediate Build:**
  ```bash
  node src/lib/main.js --build-intermediate
  ```
  Processes and outputs an intermediate build version of the ontology.

- **Enhanced Build:**
  ```bash
  node src/lib/main.js --build-enhanced
  ```
  Processes and outputs an enhanced build version of the ontology.

- **Launch REST Server:**
  ```bash
  node src/lib/main.js --serve
  ```
  Launches an HTTP server that exposes REST endpoints for ontology operations (e.g., GET /diagnostics).

## Environment Variable Configuration

The CLI tool validates numeric environment variables like DEFAULT_TIMEOUT. If the environment variable is not set, a message is logged indicating the fallback to 5000. If an invalid or non-finite numeric value is provided, a corresponding structured error code is logged with details, and the default value of 5000 is used.

Example of setting an environment variable:

```bash
export DEFAULT_TIMEOUT=3000
node src/lib/main.js --help
```

## Logging

Every CLI command execution is logged automatically in JSON format. Logs include a timestamp, the command arguments, and detailed error context when failures occur. Error logs feature structured error codes (such as LOG_ERR_PERSIST_PARSE, LOG_ERR_ENV_NAN, etc.) to simplify troubleshooting. Logs are stored in logs/cli.log, with automatic directory creation via a dedicated helper function and detailed error reporting if needed.

## End-to-End Integration Tests

A suite of end-to-end integration tests verifies all CLI commands, including log creation and diagnostics mode. To run the integration tests:

```bash
npm run test:e2e
```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
