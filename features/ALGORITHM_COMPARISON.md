# ALGORITHM COMPARISON

## Purpose
Add a mode to benchmark and compare execution times and results of all supported π approximation algorithms for a given digit count.

## CLI Integration
Add a new option:

- `--compare`    run each available algorithm sequentially for the specified `--digits`, measure duration, and display a comparative summary.

Behavior:

When the `compare` flag is enabled:
1. Ignore the `--algorithm` and `--benchmark` flags.
2. For each algorithm in the set [leibniz, spigot, montecarlo, chudnovsky]:
   - Record start time.
   - Invoke the internal `calculatePi` function with the chosen digits.
   - Record end time and compute `durationMs`.
3. Collect results in an array of objects:
   { algorithm: string, digits: number, pi: string, durationMs: number }
4. Output formatting:
   - If `--output-format text`, print a header row followed by aligned rows for each algorithm:
       Algorithm    DurationMs    Pi
       leibniz      23            3.14
       ...
   - If `--output-format json`, print the array as a JSON string via `console.log(JSON.stringify(...))`.
5. Exit without performing any further single-algorithm mode logic.

## Implementation Details
1. In `src/lib/main.js`, extend yargs options to include:
   .option("compare", { alias: "c", type: "boolean", default: false, describe: "Compare all algorithms for given digits" })
2. In the `main` function, detect `argv.compare` before other branches. If true:
   - Loop over the defined algorithms.
   - Use Date.now() to measure each run.
   - Assemble the results array.
   - Format and log output based on `argv["output-format"]`.
   - Return immediately afterward.

## Tests
Add new unit tests in `tests/unit/main.test.js`:
1. Spy on `console.log` and call main with `["--digits","3","--compare"]`. Verify that four rows are printed with matching algorithm names and a valid numeric duration and pi strings.
2. Call main with `["--digits","2","--compare","--output-format","json"]`. Expect a single `console.log` invocation with a JSON array of length 4, each entry having the correct fields.

## Documentation Updates
1. Update `docs/USAGE.md` to include `--compare` under CLI options with description and example.
2. Update `README.md` Features section to list algorithm comparison support.