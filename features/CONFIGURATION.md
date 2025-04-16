# CONFIGURATION

## Overview
This feature leverages the existing dependency on dotenv to add configuration management capabilities to the CLI tool. By loading environment variables from a .env file and exposing a new command-line flag, users can customize runtime behavior without modifying source code. This not only improves flexibility but also aligns with best practices for managing secrets and configurable parameters in production.

## Implementation Details
1. **Environment Loading:**
   - At the very beginning of `src/lib/main.js`, import and invoke `dotenv.config()` so that environment variables are loaded from a `.env` file if present.
   - Ensure this initialization happens before any processing of command-line arguments.

2. **New CLI Flag: `--config`**
   - Introduce a new command-line flag `--config` to display the currently loaded configuration.
   - When the CLI is invoked with the `--config` flag, the tool should output a JSON representation of specific environment variables (or all process.env, optionally filtered for relevant keys) and then exit.
   - This output assists in verifying that the configuration has been loaded correctly and can also be used for debugging.

3. **Source File Modifications (`src/lib/main.js`):**
   - Add `import dotenv from 'dotenv';` at the top of the file.
   - Call `dotenv.config();` early in the main function to ensure configuration is loaded before processing any flags.
   - Implement logic that checks if `args.includes('--config')` and, if so, prints the configuration in JSON format (for example, using `JSON.stringify(process.env, null, 2)`) and exits.

4. **Testing (`tests/unit/main.test.js`):**
   - Add unit tests to simulate CLI calls with the `--config` flag.
   - The tests should set up specific environment variables (using `process.env`) and then confirm that the output for the `--config` flag correctly reflects these values.

5. **Documentation Updates (README.md):**
   - Update the **CLI Options** section to include a new bullet for **Configuration**:
     - **Configuration:**
       ```bash
       node src/lib/main.js --config
       ```
       When this flag is used, the CLI loads environment variables from a `.env` file and displays the current configuration in JSON format.

## Long-Term Direction
This configuration feature lays the foundation for more advanced runtime customization. Future iterations might support dynamic reloading of configuration, more granular filtering of environment variables, or even integration with remote configuration services. For now, it provides a simple yet powerful mechanism for managing runtime parameters while keeping the CLI behavior flexible and secure.