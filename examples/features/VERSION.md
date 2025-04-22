# VERSION

## Overview
This feature adds a version output functionality to the CLI tool. When invoked with the `--version` flag, the agent will output the current version of the repository (read from the package configuration) and exit. This enhancement provides a quick reference for users and aids in verifying that the correct version of the tool is in use.

## Implementation Details

### Source File Update
- Modify `src/lib/main.js` to inspect the provided CLI arguments.
- If the argument `--version` is present, output the version (e.g., "1.2.0-0") as defined in the project's package.json file. For simplicity, the version string can be hard-coded or imported from the package configuration if available.
- Ensure that the version output is styled appropriately using basic Chalk styling (if the STYLING feature is integrated) or plain text if not.

### Test File Update
- Update `tests/unit/main.test.js` to include a test case invoking `main()` with the `--version` argument. The test should verify that the output includes the expected version string and that the function terminates without errors.

### README Update
- Update the `README.md` file to document the new `--version` flag. Provide an example command such as `node src/lib/main.js --version` and describe what output users should expect.

### Dependencies File Update
- No additional dependencies are required for this feature.

## Benefits and Alignment
- This feature provides immediate version awareness, aiding in debugging and version management.
- It aligns well with the mission of providing a clear, informative interface for users as part of the broader agentic automation system.

## Long-Term Considerations
- Future enhancements could include dynamically reading the version from package.json to avoid hard-coding the value.
- Additional flags like `--help` or more detailed information may be integrated into this routing logic in subsequent iterations.
