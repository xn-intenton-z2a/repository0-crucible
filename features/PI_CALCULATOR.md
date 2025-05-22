# Overview

Introduce a core π calculation engine with multiple algorithm options, digit-length control, benchmark reporting, and flexible output modes (text and PNG).

# CLI Options

* `--algorithm <name>`  Choose from supported algorithms: spigot, Chudnovsky.
* `--digits <n>`        Number of π digits to generate (default: 100).
* `--output <type>`     Output format: text or png (default: text).
* `--file <path>`       Optional file path to save output.

# Source File Changes

Enhance `src/lib/main.js` to:

1. Parse new CLI options using a lightweight argument parser.
2. Invoke the chosen algorithm to compute π to the requested precision.
3. Output the result as:
   - Plain text printed to console or saved to file.
   - PNG visualization rendered via a canvas library and saved to file.
4. Emit simple benchmark timings for compute and render phases when `--diagnostics` is passed.

# Test File Changes

Add unit tests in `tests/unit/main.test.js` to verify:

* Correct first 10 digits of π for each algorithm.
* CLI exits without error when invoked with valid options.
* Benchmark output appears when diagnostics flag is used.

# README Updates

Document the new commands, options, usage examples, and sample output. Update the Features section to list π calculation capabilities.

# Dependencies

Add new dependencies to `package.json`:

* A big-number library (e.g., decimal.js or big.js) for high precision.
* A canvas library (e.g., canvas) to render PNG visualizations.

Feature development should follow existing style and ensure compatibility with Node 20.