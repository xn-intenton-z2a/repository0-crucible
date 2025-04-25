features/SPARQL_QUERY.md
# features/SPARQL_QUERY.md
# SPARQL_QUERY Feature

This feature introduces a new CLI flag, --sparql, that simulates executing a SPARQL query against an OWL ontology dataset. When invoked, the CLI tool will output a JSON formatted simulated SPARQL query result based on sample data from public ontologies. This aligns with our mission of providing example tools for querying OWL ontologies.

## Updates in Source File (src/lib/main.js)
- Add a new branch in the main function to detect the --sparql flag.
- When the flag is detected, call a new function executeSPARQLQuery that simulates running a SPARQL query. The function will output a JSON result with keys such as "result" and "bindings".
- The simulated output can be a simple JSON object, e.g. { result: 'Sample SPARQL query response', bindings: [] }.
- This change is self-contained and follows the style of existing flags in the CLI tool.

## Updates in Test File (tests/unit/main.test.js)
- Add a new test case to simulate the invocation of the CLI with the --sparql flag.
- Capture console output and assert that the result is valid JSON containing a key "result" with value "Sample SPARQL query response" and a "bindings" key that is an array.

## Updates in README File (README.md)
- Update the Usage section to document the new --sparql flag.
- Provide an example command, for instance: node src/lib/main.js --sparql.
- Describe the expected JSON output and mention its role in demonstrating basic SPARQL query simulation functionality.

## Updates in Dependencies File (package.json)
- No changes to existing dependencies are required as the current setup supports the new flag functionality.

This feature is designed to be straightforward and maintainable, expanding the CLI tool with simulated SPARQL query capability in line with our library's mission of demonstrating OWL ontology interaction using public data.
features/DATA_CRAWL.md
# features/DATA_CRAWL.md
# DATA_CRAWL Feature

This feature provides the functionality to simulate the crawling of public data sources. When a user invokes the CLI with the --crawl flag, the tool executes a simulated data crawl via the crawlData function. This behavior aligns with the mission of owl-builder, which includes crawling open public data sources to generate JSON files.

## Updates in Source File (src/lib/main.js)
- Recognize the --crawl flag in the main function and call the crawlData function.
- The crawlData function will log a message stating that it is crawling data from public sources. In a real-world scenario, this function can be extended to fetch data from public APIs or websites.
- Ensure that other flags like --help and --version continue to work as expected.

## Updates in Test File (tests/unit/main.test.js)
- Add a test case to simulate the invocation of the CLI with the --crawl flag.
- Capture the console output and assert that the output includes the expected message indicating the crawl behavior.

## Updates in README File (README.md)
- Update the Usage section to include the new --crawl flag and describe its purpose.
- Provide an example command:
    node src/lib/main.js --crawl
- Explain that this command simulates the process of crawling data sources and is a demonstration of how owl-builder can be extended for real-world data processing.

## Updates in Dependencies File (package.json)
- No changes to dependencies are required, as the current setup supports this functionality.

This feature is localized within modifications of the source file, tests, and documentation. It reinforces a key part of the mission by demonstrating how public data crawling can be initiated and verified by users.features/VERSION_INFO.md
# features/VERSION_INFO.md
# VERSION_INFO Feature

This feature consolidates the version output functionality by merging the simple version flag (--version) and the detailed version flag (--version-details) into one unified component. The goal is to reduce redundancy in the feature set while still providing both options to the user.

## Behavior
- When the CLI is invoked with the --version flag, the tool will read the version from package.json and output just the version number.
- When the CLI is invoked with the --version-details flag, the tool will output a detailed JSON object. This object includes properties like version, name, description, and, if available, repository information.

## Updates in Source File (src/lib/main.js)
- Replace the separate handleVersion and handleVersionDetails functions with a unified version info handler.
- In the main function, check if --version-details is present; if so, invoke the detailed version output. Otherwise, if --version is present, output the basic version number.
- Ensure that the check for --version-details takes precedence over --version.

## Updates in Test File (tests/unit/main.test.js)
- Update the tests to verify that when --version is provided, the correct version number is printed.
- Also verify that when --version-details is provided, the output is valid JSON containing keys such as version, name, and description (and repository if available).

## Updates in README File (README.md)
- Update the usage documentation to describe the enhanced version information feature under a unified VERSION_INFO heading.
- Provide example commands for both --version and --version-details to guide the user.

## Dependencies File (package.json)
- No changes are required in the dependencies file since the current node and ESM support is sufficient for these operations.

This consolidation aligns the feature with the repository guidelines, reduces redundancy, and continues to support the mission of offering clear diagnostic commands in the CLI tool.features/CLI_HELP.md
# features/CLI_HELP.md
# CLI_HELP Feature

This feature enhances the CLI tool to properly handle a `--help` command. When the user supplies `--help` as an argument, the application will print a detailed help message listing available commands and usage instructions.

## Updates in Source File

- In `src/lib/main.js`, add logic to inspect the arguments passed to the `main` function. If `--help` is detected, the tool will print a friendly help message and exit without processing further commands.
- The help message will include descriptions for commands such as `--help`, `--capital-cities`, `--diagnostics`, and any other available subcommands mentioned in the README.

## Updates in Test File

- In `tests/unit/main.test.js`, add or update tests to check that invoking the CLI with the `--help` flag correctly outputs the help message and exits cleanly.

## Updates in README File

- Update the Usage section in `README.md` to include the new behavior for the `--help` flag. Provide examples of how to invoke the CLI with the help command.

## Updates in Dependencies File

- No additional dependencies are required for this feature, but verify that the existing dependencies support the Node.js version and the parsing of command line arguments.

This feature is consistent with the mission to make the CLI tool user friendly by providing standard help documentation and aligns with the development guidelines in CONTRIBUTING.md. It is localized to changes in the source file, tests, README, and dependencies file, ensuring that it remains achievable within a single repository.features/DIAGNOSTICS.md
# features/DIAGNOSTICS.md
# DIAGNOSTICS Feature

This feature adds a new CLI flag, `--diagnostics`, to provide useful runtime and environment diagnostics. When invoked with this flag, the CLI tool gathers and outputs information such as the Node.js version, operating system details, and current environment variables. This helps users verify the running environment and identify potential issues, aligning with the mission of clarity and providing examples for easy troubleshooting.

## Updates in Source File (src/lib/main.js)
- Enhance the `main` function to check if `args` contains the `--diagnostics` flag.
- When the flag is detected, gather diagnostic data including:
  - Node.js version (`process.version`)
  - Process platform (`process.platform`)
  - Process architecture (`process.arch`)
  - Environment variables, if needed (a selected subset for brevity)
- Output the diagnostic data as a formatted JSON object to the console.
- Ensure that if the diagnostics flag is not present, the CLI falls back to its default behavior.

## Updates in Test File (tests/unit/main.test.js)
- Add tests to simulate invocation of the CLI with the `--diagnostics` flag.
- Capture the console output and assert that the output is valid JSON containing at least the Node.js version and platform details.

## Updates in README File (README.md)
- Update the Usage section to document the new `--diagnostics` flag.
- Provide an example command:

  ```bash
  node src/lib/main.js --diagnostics
  ```

- Describe the expected output, emphasizing the usefulness for troubleshooting and environment verification.

## Updates in Dependencies File (package.json)
- No dependency updates are required as the current dependencies support the necessary Node.js functionality.

This feature is designed to be simple, self-contained, and aligned with our mission of clarity in demonstrating public data and example commands, enhancing overall user experience.features/CAPITAL_CITIES.md
# features/CAPITAL_CITIES.md
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