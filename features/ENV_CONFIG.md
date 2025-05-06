# Summary

Introduce environment variable configuration support using dotenv to allow setting default CLI options through environment variables or a custom .env file.

# Specification

- Add a --env-file <path> flag to specify the path to a dotenv file; if omitted, load .env from the current working directory.
- Recognize environment variables with prefix CRUCIBLE_ for each CLI option:
  • CRUCIBLE_COUNT: default face count (integer)
  • CRUCIBLE_SEED: default seed value (integer)
  • CRUCIBLE_CATEGORY: default category filter (string)
  • CRUCIBLE_FACES_FILE: default path to custom faces file (string)
  • CRUCIBLE_MERGE_FACES: merge mode for custom faces (boolean true/false)
  • CRUCIBLE_TEMPLATE: default template path (string)
  • CRUCIBLE_OUTPUT: default output file path (string)
  • CRUCIBLE_DIAGNOSTICS: enable diagnostics mode (boolean)
  • CRUCIBLE_INTERACTIVE: enable interactive REPL (boolean)
  • CRUCIBLE_PORT: default HTTP server port (integer)
- Parse and validate each environment variable’s type; on invalid formats print descriptive error via errorExit and exit with nonzero status.
- Apply environment defaults before parsing CLI args, with explicit CLI flags taking precedence over env values.

# CLI Usage

node src/lib/main.js --env-file ./custom.env --face
node src/lib/main.js --face   
# uses CRUCIBLE_COUNT from .env if present

# Testing

- Add unit tests in tests/unit/env_config.test.js:
  • Create a temporary .env file with valid values and verify defaults apply when CLI flags are omitted.
  • Test that CLI flags override environment variables.
  • Test invalid integer or boolean strings in environment variables cause descriptive errors and nonzero exit.
  • Test that missing or unreadable .env file on --env-file prints an error and exits.

# Documentation

- Update README.md under Features to describe environment variable support with examples.
- Add docs/ENV_CONFIG.md explaining supported CRUCIBLE_ variables, .env loading order, --env-file flag, and error cases.

# Implementation Details

- In src/lib/main.js before processing other arguments, import dotenv and detect --env-file flag in args; remove it and load dotenv.config({ path }).
- Map process.env.CRUCIBLE_* values into default variables (count, seed, category, facesFile, mergeFaces, template, output, diagnostics, interactive, port) with type conversion and validation.
- Integrate defaults into the existing argument parsing logic: initialize variables from env before overriding them in the parsing loop.
- Use errorExit for invalid env value formats or unreadable env file.
