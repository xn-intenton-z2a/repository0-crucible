# ENV_VALIDATION

## Overview
This feature adds an environment validation mode to the CLI tool. When the `--env` flag is provided, the tool will load configuration from environment variables using the existing `dotenv` package and verify that required environment variables (e.g. `OPENAI_API_KEY`) are present. This immediate check aids in ensuring that the agent runs with all required settings, avoiding runtime errors due to missing configurations.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Import and configure `dotenv` at the beginning of the CLI execution if the `--env` flag is detected.
  - In the main function, check if `--env` is part of the arguments. If so, load environment variables using `require('dotenv').config()` and verify the presence of `process.env.OPENAI_API_KEY` (or any other required variables).
  - Output a message indicating whether the environment is correctly configured or not, and exit after validation.

- **Test File Update (tests/unit/main.test.js):**
  - Add a test case that simulates running the program with the `--env` flag.
  - This test should temporarily set or unset the `OPENAI_API_KEY` environment variable and capture the CLI output to assert that the correct validation message is printed.

- **README Update (README.md):**
  - Update the usage section to document the new `--env` flag. Include an example command such as:
    ```bash
    node src/lib/main.js --env
    ```
  - Explain that this mode performs a check on critical environment variables before proceeding with normal execution.

- **Dependencies File Update (package.json):**
  - No additional dependencies are required, as the feature leverages the existing `dotenv` package.

## Testing & Compatibility
- Run `npm test` to include unit tests for environment validation mode.
- Verify that when the environment variable is missing, the CLI outputs a clear error message and advises on setting the variable.
- Confirm that when all required variables are set, the CLI indicates that the environment is properly configured.
