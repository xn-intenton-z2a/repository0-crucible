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

This consolidation aligns the feature with the repository guidelines, reduces redundancy, and continues to support the mission of offering clear diagnostic commands in the CLI tool.