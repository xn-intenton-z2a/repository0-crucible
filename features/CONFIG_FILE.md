# Overview

Introduce support for a project-level or user-level JSON configuration file that defines default CLI and HTTP API server options. Users can create a file named `.picrc.json` in the project root or in their home directory to avoid repeating common flags and parameters.

# Implementation

1. Configuration File Discovery
   • Look for a file named `.picrc.json` first in the current working directory, then in the user home directory.
   • If found, parse the JSON content into an object; on parse errors, log a warning and ignore the file.

2. Merging Configuration
   • Before parsing CLI arguments with `minimist`, load configuration from the file and merge into default options.
   • Any flag explicitly provided on the command line should override the value from the configuration file.
   • Support keys matching existing options: `algorithm`, `digits`, `samples`, `level`, `maxIterations`, `errorTolerance`, `diagnostics`, `benchmark`, `serve`, `chart`, `convergenceData`.

3. Integration Points
   • In `main()`, before calling `minimist`, call a new helper `loadConfig()` that returns an options object.
   • Pass the merged object to `minimist` as its defaults. Continue with existing Zod validation and CLI flow.
   • Ensure that configuration file values respect types and constraints enforced by the Zod schema.

# Testing

1. Unit tests in `tests/unit/main.test.js`:
   • Mock `fs.readFileSync` and `fs.existsSync` to simulate presence of a config file in project root.
   • Verify that default values from config are applied when no CLI flags are passed.
   • Test that CLI flags override configuration file values.
   • Simulate invalid JSON in config file and confirm a warning is logged while proceeding with defaults.

# Documentation

1. docs/USAGE.md:
   • Under **Options**, add **--config-file** to specify a custom configuration file path (optional).
   • Describe `.picrc.json` discovery order and format.
   • Provide an example of `.picrc.json` content and its effect on CLI invocation.

2. README.md:
   • Under **Features**, add **Configuration File** describing support for `.picrc.json` to define default parameters.
   • Show an example of creating `.picrc.json` to set default algorithm and digits.