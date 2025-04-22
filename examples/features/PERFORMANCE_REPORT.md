# PERFORMANCE_REPORT

## Overview
This feature enables the CLI tool to generate a detailed performance report in JSON format. When the user includes the `--performance-report` flag, the tool aggregates the execution metrics (average, maximum, minimum, standard deviation, median execution times, and total invocations) from the in-memory log and outputs a structured JSON report to a file named `performance_report.json`. It also prints a summary to the console for immediate feedback.

## Implementation Details
### Source File Update (src/lib/main.js):
- **Flag Detection:**
  - Check if `--performance-report` is present among the CLI arguments.
- **Metrics Aggregation:**
  - Reuse the logic from the self-improvement diagnostics to calculate the performance metrics, but structure them into a JSON object.
- **Report Generation:**
  - Format the metrics into a JSON object, including:
    - Total invocations
    - First and latest invocation timestamps
    - Average execution time
    - Maximum execution time
    - Minimum execution time
    - Standard deviation
    - Median execution time
  - Write the JSON object to a file named `performance_report.json` using Node's `fs.writeFileSync`.
- **Console Output:**
  - Print a summary message indicating that the performance report has been generated.

### Test File Update (tests/unit/main.test.js):
- **New Test Cases:**
  - Simulate CLI invocation with the `--performance-report` flag.
  - Spy on `console.log` to verify that the report summary is printed.
  - After execution, check that `performance_report.json` is created and contains a valid JSON object with the expected keys.

### README Update (README.md):
- **Documentation:**
  - Update the README to include a new section under "Usage" that describes the `--performance-report` flag.
  - Provide an example command:
    ```bash
    node src/lib/main.js --performance-report
    ```
  - Explain that this command generates a detailed JSON report of CLI performance metrics and saves it to `performance_report.json`.

### Dependencies File Update (package.json):
- **No Additional Dependencies Required:**
  - The implementation leverages Node's built-in modules (like `fs`) and does not add any external dependencies.

## Testing & Compatibility
- Run `npm test` to ensure that the performance report is generated correctly and that the JSON file contains valid information.
- Verify that the CLI outputs a summary message to the console and that the report file is created in the repository root.

## Future Considerations
- Enhance the report by including historical data across CLI invocations (if persistent storage is added in a future iteration).
- Consider integrating automatic submission of the performance report to an external monitoring service.
- Expand the report with additional metrics such as memory usage if needed in future versions.
