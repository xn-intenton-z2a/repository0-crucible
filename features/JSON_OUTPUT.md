# JSON Output Support

## CLI Integration
Add support for a JSON output format to enable machine-readable results. Users can specify `--output-format json` to print π calculation results as a JSON object.

### New Option
- `--output-format json`  outputs a JSON object to the console.

## Implementation Details
1. In `src/lib/main.js` extend yargs `choices` for `output-format` to include `json`.
2. After computing `piString`, when `outputFormat` is `json`:
   1. Determine `durationMs` if benchmarking is enabled; else omit or set to `null`.
   2. Construct an object:
      {
        digits: <number>,
        algorithm: <string>,
        pi: <string>,
        durationMs: <number or null>
      }
   3. Print this object via `console.log(JSON.stringify(...))`.

## Tests
Add unit tests in `tests/unit/main.test.js`:
1. Invoking `main(["--digits","3","--output-format","json"])` logs a JSON string matching:
   {"digits":3,"algorithm":"leibniz","pi":"3.14","durationMs":null}
2. Invoking `main(["--digits","4","--algorithm","spigot","--benchmark","--output-format","json"])` logs JSON with a numeric `durationMs` and correct fields.

## Documentation Updates
1. Update `docs/USAGE.md` to include `json` under `--output-format` examples.
2. Update `README.md` Features section to mention machine-readable JSON output.