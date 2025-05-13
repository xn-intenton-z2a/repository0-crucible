# Overview

Introduce structured and configurable logging across CLI and HTTP server using Pino. Replace ad-hoc console output with a unified logger that supports JSON output, log levels, and transports. Users gain observability into runtime behavior, error contexts, and performance metrics beyond basic diagnostics.

# Implementation

1. Dependency
   • Add pino and pino-http to package.json dependencies.

2. Logger Initialization
   • In src/lib/main.js, import pino and pinoHttp.
   • Create a root logger with default level from environment variable LOG_LEVEL or CLI flag --log-level (default info).
   • Replace all console.log, console.error, console.warn calls in both CLI and server modes with logger.info, logger.error, logger.warn, etc.

3. CLI Integration
   • Extend CLIOptionsSchema and minimist flags to accept --log-level <string>.
   • Before any output, configure logger level from opts["log-level"].
   • Log diagnostic output with logger.debug when --diagnostics is used, preserving existing output behavior.

4. HTTP API Integration
   • In createApp(), use app.use(pinoHttp({ logger })) to attach request logging middleware.
   • Log each incoming request with method, url, and response time at info level. On errors, use logger.error with stack traces.

5. Transports and Formatting
   • Support JSON log output by default. Provide an option LOG_PRETTY to emit pretty-printed logs in development when true.
   • If LOG_PRETTY is set, configure pino-pretty as transport for human-readable output.

# Testing

1. Unit tests in tests/unit/main.test.js:
   • Mock pino logger methods to capture calls instead of console.
   • Verify that CLI output routes through logger.info or logger.debug based on --diagnostics, and respects --log-level.
   • Simulate invalid configuration and ensure logger.error is invoked with descriptive messages.

2. HTTP tests in tests/unit/server.test.js:
   • Use supertest spies to confirm pino-http logs requests and responses with correct keys in JSON logs.
   • Trigger an endpoint error and assert logger.error records stack trace and status code.

# Documentation

1. docs/USAGE.md:
   • Under **Options**, add **--log-level** with allowed values (trace, debug, info, warn, error, fatal).
   • Describe **LOG_LEVEL** and **LOG_PRETTY** environment variables and their effect.
   • Provide example: `LOG_LEVEL=debug node src/lib/main.js --log-level debug --digits 5`.

2. README.md:
   • Under **Features**, add **Structured Logging** describing Pino integration and configuration.
   • Show sample JSON log entry and usage examples for both CLI and HTTP server modes.