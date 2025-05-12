# Overview

Allow users to define default CLI and HTTP API parameters in a configuration file so they do not have to repeat common options on every invocation

# Implementation

1. Configuration File Detection
   • Accept environment variable CONFIG_FILE to specify path to config file
   • Fallback to checking project root for .pirc.json or .pirc.yaml
2. Parsing and Merging
   • Before parsing CLI arguments with minimist, load config file if it exists
   • Parse JSON or YAML using fs and js.yaml
   • Merge config object into minimist defaults so CLI options override file settings
3. HTTP API Integration
   • In createApp load the same config file at startup
   • For /pi handlers, when query parameters are missing, use values from config for digits, algorithm, samples, diagnostics
4. Error Handling
   • If config file read or parse fails, log a warning and proceed with built-in defaults without failing

# Testing

1. Unit Tests in tests/unit/main.test.js
   • Mock fs.readFileSync to return a valid JSON config object and invoke main with no CLI args then verify console log uses config defaults
   • Mock YAML config and verify parsing logic
   • Test invalid config file content logs warning and falls back to defaults
2. HTTP Tests in tests/unit/server.test.js
   • Mock fs.readFileSync to provide config defaults then request GET /pi without query parameters and assert response uses config values as defaults

# Documentation

1. docs/USAGE.md
   • Add section under Options for CONFIG_FILE describing env variable and default file locations with examples
2. README.md
   • Document configuration file support under Features and show sample .pirc.json and .pirc.yaml format