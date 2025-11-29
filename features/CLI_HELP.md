# Summary
Add a built-in help command to display usage information, list available flags, and provide usage examples for the CLI tool.

# Functional Requirements

- In src/lib/main.js:
  1. Before processing any other flags, detect the presence of "--help" or "-h" in the args array.
  2. When detected:
     - Read the tool name and version from package.json.
     - Print a help message to stdout that includes:
       * Tool name and version.
       * A list of supported CLI flags and brief descriptions:
         - --list-sources — List supported public data source URLs.
         - --fetch-source <url> [--output-file <path>] — Fetch JSON from a source and optional file output.
         - --transform-to-owl <url> [--base-uri <uri>] [--output-file <path>] — Transform data to OWL JSON.
         - --build-ontologies [--base-uri <uri>] [--output-file <path>] — Merge multiple sources into one ontology.
         - --query-owl <filePath> --query <expression> — Execute queries against an OWL JSON file.
         - --capital-cities — Generate an OWL JSON ontology of capital cities.
         - --serve [--port <number>] — Start an HTTP server exposing REST endpoints.
         - --refresh-sources <configUrl> — Refresh the list of supported sources from a remote JSON endpoint.
         - --validate-owl <filePath> — Validate an OWL JSON file's structure.
         - --help, -h — Show this help message.
       * Example usage lines demonstrating common workflows:
         ```bash
         npm run start -- --list-sources
         npm run start -- --fetch-source https://restcountries.com/v3.1/all
         npm run start -- --transform-to-owl https://restcountries.com/v3.1/all --base-uri http://example.org/ontology
         npm run start -- --build-ontologies --base-uri http://example.org/ontology
         npm run start -- --query-owl ontology.json --query "item.id === 'USA'"
         npm run start -- --serve --port 8080
         ```
     - Immediately exit with code 0 after printing the help message.
  3. When help is invoked, no other flag logic should run.

# Testing

- In tests/unit/main.test.js:
  * Simulate `main(["--help"])` and `main(["-h"])`.
  * Spy on console.log to capture output and verify it includes at least one flag name (e.g. "--list-sources") and one example invocation containing "npm run start".
  * Spy on process.exit to verify it is called with code 0.