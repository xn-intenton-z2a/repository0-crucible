# Overview

Adopt structured, leveled logging throughout the CLI and HTTP server using pino. Replace all raw console methods with a high-performance JSON logger that supports configurable log levels, child loggers, and rich metadata. This improvement enhances debuggability in development and production without cluttering output.

# Implementation

1. Dependency

   • Add pino@^8.0.0 to package.json dependencies.  
   • Import pino in src/lib/main.js as `import pino from 'pino';`

2. Logger Setup

   a. Create a root logger at application start:  
      ```js
      const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
      ```  
   b. In CLI mode, replace console.log, console.error with logger.info and logger.error.  
   c. In HTTP mode (createApp), attach a middleware at the top of the stack:
      ```js
      app.use((req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
          logger.info({ method: req.method, url: req.url, status: res.statusCode, durationMs: Date.now() - start }, 'HTTP request completed');
        });
        next();
      });
      ```

3. Child Loggers

   • In handlers and core functions (e.g., calculate functions), derive a child logger with bound context:
     ```js
     const calcLogger = logger.child({ component: 'calculator', algorithm });
     calcLogger.debug({ digits, samples }, 'Starting calculation');
     ```

4. Environment and CLI Options

   • Honor LOG_LEVEL environment variable to control verbosity (`trace`, `debug`, `info`, `warn`, `error`, `fatal`).
   • Document a new `--log-level <level>` CLI option that sets `process.env.LOG_LEVEL` before logger initialization.

5. Backward Compatibility

   • Default behavior remains console-style JSON output for results; logging calls do not interfere with CLI or API JSON outputs.

# Testing

1. Unit Tests
   - Mock pino by injecting a no-op stream to capture logs.  
   - Verify that CLI main with `--log-level debug` causes logger.level to be `debug` and emits debug logs.  
   - Spy on logger methods to assert calls in calculation functions and server middleware.

2. HTTP Tests
   - Use supertest to send GET /pi and assert that the response still matches expected JSON.  
   - Capture logs via a test stream and ensure an info log with method, url, statusCode, and durationMs is produced after request.

# Documentation

1. docs/USAGE.md
   • Add **Structured Logging** section describing LOG_LEVEL and `--log-level` option.  
   • Show example: `LOG_LEVEL=debug node src/lib/main.js --digits 5 --log-level debug`.

2. README.md
   • Under **Features**, add **Structured Logging** with a brief: high-performance JSON logger with leveled output and HTTP request tracing.

