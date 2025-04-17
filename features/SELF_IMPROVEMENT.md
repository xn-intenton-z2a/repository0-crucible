# SELF_IMPROVEMENT

## Overview
Enhance the self-improvement capability to include an explicit CLI diagnostics command. This update introduces a new flag (e.g. `--diagnostics`) that allows the agent to output key runtime metrics and internal state information. By doing so, the agent not only tracks its performance in terms of call count and error count but also provides immediate feedback and suggestions for improvement during execution.

## Implementation Details
- **CLI Diagnostics Flag:**
  - Update `main.js` to recognize a new flag `--diagnostics`.
  - When the diagnostics flag is detected, bypass normal command processing and instead output a summary that includes metrics such as `globalThis.callCount` and `globalThis.errorCount`.
  - For instance, log a message like: "Self-Check: X commands executed, Y errors, environment OK".

- **Runtime Metrics Tracking:**
  - Integrate counters into the agent's execution path. Increment `globalThis.callCount` for each command processed and update `globalThis.errorCount` whenever an error or invalid input is encountered.
  - Optionally, include a basic rule-based suggestion (e.g. "Suggestion: Review failed commands") when errors are detected.

- **Test Enhancements:**
  - Extend unit tests in `tests/unit/main.test.js` to simulate running the agent with the `--diagnostics` flag. Verify that the output includes the expected keys (such as command count and error count) and that the agent exits correctly without additional processing.

- **README Documentation Updates:**
  - Update `README.md` to introduce the new diagnostics capability. Document usage with examples, for instance:
    ```bash
    node src/lib/main.js --diagnostics
    ```
  - Explain that this flag is intended to help users quickly assess the agent's state and that it is part of the self-improvement approach to monitor and enhance performance.

## Benefits
- Provides immediate visibility into runtime performance and error states, facilitating quicker debugging and iterative improvements.
- Lays the groundwork for further self-improvement enhancements (such as automated suggestions and adjustments based on runtime metrics).
- Aligns with the long-term vision of an agent that is not only autonomous in execution but also introspective and capable of learning from its own operations.

This update respects the current repository constraints by only modifying existing source, test, README, and dependency files while significantly augmenting the self-improvement feature set.
