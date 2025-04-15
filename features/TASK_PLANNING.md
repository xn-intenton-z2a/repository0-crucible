# TASK_PLANNING

## Overview
This feature combines goal decomposition and planning capabilities into a single cohesive unit. TASK_PLANNING enables the agent to analyze compound CLI commands or high-level goals, break them down into individual, actionable steps, and preview a sequence of planned actions without actual execution. This results in a more robust, user-friendly approach to managing multi-step tasks while aligning with our mission of practical automation, continuous refinement, and intelligent collaboration.

## Implementation Details
- **Input Parsing & Task Breakdown:**
  - Enhance the CLI to detect compound commands via delimiters such as semicolons (`;`) or key phrases like "and then". 
  - Split the input into a sequence of sub-commands that can be processed one after the other.
  - If the input is structured (e.g., a JSON with a `goal` field), simply log a message that the goal has been recognized and outline a placeholder for future full decomposition.

- **Planning Mode Activation:**
  - Integrate a `--plan` flag (or extend the existing `--dry-run` flag) within the source file (`src/lib/main.js`).
  - When activated, the agent computes, logs, and displays an ordered list of planned sub-tasks instead of executing them. This list might include messages like "Step 1: Execute X", "Step 2: Follow up with Y", etc.
  - Ensure that in planning mode, no state altering actions are performed (e.g., counters like `globalThis.callCount` should not increment).

- **Batch Processing Integration:**
  - Reuse the existing batch execution logic for sequentially processing each sub-task when not in planning mode. 
  - Under planning, simply display the computed plan in a clear and structured manner.

- **Testing Updates:**
  - Update unit tests in `tests/unit/main.test.js` to include scenarios where a compound command is provided alongside the `--plan` flag, verifying that the output lists the step-by-step plan.
  - Ensure that dry-run behavior does not trigger any side effects and that all parsed sub-tasks are listed in order.

- **Documentation Updates:**
  - Modify the README (`README.md`) to include a section under CLI Options that explains the TASK_PLANNING feature. Provide examples demonstrating how to use `--plan` (or `--dry-run`) to preview task breakdowns, such as:
    ```bash
    node src/lib/main.js --plan --agentic '{"command": "build project; then deploy it"}'
    ```
  - Clearly document the current behavior and any limitations, noting that more intelligent planning capabilities may be introduced in future iterations.

## Long-Term Direction
Future improvements could include integrating a more advanced NLP-based planner for even smarter decomposition of goals and enhanced error handling. The aim is to evolve TASK_PLANNING from basic splitting of commands into a fully-fledged planning assistant capable of handling complex, multi-step operations with minimal user intervention.
