# PLAN_DECOMPOSITION

## Overview
This feature refines the goal planning and decomposition capability of the CLI tool. It continues to allow users to provide a high-level goal that is split into sub-tasks, but now includes enhanced parsing techniques, improved error tolerance, and tighter integration with memory logging. The feature remains closely aligned with the mission of autonomous intelligent automation by making goal execution more transparent and reliable.

## Implementation Details
1. **Enhanced Goal Parsing:**
   - Extend the parsing logic in `src/lib/main.js` to handle a wider range of delimiters (such as commas, semicolons, "then", and newline characters) to better split multi-part goals.
   - Improve heuristics to detect poorly structured or ambiguous commands, and provide graceful fallback messages for malformed goals.

2. **Dual Modes of Operation:**
   - **Decomposition Mode:** If the input payload includes a flag (e.g. `decomposeOnly`), output the list of sub-tasks in JSON without executing them.
   - **Execution Mode:** In the absence of the `decomposeOnly` flag, sequentially execute each parsed sub-task while updating the global call count and appending the processed information to the in-memory log.

3. **Integration with Memory:**
   - Ensure that each decomposed sub-task and its result (or error) are logged into the global memoryLog, enhancing traceability and accountability for each planning action.

4. **Error Handling:**
   - Refine error messages for cases when a goal cannot be correctly parsed. Provide actionable feedback such as suggesting use of clearer delimiters or checking the goal format.

## Testing
1. **Unit Tests:**
   - Update tests in `tests/unit/main.test.js` to include payloads with various delimiter types. Verify that even partial goal definitions provide a useful list of sub-tasks.
   - Test scenarios where the input goal is ambiguous or malformed to confirm that the tool returns a descriptive error without crashing.

2. **Integration Verification:**
   - Simulate both decomposeOnly mode and execution mode to check that sub-tasks are appropriately processed and logged in memory.

## Documentation
1. **README Update:**
   - Enhance the CLI Options section to document the improved planning and decomposition functionality. For example:
     ```bash
     node src/lib/main.js --agentic '{ "goal": "Initialize project. Then, setup configuration; finally, run tests.", "decomposeOnly": true }'
     ```
   - Clearly differentiate between preview (decomposition mode) and full execution mode.

## Long-Term Direction
This enhancement forms a bridge to future improvements such as dynamic re-planning based on sub-task outcomes and more advanced natural language processing. The updated PLAN_DECOMPOSITION feature sets a robust foundation that ensures clearer goal articulation and enhanced operational logging, fully supporting the mission's vision of intelligent, autonomous task management.