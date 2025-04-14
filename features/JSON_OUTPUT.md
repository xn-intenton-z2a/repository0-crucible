# Overview
This feature consolidates and enhances the existing diagnostics and query functionalities by introducing structured JSON output modes. Users will now be able to utilize the new flags `--diagnostics-json` and `--query-json` to receive machine-readable diagnostic and query responses. This merger provides a consistent JSON output across different commands, facilitating easier integration with monitoring tools and automated workflows.

# Implementation Details
- **CLI Argument Parsing:**
  - Update `src/lib/main.js` to detect the new flags `--diagnostics-json` and `--query-json` alongside the existing `--diagnostics` and `--query` commands.
  - When `--diagnostics-json` is provided, bypass the standard textual diagnostics and invoke a new function (or enhanced branch) that gathers system diagnostics (e.g., Node.js version, process uptime, memory usage) and outputs a JSON-formatted string.
  - When `--query-json` is provided, modify the query handling logic to construct and output a JSON object containing keys like `searchTerms`, `filters`, and a summary `message` rather than plain text.

- **Source Code Changes:**
  - In `src/lib/main.js`, implement or extend functions for handling JSON responses in diagnostics and query commands.
  - Ensure backward compatibility by retaining the original behavior when the JSON flags are not used.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to include new test cases that simulate the use of `--diagnostics-json` and `--query-json`.
  - Validate that the JSON outputs contain the necessary keys and that the outputs parse correctly with `JSON.parse`.

- **Documentation Updates:**
  - Revise `README.md` to document the new JSON output flags, including examples of how to invoke the CLI with `--diagnostics-json` and `--query-json`.
  - Update `CONTRIBUTING.md` to include guidelines for extending JSON output functionality and testing these enhancements.

# Future Considerations
- Further refine the JSON schemas to include additional system metrics or query metadata.
- Provide configuration options to allow users to choose between global human-readable and JSON outputs across all commands.
- Extend similar JSON output formats to other commands as needed in future iterations.
