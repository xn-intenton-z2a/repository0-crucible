# DIAGNOSTICS Feature Update

## Overview
This update refines the existing diagnostics functionality by introducing a JSON output mode. In addition to the current human-readable output via the `--diagnostics` flag, users can now leverage the `--diagnostics-json` flag to receive structured JSON diagnostic data. This is especially useful for integration with monitoring tools and automated systems.

## Implementation Details
- **CLI Argument Parsing:**
  - Update `src/lib/main.js` to detect the `--diagnostics-json` flag. When this flag is present, bypass the normal diagnostics output and call the new function `diagnosticsJson`.

- **New Function: diagnosticsJson:**
  - Implement a new function named `diagnosticsJson` in `src/lib/main.js`.
  - This function should collect:
    - Node.js version
    - Process uptime
    - Memory usage using `process.memoryUsage()`
  - Format the output using `JSON.stringify` so that it is machine-readable.
  - Include robust error handling around JSON serialization to catch and report any issues.

- **Testing Enhancements:**
  - Update the tests in `tests/unit/main.test.js` to include a new test case verifying that invoking the CLI tool with `--diagnostics-json` produces valid JSON containing keys such as `nodeVersion`, `uptime`, and `memoryUsage`.

- **Documentation Updates:**
  - In `README.md`, add a section describing the new `--diagnostics-json` flag along with usage examples.
  - Ensure that `CONTRIBUTING.md` reflects the guidelines for extending diagnostics functionality and for adding new CLI options.

## Future Considerations
- Allow further customization of the diagnostics output by enabling additional CLI flags to select specific metrics.
- Evaluate performance impacts as more diagnostics metrics might be added over time.

## Summary
This update brings immediate value to the repository by making diagnostics integration-ready for automated systems through structured JSON output, aligning with the mission of providing robust, real-time system insights.