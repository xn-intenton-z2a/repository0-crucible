# Overview

Provide a scripting mode that loads a JSON or YAML script defining a sequence of commands to execute, allowing batch operations of π calculations, exports, benchmarks, and visualizations in a single invocation.

# Functional Requirements

- In src/lib/main.js, add support for a new `--script <path>` flag. When provided, the CLI enters scripting mode and ignores standalone flags.
- Read the file at the given path using fs/promises. Detect JSON or YAML based on file extension and parse using `JSON.parse` or `js-yaml`.
- Define a script schema: an object with a top-level `commands` array. Each entry is an object:
  - `command`: string, one of `pi`, `export`, `convergence`, `distribution`, `benchmark`, `search`
  - `options`: object with fields matching existing CLI flags for the command.
- Validate the script structure and each command entry. Reject unrecognized commands or missing `commands` array with a descriptive error.
- Iterate through `commands` sequentially. For each entry:
  - Dispatch to the corresponding library function: 
    - `pi` → `calculatePi` and print to stdout
    - `export` → `exportPi` and write to file
    - `convergence` → `visualizePiConvergence` and write PNG
    - `distribution` → `visualizePiDigits` and write PNG
    - `benchmark` → `benchmarkPi` and output CSV or chart
    - `search` → `searchPi` and print JSON
  - Pass the `options` object directly as function arguments.
- On any command error, abort execution, print error message to stderr, and exit with a non-zero code.

# CLI Interface

- `--script <path>`: Path to a JSON or YAML script file defining batch commands.
- Example usage:
  node src/lib/main.js --script jobs.yaml

# Dependencies

- Add `js-yaml` to `package.json` if not already present.
- Import `fs/promises` and `js-yaml` in `src/lib/main.js`.
- No additional new dependencies.

# Testing

- Unit tests in `tests/unit/main.test.js`:
  - Mock `fs/promises` to supply sample JSON and YAML scripts, verify parsing and command dispatch.
  - Test invalid script file path or invalid schema triggers descriptive errors.
- CLI tests in `tests/e2e/cli.test.js`:
  - Create a temporary YAML script file with a mix of `pi`, `distribution`, and `export` commands. Invoke CLI with `--script` and assert expected stdout and files created.
  - Test unsupported command name leads to exit code non-zero and error message.