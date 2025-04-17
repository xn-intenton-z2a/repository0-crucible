# SELF_IMPROVEMENT

## Overview
This feature enhances the agent’s self-diagnostic and introspection capabilities. In addition to the original diagnostics mode that outputs runtime metrics, this update adds a new CLI flag `--version` that prints the current version of the agent (retrieved from the package.json file). By incorporating version reporting into self-improvement, the agent provides a more comprehensive snapshot of its internal state, which is valuable for debugging and ensuring consistency across deployments.

## Implementation Details
- **Global Metrics Tracking:**
  - In `src/lib/main.js`, the global counters `globalThis.callCount` and `globalThis.errorCount` are maintained to track the number of processed commands and errors respectively.
  - The diagnostics flow remains unchanged; when the `--diagnostics` flag is detected, the agent outputs these metrics in JSON format.

- **Version Reporting Integration:**
  - Update the CLI argument parsing to detect the `--version` flag.
  - When the `--version` flag is provided, the agent reads the current version from the `package.json` file and outputs it to the console in plain text, then exits immediately.
  - Ensure that this version reporting occurs before any other processing (i.e. it bypasses standard execution).

- **CLI Argument Parsing:**
  - Enhance the argument parsing block in `src/lib/main.js` to branch on `--version`.
  - Use asynchronous file reading if necessary (or synchronous read since it is a one-off call) to fetch the version information from `package.json`.

- **Documentation Updates:**
  - Update `README.md` under the Usage section to document the new `--version` flag with an example:
    ```bash
    node src/lib/main.js --version
    ```
  - Briefly explain that the version output provides insight into the specific build of the agent, supporting traceability and debugging.

## Testing
- **Unit Tests:**
  - Extend tests in `tests/unit/main.test.js` to simulate invocation with the `--version` flag.
  - Use spies on `console.log` to verify that the output string matches the version fetched from the `package.json` file.
  - Confirm that when `--version` is active, no other processing (e.g. command logging or memory operations) takes place.

## Long-Term Direction
Integrating version reporting within self-improvement paves the way for richer introspection. In future iterations, the diagnostics output could be expanded to include build metadata, dependency versions, and even runtime environment details. This will support automated tuning and provide comprehensive context for the agent’s operations, in alignment with our mission of creating a self-aware, autonomous system.