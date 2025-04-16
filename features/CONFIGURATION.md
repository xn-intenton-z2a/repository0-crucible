# CONFIGURATION

## Overview
This feature leverages the existing dependency on dotenv to add configuration management capabilities to the CLI tool. It now not only loads environment variables from a .env file but also validates the presence of required environment variables. This enhancement improves runtime flexibility, offers early detection of misconfigurations, and aligns with best practices for managing configurable parameters in production. Additionally, users can verify the loaded configuration via a dedicated CLI flag.

## Implementation Details
1. **Environment Loading & Validation:**
   - At the very beginning of `src/lib/main.js`, import and invoke `dotenv.config()` so that environment variables are loaded from a `.env` file if present.
   - Immediately after loading the configuration, validate specific required environment variables (for example, `APP_ENV` and `API_KEY`). For each required variable, check if it exists and if not, output a warning message to the console, e.g.:
     ```js
     const requiredEnv = ['APP_ENV', 'API_KEY'];
     requiredEnv.forEach(key => {
       if (!process.env[key]) {
         console.warn(`Warning: Required environment variable ${key} is not set.`);
       }
     });
     ```
   - This ensures users are aware of missing essential settings before the CLI processes further commands.

2. **New CLI Flag: `--config`**
   - Introduce a new command-line flag `--config` to display the currently loaded configuration.
   - When the CLI is invoked with the `--config` flag, the tool should output a JSON representation of relevant environment variables and then exit.
   - This serves both as a debugging tool and as a verification step for configuration correctness.

3. **Source File Modifications (`src/lib/main.js`):**
   - Import and invoke `dotenv.config();` at the top of the main function.
   - Add the environment variable validation logic immediately after configuration is loaded.
   - Implement logic that checks for `--config` in the arguments, outputs the JSON formatted configuration using `JSON.stringify(process.env, null, 2)`, and then exits.

4. **Testing (`tests/unit/main.test.js`):**
   - Update tests to simulate CLI calls with the `--config` flag.
   - Write new tests to ensure that if required environment variables are missing (or set to empty), a warning message is output to the console.
   - Ensure that when the environment is properly configured, no warning is produced and the expected configuration is displayed.

5. **Documentation Updates (README.md):**
   - Update the **CLI Options** section to include the configuration flag:
     ```bash
     node src/lib/main.js --config
     ```
   - Add documentation explaining that missing required environment variables (e.g., `APP_ENV` and `API_KEY`) will result in warning messages, and provide guidance on how to set these variables in a `.env` file.

## Long-Term Direction
This configuration feature now provides both environment loading and validation, laying the foundation for more robust runtime customization. Future iterations could support dynamic configuration reloading, more granular filtering of environment variables, and integration with remote configuration services. For now, this enhancement provides a clear mechanism to ensure the system is properly configured before processing further commands.