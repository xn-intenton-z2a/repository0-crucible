# Overview

Introduce structured, configurable logging using Pino across both the CLI and HTTP API. Users gain consistent JSON-formatted logs with adjustable levels, optional file output, and built-in request tracing for easier debugging and monitoring.

# Implementation

1. Dependency
   • Add "pino" and "pino-http" to package.json dependencies.

2. CLI Enhancements in src/lib/main.js
   a. Import pino: `import pino from 'pino';`
   b. Extend CLIOptionsSchema to include:
      - `logLevel`: z.enum(['trace','debug','info','warn','error','fatal']).default('info')
      - `logFile`: z.string().nullable().optional()
   c. After parsing options, create a logger instance:
      ```js
      const logger = pino({ level: opts.logLevel }, opts.logFile ? pino.destination(opts.logFile) : undefined);
      ```
   d. Replace `console.log` and `console.error` calls with `logger.info`, `logger.error`, etc., preserving structured output. Use `logger.debug` for diagnostics.

3. HTTP API Enhancements in src/lib/main.js
   a. Import pinoHttp: `import pinoHttp from 'pino-http';`
   b. In createApp(), before any routes, mount middleware:
      ```js
      const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
      app.use(pinoHttp({ logger }));
      ```
   c. Replace manual error and info logs with `req.log` inside handlers. On errors, call `req.log.error(err)` before responding.

4. Graceful Shutdown
   • Hook into SIGINT and SIGTERM to call `logger.info('Shutdown signal received')` and close the Express server before exit.

# Testing

1. Unit Tests in tests/unit/main.test.js
   - Mock pino and pino-http to verify instantiated with correct options.
   - Spy on logger methods to confirm CLI branches call `logger.info`, `logger.debug`, and `logger.error` appropriately.

2. HTTP Tests in tests/unit/server.test.js
   - Use supertest to send requests and validate that `req.log` is invoked for each request (spy on middleware logger).
   - Simulate an error in a handler and confirm `req.log.error` is called before error response.

# Documentation

1. docs/USAGE.md
   • Document new CLI options:
     - `--log-level <level>`: Set logging verbosity (default: info).
     - `--log-file <filepath>`: Write logs to specified file instead of console.
   • Provide examples showing JSON log output and file-based logging.

2. README.md
   • Add **Structured Logging** under Features, describing Pino integration and usage examples.
