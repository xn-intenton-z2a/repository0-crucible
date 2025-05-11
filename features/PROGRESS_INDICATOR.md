# Overview
Enable real-time progress reporting during π digit calculations in the CLI to give users visual feedback when computing large numbers of digits.

# CLI Interface
Extend main(args) to accept the following flag:
--progress            Display a progress bar during π calculation (default: off)

Behavior:
  • When --progress is present, initialize a console progress bar before starting the algorithm.
  • Update the bar as computation proceeds, reflecting the percentage of work done.
  • On completion, render the full π result and stop the progress bar.

# Implementation Details
• Add a new dependency cli-progress for terminal progress bars.
• Refactor calculatePi(digits, options) to accept an optional onProgress callback.  
  – In Machin-formula implementation, report progress after each term or iteration.  
  – In Chudnovsky series, determine total iterations and call onProgress(completed/total).
• In main.js, when parsing flags detect --progress.  
  – When enabled, instantiate cli-progress SingleBar with a format template {bar} {percentage}% | ETA: {eta}s.  
  – Pass a callback to calculatePi that updates the bar with current progress.  
  – Ensure the bar is started with total steps equal to expected iterations and is stopped on finish or error.
• Maintain backward compatibility: if --progress is absent, behavior remains unchanged.

# Testing
• Unit tests in tests/unit/main.test.js:  
  – Mock a simplified calculatePi that invokes onProgress multiple times; verify progress bar start, update, and stop calls through a stubbed cli-progress API.  
  – Test that calculatePi without --progress does not instantiate the progress bar.
• E2E tests in tests/e2e/cli.test.js:  
  – Run CLI with --digits 1000 --progress.  
  – Capture stdout and assert lines matching progress bar patterns (e.g., constructs containing percent signs).  
  – Confirm final π output is correct and that the progress bar was cleared.

# Documentation
• Update README.md under Features to document the --progress flag.  
• Provide an example usage:  
    node src/lib/main.js --digits 500 --progress
• Note that progress reporting adds minimal overhead and requires the cli-progress dependency.