# Structured Logging

Provide structured and configurable logging using pino, replacing console output with leveled logs. This enhances observability for both CLI and HTTP API modes and aligns with mission goals by enabling detailed runtime insights.

# CLI Options

--log-level <level>       Set the minimum log level (trace, debug, info, warn, error, fatal). Defaults to info.
--log-file <filepath>     Write JSON logs to the specified file instead of stdout.
--log-pretty              Output human-friendly, colorized logs using pino-pretty when no log-file is set.

# Implementation

1. Add pino to dependencies in package.json.
2. In src/lib/main.js, import pino and pino-pretty:
   - const pino = require('pino');
   - const pretty = require('pino-pretty');
3. After parsing CLI options, configure the logger:
   - Determine stream: if options.logFile is set, create a write stream to options.logFile; else use process.stdout.
   - If options.logPretty and no logFile, wrap stdout with pino-pretty transport.
   - Initialize logger: const logger = pino({ level: options.logLevel }, stream);
4. Replace all console.log, console.error, and console.warn calls in main() and createApp() with logger.info, logger.error, logger.warn, or logger.debug as appropriate.
5. In Express handlers, attach logger to request context and use logger for incoming requests, responses, and errors.
6. Ensure validate-features and serve startup messages use logger.info instead of console.log.

# Testing

1. In tests/unit/main.test.js, mock pino to provide a fake logger with spyable methods.
2. Verify that main() uses logger.info for normal output and logger.error for errors (e.g., validate-features failures).
3. In server tests, verify that createApp endpoints log incoming requests at info level and that error cases call logger.error.
4. Test CLI options:
   - main(["--log-level","debug"]) produces debug-level logs.
   - main(["--log-file","app.log"]) writes JSON logs to app.log.
   - main(["--log-pretty"]) outputs human-friendly logs containing ANSI color codes.

# Documentation

1. Update docs/USAGE.md to document --log-level, --log-file, and --log-pretty with examples.
2. Update README.md under Features to describe structured logging capability and sample CLI invocations.