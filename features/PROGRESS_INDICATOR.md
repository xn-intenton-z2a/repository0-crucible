# Progress Indicator

Provide live progress reporting during long running π calculation tasks, displaying percentage complete and estimated time remaining to improve user experience and visibility.

# CLI Options

--progress             Enable live progress reporting during calculations

# Implementation

1. Add cli progress dependency to package json
2. In src lib main js import cli progress and initialize a progress bar for each calculation mode
3. For leibniz and chudnovsky loops update the bar after each iteration chunk
4. For monte carlo mode update the bar after each batch of samples
5. For error tolerance mode update the bar after each batch or iteration until threshold is met
6. Stop and clear the progress bar upon completion or interruption

# Testing

1. In tests unit main test js mock progress bar methods and spy on console output
2. Verify that with --progress option progress bar start update and stop methods are called during a small task
3. Verify that without --progress option no progress output is produced

# Documentation

1. Update docs USAGE md to document the --progress option with example commands
2. Update README md under Features to describe live progress reporting capability