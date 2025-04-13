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
- **Enhanced Environment Variable Validation:** The CLI tool validates numeric environment variables including DEFAULT_TIMEOUT. If DEFAULT_TIMEOUT is not set, it logs an error (LOG_ERR_ENV_NOT_SET) and defaults to 5000. If DEFAULT_TIMEOUT is provided but is non-numeric or non-finite, it logs an error (LOG_ERR_ENV_NON_FINITE) and uses the fallback value.
- **Robust Logging:** Every command execution is logged in JSON format to a dedicated log file (logs/cli.log). Error logs include structured error codes (e.g., LOG_ERR_*) and detailed contextual information.
- **Audit Logging of Ontology Changes:** **New!** The tool now records audit logs for ontology modifications. Whenever an ontology is modified via interactive commands (like adding/removing classes or properties) or non-interactive commands (such as merging or persisting ontologies), a detailed JSON diff is computed and appended to logs/ontology_audit.log with a timestamp and operation type, enhancing traceability and accountability.
- **Diagnostics Mode:** Use the --diagnostics flag to output a detailed JSON report containing package version, environment variables, system details, available CLI commands, and current execution context.
- **System Refresh:** Use the --refresh flag to reinitialize the system state by clearing cached logs and resetting any internal states.
- **Build Commands:**
  - **Intermediate Build:** Use --build-intermediate to process and output an intermediate build version of the ontology.
  - **Enhanced Build:** Use --build-enhanced to fetch data from a public API, transform it into an enriched ontology JSON, and output the enhanced build version.
  - **Build Ontology:** **New!** Use --build-ontology to build an ontology from an input file or, if no file is provided, to generate a default built ontology.
- **REST API Server:**
  Launch the REST API server using the --serve flag. The server provides the following endpoints:
  - **GET /health:** Returns a simple health status, e.g., `{ "status": "ok", "message": "Service is healthy" }`.
  - **POST /ontology/build:** Triggers the ontology build process (stub implementation returns a trigger message).
  - **GET /ontology/read:** Returns a persisted OWL ontology in JSON format (stub returns a dummy ontology).
  - **POST /ontology/merge:** Accepts an array of ontology JSON payloads, merges them (stub merge), and returns the merged ontology.
  - **GET /ontology/notify:** Triggers a test WebSocket notification. This endpoint can be used to verify real-time notification functionality.
  - **WebSocket Notifications:** In addition to the HTTP endpoints, the server now supports real-time WebSocket notifications for ontology update events. Clients can connect to the WebSocket endpoint at `ws://localhost:3000` to receive JSON notifications immediately when ontology modifications occur (e.g., on persist, merge, or build operations).
- **Interactive Mode with Enhanced Usability and Editing:** Use the --interactive flag to launch an interactive session for on-the-fly ontology exploration and editing. In interactive mode, you can:
  - Load an ontology with: `load <file>`
  - View the loaded ontology with: `show`
  - List its classes with: `list-classes`
  - **Add a new class:** `add-class <className>`
  - **Remove an existing class:** `remove-class <className>`
  - **Add a new property:** `add-property <key> <value>`
  - **Update an existing property:** `update-property <key> <newValue>` (this command will update the property if it exists or add it if it does not)
  - **Remove a property:** `remove-property <key>`
  - **Persistent Command History:** All commands entered during an interactive session are automatically saved to a history file (located at logs/cli_history.txt) and reloaded on startup, enabling command recall and auto-completion using arrow keys.
  - For help, type: `help`
  - To exit, type: `exit`
- **Ontology Content Query:** Use the **--query** command to search within an ontology for specific content. Provide the path to the ontology JSON file and a search term. Optionally, add the `--regex` flag to interpret the search term as a regular expression.
- **Fetch Ontology from Public Data Source:** **Enhanced!** Use the **--fetch** command to dynamically retrieve ontology data from a public API. If the environment variable FETCH_URL is set, the CLI will perform an HTTP GET request to that URL and transform the returned JSON into a valid ontology. If FETCH_URL is not set or the fetch fails, it will fall back to a default dummy ontology.
- **Export Formats:**
  - **Export OWL/Turtle Format:** Use the **--export-owl** command to convert a JSON ontology into an OWL representation in Turtle format.
  - **Export RDF/XML Format:** **New!** Use the **--export-xml** command to convert a JSON ontology into RDF/XML format, including XML declaration and RDF/XML namespace mappings.
  - **Export JSON-LD Format:** **New!** Use the **--export-jsonld** command to convert a JSON ontology into a JSON-LD format. The output includes an `@context` with namespace keys (e.g., "owl", "rdf", "ex") and maps the ontology's name, version, classes (as OWL classes), and properties into a JSON-LD structured document.
