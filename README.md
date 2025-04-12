# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

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

- CLI tool for building and managing OWL ontologies.
- JSON-based persistence and retrieval of OWL ontologies via integrated persistence functions exported from the main module (located in src/lib/main.js).
- Exports a GraphDB-friendly format from OWL ontology JSON using the new GraphDB Exporter feature (now implemented in src/lib/main.js).
- Merge functionality: merge two ontology JSON files and persist the merged result via the new --merge-persist CLI option. This command reads two ontology JSON files, unifies their classes (removing duplicates) and merges properties (with the second ontology’s properties taking precedence), and writes the merged ontology to the specified output file.
- **Version Display:** Use the new --version flag to display the current package version as specified in package.json.
- **Help Command:** Use --help (or run without arguments) to display CLI usage instructions.
- **Custom Ontology Persistence:** Use the new --ontology flag with --persist to supply a custom ontology (as a JSON string or by providing a file path) instead of the default dummy ontology.
- **Enhanced Environment Variable Validation:** Environment variables such as DEFAULT_TIMEOUT are now robustly validated using a Zod-based schema. Now, if a non-numeric or non-finite value (NaN, Infinity, -Infinity) is provided, the tool will fall back to a safe default (e.g., 5000) with a standardized logged warning.
- **Robust Logging:** Every command execution is logged with a timestamp, command arguments, and outcome in JSON format to a dedicated log file (logs/cli.log). The logging functionality has been enhanced to report errors (such as directory creation or file writing failures) to stderr for better diagnostics.
- **Schema Validation:** Ontology JSON objects are validated using Zod to ensure they adhere to the expected structure. This enhances error reporting and robustness.
- **Diagnostics Mode:** Use the new --diagnostics flag to output a detailed JSON report containing diagnostic information such as package version, environment variables, system information, available CLI commands, and the current execution context.

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
  This command outputs a detailed JSON report with diagnostic information, including the package version, environment variables, system details, available CLI commands, and current execution context.

## Environment Variable Configuration

The CLI tool now leverages a Zod-based schema to robustly validate numeric environment variables such as DEFAULT_TIMEOUT. If an environment variable intended to represent a number is invalid, non-numeric, or non-finite (e.g., NaN, Infinity, -Infinity), the tool will automatically fall back to a safe default (e.g., 5000) and log a standardized warning. This helps ensure predictable behavior and easier diagnostics.

Example of setting an environment variable:

```bash
export DEFAULT_TIMEOUT=3000
node src/lib/main.js --help
```

## Logging

Every CLI command execution is logged automatically in JSON format. The log entries include a timestamp, the command arguments, and the outcome (success, error, or informational). Logs are stored in a dedicated file at logs/cli.log with automatic directory and file creation as needed. The logging functionality has been enhanced to report errors to stderr if log directory creation or file writing fails, ensuring better diagnostics during execution.

## End-to-End Integration Tests

A suite of end-to-end integration tests has been added to verify all CLI commands, including log creation and the diagnostics mode. These tests simulate realistic usage scenarios including file I/O operations, JSON parsing, and environment variable fallback handling. To run the integration tests, execute:

```bash
npm run test:e2e
```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
