# Summary
Add a built-in help command to display usage information, available flags, and examples for the CLI tool.

# Functional Requirements

## Detect Help Flags
- In `src/lib/main.js`, before processing any other flags, check if `--help` or `-h` is included in `args`.
- If detected:
  - Print a help message to stdout.
  - Call `process.exit(0)` immediately without executing other commands.

## Help Message Content
- The help output must include:
  1. Tool name and version (read from `package.json`).
  2. List of supported CLI flags with brief descriptions:
     - `--list-sources` — List supported public data source URLs.
     - `--fetch-source <url> [--output-file <path>]` — Fetch JSON from a source and optional file output.
     - `--transform-to-owl <url> [--base-uri <uri>] [--output-file <path>]` — Transform source JSON to OWL.
     - `--build-ontologies [--base-uri <uri>] [--output-file <path>]` — Merge all sources into one ontology.
     - `--query-owl <filePath> --query <expression>` — Query a local OWL JSON file.
     - `--capital-cities` — Produce an OWL JSON of capital cities.
     - `--serve [--port <number>]` — Start HTTP server exposing API.
     - `--refresh-sources <configUrl>` — Refresh data source list from a remote URL.
     - `--validate-owl <filePath>` — Validate an OWL JSON file's structure.
  3. Example usage lines demonstrating common workflows.

## Testing
- In `tests/unit/main.test.js`:
  - Simulate `main(["--help"])` and `main(["-h"])`:
    - Spy on `console.log` and capture output.
    - Verify that the output includes at least one flag name and one example line.
    - Verify that `process.exit(0)` is called.

# Documentation
- Update `README.md`:
  - Add a **Help** section under **Features** describing `--help` and `-h`.
  - In **Usage**, include example invocation:
    ```bash
    node src/lib/main.js --help
    ```