# Overview

This feature adds a dynamic progress bar to the CLI tool, providing real-time visual feedback on the percentage of π digits computed. It enhances user experience when calculating large digit counts by indicating computation progress.

# CLI Interface

--show-progress
    Enable a progress bar displaying completed digits versus target in the terminal.
--no-progress
    Disable progress bar (default when output is piped or redirected).

# Implementation

- Add a dependency on "cli-progress".
- In src/lib/main.js, when handling the --calculate-pi or --benchmark-pi flags, detect the --show-progress flag:
  • Initialize a cli-progress single bar instance with total equal to target digit count.
  • Pass a progress callback into the chudnovskyPi or benchmarkPi functions that reports computed digit or algorithm progress; update the bar on each callback invocation.
  • On completion or error, stop and clear the progress bar.
- Ensure that if stdout is not a TTY or --no-progress is specified, progress bar initialization is skipped.
- Maintain existing output behavior and exit codes.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock an algorithm function that invokes the progress callback in known increments.
  • Verify that enabling --show-progress produces progress updates to stdout matching expected percentages.
  • Verify that --no-progress or piped output suppresses progress bar output.

# Documentation

- Update README.md under Features to describe the --show-progress and --no-progress flags with example usage:

Example:

node src/lib/main.js --calculate-pi 10000 --show-progress
