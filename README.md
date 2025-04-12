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

- CLI tool for building and managing OWL ontologies with a modular command routing. The CLI now modularizes each command handler directly in the main file, eliminating missing module errors and improving testability.
- JSON-based persistence and retrieval of OWL ontologies via integrated persistence functions exported from the main module (located in src/lib/main.js).
- Exports a GraphDB-friendly format from OWL ontology JSON using the GraphDB Exporter feature.
- Merge functionality: merge two ontology JSON files and persist the merged result via the --merge-persist CLI option.
- **Version Display:** Use the --version flag to display the current package version as specified in package.json.
- **Help Command:** Use --help (or run without arguments) to display CLI usage instructions. The help output includes the effective DEFAULT_TIMEOUT value after environment validation.
- **Custom Ontology Persistence:** Use the --ontology flag with --persist to supply a custom ontology (as a JSON string or via a file path) instead of the default dummy ontology.
- **Enhanced Environment Variable Validation:** The CLI tool now performs explicit checks for special cases including non-numeric inputs, NaN, Infinity and -Infinity. In these cases, a clear warning is logged and a default value of 5000 is used.
- **Robust Logging:** Every command execution is logged in JSON format to a dedicated log file (logs/cli.log), with errors reported to stderr for better diagnostics.
- **Diagnostics Mode:** Use the --diagnostics flag to output a detailed JSON report containing package version, environment variables, system details, available CLI commands, and current execution context.
- **System Refresh:** Use the --refresh flag to reinitialize the system state by clearing cached logs and resetting any internal states.

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

## Environment Variable Configuration

The CLI tool validates numeric environment variables like DEFAULT_TIMEOUT. The tool now explicitly checks for non-numeric values, NaN, Infinity, and -Infinity. In any of these cases, a clear warning is logged and the default value of 5000 is used.

Example of setting an environment variable:

```bash
export DEFAULT_TIMEOUT=3000
node src/lib/main.js --help
```

## Logging

Every CLI command execution is logged automatically in JSON format. Logs include a timestamp, the command arguments, and the outcome. Logs are stored in logs/cli.log, with automatic directory creation and error reporting to stderr if needed.

## End-to-End Integration Tests

A suite of end-to-end integration tests verifies all CLI commands, including log creation and diagnostics mode. To run the integration tests:

```bash
npm run test:e2e
```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).