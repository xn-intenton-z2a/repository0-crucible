features/CLI_PARSER.md
# features/CLI_PARSER.md
# CLI_PARSER Feature Specification

## Overview
This feature consolidates the CLI parser functionality by merging the improvements from the previous REFACTOR_CLI and CLI_PARSER features. The goal is to streamline the flag dispatch mechanism into a single, maintainable implementation. The consolidated parser supports all existing flags including --help, --version, --agentic (with strict JSON validation), --dry-run, --diagnostics, and --capital-cities. This update enhances overall stability and aligns with the mission to provide a robust CLI tool for managing OWL ontologies.

## Implementation
- Update the src/lib/main.js file to use a unified mapping for processing CLI flags.
- For --help and --version, output the appropriate usage instructions and version information from package.json.
- For --agentic, ensure the JSON payload is parsed and validated correctly (it must include either a 'command' string or a 'commands' array), then invoke the agenticHandler function with validation for --dry-run mode.
- For --dry-run, simulate execution without making actual changes.
- For --diagnostics and --capital-cities, output the corresponding diagnostic information and sample OWL ontology respectively.
- Preserve robust error handling and proper argument validation for unrecognized or improperly formatted flags.
- Merge redundant code from the REFACTOR_CLI feature into this unified implementation.

## Testing
- Update tests/unit/main.test.js to verify that each CLI flag produces the expected log outputs and behaviors.
- Include cases for valid and invalid inputs, ensuring that missing parameters and malformed JSON trigger the correct error messages and usage instructions.
- Confirm that edge cases and simultaneous flag conditions are handled gracefully.

## Documentation
- Revise README.md and docs/USAGE.md to document the consolidated CLI flag usage, with clear instructions and examples.
- Ensure that examples reflect the new unified behavior without altering the core user experience.
- Maintain alignment with the mission to support OWL ontology management via the CLI tool.features/ALIAS_PARSER.md
# features/ALIAS_PARSER.md
# Overview
This feature adds alias substitution capability to the CLI parser. The implementation reads a COMMAND_ALIASES environment variable containing a JSON mapping of alias names to canonical flag names. When the CLI tool is invoked, any flag starting with '--' will be inspected for alias substitution before validation.

# Implementation
The src/lib/main.js file will be updated as follows:
- Before processing the arguments, the code will attempt to read the COMMAND_ALIASES environment variable. If defined, it will parse the JSON string into a mapping object.
- Iterate over the provided arguments and, for each flag (i.e. starting with '--'), check if the flag (without the '--' prefix) exists as a key in the mapping. If so, substitute the argument with the canonical flag, retaining the '--' prefix.
- Continue with the existing validation and processing of supported flags. This will allow flags such as '--ls' to be automatically converted to '--help' (or another appropriate mapping) as defined in the environment variable.
- Update error handling to ensure that an alias which does not resolve to a recognized flag will trigger an appropriate unknown flag error.

# Testing
The tests in tests/unit/main.test.js will be extended:
- Add a test case where a known alias (for example, '--ls' mapping to '--help') is provided as an argument. The test should verify that the help message is displayed.
- Ensure that flags that are not substituted continue to be processed correctly.

# Documentation
The README.md and docs/USAGE.md files will be updated. The documentation will include:
- Explanation of how to set the COMMAND_ALIASES environment variable to enable alias substitution.
- Examples of using alias flags with the CLI tool, such as setting the alias and then invoking the tool with '--ls'.
- Any caveats regarding whitespace or error handling during alias substitution.

This feature enhances the CLI parser in line with the repository mission by promoting flexibility and user-friendliness in flag usage while keeping changes limited to the allowed files.features/SIMULATE_DELAY.md
# features/SIMULATE_DELAY.md
# SIMULATE_DELAY Feature Specification

## Overview
This feature introduces a simulated delay functionality to the CLI tool. Using a new flag, --simulate-delay, users can specify a delay in milliseconds before the tool carries out its normal processing. This feature allows for testing of asynchronous scenarios and can help in diagnosing timing related issues without affecting the overall error handling and flow.

## Implementation
The following updates will be made in the permitted files:

- In the src/lib/main.js file:
  - Add "--simulate-delay" to the list of supported flags.
  - When the flag is encountered, verify that a valid numeric value follows it. If the value is missing or invalid, trigger an error message and display help instructions.
  - If a valid millisecond value is provided, use a timer (setTimeout) to delay further execution of CLI processing. After the delay, continue processing with the default flag behavior.

- In the tests/unit/main.test.js file:
  - Add a new test case for the --simulate-delay flag. Use a method to simulate or fake timers if possible to assert that the CLI processing is delayed by the correct amount of time.
  - Verify that a delay value which is not numeric generates an appropriate error message.

- In the README.md and docs/USAGE.md files:
  - Update the CLI usage documentation to include the new --simulate-delay flag with a description of its purpose and usage examples.

## Testing
Unit tests will cover the following scenarios:

