# JSON Output Support

## Purpose
Enable machine-readable JSON output for π calculation results to facilitate integration into automated workflows and external tools.

## CLI Integration
Add support for a JSON output format under the existing `--output-format, -f` option. When users specify `--output-format json`, the CLI emits a single JSON object instead of plain text.

## Implementation Details
1. In `src/lib/main.js`, update the `--output-format` option choices to include `json`.
2. After computing `piString` and measuring `durationMs` when benchmarking:
   1. If `outputFormat` is `json`:
      - Determine `durationMs`: use recorded duration if `--benchmark` is enabled; otherwise set to `null`.
      - Construct a result object with fields:
        {
          digits: <number>,
          algorithm: <string>,
          pi: <string>,
          durationMs: <number|null>
        }
      - Print the object via `console.log(JSON.stringify(result))` and return immediately.
3. Ensure existing `text` and `png` behaviors remain unchanged.

## Tests
Add unit tests in `tests/unit/main.test.js`:
1. Spy on `console.log` and invoke `main(["--digits","3","--output-format","json"])`. Assert a single log call with JSON string matching digits:3, algorithm:"leibniz", pi:"3.14", durationMs:null.
2. Spy on `console.log` and invoke `main(["--digits","4","--algorithm","spigot","--benchmark","--output-format","json"])`. Assert JSON with digits:4, algorithm:"spigot", pi: string of length 4, and durationMs is a number.
3. Verify that if `--output-format` is set to an unsupported format, the error message remains consistent.

## Documentation Updates
1. In `docs/USAGE.md`, under the `--output-format` option, add `json` with a description and example usage.
2. In `README.md` Features section, mention machine-readable JSON output and provide a CLI example.
