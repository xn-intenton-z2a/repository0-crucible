# PI JSON Output Feature

## Overview

Enable machine-readable JSON output for π calculations in the CLI to simplify integration with other tools and scripts.

## Functional Requirements

- Update the CLI parser in src/lib/main.js to accept a new boolean flag --json.
- When --json is provided and not in HTTP serve or script mode:
  - After computing π (via calculatePi or calculatePiParallel), construct an object with a single key pi and the computed string value.
  - Print JSON.stringify({ pi: piString }) to stdout followed by a newline.
  - Exit with status code 0 on success.
- When --json is not provided, retain existing behavior of printing the plain π string.
- If --json is combined with --serve, print a descriptive error to stderr and exit with non-zero code.

## CLI Interface

- New flag:
  --json           Output π as JSON with key pi instead of plain text
- Usage examples:
  node src/lib/main.js --digits 10 --json
  node src/lib/main.js --digits 5 --algorithm chudnovsky --json

## Implementation Details

- In the main function of src/lib/main.js, extend the flag parsing loop to detect --json and set a boolean.
- After computing or awaiting the π value, check the json flag:
  - If true, serialize the result as JSON and print to stdout.
  - Otherwise, print using console.log(piString).
- Ensure process.exit codes: 0 on success, non-zero on validation or incompatible flag usage.

## Testing

### Unit Tests (tests/unit/main.test.js)

- Add tests to simulate calling the main logic with --digits 4 --json and verify stdout is exactly {"pi":"3.1415"}\n and exit code 0.
- Verify normal output remains unchanged when --json is absent.
- Test that combining --json with --serve produces an error and exit code non-zero.

### CLI Integration Tests (tests/e2e/cli.test.js)

- Spawn the CLI with --digits 3 --json and assert stdout matches JSON with key pi and correct value, and exit code 0.
- Confirm that node src/lib/main.js --serve --json exits with an error and descriptive message.