# Overview

Enhance the CLI help output to clearly document and expose the newly added flags for BBP and benchmarking modes. Improve user guidance by detailing options, default values, and usage examples within the built-in `--help` output.

# CLI Help Enhancements

* Add descriptions for the following new flags:
  * `--hex-index <n>`: Zero-based index for BBP mode (extract individual hexadecimal digits).
  * `--benchmark-sizes <list>`: Comma-separated list of digit counts to benchmark.
  * `--benchmark-output <text|csv|png>`: Format for benchmark report.
  * `--benchmark-file <path>`: File path to save the benchmark report or chart.

* Include default values and data types in help lines.
* Group options into categories: General, Algorithm Modes, Output Modes, Diagnostics, Benchmarking.
* Provide example commands in help output.

# Source File Changes

Enhance `src/lib/main.js`:

1. Integrate a simple help generator that prints detailed usage when `--help` or `-h` is passed.
2. Organize options into sections, listing flags, descriptions, defaults, and example invocations.
3. Exit after help is displayed.

# Test File Changes

Update `tests/unit/main.test.js` to verify:

* Running `node main.js --help` outputs lines covering each new flag and example usages.
* The help text contains section headers and description for `--hex-index` and `--benchmark-*` flags.

# README Updates

No changes required to README; this is an internal CLI improvement.

# Dependencies

No new dependencies required.