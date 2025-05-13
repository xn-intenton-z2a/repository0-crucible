# Overview

Introduce multi-format output support for both the CLI and HTTP API, allowing users to choose between JSON (default) and YAML. This feature leverages the existing js-yaml dependency to serialize responses in YAML when requested, improving integration with tools and workflows that prefer human-readable YAML documents.

# Implementation

1. Dependency
   • Import `dump` from `js-yaml` in src/lib/main.js to convert JavaScript objects into YAML strings.

2. CLI Integration
   a. Extend CLIOptionsSchema to include a new `format` option: z.enum(["json","yaml"]).default("json").
   b. Add a new command-line flag `--format <json|yaml>` in the minimist configuration and in the zod schema.
   c. After constructing the output object (either a raw result or diagnostics object), branch on opts.format:
      • When format is yaml, call yaml.dump(output) and console.log the resulting string.
      • Otherwise, call console.log with the JavaScript object for automatic JSON serialization.

3. HTTP API Integration
   a. In each handler under createApp (GET /pi, /pi/data, /pi/chart): inspect the `Accept` header or an optional query parameter `format` to detect `application/x-yaml` or `format=yaml`.
   b. If YAML is requested, set response Content-Type to `application/x-yaml` and send yaml.dump(responseObject).
   c. Otherwise, default to res.json(responseObject).

4. Maintain backward compatibility: default to JSON when format is omitted or unrecognized.

# Testing

1. Unit Tests in tests/unit/main.test.js
   - Mock console.log and run main with --format yaml to verify output starts with YAML document marker and contains expected keys in YAML format.
   - Run main with default format to confirm JSON object is logged (existing tests cover that).

2. HTTP Tests in tests/unit/server.test.js
   - Send GET /pi with Accept: application/x-yaml header and verify response Content-Type and body conforms to YAML syntax.
   - Send GET /pi?format=yaml and verify same YAML response.
   - Confirm that JSON responses remain unchanged when Accept is application/json or format=json.

# Documentation

1. docs/USAGE.md
   • Document the new `--format <json|yaml>` CLI option and the `format` query parameter and `Accept` header for HTTP API.
   • Provide examples showing YAML output for both CLI and HTTP.

2. README.md
   • Under Features, add **Multi-Format Output** describing JSON and YAML support and example usage.
