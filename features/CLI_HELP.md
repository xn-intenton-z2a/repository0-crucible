# Summary
Add a comprehensive built-in help command to guide users on available CLI flags, commands, and usage examples.

# Functional Requirements

In src/lib/main.js:

- Detect `--help` or `-h` in the `args` array before processing any other flags.
- When help flags are present:
  - Read the tool name and version from package.json.
  - Print a help message to stdout that includes:
    - Tool name and version.
    - A list of supported CLI flags with brief descriptions:
      - `--list-sources` — List supported public data source URLs.
      - `--fetch-source <url> [--output-file <path>]` — Fetch JSON from a source and optionally save to file.
      - `--transform-to-owl <url> [--base-uri <uri>] [--output-file <path>]` — Transform data to OWL JSON.
      - `--build-ontologies [--base-uri <uri>] [--output-file <path>]` — Merge all sources into one ontology.
      - `--query-owl <filePath> --query <expression>` — Query an OWL JSON file.
      - `--capital-cities` — Generate an OWL JSON of capital cities.
      - `--serve [--port <number>]` — Start HTTP server exposing REST endpoints.
      - `--refresh-sources <configUrl>` — Refresh the list of supported sources.
      - `--validate-owl <filePath>` — Validate the structure of an OWL JSON file.
      - `--help`, `-h` — Show this help message.
    - Example usage lines demonstrating workflows:
      ```bash
      npm run start -- --list-sources
      npm run start -- --fetch-source https://restcountries.com/v3.1/all
      npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology
      npm run start -- --build-ontologies --base-uri http://example.org/ontology
      npm run start -- --query-owl ontology.json --query "item.id === 'USA'"
      npm run start -- --serve --port 8080
      ```
  - Exit the process with code 0 immediately after printing help.
- Ensure that when help is invoked, no other flag logic runs.
