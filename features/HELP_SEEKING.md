# HELP_SEEKING

## Overview
This update extends the existing HELP_SEEKING feature to provide a robust interactive help command. When the agent is started with the help flag (e.g. `--help` or `--assist`), it will bypass normal command execution to output a comprehensive usage guide. This guide includes a description of available commands, usage examples, and troubleshooting steps. By integrating this functionality directly into the CLI, we ensure that developers have immediate access to both operational guidance and diagnostic cues.

## Implementation Details
- **Flag Detection:** Modify the main source file (`src/lib/main.js`) to check if the arguments include `--help` or `--assist`. If detected, the agent will not execute its normal logic but instead call a new helper function (e.g. `displayHelp()`).
- **Help Display Function:** Implement `displayHelp()` in `main.js` to print usage details. The help message should include:
  - A brief overview of the repository and its purpose.
  - A list of available CLI flags and commands (e.g. `--help`, `--self-check`, `--plan`).
  - Instructions referencing the README and CONTRIBUTING guides for further details.
- **CLI Consistency:** Ensure that the new help functionality aligns with the broader mission of intelligent collaboration by providing clear and actionable guidance when the agent is uncertain.
- **Dependencies:** No new dependencies are introduced; the implementation will solely modify the main source file and relevant documentation.

## Testing
- **Unit Tests:** Update the test file (`tests/unit/main.test.js`) to include a test case where the command-line argument `--help` is passed. The test should capture the output and verify that it contains key phrases such as "Usage", "Commands", and references to documentation.
- **Behavior Verification:** Confirm that when the help flag is active, no other command processing is performed and the agent exits after displaying the help message.

## Documentation
- **README Update:** Enhance the README.md to include a section on the interactive help command. Provide examples such as:
  ```bash
  node src/lib/main.js --help
  ```
  Explain that this command will output detailed instructions and a summary of available operations. Align this documentation with the content in CONTRIBUTING.md to ensure consistency across user-facing materials.

## Long-Term Direction
This extension of HELP_SEEKING will lay the groundwork for future improvements in interactive CLI support. In subsequent iterations, the system may:
- Dynamically generate help content based on enabled features and recent usage statistics.
- Incorporate contextual help that adapts based on errors or unexpected inputs.
- Enhance the help output to include links to online documentation, video tutorials, or live chat support. 

By refining the help functionality, the agent not only becomes more transparent but further aligns with our mission of intelligent collaboration by reducing the friction for developers interacting with the system.