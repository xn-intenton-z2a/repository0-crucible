# Summary
Add a built-in help command to display usage information, available flags, and examples for the CLI tool.

# Functional Requirements

In `src/lib/main.js`:

- Detect `--help` or `-h` in the `args` array before processing any other flags.
- When detected:
  - Read the tool name and version from `package.json`.
  - Print a help message that includes:
    - The tool name and version.
    - A list of supported CLI flags with descriptions:
      - `--list-sources` — List supported public data source URLs.
      - `--fetch-source <url> [--output-file <path>]` — Fetch JSON from a source and optional file output.
      - `--transform-to-owl <url> [--base-uri <uri>] [--output-file <path>]` — Transform JSON to OWL.
      - `--build-ontologies [--base-uri <uri>] [--output-file <path>]` — Merge sources into one ontology.
      - `--query-owl <filePath> --query <expression>` — Query an OWL JSON file.
      - `--capital-cities` — Generate OWL JSON of capital cities.
      - `--serve [--port <number>]` — Start an HTTP server exposing REST endpoints.
      - `--refresh-sources <configUrl>` — Refresh data source list from remote config.
      - `--validate-owl <filePath>` — Validate OWL JSON structure.
      - `--help` or `-h` — Show this help message.
    - Example usage lines demonstrating common workflows:
      ```bash
      npm run start -- --list-sources
      npm run start -- --fetch-source https://restcountries.com/v3.1/all
      npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology
      npm run start -- --build-ontologies --base-uri http://example.org/ontology
      npm run start -- --query-owl ontology.json --query "item.id === 'USA'"
      npm run start -- --serve --port 8080
      ```
  - Exit the process with code `0` immediately after printing help.

# Testing

In `tests/unit/main.test.js`:

- Simulate `main(["--help"])` and `main(["-h"])`:
  - Spy on `console.log` to capture output.
  - Assert output includes at least one flag name (e.g., `--list-sources`) and one example invocation (contains `npm run start`).
  - Spy on `process.exit` and verify it is called with code `0`.
