# π Calculator CLI

## Summary
Extend the existing CLI tool to compute π to a specified number of decimal places using selectable algorithms. Users can request a calculation via command-line flags and receive the result in text format.

## Behavior
- Accept a new flag `--digits <n>` (default 10) to control how many decimal places of π to compute.
- Accept a new flag `--algorithm <name>` (defaults to `leibniz`) to choose between available algorithms: `leibniz`, `nilakantha`, and `machin`.
- Print the computed value of π to standard output with the requested precision.

## Source File Changes
- In `src/lib/main.js`, import a small helper module or define functions to calculate π using the three series.
- Use `process.argv` to parse `--digits` and `--algorithm`.
- Validate inputs and fall back to defaults if flags are missing or invalid.
- Format the computed value by rounding to the requested number of decimal places.

## Test Coverage
- Add unit tests in `tests/unit/main.test.js` to:
  - Verify each algorithm returns π within acceptable tolerance for small digit counts (e.g., 5 or 10 digits).
  - Ensure default behavior (no flags) produces 10 digits using the `leibniz` series without throwing errors.
  - Test invalid flag values gracefully revert to defaults.

## README Updates
- Document the new flags in the Usage section:
  - `node src/lib/main.js --digits 15`
  - `node src/lib/main.js --algorithm machin --digits 20`
- Provide example outputs.

## Dependency Updates
- Add a lightweight flag parsing library (for example `yargs`).
- Update `package.json` to include the new dependency and update the `test` script if needed to run the new tests.