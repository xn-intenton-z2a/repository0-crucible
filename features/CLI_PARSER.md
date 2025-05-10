# Overview

This feature integrates an extensible command-line interface using yargs and structured input validation via Zod schemas. It unifies core operations and HTTP API routes under consistent commands, options, and centralized error handling.

# Commands and Options

Define discrete commands for key operations:

- calculate-pi <digits>
- extract-digit <position>
- extract-range <start>-<end>
- benchmark-pi <digits>
- list-algorithms
- diagnostics
- serve
- version

Global options:

- --config <path>
- --cache-dir <path>
- --no-cache
- --verbose
- --quiet
- --timeout <seconds>

# Validation

Use Zod to define schemas for each CLI command and HTTP route:

- calculateSchema, digitsSchema, benchmarkSchema, etc.
- CLI: After parsing with yargs, validate parsed arguments against the corresponding Zod schema. On validation failure, print error issues to stderr and exit with status code 1.
- HTTP: For each route handler, coerce and validate req.query with the matching Zod schema. On failure, respond with status code 400 and a JSON payload of { error: ["message1", "message2", …] }.

# Implementation

- Add dependencies on yargs and zod in package.json.
- In src/lib/main.js:
  • Import yargs and zod.
  • Define commands via yargs.command with description, builder options, and handler functions.
  • Register global options via yargs.option.
  • Use yargs.middleware to:
    – Load configuration from file using js-yaml and merge with CLI flags.
    – Initialize logging based on --verbose, --quiet, and LOG_LEVEL.
    – Attach a logger and validated arguments to the context for handlers.
  • In each command and HTTP route handler:
    – Invoke the appropriate Zod schema.parse or parseAsync on arguments or req.query.
    – Catch ZodError to format and emit errors to stderr or HTTP response.
  • Handle parsing errors via yargs.fail to print messages and exit 1.
  • End main by calling yargs.parseAsync(args).

# Testing

Add unit tests in tests/unit/main.test.js:

- Verify that `main(["--help"])` prints usage information containing all commands and options and exits with code 0.
- Verify that `main(["version"])` prints the package version and exits with code 0.
- Simulate invalid CLI invocations (e.g., missing required options, invalid types) and assert exit code 1 with descriptive validation messages.
- Mock command handlers and verify that yargs dispatches to the correct handler based on parsed arguments.
- HTTP integration tests:
  • Send GET /calculate?digits=abc and confirm 400 response with JSON error array.
  • Send valid requests to each endpoint and confirm they bypass validation and return correct responses.

# Documentation

- Update README.md under Features to list available CLI commands with their options and example invocations.
- Document validation behavior for both CLI and HTTP, including samples of error outputs and response formats.
