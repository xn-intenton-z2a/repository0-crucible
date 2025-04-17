# COMMAND_REPLAY

## Overview
This feature adds the ability to replay a previously executed command from the memory log. By using the new CLI flag `--replay-session <sessionId>`, users can retrieve the command arguments of a specific session and view or re-execute the command. This provides a convenient way to revisit and potentially repeat past actions without manually retyping the entire command.

## Implementation Details
- **Flag Detection:**
  - Modify `src/lib/main.js` to detect the new flag `--replay-session`.
  - Expect the flag to be followed by a session identifier (a string representing a unique sessionId).

- **Session Retrieval:**
  - Search the current in-memory log (populated at startup or via command execution) for an entry with the matching sessionId.
  - If the session is found, output the original command arguments associated with that session.
  - If no matching session is found, output an error message: "Session not found".

- **Integration and Safety:**
  - Ensure that this new branch does not interfere with other flags. It should execute its logic before recording a new log entry.
  - As a first step, only retrieve and display the command; future iterations may support automatic re-execution.

## Testing
- **Unit Tests:**
  - Extend `tests/unit/main.test.js` with tests that simulate providing the `--replay-session` flag along with a valid sessionId.
  - Use spies on `console.log` to verify that the command arguments are correctly retrieved and output.
  - Test the scenario where an invalid sessionId is provided and check that an appropriate error message is output.

## Documentation Updates
- **README.md:**
  - Add a new documentation section explaining the `--replay-session` flag in the Usage section.
  - Provide examples such as:
    ```bash
    node src/lib/main.js --replay-session 2023-10-30T12:34:56.789Z-abc123
    ```
  - Explain that this feature is intended for quick review of past commands and sets the groundwork for potential command re-execution.

## Long-Term Direction
While the initial implementation only retrieves and displays the stored command, future iterations may allow the agent to re-execute the command automatically. This could be expanded into a more comprehensive command replay or rollback feature, providing even greater control over the workflow.
