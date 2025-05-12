# Input Validation

Use zod to validate CLI and HTTP API parameters, ensuring strong type safety and clear error messages in both modes.

# CLI Validation

Define a zod schema for CLI options covering digits, algorithm, samples, diagnostics, error threshold, and other flags. After parsing with minimist, validate the options against this schema. On validation failure, print detailed error messages to stderr and exit the process with a non-zero code.

# API Validation

Replace manual query parameter parsing in Express endpoints with zod-based validation. Define a schema for each route (/pi, /pi/data, /pi/chart) that enforces required fields, types, and allowed values. On schema parsing errors, respond with HTTP 400 and a JSON body describing the invalid fields and messages.

# Implementation

1. Import z from zod in src/lib/main.js.
2. Create a CLIOptionsSchema object describing all supported CLI flags, types, default values, permitted algorithms, and numeric ranges.
3. After minimist parsing in main(), call CLIOptionsSchema.parse(options). Catch errors to format error messages and exit.
4. In createApp(), remove parseParams helper. Define ApiParamsSchema with zod for route query parameters. In each handler, call ApiParamsSchema.parse(req.query) and catch validation failures.
5. Do not alter other feature behaviors; ensure errors are caught early.

# Testing

1. In tests/unit/main.test.js, add tests that invoke main() with invalid CLI flags (e.g. --digits -1, --algorithm unknown) and verify process.exit(1) and stderr output containing zod error messages.
2. In tests/unit/server.test.js, send requests with invalid query parameters to /pi, /pi/data, and /pi/chart and assert a 400 status with JSON error body listing validation errors.

# Documentation

1. Update docs/USAGE.md to describe CLI input validation errors, showing sample error output and exit codes.
2. Update README.md under Features to note improved input validation and structured error reporting in both CLI and HTTP API modes.