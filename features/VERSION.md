# VERSION Feature

This feature adds a new CLI flag, --version, to output the current version of the tool as specified in the package.json file. This utility supports users in quickly identifying the version of the CLI tool they are running, in line with our mission to provide clear diagnostic and operational commands.

## Updates in Source File (src/lib/main.js)
- Import the package.json using dynamic import or require depending on the ESM formulation to access the version field.
- Enhance the main function to detect if the --version flag is present among the arguments.
- If the flag is detected, output the version string and terminate without executing further commands.
- If the flag is not provided, the CLI tool should run its default behavior.

## Updates in Test File (tests/unit/main.test.js)
- Add tests to simulate the CLI invocation with the --version flag.
- Capture the output and assert that the output includes a version number that corresponds to the one in package.json.

## Updates in README File (README.md)
- Update the Usage section to include documentation for the --version flag.
- Provide an example command: node src/lib/main.js --version
- Explain the purpose of the --version flag and how it helps users verify the version of the tool.

## Updates in Dependencies File (package.json)
- No changes to dependencies are required as the current Node.js version and module system support the necessary operations.

This feature is self-contained within a single repository and enhances the CLI tool by providing a standard version output command, making it consistent with our philosophy of clear and accessible tool usage.