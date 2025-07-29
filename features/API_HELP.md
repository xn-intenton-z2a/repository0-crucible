# Summary
Add a unified help command for the CLI to display usage, flags, and examples. This ensures users can discover and understand available features without consulting documentation files.

# Functional Requirements

- In src/lib/main.js:
  - Detect the flags `--help` or `-h` before any other flag processing in the `main(args)` entrypoint.
  - When detected:
    1. Read the tool name and version from package.json.
    2. Print a help message that includes:
       - Tool name and version.
       - A description of each CLI flag:
         - `--list-sources` — list supported data source URLs.
         - `--fetch-source <url> [--output-file <path>]` — fetch JSON data and optional file output.
         - `--transform-to-owl <url> [--base-uri <uri>] [--output-file <path>]` — transform JSON to OWL.
         - `--build-ontologies [--base-uri <uri>] [--output-file <path>]` — merge sources into one OWL.
         - `--query-owl <filePath> --query <expression>` — query an OWL JSON file.
         - `--capital-cities` — generate OWL of capital cities.
         - `--serve [--port <number>]` — start HTTP server.
         - `--refresh-sources <configUrl>` — refresh data source list.
         - `--validate-owl <filePath>` — validate OWL JSON structure.
       - Example usage lines demonstrating common workflows.
    3. Exit with code 0 immediately after printing help, without processing other flags.

# Testing Requirements

- In tests/unit/main.test.js:
  - Simulate `main(["--help"])` and `main(["-h"])`:
    - Spy on `console.log` and capture output.
    - Assert that the output includes at least one flag name (e.g., `--list-sources`) and one example line (contains `npm run start`).
    - Verify `process.exit(0)` is called.
