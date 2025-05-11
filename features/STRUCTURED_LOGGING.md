# Overview

Introduce structured and levelled logging across the CLI and HTTP server modes using a lightweight logger. This enables consistent log formatting, configurable log levels, and easier integration with monitoring and debugging tools.

# CLI Interface

Extend main(args) to accept the following flag and environment variable:

--log-level <level>    Set logging verbosity: debug, info, warn, error (default: info)
Environment variable PI_LOG_LEVEL may be used to set the default log level if the flag is not provided.

# Implementation Details

• Add pino as a dependency in package.json.
• In src/lib/main.js after parsing flags, initialize a pino logger with level opts.logLevel.
• Replace direct console.log and console.error calls with logger.info, logger.warn, logger.error, or logger.debug as appropriate:
  – On startup, log the selected digits, algorithm options and any serve port or rate limit configuration at info level.
  – In error paths, use logger.error with error messages and exit.
  – In debug mode, log parsed options, cache hits/misses, request payloads, and internal calculation milestones (e.g. when arctan series total is reached).
• For HTTP mode (when serve flag is present), apply a middleware that logs each incoming request at info level with method, path, and response status code. In debug mode, log request query or body.
• Ensure that when --log-level=error or --log-level=warn is set, informational logs and debug logs are suppressed.

# Testing

• Add unit tests in tests/unit/main.test.js that:
  – Mock pino to verify that main() uses the correct log level based on flag and environment variable.
  – Simulate errors (invalid digits, file write failures) and assert logger.error is called and process.exit is invoked.
  – Test that logger.info is called on normal startup.
• Add HTTP tests with supertest to verify that request logs are emitted:
  – Start server with --serve 0 --log-level debug and send a GET /pi?digits=2; spy on logger.debug to assert internal detail logs.
  – Start server with --serve 0 --log-level error and send requests; assert no info logs appear but errors still do.

# Documentation

• Update README.md under a new Logging section:
  – Describe the --log-level flag and PI_LOG_LEVEL environment variable.
  – List supported levels and defaults.
  – Provide examples:
      node src/lib/main.js --digits 50 --log-level debug
      PI_LOG_LEVEL=warn node src/lib/main.js --serve 3000
• Note that structured logging enables integration with external log aggregators and simplifies debugging and monitoring.