# Summary
Add a built-in help command for the CLI to display usage information, available flags, and examples, enabling users to discover functionality without external documentation.

# Functional Requirements
- In src/lib/main.js, before processing other flags, detect `--help` or `-h` in the `args` array.
- When detected:
  - Read the tool name and version from package.json.
  - Print a help message showing:
    - Tool name and version.
    - List of supported CLI flags and brief descriptions:
      - `--list-sources` — List supported data source URLs.
      - `--fetch-source <url> [--output-file <path>]` — Fetch JSON from a source and optional file output.
      - `--transform-to-owl <url> [--base-uri <uri>] [--output-file <path>]` — Transform JSON to OWL JSON.
      - `--build-ontologies [--base-uri <uri>] [--output-file <path>]` — Merge sources into a single OWL ontology.
      - `--query-owl <filePath> --query <expression>` — Query an OWL JSON file.
      - `--capital-cities` — Generate OWL JSON of capital cities.
      - `--serve [--port <number>]` — Start HTTP server exposing API endpoints.
      - `--refresh-sources <configUrl>` — Refresh the list of supported data sources.
      - `--validate-owl <filePath>` — Validate OWL JSON file structure.
    - Example usage lines demonstrating common workflows.
  - Exit the process with code 0 immediately after printing help.

# CLI Usage
```bash
# Display help
npm run start -- --help
# or
npm run start -- -h
```

# Testing
- In tests/unit/main.test.js, simulate `main(["--help"])` and `main(["-h"])`:
  - Spy on `console.log` to capture output and assert that it includes at least one flag name (e.g., `--list-sources`) and one example invocation (contains `npm run start`).
  - Spy on `process.exit` to verify it is called with code 0.

# Documentation
- Update README.md:
  - Under **Features**, add a **Help** entry describing `--help` and `-h` flags.
  - Under **Usage**, include an example invocation and note on printed help output.