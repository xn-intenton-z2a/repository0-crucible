# DIAGNOSTICS

## Overview
This feature merges and enhances the existing VERBOSE_MODE and SELF_IMPROVEMENT capabilities into a unified diagnostics module. The new DIAGNOSTICS feature introduces both a detailed output mode and self-reporting functionality. When enabled, it provides enriched logging details (timestamps, session identifiers, and extended diagnostic context) alongside self-introspection data including version reporting. This unified approach streamlines troubleshooting, performance monitoring, and overall observability of the agent.

## Implementation Details
- **Verbose Logging:**
  - Introduce the `--verbose` flag to trigger enhanced output. When enabled, console log outputs will be prefixed with ISO-formatted timestamps, session IDs, and additional context derived from runtime diagnostics.
  - Ensure that the enhanced logging does not affect the normal operation of other features and is only activated upon request.

- **Version Reporting & Self-Introspection:**
  - Add the `--version` flag to output the current version of the agent as obtained from the `package.json` file. This flag overrides other processing to quickly deliver version information and exit.
  - In addition, incorporate self-metrics by exposing internal counters (like call and error counts) and other internal states, making them available via a detailed diagnostics report.

- **CLI Integration:**
  - Update the argument parsing in `src/lib/main.js` to handle both `--verbose` and `--version` flags.
  - Ensure that verbose mode complements the existing diagnostic output (such as `--diagnostics` and `--detailed-diagnostics`), providing additional context when needed.

- **Documentation Updates:**
  - Update README.md to instruct users on how to use the new unified DIAGNOSTICS feature. Examples:
    ```bash
    node src/lib/main.js --verbose
    node src/lib/main.js --version
    ```
  - Document that the detailed diagnostics output is designed to support both end-user debugging and internal performance monitoring.

## Testing
- **Unit Tests:**
  - Extend tests in `tests/unit/main.test.js` to cover scenarios where `--verbose` and `--version` are active.
  - Use spy techniques on `console.log` to verify that enhanced log outputs include the expected diagnostic details when verbose mode is activated.
  - Confirm that when `--version` is used, the output strictly reflects the version from `package.json` and bypasses other processing.

## Long-Term Direction
Merging verbose diagnostics with self-improvement capabilities not only simplifies the maintenance of the agent’s monitoring tools but also lays the groundwork for future enhancements. Future iterations might include adjustable logging levels (e.g., INFO, DEBUG, ERROR), integration with external logging services, and more nuanced self-assessment metrics. This aligns with our mission of creating a self-aware, autonomous system that is easy to debug and continually optimizes its own performance.