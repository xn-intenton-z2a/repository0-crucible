# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows and a modular CLI design.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

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
- **Enhanced Environment Variable Validation:** The CLI tool validates numeric environment variables including DEFAULT_TIMEOUT. If DEFAULT_TIMEOUT is not set, it logs an error (LOG_ERR_ENV_NOT_SET) and defaults to 5000. If DEFAULT_TIMEOUT is provided but is non-numeric (for example, a string that cannot be parsed into a finite number such as "NaN") or is a non-finite numeric value (e.g., Infinity, -Infinity), it logs an error (LOG_ERR_ENV_NON_FINITE) and also defaults to 5000. Automated tests verify this behavior.
- **Robust Logging:** Every command execution is logged in JSON format to a dedicated log file (logs/cli.log). Error logs include structured error codes (e.g., LOG_ERR_*) and detailed contextual information.
- **Diagnostics Mode:** Use the --diagnostics flag to output a detailed JSON report containing package version, environment variables, system details, available CLI commands, and current execution context.
- **System Refresh:** Use the --refresh flag to reinitialize the system state by clearing cached logs and resetting any internal states.
- **Build Commands:**
  - **Intermediate Build:** Use --build-intermediate to process and output an intermediate build version of the ontology.
  - **Enhanced Build:** Use --build-enhanced to fetch data from a public API, transform it into an enriched ontology JSON, and output the enhanced build version.
- **REST API Server:** Use the --serve flag to launch an HTTP server exposing comprehensive REST API endpoints for ontology operations. The following endpoints are available:
  - **GET /diagnostics:** Returns a diagnostic report (same as CLI diagnostics).
  - **GET /ontology:** Returns a JSON list of persisted ontology definitions.
  - **POST /ontology:** Accepts a JSON payload representing an ontology, validates it using a Zod schema, persists it with a unique identifier, and returns a creation confirmation.
  - **PUT /ontology:** Accepts a JSON payload for updating an existing ontology (requires an "id" property), validates and persists the update, and returns a confirmation.
  - **DELETE /ontology:** Accepts an ontology identifier as a query parameter (e.g., /ontology?id=123) and deletes the corresponding persisted ontology, returning a confirmation.
- **Interactive Mode with Enhanced Usability:** Use the --interactive flag to launch an interactive session for on-the-fly ontology exploration. In this mode, the CLI supports auto-completion for commands (including dynamic suggestions based on loaded ontology classes) and maintains a command history, allowing easy navigation with the up/down arrow keys. The available interactive commands include:
  - `load <file>`: Load and validate an ontology from a JSON file.
  - `show`: Display the loaded ontology details.
  - `list-classes`: List the classes present in the loaded ontology.
  - `help`: Show available interactive commands.
  - `exit`: Exit interactive mode.
- **Ontology Content Query:** Use the **--query** command to search within an ontology for specific content. Provide the path to the ontology JSON file and a search term. Optionally, add the `--regex` flag to interpret the search term as a regular expression. This command searches within the ontology's name, classes, and properties (both keys and string values) and returns the matching results in JSON format. If no matches are found, an appropriate JSON message is returned.
- **Fetch Ontology from Public Data Source:** Use the **--fetch** command to simulate retrieving data from a public data source, transform it into a valid ontology JSON object, and either output the result to STDOUT or persist it to a file if a file path is provided.
- **Export OWL/Turtle Format:** Use the **--export-owl** command to convert a JSON ontology into a basic OWL representation in Turtle format. The output includes standard prefixes (owl, rdf, ex) and translates ontology classes and properties into OWL declarations. When an output file is provided, the result is saved; otherwise, it is printed to STDOUT.
- **Export RDF/XML Format:** **New!** Use the **--export-xml** command to convert a JSON ontology into RDF/XML format. The exporter includes the XML declaration and standard RDF/XML namespaces. The ontology's name, version, classes, and properties are mapped to corresponding RDF/XML elements. If an output file is provided, the result is saved; otherwise, it is printed to STDOUT.
- **Zod Schema Validation:** Ontology JSON files are validated using a strict Zod schema to ensure they contain the required properties (name, version, classes, and properties) with the correct data types. This integration provides clearer error messages on invalid ontology formats.
- **Non-deprecated Package Import:** The package version from package.json is now imported using a file read method to avoid using deprecated import assertions.

