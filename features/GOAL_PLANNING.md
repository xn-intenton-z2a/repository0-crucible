# Overview
This feature merges the capabilities of goal decomposition and planning into a single, cohesive module. It enables the agent to break down complex, compound commands into a series of discrete, actionable steps, and, when desired, output a plan rather than executing commands immediately. This enhances clarity, traceability, and provides a controlled dry-run mode that helps developers understand the agent’s intended sequence of actions before applying changes.

# Implementation Details
- **Compound Command Parsing:**
  - Enhance the CLI tool (in `src/lib/main.js`) to detect compound commands using delimiters such as semicolons (;) or keywords like "then". 
  - Parse the input command string and split it into multiple sub-commands, each of which will be processed in order.

- **Dry-Run / Planning Mode:**
  - Introduce a `--plan` flag. When present, instead of executing the commands, the agent will output an ordered list of sub-steps. 
  - Integrate the planning mode with the existing logging and memory functionalities to ensure that planned actions are recorded without side effects (e.g. global counters remain unchanged).

- **Execution Flow:**
  - When not in planning mode, the sub-commands are executed sequentially, with each step contributing to the overall memory log, ensuring consistency with the memory and self-improvement features.
  - When in planning mode, display the plan in a clear, step-by-step format (e.g., "Step 1: ...", "Step 2: ...").

- **Test Enhancements:**
  - Update the tests in `tests/unit/main.test.js` to simulate both normal execution and planning mode.
  - Use spies on console output to verify that the plan is correctly generated (e.g., that the output contains a sequence of steps and does not modify memory or global counters).

- **README Updates:**
  - Update `README.md` to include instructions and examples for using the `--plan` flag. Include examples like:
    ```bash
    node src/lib/main.js --plan --agentic '{"command": "build project; then deploy"}'
    ```
  - Document the expected behavior in both execution and dry-run modes.

# Long-Term Direction
This unified goal planning feature will serve as a foundation for more advanced, AI-driven task decomposition. Future enhancements might include natural language processing to more intelligently identify sub-tasks, dynamic adjustments based on past execution outcomes (leveraging memory and self-improvement), and integration with other agent capabilities such as replication for parallel task handling.
