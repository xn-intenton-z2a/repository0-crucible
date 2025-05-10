# Overview

Integrate a robust command-line interface using yargs for parsing arguments and Zod for structured validation. This feature unifies all core operations under named commands and options, ensures consistent error handling, and lays the foundation for both CLI and HTTP behaviors.

# Commands and Options

Define discrete commands with dedicated flags:

- calculate-pi <digits>
    Compute π to the specified number of digits.
- extract-digit <position>
    Extract a single hexadecimal or decimal digit at the zero-based index.
- extract-range <start>-<end>
    Extract a contiguous range of digits.
- benchmark-pi <digits>
    Benchmark one or more π algorithms on a digit count.
- list-algorithms
    List all supported calculation and extraction algorithms.
- diagnostics
    Output environment and runtime diagnostics.
- serve
    Start the HTTP and WebSocket API server.
- openapi
    Generate and output the OpenAPI 3 spec.

Global options supported across commands:

--config <path>           Load defaults from YAML/JSON config file.
--cache-dir <path>        Directory for caching results.
--no-cache                Disable cache lookups and writes.
--cache-ttl <seconds>     TTL for cache entries.
--clear-cache             Purge cache and exit.
--threads <number>        Use worker threads for parallel computation.
--no-threads              Disable worker threads.
--verify-digits <count>   Number of random positions to spot-check.
--no-verify               Disable spot-check after calculation.
--timeout <seconds>       Abort long-running operations.
--rate-limit <num>        Max HTTP requests per client per window.
--rate-limit-window <sec> Window size in seconds for rate limiting.
--no-rate-limit           Disable rate limiting.
--ws-path <path>          Custom WebSocket route.
--ws-port <number>        Custom WebSocket port.
--verbose                 Enable debug and info logging.
--quiet                   Suppress non-error output.

# Validation

Use Zod schemas for each command and HTTP route:

- Define schemas: calculateSchema, extractDigitSchema, extractRangeSchema, benchmarkSchema, serveSchema, openapiSchema, diagnosticsSchema, rateLimitSchema, wsSchema, etc.
- After parsing via yargs, validate argv against the corresponding Zod schema. On failure, print detailed issues to stderr and exit code 1.
- In HTTP handlers, coerce and validate req.query or req.body with Zod. On failure, respond with status 400 and a JSON { error: ["message1",...] }.

# Implementation

- Add dependencies on yargs and zod in package.json.
- In src/lib/main.js:
  • Import yargs and Zod and any schema modules.
  • Define commands via yargs.command with name, description, builder, and handler.
  • Register all global options via yargs.option or within an .option group.
  • Use yargs.middleware to:
    – Load configuration from file using js-yaml and merge with CLI flags.
    – Initialize logging based on --verbose, --quiet, and LOG_LEVEL.
  • In each command handler:
    – Validate parsed arguments via Zod schema.parse or parseAsync.
    – Invoke the matching core function (e.g., chudnovskyPi, bbpDigitExtraction, benchmarkPi, startServer, generateOpenApi, printDiagnostics).
    – Handle ZodError and runtime exceptions to emit clear CLI error messages.
  • At the end of main, call yargs.parseAsync(args) to dispatch commands.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Verify `node src/lib/main.js --help` prints usage for all commands and exits with code 0.
  • Test each command with valid arguments invokes the intended handler and exits code 0 or starts the server.
  • Simulate invalid invocations (missing required flags, invalid types) and assert exit code 1 and descriptive error output.
  • Mock Zod schemas to trigger validation failures and confirm error formatting.
  • For HTTP validation, start server and send requests with bad query params; assert status 400 and JSON error array.

# Documentation

- Update README.md under Features:
  • List available commands and global options with descriptions.
  • Provide example invocations for each command:
      node src/lib/main.js calculate-pi 1000 --verify-digits 5 --timeout 60
      node src/lib/main.js serve --rate-limit 50 --rate-limit-window 30
  • Describe validation behavior and error formats for both CLI and HTTP APIs.
  • Link to CONTRIBUTING.md for guidelines on extending or modifying command definitions.