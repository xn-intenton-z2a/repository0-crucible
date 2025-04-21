# COMMAND_ALIAS

## Overview

The COMMAND_ALIAS feature introduces support for predefined command aliases within the CLI tool. This allows users to invoke commonly used commands using shorthand flags, improving usability and speed. For example, instead of typing the full flag (e.g. "--self-improve"), a user can simply type a designated alias (e.g. "DEBUG"). This feature seamlessly integrates alias expansion into the existing argument processing logic.

## Implementation Details

### Source File Update (src/lib/main.js):
- **Alias Mapping:**
  - Define a constant alias mapping object at the top of the file, for example:
    ```js
    const aliasMapping = {
      "DEBUG": "--self-improve",
      "REPLICATE_ALL": "--replicate",
      "PLAN_IT": "--plan",
      "DECOMP": "--decompose"
    };
    ```
- **Alias Expansion:**
  - At the start of the `main(args)` function, iterate over the `args` array to check if any argument matches a key in `aliasMapping`.
  - Replace any matching alias with its corresponding full flag value.
  - Optionally, log a message indicating that an alias was expanded for transparency. For example:
    ```js
    args = args.map(arg => aliasMapping[arg] ? aliasMapping[arg] : arg);
    ```

### Test File Update (tests/unit/main.test.js):
- **New Test Cases:**
  - Add tests to simulate alias usage. For instance, when passing `["DEBUG"]` as arguments, the CLI should behave as if `--self-improve` was provided.
  - Verify through spies on `console.log` that the alias expansion occurred and that the expected outputs (diagnostics for self-improvement) are logged.

### README Update (README.md):
- **Documentation:**
  - Update the README to include a section documenting the new alias feature. Provide examples such as:
    ```bash
    node src/lib/main.js DEBUG
    ```
  - Explain that the following aliases are available:
    - `DEBUG` maps to `--self-improve`
    - `REPLICATE_ALL` maps to `--replicate`
    - `PLAN_IT` maps to `--plan`
    - `DECOMP` maps to `--decompose`

## Testing & Compatibility

- Run `npm test` to ensure all tests pass, including the new alias tests.
- Verify that existing long-form commands work as expected and that alias expansion does not interfere with other functionality.
- Ensure that no new dependencies are introduced and that all modifications are confined to the source file, test file, and README.