- Passing a valid numeric delay in milliseconds. Ensure that the tool waits for the specified delay before proceeding with its usual flag processing.
- Passing an invalid delay value (for example, a non-numeric string) should trigger an error message and exit.
- The test should simulate environment conditions using available test helpers or fake timers provided by Vitest, ensuring that the delay does not slow down automated testing.

This feature enhances the diagnostic capabilities of the CLI tool and aligns with our mission to provide robust troubleshooting tools in a single repository setting.features/AGENTIC_JSON.md
# features/AGENTIC_JSON.md
# Overview
This feature enhances the handling of the --agentic flag by enabling JSON parsing of the supplied argument. The CLI tool will now validate the JSON payload to support both single command objects and batch commands (an array under the key commands) as specified in the agentic library guidelines. The output from processing the JSON payload will be logged to the console.

# Implementation
In the src/lib/main.js file, update the block processing the --agentic flag. Rather than only checking for the presence of a next argument, the implementation will now:
  - Attempt to parse the provided argument as JSON.
  - Validate that the JSON contains either a key command (for a single command) or commands (for an array of commands).
  - If the JSON is valid, call the agenticHandler function (as defined in the agentic library) with the parsed object.
  - Log the result returned by agenticHandler to the console. In case of any errors (invalid JSON or missing required keys), print an appropriate error message and display the help instructions.

# Testing
The tests in tests/unit/main.test.js will be updated to include scenarios where:
  - A valid JSON payload containing a single command is supplied to --agentic and the result is verified.
  - A valid JSON payload containing a commands array is processed correctly.
  - An invalid JSON payload or missing required key triggers an error message with help instructions.

# Documentation
The README.md and docs/USAGE.md files will have additional sections describing the enhanced agentic flag usage. These sections will provide examples of how to supply both single and multiple commands in JSON format. For example, running the tool with:

  node src/lib/main.js --agentic {command: doSomething}

or

  node src/lib/main.js --agentic {commands: [cmd1, cmd2]}

will process the JSON input as intended, enhancing the versatility of the CLI tool in line with the repository mission.features/SIMULATE_ERROR.md
# features/SIMULATE_ERROR.md
# SIMULATE_ERROR Feature Specification

## Overview
This feature adds a simulated error mode to the CLI tool via a new flag (--simulate-error). When the flag is provided, the tool will deliberately trigger an error scenario and output a formatted error message. This helps developers test error handling, logging, and diagnostic workflows without requiring an actual failure in the application logic.

## Implementation
The following updates will be made:

- In the src/lib/main.js file:
  - Add "--simulate-error" to the supported flags list.
  - Check for the presence of the flag before other processing. If present, output a simulated error message (using console.error) and exit the execution early.

- In the tests/unit/main.test.js file:
  - Add a new test case to simulate error mode by passing the "--simulate-error" flag and verify that the error message is displayed. This test ensures that the CLI terminates with a proper error message instead of proceeding with normal command processing.

- In the README.md and docs/USAGE.md files:
  - Update the CLI usage documentation to include the new "--simulate-error" flag, explaining its purpose for testing error scenarios.

## Testing
The unit tests will be updated to simulate the following scenario:

- Passing the "--simulate-error" flag should trigger the error simulation and output a message confirming the simulated error.

This enhancement is aligned with the repository mission to provide clear troubleshooting and diagnostic tools within the CLI, making error conditions reproducible and easier to debug.
features/SIMULATE_LOAD.md
# features/SIMULATE_LOAD.md
# SIMULATE_LOAD Feature Specification

## Overview
This feature introduces a simulated load capability for the CLI tool. By providing the --simulate-load flag with a numeric value in milliseconds, users can test how the program behaves under prolonged CPU load conditions. This is especially useful for diagnosing performance issues and for stress testing parts of the CLI tool that interact with resource-intensive operations.

## Implementation
The changes will be applied in the allowed files as follows:
- In the src/lib/main.js file:
  - Add "--simulate-load" to the list of supported flags.
  - When the flag is detected, verify a valid numeric value follows it. If the value is missing or invalid, display an appropriate error message and the help instructions.
  - Once a valid value is provided, simulate load via a busy-wait loop or a CPU-intensive operation that runs for at least the provided number of milliseconds. After completing the simulated load, continue processing the remaining CLI flags normally.

- In the tests/unit/main.test.js file:
  - Add a new test case for the --simulate-load flag. Utilize time measurement to assert that the CPU load simulation takes at least the expected number of milliseconds.
  - Include tests for invalid or missing load values to confirm that errors are handled gracefully.

- In the README.md and docs/USAGE.md files:
  - Update the CLI usage documentation to include a description of the --simulate-load flag, its purpose, and usage examples.

## Testing
Tests will verify the following scenarios:
- Providing a valid numeric load value results in the CLI tool executing a busy-wait for the specified duration before proceeding.
- Using an invalid value (or no value) triggers an error message and displays the help instructions.

This feature enhances the diagnostic and testing capabilities of the CLI tool, aligning with the repository mission to provide robust troubleshooting and performance testing tools in a single repository build.
