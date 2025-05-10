# PI Configuration Feature

## Overview
Provide users the ability to define default settings for the CLI and programmatic API through a configuration file. This streamlines repeated use by loading preferences for options such as digits, algorithm, caching, threading, and output instead of specifying flags each time.

## Functional Requirements

- Integrate cosmiconfig to search for configuration under the name repository0-crucible with the following file patterns:
  - .repository0-cruciblerc.json
  - .repository0-cruciblerc.yaml
  - .repository0-cruciblerc.js
  - repository0-crucible.config.js
- In the main entry point (src/lib/main.js) before parsing CLI flags, load configuration:
  - If --config-file is provided, load that file directly
  - Otherwise use cosmiconfig default search paths starting at the current working directory and falling back to the user home directory
- Merge loaded configuration with CLI arguments:
  - Configuration values provide defaults for flags: digits, algorithm, useCache, cacheFile, threads, progress, serve, port, chartOutput, benchmark, minDigits, maxDigits, step, outputCsv, outputChart, diagnostics
  - CLI flags take precedence over configuration values
- Validate the merged settings using the existing zod schema in the CLI router

## CLI Interface

- New flag --config-file <path> to specify a custom configuration file path
- Document available configuration keys and default search locations in CLI help output

## Dependencies

- Add cosmiconfig to package.json dependencies
- Import cosmiconfig in src/lib/main.js to perform configuration file discovery and loading

## Testing

- Unit tests in tests/unit/main.test.js should mock cosmiconfig to simulate:
  1. Configuration file found and loaded correctly
  2. Configuration keys mapping to merged settings
  3. CLI flags overriding configuration values
- CLI tests in tests/e2e/cli.test.js should:
  1. Create temporary configuration file with specific defaults
  2. Invoke node src/lib/main.js without flags and assert defaults are applied from config
  3. Invoke with flags that override configuration and assert CLI values take effect