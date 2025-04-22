# CLI_ROUTER

## Overview
This feature enhances the agent’s command line interface (CLI) by introducing a robust flag processing mechanism in the main entry point. The new CLI router will inspect process arguments, identify supported flags such as --diagnostics, --plan, and --help, and route execution accordingly. This improvement ensures that users can toggle advanced modes (e.g., self-check, planning) while maintaining a clear and consolidated entry point in a single source file.

## Implementation Details
- **Flag Parsing:** Modify the `src/lib/main.js` file to parse `process.argv`. The router will check for the presence of specific flags:
  - `--diagnostics`: Trigger self-diagnostic procedures (e.g., output internal metrics and state summary).
  - `--plan`: Activate planning mode to display the steps that would be executed rather than performing actions.
  - `--help`: Output usage information and explain all available flags.
  - Fallback behavior: If no recognized flag is provided, continue with the default behavior of logging input arguments.

- **Routing Logic:** Implement a conditional block in `main()` that routes the execution backend based on the flags. This keeps the code modular and allows easy extension for future modes.

- **Minimal Footprint:** Ensure that the changes are limited to the following files:
  - `src/lib/main.js` (source logic for flag processing)
  - `tests/unit/main.test.js` (unit tests to validate the expected behavior for each supported flag)
  - `README.md` (update usage and examples)
  - `package.json` (if necessary, update scripts section to reference new help text if needed)

## Testing Strategy
- **Unit Tests:** Update `tests/unit/main.test.js` to cover the new routing logic. Tests should simulate different CLI arguments (e.g., `--diagnostics`, `--plan`, `--help`) and validate that the output contains the expected messages or usage information.

- **Edge Cases:** Verify that if multiple flags are present, the highest priority flag (as defined by the documentation) is executed. If no known flags are present, the default output is generated.

## Documentation
- **README Updates:** Enhance the README file to include a new section that documents the CLI usage. Include examples on how to use each flag:

  ```bash
  # Default execution
  node src/lib/main.js

  # Diagnostics mode
  node src/lib/main.js --diagnostics

  # Planning mode
  node src/lib/main.js --plan

  # Help output
  node src/lib/main.js --help
  ```

- **Usage Guidelines:** Document how the router integrates with existing self-improvement, planning, and help-seeking features so that users understand the available capabilities and the priority of each flag.

## Future Enhancements
- Extend the router to allow more complex command structures and combinations of flags.
- Integrate better error handling when unsupported flags are provided.
- Consider modularizing the flag processing logic into a separate helper function within the same file for easier testing and future refactoring.
