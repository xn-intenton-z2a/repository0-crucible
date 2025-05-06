# Summary

Enable loading default CLI options from a configuration file and environment variables. Support JSON and YAML formats with schema validation using zod, and .env overrides via dotenv. Merge values in the order: environment variables, configuration file, then explicit CLI flags, with flags taking highest precedence.

# Specification

- Configuration file discovery:
  • Supported names in current directory or user home: .cruciblerc, cruconfig.json, cruconfig.yaml
  • Override file path via CRUCIBLE_CONFIG_PATH environment variable
- Supported formats: JSON and YAML representing an object that matches CLI option schema
- Recognized keys:
  • count (number)
  • seed (number)
  • category (string)
  • facesFile (string)
  • mergeFaces (boolean)
  • theme (string)
  • mergeTheme (boolean)
  • aiFace (string)
  • temperature (number)
  • json (boolean)
  • serve (boolean)
  • port (number)
  • diagnostics (boolean)
  • interactive (boolean)
- Validation:
  • Define a zod schema for all supported keys with correct types and optional defaults
  • On schema validation failure, call errorExit with descriptive message and exit nonzero
- Precedence:
  1. Load environment variables via dotenv.config()
  2. Load and validate configuration file
  3. Parse CLI arguments, overriding any configuration values
- Error handling:
  • If config file path is invalid or unreadable, call errorExit
  • If parsing or validation fails, produce descriptive error and exit nonzero

# Testing

- Write tests in tests/unit/config_file.test.js to:
  • Create temporary config files in JSON and YAML and verify config values apply when flags are omitted
  • Verify explicit CLI flags override config values
  • Test CRUCIBLE_CONFIG_PATH overrides default discovery
  • Test improper config format or validation failure triggers errorExit with clear message
  • Test missing config file is ignored without error

# Documentation

- Update README.md under Features to describe configuration file support, environment variable override, and precedence rules
- Add docs/CONFIG_FILE.md with example config file formats, discovery order, environment variable override, and error handling

# Implementation Details

- In src/lib/main.js, import dotenv and call dotenv.config() before argument parsing
- Import zod and define a schema matching CLI option definitions
- Implement a loadConfig function to:
  1. Determine config file path using CRUCIBLE_CONFIG_PATH or standard names
  2. Read file via fs.readFileSync
  3. Parse content with JSON.parse or yaml.load
  4. Validate parsed object against zod schema
  5. Return validated partial options
- Merge returned config options into CLI parsing logic before applying explicit flags
- Ensure errorExit is used consistently for any failures