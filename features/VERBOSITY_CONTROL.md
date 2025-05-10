# Overview

This feature introduces configurable logging verbosity for both the CLI tool and the HTTP API server. Users can enable detailed debug output or suppress non-error messages to improve troubleshooting and reduce noise during operations.

# CLI Interface

--verbose
    Enable detailed logging, including debug and info messages.

--quiet
    Suppress all non-error output, showing only warnings and errors.

# Environment Variables

LOG_LEVEL
    Set default log level (debug, info, warn, error). CLI flags override this environment setting.

# Implementation

- Add dependency on yargs in the dependencies file to support parsing of verbosity flags.
- In src/lib/main.js:
  • Parse the --verbose and --quiet flags early in the argument parsing stage alongside LOG_LEVEL environment variable.
  • Define a logger utility with methods debug, info, warn, and error that filter messages based on the selected log level.
  • Replace direct console.log calls in command handlers and HTTP route logic with appropriate logger methods.
  • In HTTP server setup under --serve, log incoming requests and errors using logger.info and logger.error respecting verbosity settings.
- Ensure that --verbose sets the log level to debug, --quiet sets the log level to error, and in the absence of flags the LOG_LEVEL environment variable determines default behavior.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Simulate invocation of main with --verbose and capture output; verify that debug and info messages appear.
  • Simulate invocation with --quiet and capture output; verify that info messages are suppressed and only warnings/errors appear.
  • Test that setting LOG_LEVEL to warn results in the expected suppression of info messages, and that CLI flags override the environment variable.
  • Mock the logger utility to isolate and validate its filtering logic without executing full command handlers.

# Documentation

- Update README.md under Features:
  • Document the --verbose and --quiet flags, and the LOG_LEVEL environment variable.
  • Provide example commands showing verbose and quiet modes with sample output.
  • Explain how verbosity affects both CLI and HTTP API logging.