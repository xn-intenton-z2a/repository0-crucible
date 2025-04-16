# Overview
This feature combines automated planning and goal decomposition into a single cohesive module. It allows the CLI tool to accept high-level goals, break them down into a sequence of manageable sub-tasks, and optionally execute these tasks sequentially. Users can choose to simply view the decomposition for review or initiate execution. This consolidation streamlines command processing while aligning with the overall mission of building an autonomous agent that plans, decomposes, and acts.

# Implementation Details
1. **Payload Extension:**
   - Modify the agenticHandler in `src/lib/main.js` to detect a `goal` property in the input payload. 
   - If a payload contains `goal`, parse it using simple heuristics (e.g., delimiters like ". ", ";", or "then") to generate a list of sub-tasks.

2. **Decomposition and Execution Modes:**
   - If the payload includes a flag (e.g. `decomposeOnly`), output the sub-task list in JSON format without executing them. 
   - Otherwise, treat each sub-task as a sequential command and process them (e.g., by recursively calling the same handler or iterating through tasks). 
   - Ensure that each sub-task increments the global call count and is logged in the memory log.

3. **Source File Changes:**
   - Update `src/lib/main.js` to implement the parsing logic and integrate both planning and decomposition modes.
   - Ensure consistent error handling and fallback behavior if the goal is malformed or missing clear delimiters.

# Testing
1. **Decomposition Mode:**
   - Write unit tests in `tests/unit/main.test.js` to verify that providing a payload like `{ goal: "Step one. Then step two.", decomposeOnly: true }` returns the correct list of sub-tasks without executing them.

2. **Execution Mode:**
   - Validate that a goal provided without the decomposeOnly flag results in sequential execution of parsed sub-tasks, with each sub-task being logged appropriately.

3. **Edge Cases:**
   - Test scenarios where the goal is a single sentence or uses unconventional delimiters, ensuring graceful handling by either treating the entire goal as one command or providing useful error feedback.

# Documentation
1. **README Update:**
   - Add a section under CLI Options to document the new planning and decomposition functionality.
   - Example usage:
     ```bash
     node src/lib/main.js --agentic '{"goal": "Initialize project. Then configure settings.", "decomposeOnly": true}'
     ```
   - Explain the differences between preview (decomposition only) and execution modes.

2. **Usage Notes:**
   - Clearly state that this unified feature enhances clarity and reduces redundancy by merging previous planning and goal decomposition capabilities.

# Long-Term Direction
This feature lays the groundwork for more advanced goal interpretation and execution strategies. Future iterations may incorporate dynamic re-planning based on sub-task outcomes, integrate natural language processing for more sophisticated goal parsing, and provide a richer interactive interface for reviewing and approving the action plan before execution.