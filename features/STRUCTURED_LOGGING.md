# Overview

Introduce structured, JSON-formatted logging with Pino across both the CLI tool and the HTTP API server. Replace ad-hoc console.log and console.error calls with a unified logger, enable configurable log levels via command-line flags and environment variables, and apply HTTP request logging middleware.

# Implementation

1. Dependencies
   • Add `pino` and `pino-http` to `dependencies` in `package.json` (e.g. `"pino": "^8.8.0"`, `"pino-http": "^7.3.0"`).

2. Logger Setup in CLI
   • Import `pino` at the top of `src/lib/main.js`.
   • Extend the CLI options schema and `minimist` invocation to accept a new string option `--log-level` (default `'info'`).
   • After parsing options, create a logger instance:
     ```js
     const logger = pino({
       level: opts.logLevel || process.env.LOG_LEVEL || 'info'
     });
     ```
   • Replace all `console.log`, `console.error`, and `console.warn` calls in `main()` with `logger.info`, `logger.error`, and `logger.warn` respectively.

3. HTTP API Integration
   • In `createApp()`, import `pinoHttp` from `pino-http` and apply it as the first middleware: `app.use(pinoHttp({ logger }));` using the same logger configuration (derive level from `process.env.LOG_LEVEL`).
   • Replace any `console.error` in request validation or error paths with `req.log.error`.
   • Expose the base logger on `app.locals.logger` for other modules if needed.

4. Configuration
   • New environment variable: `LOG_LEVEL` to override log level globally.
   • New CLI flag: `--log-level <level>` to set log level (`trace`, `debug`, `info`, `warn`, `error`, `fatal`).

# Testing

1. Unit Tests (`tests/unit/main.test.js`)
   • Mock `pino` to return a logger with spies on `info`, `error`, and verify that `main([--log-level debug])` calls `logger.level = 'debug'` and logs via `logger.info` instead of `console.log`.

2. HTTP API Tests (`tests/unit/server.test.js`)
   • Inject a fake `pinoHttp` middleware to capture request logs.
   • Use `supertest` to make a request; assert that `res.req.log.info` was invoked and that log entries include method and URL.

# Documentation

1. `docs/USAGE.md`
   • Under **Options**, document `--log-level <level>` and environment variable `LOG_LEVEL`.
   • Show example:
     ```bash
     node src/lib/main.js --serve 3000 --log-level debug
     ```

2. `README.md`
   • Under **Features**, add **Structured Logging** with description and usage examples for setting log levels.
   • Note that HTTP access logs appear in JSON format with request method, URL, status, and timing.
