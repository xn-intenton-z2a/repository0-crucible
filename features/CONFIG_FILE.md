# Overview

Add support for loading configuration values from a file or environment variables so users can define default CLI and server options without repeating flags on each invocation.

# Implementation Details

• At startup in src/lib/main.js, load environment variables from a .env file using dotenv.
• Search for a configuration file in the working directory named .pi-config.json, .pi-config.yaml or pi-config.yaml.
• Parse JSON files with JSON.parse and YAML files with js-yaml.load.
• Define supported configuration keys matching CLI flags and ENV variables: digits, format, output, algorithm, workers, cache, cacheFile, clearCache, analyze, outputPath, stream, chunkSize, serve, cors, progress, diagnostics, openapi.
• Merge values: defaults from code, then config file values, then environment variables PI_<KEY> (uppercase underscore), then CLI arguments override all.
• Validate merged options with existing Zod schemas or commander choices as appropriate.
• Ensure backward compatibility: if no config file or variables are present, behavior remains unchanged.

# Testing

• Unit tests in tests/unit/main.test.js that mock file system to supply a temporary config file and verify main reads config and applies defaults when CLI args are absent.
• Tests that environment variables like PI_DIGITS are read and override config file values.
• Test invalid config file content triggers a clear error and exit code 1.
• E2E tests in tests/e2e/cli.test.js that create a pi-config.yaml file, run the CLI without flags, and assert behavior matches config settings.

# Documentation

• Update README.md to introduce configuration support under a new section Configuration File and Environment Variables.
• Describe file naming options and supported fields, show sample .pi-config.yaml and sample .env examples.
• Provide examples:
  Create .pi-config.yaml in project root
    digits: 50
    format: json
  Then run CLI without flags:
    node src/lib/main.js
  Use environment variable to override:
    PI_DIGITS=100 node src/lib/main.js