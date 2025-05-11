# CLI Schema Validation Feature

## Overview

Leverage zod to define and enforce a unified schema for all CLI flags, replacing manual argument parsing with structured validation. This ensures robust error messages, consistent default handling, and easier maintenance as the set of flags grows.

## Functional Requirements

- In `src/lib/main.js`:
  - Import zod: `import { z } from 'zod'`.
  - Define a Zod schema `CliOptionsSchema` describing all supported flags:
    - digits: coerce.number().int().min(1).max(1e6).default(100)
    - algorithm: z.enum(["machin","gauss-legendre","chudnovsky"]).default("machin")
    - threads: coerce.number().int().min(1).default(1)
    - serve: z.boolean().optional().default(false)
    - port: coerce.number().int().min(0).default(3000)
    - help: z.boolean().optional().default(false)
    - timeout: coerce.number().int().min(1).optional()
    - Any additional flags (e.g. script, export, json) included as needed.
  - Before command dispatch, parse `inputArgs` against `CliOptionsSchema` using `schema.parse()` or `safeParse()`.
  - On parse success, destructure an `options` object; on failure, catch `ZodError`, print human-readable error messages to stderr, and exit with code 1.
  - Use the validated `options` to control program flow (compute π, start server, etc.) without further manual checks.

## CLI Interface

- All existing flags (`--digits`, `--algorithm`, `--threads`, `--serve`, `--port`, `--help`, etc.) are defined in the schema with constraints.
- Invalid values automatically produce descriptive Zod validation errors.
- Example:
  node src/lib/main.js --digits abc
  // Error: digits must be a number, received string 'abc'.

## Implementation Details

- Replace the manual `for` loop that shifts through `inputArgs` with a one-time `schema.parse()` call.
- Use zod coercion helpers (`z.coerce.number()`) to convert numeric strings to numbers.
- Leverage default values in the schema so no additional merging logic is required.
- Maintain backward compatibility by matching existing default values and flag names.

## Testing

- **Unit Tests** (`tests/unit/main.test.js`):
  - Test that providing valid flags yields the expected `options` object when parsing.
  - Simulate invalid flags (e.g., `--digits 0`, `--algorithm invalid`) and assert that `schema.parse()` throws with clear Zod errors.
- **CLI Integration Tests** (`tests/e2e/cli.test.js`):
  - Run the CLI with valid and invalid flags, check exit codes and error messages.
  - Confirm that behavior matches current semantics for successful commands.