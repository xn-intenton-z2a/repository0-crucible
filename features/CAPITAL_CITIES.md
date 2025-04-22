# CAPITAL_CITIES Feature

This feature implements the `--capital-cities` flag for the CLI tool. When a user invokes the CLI with `--capital-cities`, the tool will output a JSON formatted list of capital cities. This aligns with the mission of demonstrating public data sources and providing example commands via the CLI. 

## Updates in Source File (src/lib/main.js)
- Add logic in the `main` function to detect the `--capital-cities` command line argument.
- When `--capital-cities` is detected, output a JSON object mapping a few sample country names to their respective capital cities, e.g.: `{ "France": "Paris", "Japan": "Tokyo", "USA": "Washington, D.C." }`.
- Ensure that if no recognized flag is provided, the CLI behaves as currently defined.

## Updates in Test File (tests/unit/main.test.js)
- Add tests to simulate invocation of the CLI with the `--capital-cities` flag.
- The test will capture the console output and assert that the output is a valid JSON string containing the expected key-value pairs.

## Updates in README File (README.md)
- Update the Usage section to document the new `--capital-cities` flag.
- Provide an example command:

  ```bash
  node src/lib/main.js --capital-cities
  ```

- Describe the expected output and its relevance to the mission of showcasing OWL ontology tools.

## Updates in Dependencies File (package.json)
- No dependency changes are required for this feature. The current dependencies provide sufficient support for Node 20 and ECMAScript modules.

This feature is scoped to modifications of existing files and directly supports the mission of providing accessible and useful CLI functionalities in a single repository.