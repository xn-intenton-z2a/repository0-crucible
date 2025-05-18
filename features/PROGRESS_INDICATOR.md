# PROGRESS INDICATOR

## Purpose
Add a real-time progress bar to the CLI during π calculation to provide visibility into long-running computations and improve user experience.

## CLI Integration
Add a new option:

- `--progress`  enable display of a live progress bar during π approximation loops.

When the flag is set, the CLI shows a progress bar in the console while computing π.

## Implementation Details
1. Add `cli-progress` as a dependency in `package.json`.
2. In `src/lib/main.js`:
   1. Import the ProgressBar from `cli-progress`.
   2. Detect the `progress` flag alongside existing options.
   3. Calculate an estimated total work units:
      - For Leibniz and Spigot: use `digits * 10000` terms.
      - For Monte Carlo: use a sample count of `digits * 10000`.
      - For Chudnovsky: estimate term count as `Math.ceil(digits / 14)`.
   4. When `--progress` is true and `benchmark` is false:
      - Initialize a new progress bar before the main loop.
      - Within each iteration (or at defined intervals), call `bar.update(currentCount)`.
      - After loop completion, call `bar.stop()`.
   5. Ensure the progress bar is disabled when `output-format` is `json` or `png` to avoid corrupting those outputs.
3. Retain existing calculation logic and ensure compatibility with other flags.

## Tests
Add tests in `tests/unit/main.test.js`:
1. Mock or spy on ProgressBar methods to confirm `start`, `update`, and `stop` are called when `--progress` is passed.
2. Verify that invoking `main(["--digits","3","--progress"])` displays progress updates in the console and ultimately prints the result.
3. Confirm that without `--progress`, no progress bar is invoked.

## Documentation Updates
1. Update `docs/USAGE.md` to document the `--progress` flag and include an example:
   node src/lib/main.js --digits 5000 --progress
2. Update `README.md` under Features to list real-time progress bar support.