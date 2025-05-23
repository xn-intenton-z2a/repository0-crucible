# Overview

Improve the built-in help output to clearly document all supported flags, including BBP and benchmarking modes, grouped into sections with defaults, types, and examples.

# CLI Help Structure

* Show detailed usage on `--help` or `-h` and exit immediately.
* Usage line: `Usage: node src/lib/main.js [options]`.
* Sections in order:
  * General Options
  * Algorithm Modes
  * Output Modes
  * Diagnostics Options
  * Benchmarking Options
* Each flag entry includes:
  * Flag name and alias
  * Expected data type
  * Default value (if applicable)
  * Brief description
* Examples section with at least six invocations covering:
  1. Spigot decimal run
  2. Chudnovsky decimal run with PNG output
  3. BBP hex-digit extraction
  4. Benchmark text mode
  5. Benchmark CSV
  6. Benchmark PNG chart

# Source File Changes

Enhance `printHelpAndExit` in `src/lib/main.js`:
1. Construct help lines matching the required grouping and formatting.
2. Trigger help display when `argv.help` or `argv.h` is true, then exit.

# Test File Changes

Update `tests/unit/main.test.js` with:
* A test that running `node src/lib/main.js --help` outputs:
  - The exact usage line.
  - Each of the five section headers in order.
  - Representative flag descriptions under each section (e.g., `--hex-index` under Algorithm Modes).
  - The Examples header and at least three example commands.
* Ensure tests assert the process exits with code 0 after help.

# README Updates

None required: help improvements are internal.

# Dependencies

No new dependencies required.
