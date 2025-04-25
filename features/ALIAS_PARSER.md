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

This feature enhances the CLI parser in line with the repository mission by promoting flexibility and user-friendliness in flag usage while keeping changes limited to the allowed files.