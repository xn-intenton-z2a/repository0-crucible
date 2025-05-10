# Overview

This feature adds unified input validation for both CLI commands and HTTP API endpoints using Zod schemas. By codifying expected option types and ranges upfront, it provides consistent, clear error messages for invalid user inputs and reduces manual checks scattered across handlers.

# CLI Validation

- Define a Zod schema for each command capturing required flags, option types, and default values.
- After yargs parses arguments, validate the resulting options object against the appropriate schema.
- On validation failure, print each error issue to stderr and exit with status code 1 without invoking computation logic.

# HTTP API Validation

- For each route (such as GET /calculate, GET /digits, GET /benchmark), define a corresponding Zod schema for the expected query parameters.
- Before performing any computation or database lookup, parse and validate req.query with coercion for numbers and enums.
- On validation errors, respond with status 400 and a JSON payload of the form { error: ["message1","message2",…] }.

# Implementation

- In src/lib/main.js import { z } from "zod" and import existing handler functions.
- Create reusable schemas such as calculateSchema, digitsSchema, benchmarkSchema, etc.
- In each CLI command handler, call schema.parse or parseAsync and catch ZodError to produce friendly output and exit.
- In HTTP server setup, wrap route handlers in a validation step; catch ZodError centrally to format HTTP responses.
- No new dependencies are required beyond the existing Zod package.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Invoke main with invalid CLI arguments (e.g. digits set to "abc") and verify exit code 1 and stderr includes validation messages.
  • Invoke main with missing required options and verify appropriate error listing.
- Add HTTP tests:
  • Send GET /calculate?digits=notanumber and expect status 400 and JSON error array containing a clear type error message.
  • Send valid requests and verify they bypass validation and return successful responses.

# Documentation

- Update README.md under Features:
  • Describe that all CLI and HTTP inputs are validated using Zod.
  • Show an example of invalid CLI usage and the resulting error messages.
  • Show an example of invalid HTTP request and sample JSON error response.