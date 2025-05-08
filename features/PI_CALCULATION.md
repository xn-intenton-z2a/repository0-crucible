# Overview

Introduce a dedicated `pi` subcommand in the CLI to compute π using the basic Leibniz series.  This first iteration focuses on a simple text output mode that reports the approximate value of π along with execution time and peak memory usage.

# CLI Usage

Add a `pi` command to the existing CLI entrypoint in `src/lib/main.js` with the following flags:

--iterations: positive integer specifying how many terms of the Leibniz series to sum
--help: display built-in help text for the `pi` command

Examples:
  node src/lib/main.js pi --iterations 1000000
  node src/lib/main.js pi --iterations 5000

# Algorithm

Implement the Leibniz series for π:

  π ≈ 4 × ∑_{k=0 to N-1} ((-1)^k) / (2k + 1)

- Compute the partial sum over the specified number of iterations
- Record start and end times to measure duration
- Track peak memory usage via `process.memoryUsage()`

# Output

In text mode (default):

- Print the approximate value of π rounded to 6 decimal places
- Print total execution time in milliseconds
- Print peak memory usage in bytes

Example output:
  π ≈ 3.141592
  Duration: 120 ms
  Peak Memory: 5 242 000 bytes

# Implementation Details

- Update `src/lib/main.js` to register a new subcommand `pi` using a CLI parser (e.g. commander or yargs)
- Create `src/lib/algorithms/leibniz.js`:
  - Export a function `computePiLeibniz(iterations)` that returns an object `{ value, durationMs, peakMemoryBytes }`
- In the `pi` command handler:
  - Parse the `--iterations` flag
  - Validate it is a positive integer
  - Invoke `computePiLeibniz`
  - Print results in the specified format
- Extend `tests/unit/main.test.js`:
  - Add tests for the `pi` command with valid and invalid iteration values
  - Verify output contains expected approximate value, duration, and memory usage
- Update `README.md`:
  - Document the `pi` command usage examples
  - Show sample output for a small iteration count
- No new dependencies required for this iteration