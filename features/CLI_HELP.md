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

This feature is consistent with the mission to make the CLI tool user friendly by providing standard help documentation and aligns with the development guidelines in CONTRIBUTING.md. It is localized to changes in the source file, tests, README, and dependencies file, ensuring that it remains achievable within a single repository.