- **Ontology Difference Comparison:** Use the **--diff** command to compare two ontology JSON files and output the differences.
- **New Commands:**
  - **Build Ontology:** `--build-ontology [inputFile]` builds an ontology from a provided JSON file or generates a default built ontology.
  - **Merge Ontology:** `--merge-ontology <file1> <file2> [outputFile]` merges two ontology JSON files and either outputs the result to STDOUT or writes to the specified file.
  - **Query Ontology:** `--query-ontology <ontologyFile> <searchTerm> [--regex]` searches the content of an ontology for a specified term, with optional regex matching.
- **Zod Schema Validation:** Ontology JSON files are validated using a strict Zod schema to ensure required properties are present and of the correct types.
- **Non-deprecated Package Import:** The package version is imported using file read operations to avoid deprecated import assertions.

## Running the REST API Server

To launch the REST API server, use the --serve flag:

```bash
node src/lib/main.js --serve
```

The server listens on port 3000 and will automatically shut down after a short period (unless running in test mode). You can test the endpoints using curl:

- Check health:
  ```bash
  curl http://localhost:3000/health
  ```

- Trigger ontology build:
  ```bash
  curl -X POST http://localhost:3000/ontology/build
  ```

- Read ontology:
  ```bash
  curl http://localhost:3000/ontology/read
  ```

- Merge ontologies (example payload):
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '[{"name": "Ontology1", "version": "1.0", "classes": ["A"], "properties": {"p": "a"}}, {"name": "Ontology2", "version": "1.0", "classes": ["B"], "properties": {"q": "b"}}]' http://localhost:3000/ontology/merge
  ```

- Trigger a test WebSocket notification:
  ```bash
  curl http://localhost:3000/ontology/notify
  ```

## WebSocket Notifications

The server now includes a WebSocket endpoint on the same port (ws://localhost:3000). Clients can connect to this endpoint to receive real-time JSON notifications about ontology events (e.g., when an ontology is persisted, merged, or built).

## Audit Logging

In addition to standard logging, ontology changes are audited. Every time an ontology is modified via interactive commands (like adding/removing classes or properties) or non-interactive commands (such as merging or persisting ontologies), a detailed JSON log entry with the differences (before and after) is recorded in the file logs/ontology_audit.log.

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

- **Export Ontology to RDF/XML Format:**
  ```bash
  node src/lib/main.js --export-xml path/to/ontology.json [path/to/output.xml]
  ```

- **Export Ontology to JSON-LD Format:**
  ```bash
  node src/lib/main.js --export-jsonld path/to/ontology.json [path/to/output.json]
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

- **Build Ontology (New):**
  - Without input file (default built ontology):
    ```bash
    node src/lib/main.js --build-ontology
    ```
  - With input file:
    ```bash
    node src/lib/main.js --build-ontology path/to/ontology.json
    ```

- **Merge Ontology (New):
  ```bash
  node src/lib/main.js --merge-ontology ontology1.json ontology2.json [output.json]
  ```

- **Query Ontology Content (New):
  ```bash
  node src/lib/main.js --query-ontology path/to/ontology.json searchTerm [--regex]
  ```

- **REST API Server:**
  ```bash
  node src/lib/main.js --serve
  ```

- **Interactive Mode with Auto-Completion, Command History, and Editing:**
  ```bash
  node src/lib/main.js --interactive
  ```

- **Ontology Content Query (Legacy):
  ```bash
  node src/lib/main.js --query path/to/ontology.json searchTerm [--regex]
  ```

- **Fetch Ontology from Public Data Source:**
  ```bash
  node src/lib/main.js --fetch [path/to/output.json]
  ```
  > When FETCH_URL environment variable is set, the CLI will fetch data from the specified URL and transform it into a valid ontology.

- **Ontology Difference Comparison:**
  ```bash
  node src/lib/main.js --diff path/to/ontology1.json path/to/ontology2.json
  ```

## Environment Variable Configuration

The CLI tool validates numeric environment variables including DEFAULT_TIMEOUT. If DEFAULT_TIMEOUT is not set, the tool logs an error (LOG_ERR_ENV_NOT_SET) and defaults to 5000. If a non-numeric or non-finite value is provided, it logs an error (LOG_ERR_ENV_NON_FINITE) and uses the fallback value.

For the enhanced --fetch command, you can set a FETCH_URL environment variable to dynamically retrieve ontology data from a public API endpoint. If the fetch fails or FETCH_URL is not provided, the command falls back to a default dummy ontology.

## End-to-End Integration Tests

A suite of end-to-end integration tests verifies all CLI commands, including log creation, diagnostics mode, REST API endpoints, interactive mode enhancements and editing functionality, ontology query functionality, and the new fetch, export-owl, export-xml, export-jsonld, diff, build-ontology, merge-ontology, query-ontology, and WebSocket notification functionalities. To run the integration tests:

```bash
npm run test:e2e
```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).