### New Feature: Ontology Difference Comparison (--diff)

A new command, **--diff**, has been added. It compares two ontology JSON files and outputs their differences in a structured JSON format. The command performs the following steps:

1. Reads, parses, and validates both ontology files using the Zod schema.
2. Compares key fields such as name, version, classes, and properties.
   - For classes, it reports additions and removals.
   - For properties, it reports added, removed, and modified keys and values.
3. Outputs a JSON object representing the differences. If no differences are found, it returns a message stating "No differences found".

**Usage Example:**

```bash
node src/lib/main.js --diff path/to/ontology1.json path/to/ontology2.json
```

The output will be a JSON object similar to:

```json
{
  "name": { "from": "OntologyA", "to": "OntologyB" },
  "version": { "from": "1.0", "to": "2.0" },
  "classes": {
    "added": ["Class3"],
    "removed": ["Class1"]
  },
  "properties": {
    "added": { "propC": "valueC" },
    "removed": { "propB": "valueB" },
    "modified": [{ "key": "propA", "from": "valueA", "to": "valueA_modified" }]
  }
}
```

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

- **Export Ontology to OWL/Turtle Format:**
  ```bash
  node src/lib/main.js --export-owl path/to/ontology.json [path/to/output.ttl]
  ```

- **Export Ontology to RDF/XML Format (New):**
  ```bash
  node src/lib/main.js --export-xml path/to/ontology.json [path/to/output.xml]
  ```

- **Merge and Persist Ontologies:**
  ```bash
  node src/lib/main.js --merge-persist ontology1.json ontology2.json mergedOntology.json
  ```

- **Diagnostics Mode:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

- **System Refresh:**
  ```bash
  node src/lib/main.js --refresh
  ```

- **Intermediate Build:**
  ```bash
  node src/lib/main.js --build-intermediate
  ```

- **Enhanced Build:**
  ```bash
  node src/lib/main.js --build-enhanced
  ```

- **REST API Server:**
  ```bash
  node src/lib/main.js --serve
  ```

- **Interactive Mode with Auto-Completion and Command History:**
  ```bash
  node src/lib/main.js --interactive
  ```

- **Ontology Content Query:**
  ```bash
  node src/lib/main.js --query path/to/ontology.json searchTerm [--regex]
  ```

- **Fetch Ontology from Public Data Source:**
  ```bash
  node src/lib/main.js --fetch [path/to/output.json]
  ```

- **Ontology Difference Comparison:**
  ```bash
  node src/lib/main.js --diff path/to/ontology1.json path/to/ontology2.json
  ```

  This command compares two ontology JSON files and outputs a structured JSON diff. If no differences are detected, it outputs a message indicating "No differences found".

## Environment Variable Configuration

The CLI tool validates numeric environment variables including DEFAULT_TIMEOUT. If DEFAULT_TIMEOUT is not set, the tool logs an error (LOG_ERR_ENV_NOT_SET) and defaults to 5000. If a non-numeric or non-finite value (such as "NaN", "Infinity", or "-Infinity") is provided, it logs an error (LOG_ERR_ENV_NON_FINITE) and uses the fallback value of 5000. Automated tests verify this behavior.

## End-to-End Integration Tests

A suite of end-to-end integration tests verifies all CLI commands, including log creation, diagnostics mode, REST API endpoints, interactive mode enhancements, ontology query functionality, and the new fetch, export-owl, export-xml, and diff functionalities. To run the integration tests:

```bash
npm run test:e2e
```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
