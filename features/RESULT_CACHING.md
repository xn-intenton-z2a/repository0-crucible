# Purpose
Add a file-based cache for computed π values to speed up repeated requests and avoid redundant computation.

# CLI Integration
Add a new option:

- `--cache` enable cache lookup and storage for computed π results.

When enabled, the CLI checks for a cached file matching the requested digits and algorithm. If found, it skips calculation and prints the cached result. After computing a new result, it writes it to the cache directory.

# Implementation Details
1. In `src/lib/main.js`, extend yargs options to include `cache` as a boolean flag, defaulting to false.
2. Define a cache directory named `.pi_cache` in the current working directory.
3. In `main` when `cache` is true and `benchmark` is false and `output-format` is `text`:
   1. Compute a cache key filename: `${algorithm}-${digits}.txt`.
   2. If the cache directory does not exist, create it with `fs.mkdirSync`.
   3. If a cache file with the key exists, read its contents into `piString` and print it via `console.log`, then return without recalculation.
   4. If not, perform the usual calculation, then write `piString` to the cache file using `fs.writeFileSync` before printing.
4. Ensure existing behavior remains unchanged when `cache` is false.

# Tests
Add new unit tests in `tests/unit/main.test.js`:
1. Before each test, remove the `.pi_cache` directory if it exists to ensure a clean state.
2. Test that invoking `main(["--digits","3","--algorithm","spigot","--cache"])` creates `.pi_cache/spigot-3.txt` containing "3.14" and prints "3.14".
3. Prepopulate `.pi_cache/spigot-3.txt` with custom content (e.g., "X.X"), then invoke `main` with the same arguments and verify it prints the custom content without invoking the calculation logic again.
4. Confirm that without the `--cache` flag, no `.pi_cache` directory is created and behavior matches existing output.

# Documentation Updates
1. Update `docs/USAGE.md` to document the `--cache` flag with description and example.
2. Update `README.md` Features section to list result caching support.